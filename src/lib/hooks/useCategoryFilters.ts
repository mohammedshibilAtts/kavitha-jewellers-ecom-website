import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useProductsList, useProductsByCategory } from "@/lib/hooks/useProducts";
import { useCategoryDetails } from "@/lib/hooks/useCategory";
import { CompatibleProduct } from "@/components/common/ProductCard";
import { encodeId, decodeId } from "@/lib/utils/obfuscate";

export const AVAILABLE_CATEGORIES = [
  { name: "Rings", slug: "rings" },
  { name: "Earrings", slug: "earrings" },
  { name: "Bangles & Bracelets", slug: "bangles-bracelets" },
  { name: "Solitaire", slug: "solitaire" },
  { name: "Mangalsutra", slug: "mangalsutra" },
];

export const PRICE_RANGES = [
  { label: "Under ₹10,000", id: "under-10k", min: 0, max: 10000 },
  { label: "₹10,000 - ₹30,000", id: "10k-30k", min: 10000, max: 30000 },
  { label: "₹30,000 - ₹60,000", id: "30k-60k", min: 30000, max: 60000 },
  { label: "₹60,000 - ₹1,00,000", id: "60k-100k", min: 60000, max: 100000 },
  { label: "Over ₹1,00,000", id: "over-100k", min: 100000, max: 9999999 },
];

export const WEIGHT_RANGES = [
  { label: "Under 2.0g", id: "under-2g", min: 0, max: 2 },
  { label: "2.0g - 5.0g", id: "2g-5g", min: 2, max: 5 },
  { label: "5.0g - 10.0g", id: "5g-10g", min: 5, max: 10 },
  { label: "Over 10.0g", id: "over-10g", min: 10, max: 999 },
];

export const GENDERS = [
  { label: "Kids", id: "kids" },
  { label: "Women's", id: "women" },
  { label: "Men's", id: "men" },
];

