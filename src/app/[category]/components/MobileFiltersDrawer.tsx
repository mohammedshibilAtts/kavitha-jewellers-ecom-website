import React from "react";
import FilterContent from "./FilterContent";

interface MobileFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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
}

export default function MobileFiltersDrawer({
  isOpen,
  onClose,
  ...filterProps
}: MobileFiltersDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-[110] flex">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-4/5 max-w-sm h-full bg-bg-custom shadow-2xl flex flex-col p-6 z-50 animate-slide-in border-r border-neutral-100">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-title">Filters</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400"
          >
            ✕
          </button>
        </div>

        {/* Mobile Drawer Filter Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <FilterContent
            {...filterProps}
          />
        </div>

        {/* Mobile Drawer Footer Actions */}
        <div className="pt-4 border-t border-neutral-100 mt-6 flex gap-3">
          <button
            onClick={filterProps.resetFilters}
            className="flex-1 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold text-[10px] md:text-xs tracking-wider py-2.5 rounded-full transition-all uppercase"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-primary hover:opacity-90 text-white font-bold text-[10px] md:text-xs tracking-wider py-2.5 rounded-full transition-all uppercase shadow-md"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
