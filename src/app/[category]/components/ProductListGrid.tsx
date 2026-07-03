import React, { useState, useEffect, useRef } from "react";
import ProductCard, { CompatibleProduct } from "@/components/common/ProductCard";

interface ProductListGridProps {
  products: CompatibleProduct[];
  resetFilters: () => void;
}

export default function ProductListGrid({ products, resetFilters }: ProductListGridProps) {
  // Batch size: 12 items represent 3 rows in 4-column layout, 4 rows in 3-column layout
  const BATCH_SIZE = 1200;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset pagination count whenever products/filters change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [products]);

  // Load next batch when user scrolls near the bottom
  useEffect(() => {
    if (visibleCount >= products.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, products.length));
        }
      },
      { rootMargin: "200px" } // Pre-load next items 200px before they enter view
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [visibleCount, products.length]);

  if (products.length === 0) {
    return (
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
    );
  }

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {visibleProducts.map((product, index) => (
          <ProductCard key={product._id || product.id || index} product={product} index={index} />
        ))}
      </div>

      {/* Sentinel element to trigger load of subsequent rows */}
      {visibleCount < products.length && (
        <div ref={sentinelRef} className="w-full h-8 flex items-center justify-center py-2">
          <div className="w-5 h-5 border-2 border-[#632C2F] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
