import React, { useState } from "react";
import { RotateCcw, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AVAILABLE_CATEGORIES,
  PRICE_RANGES,
  WEIGHT_RANGES,
  GENDERS,
} from "@/lib/hooks/useCategoryFilters";

interface FilterContentProps {
  categorySlug: string;
  selectedMetals: string[];
  selectedPurities: string[];
  selectedCategories: string[];
  selectedPriceRanges: string[];
  selectedWeightRanges: string[];
  selectedGenders: string[];
  isNewArrivals: boolean;
  toggleMetal: (metal: string) => void;
  togglePurity: (purity: string) => void;
  toggleCategory: (category: string) => void;
  togglePriceRange: (rangeId: string) => void;
  toggleWeightRange: (rangeId: string) => void;
  toggleGender: (genderId: string) => void;
  toggleNewArrivals: () => void;
  handleSortChange: (sort: string) => void;
  resetFilters: () => void;
  showResetButton?: boolean;
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  options: { id: string; label: string }[];
  selectedValues: string[];
  onOptionToggle: (id: string) => void;
  className?: string;
}

function FilterSection({
  title,
  isExpanded,
  onToggle,
  options,
  selectedValues,
  onOptionToggle,
  className = "py-4",
}: FilterSectionProps) {
  return (
    <div className={`border-b border-[#DADADA] ${className}`}>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-[13px] font-semibold uppercase tracking-wider text-normal hover:text-[#632C2F] transition-colors py-1 cursor-pointer"
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: "hidden" }}
          >
            <div className="flex flex-col gap-2.5 mt-3.5 pl-0.5 pb-2">
              {options.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2.5 text-sm font-medium text-[#000000CC] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(opt.id)}
                    onChange={() => onOptionToggle(opt.id)}
                    className="accent-[#632C2F] w-4 h-4 border-neutral-300 rounded focus:ring-[#632C2F]/20 cursor-pointer"
                  />
                  <span className="hover:text-[#632C2F] transition-colors">{opt.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterContent({
  categorySlug,
  selectedMetals,
  selectedPurities,
  selectedCategories,
  selectedPriceRanges,
  selectedWeightRanges,
  selectedGenders,
  toggleMetal,
  togglePurity,
  toggleCategory,
  togglePriceRange,
  toggleWeightRange,
  toggleGender,
  resetFilters,
  showResetButton = false,
}: FilterContentProps) {
  // Local accordion state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    gender: true,
    metal: true,
    weight: true,
    category: false,
    purity: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const showMetalSection =
    categorySlug !== "gold" && categorySlug !== "silver" && categorySlug !== "platinum";

  const showSubCategorySection = [
    "all",
    "gold",
    "silver",
    "platinum",
    "new-arrivals",
    "latest-arrivals",
  ].includes(categorySlug);

  return (
    <div className="flex flex-col font-sans select-none text-neutral-800">
      {showResetButton && (
        <div className="flex items-center justify-between pb-4 border-b mb-5">
          <span className="font-bold uppercase tracking-wider text-neutral-500">Filters</span>
          <button
            onClick={resetFilters}
            className="text-[10px] font-bold text-[#632C2F] hover:opacity-85 transition-opacity flex items-center gap-1 uppercase tracking-wider"
          >
            <RotateCcw size={10} />
            Clear All
          </button>
        </div>
      )}

      {/* 1. Price */}
      <FilterSection
        title="Price"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection("price")}
        options={PRICE_RANGES}
        selectedValues={selectedPriceRanges}
        onOptionToggle={togglePriceRange}
        className="pb-4"
      />

      {/* 2. Shop For (Gender) */}
      <FilterSection
        title="Shop For"
        isExpanded={expandedSections.gender}
        onToggle={() => toggleSection("gender")}
        options={GENDERS}
        selectedValues={selectedGenders}
        onOptionToggle={toggleGender}
      />

      {/* 3. Metal */}
      {showMetalSection && (
        <FilterSection
          title="Metal"
          isExpanded={expandedSections.metal}
          onToggle={() => toggleSection("metal")}
          options={["gold", "silver", "platinum"].map((metal) => ({
            id: metal,
            label: metal.charAt(0).toUpperCase() + metal.slice(1),
          }))}
          selectedValues={selectedMetals}
          onOptionToggle={toggleMetal}
        />
      )}

      {/* 4. Weight */}
      <FilterSection
        title="Weight"
        isExpanded={expandedSections.weight}
        onToggle={() => toggleSection("weight")}
        options={WEIGHT_RANGES}
        selectedValues={selectedWeightRanges}
        onOptionToggle={toggleWeightRange}
      />

      {/* 5. Sub Category */}
      {showSubCategorySection && (
        <FilterSection
          title="Sub Category"
          isExpanded={expandedSections.category}
          onToggle={() => toggleSection("category")}
          options={AVAILABLE_CATEGORIES.map((cat) => ({
            id: cat.slug,
            label: cat.name,
          }))}
          selectedValues={selectedCategories}
          onOptionToggle={toggleCategory}
        />
      )}

      {/* 6. Purity */}
      <FilterSection
        title="Purity"
        isExpanded={expandedSections.purity}
        onToggle={() => toggleSection("purity")}
        options={["22KT", "18KT", "999"].map((purity) => ({
          id: purity,
          label: purity,
        }))}
        selectedValues={selectedPurities}
        onOptionToggle={togglePurity}
        className="py-4 mb-4"
      />
    </div>
  );
}
