import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/data/products";

interface ProductListGridProps {
  products: Product[];
  resetFilters: () => void;
}

export default function ProductListGrid({ products, resetFilters }: ProductListGridProps) {
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