export function useCategoryFilters() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Route modes: ID-based (/category/[id]) vs Slug-based (/[category])
  const categoryIdEncoded = params.id as string | undefined;
  const categoryId = useMemo(() => categoryIdEncoded ? decodeId(categoryIdEncoded) : undefined, [categoryIdEncoded]);
  const categorySlug = (params.category as string | undefined) || (!categoryId ? "all" : "");

  // 1. Fetch category details if we have an ID
  const { data: categoryDetail } = useCategoryDetails(categoryId || "");

  // 2. Fetch products:
  const { data: dbProductsByCategory, isLoading: isCategoryProductsLoading } = useProductsByCategory(categoryId || "");
  const { data: dbAllProducts, isLoading: isAllProductsLoading } = useProductsList();

  const products = useMemo(() => {
    if (categoryId) {
      return (dbProductsByCategory || []) as CompatibleProduct[];
    }
    return (dbAllProducts || []) as CompatibleProduct[];
  }, [categoryId, dbProductsByCategory, dbAllProducts]);

  const isLoading = categoryId ? isCategoryProductsLoading : isAllProductsLoading;

  // Filter States
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedWeightRanges, setSelectedWeightRanges] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPurities, setSelectedPurities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isNewArrivals, setIsNewArrivals] = useState<boolean>(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync state with URL search parameters on mount/update
  useEffect(() => {
    const metalParam = searchParams.get("metal");
    setSelectedMetals(metalParam ? metalParam.split(",") : []);

    const purityParam = searchParams.get("purity");
    setSelectedPurities(purityParam ? purityParam.split(",") : []);

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const parsed = categoryParam.split(",").map((cat) => {
        const c = cat.toLowerCase();
        const matched = AVAILABLE_CATEGORIES.find(
          (ac) => ac.slug === c || ac.slug === c + "s" || c === ac.slug + "s"
        );
        return matched ? matched.slug : c;
      });
      setSelectedCategories(parsed);
    } else {
      setSelectedCategories([]);
    }

    const priceParam = searchParams.get("priceRange");
    setSelectedPriceRanges(priceParam ? priceParam.split(",") : []);

    const weightParam = searchParams.get("weightRange");
    setSelectedWeightRanges(weightParam ? weightParam.split(",") : []);

    const genderParam = searchParams.get("gender");
    setSelectedGenders(genderParam ? genderParam.split(",") : []);

    const sortParam = searchParams.get("sort");
    setSortBy(sortParam ? sortParam : "popular");

    const newArrivalsParam =
      searchParams.get("newarrivals") ||
      searchParams.get("new-arrivals") ||
      searchParams.get("newArrivals");
    setIsNewArrivals(newArrivalsParam === "true");
  }, [searchParams]);

  // Compute active filters count
  const activeFiltersCount = useMemo(() => {
    return (
      selectedPriceRanges.length +
      selectedGenders.length +
      selectedMetals.length +
      selectedWeightRanges.length +
      (categoryId ? 0 : selectedCategories.length) +
      selectedPurities.length +
      (isNewArrivals ? 1 : 0)
    );
  }, [
    selectedPriceRanges,
    selectedGenders,
    selectedMetals,
    selectedWeightRanges,
    selectedCategories,
    selectedPurities,
    isNewArrivals,
    categoryId,
  ]);

  // Get display name for category
  const categoryName = useMemo(() => {
    if (categoryId) {
      if (!categoryDetail) return "Loading Category...";
      return categoryDetail.category_name || categoryDetail.name || "Category Products";
    }

    if (categorySlug === "all") {
      if (selectedCategories.length > 0) {
        return selectedCategories
          .map((cat) => {
            const matched = AVAILABLE_CATEGORIES.find(
              (c) => c.slug === cat || c.slug === cat + "s" || cat === c.slug + "s"
            );
            return matched ? matched.name : cat.charAt(0).toUpperCase() + cat.slice(1);
          })
          .join(", ");
      }
      if (isNewArrivals) {
        return "New Arrivals";
      }
      return "All Jewellery";
    }

    switch (categorySlug) {
      case "all":
        return "All Jewellery";
      case "gold":
        return "Gold Jewellery";
      case "silver":
        return "Silver Jewellery";
      case "platinum":
        return "Platinum Jewellery";
      case "bangles-bracelets":
        return "Bangles & Bracelets";
      case "necklaces-pendants":
        return "Necklaces & Pendants";
      case "new-arrivals":
      case "latest-arrivals":
        return "New Arrivals";
      default:
        return categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    }
  }, [categoryId, categoryDetail, categorySlug, selectedCategories, isNewArrivals]);

  // Helper to update query string in router
  const updateUrl = (
    metals: string[],
    purities: string[],
    categoriesList: string[],
    prices: string[],
    weights: string[],
    gendersList: string[],
    sort: string,
    newArrivalsOnly: boolean
  ) => {
    const nextParams = new URLSearchParams();
    
    if (metals.length > 0) nextParams.set("metal", metals.join(","));
    if (purities.length > 0) nextParams.set("purity", purities.join(","));
    if (!categoryId && categoriesList.length > 0) nextParams.set("category", categoriesList.join(","));
    if (prices.length > 0) nextParams.set("priceRange", prices.join(","));
    if (weights.length > 0) nextParams.set("weightRange", weights.join(","));
    if (gendersList.length > 0) nextParams.set("gender", gendersList.join(","));
    if (sort !== "popular") nextParams.set("sort", sort);
    if (newArrivalsOnly) nextParams.set("newarrivals", "true");
    
    const queryString = nextParams.toString();
    const baseRedirect = categoryId ? `/category/${encodeId(categoryId)}` : `/${categorySlug}`;
    router.replace(`${baseRedirect}${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Slug Filter (Only for slug mode, not ID mode)
    if (!categoryId) {
      if (categorySlug === "gold") {
        result = result.filter((p) => (p.metal || "") === "gold");
      } else if (categorySlug === "silver") {
        result = result.filter((p) => (p.metal || "") === "silver");
      } else if (categorySlug === "platinum") {
        result = result.filter((p) => (p.metal || "") === "platinum");
      } else if (categorySlug === "new-arrivals" || categorySlug === "latest-arrivals") {
        result = [...products].reverse();
      } else if (categorySlug !== "all") {
        result = result.filter((p) => {
          const pc = (p.category || "").toLowerCase();
          const sc = categorySlug.toLowerCase();
          return pc === sc || pc === sc + "s" || sc === pc + "s" || pc.includes(sc);
        });
      }
    }

    // 2. Sidebar/Query Metal Filter
    if (selectedMetals.length > 0) {
      result = result.filter((p) => selectedMetals.includes(p.metal || ""));
    }

    // 3. Sidebar/Query Purity Filter
    if (selectedPurities.length > 0) {
      result = result.filter((p) =>
        selectedPurities.some((purity) => (p.purity || "").toLowerCase().includes(purity.toLowerCase()))
      );
    }

    // 4. Sidebar/Query Category Filter (Only for slug mode)
    if (!categoryId && selectedCategories.length > 0) {
      result = result.filter((p) => {
        return selectedCategories.some((cat) => {
          const pc = (p.category || "").toLowerCase();
          const c = cat.toLowerCase();
          return pc === c || pc === c + "s" || c === pc + "s" || pc.includes(c);
        });
      });
    }

    // 5. Checkbox Price Range Filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) => {
        return selectedPriceRanges.some((rangeId) => {
          const range = PRICE_RANGES.find((r) => r.id === rangeId);
          if (!range) return false;
          const price = p.price || p.totalprice || 0;
          return price >= range.min && price <= range.max;
        });
      });
    }

    // 6. Checkbox Weight Range Filter
    if (selectedWeightRanges.length > 0) {
      result = result.filter((p) => {
        return selectedWeightRanges.some((rangeId) => {
          const range = WEIGHT_RANGES.find((r) => r.id === rangeId);
          if (!range) return false;
          const weight = p.weight || p.grossWeight || 0;
          return weight >= range.min && weight <= range.max;
        });
      });
    }

    // 7. Checkbox Shop For (Gender) Filter
    if (selectedGenders.length > 0) {
      result = result.filter((p) => {
        return selectedGenders.some((genderId) => {
          const nameLower = (p.product_name || p.name || "").toLowerCase();
          if (genderId === "kids") {
            return nameLower.includes("kids") || nameLower.includes("baby") || nameLower.includes("stud");
          }
          if (genderId === "men") {
            return nameLower.includes("men") || nameLower.includes("band") || nameLower.includes("unisex");
          }
          if (genderId === "women") {
            return !nameLower.includes("kids") && !nameLower.includes("baby") && (nameLower.includes("earring") || nameLower.includes("ring") || nameLower.includes("mangalsutra") || nameLower.includes("bangle"));
          }
          return true;
        });
      });
    }

    // 8. Query New Arrivals Filter
    if (isNewArrivals) {
      result = [...result].reverse();
    }

    // 9. Sorting
    if (sortBy === "price-asc" || sortBy === "low-to-high") {
      result.sort((a, b) => (a.price || a.totalprice || 0) - (b.price || b.totalprice || 0));
    } else if (sortBy === "price-desc" || sortBy === "high-to-low") {
      result.sort((a, b) => (b.price || b.totalprice || 0) - (a.price || a.totalprice || 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [
    products,
    categoryId,
    categorySlug,
    selectedMetals,
    selectedPurities,
    selectedCategories,
    selectedPriceRanges,
    selectedWeightRanges,
    selectedGenders,
    sortBy,
    isNewArrivals,
  ]);

  const toggleMetal = (metal: string) => {
    const next = selectedMetals.includes(metal)
      ? selectedMetals.filter((m) => m !== metal)
      : [...selectedMetals, metal];
    setSelectedMetals(next);
    updateUrl(
      next,
      selectedPurities,
      selectedCategories,
      selectedPriceRanges,
      selectedWeightRanges,
      selectedGenders,
      sortBy,
      isNewArrivals
    );
  };

  const togglePurity = (purity: string) => {
    const next = selectedPurities.includes(purity)
      ? selectedPurities.filter((p) => p !== purity)
      : [...selectedPurities, purity];
    setSelectedPurities(next);
    updateUrl(
      selectedMetals,
      next,
      selectedCategories,
      selectedPriceRanges,
      selectedWeightRanges,
      selectedGenders,
      sortBy,
      isNewArrivals
    );
  };

  const toggleCategory = (catSlug: string) => {
    if (categoryId) return; // categoryId pages don't filter categories
    const next = selectedCategories.includes(catSlug)
      ? selectedCategories.filter((c) => c !== catSlug)
      : [...selectedCategories, catSlug];
    setSelectedCategories(next);
    updateUrl(
      selectedMetals,
      selectedPurities,
      next,
      selectedPriceRanges,
      selectedWeightRanges,
      selectedGenders,
      sortBy,
      isNewArrivals
    );
  };

  const togglePriceRange = (rangeId: string) => {
    const next = selectedPriceRanges.includes(rangeId)
      ? selectedPriceRanges.filter((id) => id !== rangeId)
      : [...selectedPriceRanges, rangeId];
    setSelectedPriceRanges(next);
    updateUrl(
      selectedMetals,
      selectedPurities,
      selectedCategories,
      next,
      selectedWeightRanges,
      selectedGenders,
      sortBy,
      isNewArrivals
    );
  };

  const toggleWeightRange = (rangeId: string) => {
    const next = selectedWeightRanges.includes(rangeId)
      ? selectedWeightRanges.filter((id) => id !== rangeId)
      : [...selectedWeightRanges, rangeId];
    setSelectedWeightRanges(next);
    updateUrl(
      selectedMetals,
      selectedPurities,
      selectedCategories,
      selectedPriceRanges,
      next,
      selectedGenders,
      sortBy,
      isNewArrivals
    );
  };

  const toggleGender = (genderId: string) => {
    const next = selectedGenders.includes(genderId)
      ? selectedGenders.filter((id) => id !== genderId)
      : [...selectedGenders, genderId];
    setSelectedGenders(next);
    updateUrl(
      selectedMetals,
      selectedPurities,
      selectedCategories,
      selectedPriceRanges,
      selectedWeightRanges,
      next,
      sortBy,
      isNewArrivals
    );
  };

  const toggleNewArrivals = (forceValue?: boolean) => {
    const next = forceValue !== undefined ? forceValue : !isNewArrivals;
    setIsNewArrivals(next);
    updateUrl(
      selectedMetals,
      selectedPurities,
      selectedCategories,
      selectedPriceRanges,
      selectedWeightRanges,
      selectedGenders,
      sortBy,
      next
    );
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateUrl(
      selectedMetals,
      selectedPurities,
      selectedCategories,
      selectedPriceRanges,
      selectedWeightRanges,
      selectedGenders,
      sort,
      isNewArrivals
    );
  };

  const resetFilters = () => {
    setSelectedMetals([]);
    setSelectedPurities([]);
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedWeightRanges([]);
    setSelectedGenders([]);
    setSortBy("popular");
    setIsNewArrivals(false);
    const baseRedirect = categoryId ? `/category/${encodeId(categoryId)}` : `/${categorySlug}`;
    router.replace(baseRedirect, { scroll: false });
  };

  return {
    categoryId,
    categorySlug,
    categoryName,
    selectedMetals,
    selectedPurities,
    selectedCategories,
    selectedPriceRanges,
    selectedWeightRanges,
    selectedGenders,
    sortBy,
    isNewArrivals,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen,
    filteredProducts,
    activeFiltersCount,
    toggleMetal,
    togglePurity,
    toggleCategory,
    togglePriceRange,
    toggleWeightRange,
    toggleGender,
    toggleNewArrivals,
    handleSortChange,
    resetFilters,
    isLoading,
  };
}
