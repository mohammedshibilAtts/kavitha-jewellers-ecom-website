import React from "react";
import FilterContent from "./FilterContent";

interface FilterSidebarProps {
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
  activeFiltersCount: number;
}

export default function FilterSidebar({
  activeFiltersCount,
  resetFilters,
  ...props
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-bg-custom rounded-xl p-5 shadow-[0_2px_15px_rgba(0,0,0,0.01)] sticky top-[160px] max-h-[calc(100vh-200px)]">
      {/* Header aligned with the top of sidebar - shrink-0 to prevent shrinking */}
      <div className="flex items-center justify-between pb-4 border-b border-[#DADADA] mb-4 shrink-0">
        <span className="text-[13px] font-bold uppercase tracking-wider text-normal flex items-center gap-1.5">
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-neutral-100 text-normal text-[10px] font-semibold px-1.5 py-0.5 rounded-sm border border-[#DADADA]">
              {activeFiltersCount < 10 ? `0${activeFiltersCount}` : activeFiltersCount}
            </span>
          )}
        </span>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-[12px] font-semibold text-[#632C2F] hover:opacity-85 transition-opacity uppercase tracking-wider underline-offset-4 cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Scrollable Filters List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth">
        <FilterContent {...props} resetFilters={resetFilters} showResetButton={false} />
      </div>
    </aside>
  );
}
