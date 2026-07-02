"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { useCategoryFilters } from "./hooks/useCategoryFilters";
import FilterSidebar from "./components/FilterSidebar";
import MobileFiltersDrawer from "./components/MobileFiltersDrawer";
import ProductListGrid from "./components/ProductListGrid";

function CategoryPageContent() {
  const {
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
  } = useCategoryFilters();

  // Local state for tabs that aren't mapped to products data (e.g. Quick Delivery, Recently Viewed, Store Pickup)
  const [activeExtraTab, setActiveExtraTab] = useState<string>("");

  const handleTabClick = (tabId: string) => {
    setActiveExtraTab("");
    if (tabId === "new-arrivals") {
      toggleNewArrivals(true);
    } else if (tabId === "best-seller") {
      toggleNewArrivals(false);
      handleSortChange("popular");
    } else if (tabId === "all") {
      resetFilters();
    } else {
      // For quick-delivery, recently-viewed, store-pickup
      toggleNewArrivals(false);
      setActiveExtraTab(tabId);
    }
  };

  const isTabActive = (tabId: string) => {
    if (tabId === "new-arrivals") return isNewArrivals;
    if (tabId === "best-seller") return !isNewArrivals && sortBy === "popular" && !activeExtraTab;
    if (tabId === "all") return !isNewArrivals && activeFiltersCount === 0 && !activeExtraTab;
    return activeExtraTab === tabId;
  };

  return (
    <div className="bg-bg-custom min-h-screen py-6 select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">


        {/* 1. Top Horizontal Tab Bar */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {[
            { label: "New Arrivals", id: "new-arrivals" },
            { label: "Best Seller", id: "best-seller" },
            { label: "Quick Delivery", id: "quick-delivery" },
            { label: "Recently Viewed", id: "recently-viewed" },
            { label: "Store Pickup", id: "store-pickup" },
            { label: "All", id: "all" },
          ].map((tab) => {
            const active = isTabActive(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`text-[10px] md:text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-[4px] transition-all cursor-pointer ${active
                    ? "bg-[#632C2F] text-white shadow-sm"
                    : "bg-white border border-neutral-200 text-neutral-600 hover:border-[#632C2F] hover:text-[#632C2F]"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3. Sidebar + Grid Layout */}
        <div className="flex gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <FilterSidebar
            categorySlug={categorySlug}
            selectedMetals={selectedMetals}
            selectedPurities={selectedPurities}
            selectedCategories={selectedCategories}
            selectedPriceRanges={selectedPriceRanges}
            selectedWeightRanges={selectedWeightRanges}
            selectedGenders={selectedGenders}
            isNewArrivals={isNewArrivals}
            toggleMetal={toggleMetal}
            togglePurity={togglePurity}
            toggleCategory={toggleCategory}
            togglePriceRange={togglePriceRange}
            toggleWeightRange={toggleWeightRange}
            toggleGender={toggleGender}
            toggleNewArrivals={toggleNewArrivals}
            handleSortChange={handleSortChange}
            resetFilters={resetFilters}
            activeFiltersCount={activeFiltersCount}
          />

          {/* Product Grid */}
          <main className="flex-1 w-full">
            {/* Sorting Dropdown row aligned with top of sidebar */}
            <div className="flex items-center justify-between lg:justify-end gap-4 pb-4 border-b border-neutral-100 mb-6">
              {/* Mobile-only Filter Trigger */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center justify-center gap-2 border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold rounded-[6px] text-neutral-700 active:bg-neutral-50 transition-colors"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 border border-neutral-200 bg-white px-3 py-1.5 rounded-[4px] text-xs font-semibold text-neutral-700 min-w-[180px]">
                <span className="text-neutral-400 font-medium">Sort by:</span>
                <select
                  value={sortBy === "price-asc" ? "low-to-high" : sortBy === "price-desc" ? "high-to-low" : sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer text-xs pr-1 font-bold text-neutral-800 flex-1"
                >
                  <option value="popular">Popularity</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            <ProductListGrid
              products={filteredProducts}
              resetFilters={resetFilters}
            />
          </main>
        </div>

        {/* Mobile Filters Drawer */}
        <MobileFiltersDrawer
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
          categorySlug={categorySlug}
          selectedMetals={selectedMetals}
          selectedPurities={selectedPurities}
          selectedCategories={selectedCategories}
          selectedPriceRanges={selectedPriceRanges}
          selectedWeightRanges={selectedWeightRanges}
          selectedGenders={selectedGenders}
          isNewArrivals={isNewArrivals}
          toggleMetal={toggleMetal}
          togglePurity={togglePurity}
          toggleCategory={toggleCategory}
          togglePriceRange={togglePriceRange}
          toggleWeightRange={toggleWeightRange}
          toggleGender={toggleGender}
          toggleNewArrivals={toggleNewArrivals}
          handleSortChange={handleSortChange}
          resetFilters={resetFilters}
        />
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="bg-bg-custom min-h-screen py-12 flex items-center justify-center font-sans select-none">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Loading Collection...</p>
        </div>
      </div>
    }>
      <CategoryPageContent />
    </Suspense>
  );
}
