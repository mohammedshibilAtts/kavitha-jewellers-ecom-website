"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal, ArrowUpDown, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/common/ProductCard";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = (params.category as string) || "all";

  // Filter States
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedPurities, setSelectedPurities] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(150000);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Get display name for category
  const categoryName = useMemo(() => {
    switch (categorySlug) {
      case "all":
        return "All Jewellery";
      case "gold":
        return "Gold Jewellery";
      case "silver":
        return "Silver Jewellery";
      case "bangles-bracelets":
        return "Bangles & Bracelets";
      case "necklaces-pendants":
        return "Necklaces & Pendants";
      default:
        return categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    }
  }, [categorySlug]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (categorySlug === "gold") {
      result = result.filter((p) => p.metal === "gold");
    } else if (categorySlug === "silver") {
      result = result.filter((p) => p.metal === "silver");
    } else if (categorySlug !== "all") {
      result = result.filter((p) => p.category === categorySlug);
    }

    // 2. Metal Filter
    if (selectedMetals.length > 0) {
      result = result.filter((p) => selectedMetals.includes(p.metal));
    }

    // 3. Purity Filter
    if (selectedPurities.length > 0) {
      result = result.filter((p) =>
        selectedPurities.some((purity) => p.purity.toLowerCase().includes(purity.toLowerCase()))
      );
    }

    // 4. Price Filter
    result = result.filter((p) => p.price <= maxPrice);

    // 5. Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [categorySlug, selectedMetals, selectedPurities, maxPrice, sortBy]);

  const toggleMetal = (metal: string) => {
    setSelectedMetals((prev) =>
      prev.includes(metal) ? prev.filter((m) => m !== metal) : [...prev, metal]
    );
  };

  const togglePurity = (purity: string) => {
    setSelectedPurities((prev) =>
      prev.includes(purity) ? prev.filter((p) => p !== purity) : [...prev, purity]
    );
  };

  const resetFilters = () => {
    setSelectedMetals([]);
    setSelectedPurities([]);
    setMaxPrice(150000);
    setSortBy("popular");
  };

  return (
    <div className="bg-bg-custom min-h-screen py-6 select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={10} strokeWidth={2.5} />
          <span className="text-neutral-700">{categoryName}</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-title uppercase tracking-wider">{categoryName}</h1>
            <p className="text-[11px] text-subtitle mt-0.5">{filteredProducts.length} items found</p>
          </div>

          {/* Sorting and Mobile Filter Trigger */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="lg:hidden flex-1 flex items-center justify-center gap-2 border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold rounded-[6px] text-neutral-700 active:bg-neutral-50 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            <div className="flex-1 md:flex-initial flex items-center gap-2 border border-neutral-200 bg-white px-3 py-1.5 rounded-[6px] text-xs font-semibold text-neutral-700">
              <ArrowUpDown size={14} className="text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-xs pr-1"
              >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 bg-white border border-neutral-100 rounded-xl p-5 shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-title">Filters</span>
              <button
                onClick={resetFilters}
                className="text-[10px] font-bold text-primary hover:opacity-80 transition-opacity flex items-center gap-1 uppercase tracking-wider"
              >
                <RotateCcw size={10} />
                Reset
              </button>
            </div>

            {/* Filter Section: Metal */}
            <div className="mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-3">Metal Type</h3>
              <div className="flex flex-col gap-2">
                {["gold", "silver"].map((metal) => (
                  <label key={metal} className="flex items-center gap-2.5 text-xs font-semibold text-neutral-600 cursor-pointer capitalize">
                    <input
                      type="checkbox"
                      checked={selectedMetals.includes(metal)}
                      onChange={() => toggleMetal(metal)}
                      className="accent-primary w-3.5 h-3.5 border-neutral-300 rounded focus:ring-primary/20"
                    />
                    {metal}
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: Purity */}
            <div className="mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-3">Purity</h3>
              <div className="flex flex-col gap-2">
                {["22KT", "18KT", "999"].map((purity) => (
                  <label key={purity} className="flex items-center gap-2.5 text-xs font-semibold text-neutral-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPurities.includes(purity)}
                      onChange={() => togglePurity(purity)}
                      className="accent-primary w-3.5 h-3.5 border-neutral-300 rounded focus:ring-primary/20"
                    />
                    {purity}
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: Price Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Max Price</h3>
                <span className="text-[11px] font-bold text-primary">₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={150000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-neutral-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-semibold text-neutral-400 mt-1 uppercase tracking-wider">
                <span>₹2K</span>
                <span>₹150K</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 w-full">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="w-full bg-white border border-neutral-100 rounded-xl p-12 text-center shadow-[0_2px_15px_rgba(0,0,0,0.01)] flex flex-col items-center gap-3">
                <span className="text-neutral-400 text-3xl">💎</span>
                <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider">No Products Found</h3>
                <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                  We couldn't find any products matching your filters. Try selecting a different range or resetting all filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-2 bg-primary hover:opacity-90 text-white font-bold text-[10px] md:text-xs tracking-wider px-5 py-2 rounded-full transition-all uppercase shadow-md active:scale-95"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Mobile Filters Drawer */}
        {isMobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-[110] flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <div className="relative w-4/5 max-w-sm h-full bg-bg-custom shadow-2xl flex flex-col p-6 z-50 animate-slide-in border-r border-neutral-100">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-title">Filters</span>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400"
                >
                  ✕
                </button>
              </div>

              {/* Mobile Drawer Filter Content */}
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-6">
                {/* Metal Type */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-3">Metal Type</h3>
                  <div className="flex flex-col gap-2.5">
                    {["gold", "silver"].map((metal) => (
                      <label key={metal} className="flex items-center gap-2.5 text-xs font-semibold text-neutral-600 cursor-pointer capitalize">
                        <input
                          type="checkbox"
                          checked={selectedMetals.includes(metal)}
                          onChange={() => toggleMetal(metal)}
                          className="accent-primary w-4 h-4 border-neutral-300 rounded"
                        />
                        {metal}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Purity */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-3">Purity</h3>
                  <div className="flex flex-col gap-2.5">
                    {["22KT", "18KT", "999"].map((purity) => (
                      <label key={purity} className="flex items-center gap-2.5 text-xs font-semibold text-neutral-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPurities.includes(purity)}
                          onChange={() => togglePurity(purity)}
                          className="accent-primary w-4 h-4 border-neutral-300 rounded"
                        />
                        {purity}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Max Price</h3>
                    <span className="text-[11px] font-bold text-primary">₹{maxPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={150000}
                    step={5000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-neutral-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-semibold text-neutral-400 mt-1 uppercase tracking-wider">
                    <span>₹2K</span>
                    <span>₹150K</span>
                  </div>
                </div>
              </div>

              {/* Mobile Drawer Footer Actions */}
              <div className="pt-4 border-t border-neutral-100 mt-6 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold text-[10px] md:text-xs tracking-wider py-2.5 rounded-full transition-all uppercase"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 bg-primary hover:opacity-90 text-white font-bold text-[10px] md:text-xs tracking-wider py-2.5 rounded-full transition-all uppercase shadow-md"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
