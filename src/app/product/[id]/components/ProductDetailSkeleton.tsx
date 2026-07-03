import React from "react";

export default function ProductDetailSkeleton() {
  return (
    <div className="bg-bg-custom min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb skeleton */}
        <div className="w-48 h-4 bg-neutral-200/70 animate-pulse rounded mb-6"></div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 animate-pulse">
          {/* Left Column: Gallery Skeleton */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Main image skeleton */}
            <div className="bg-neutral-200/60 aspect-square rounded-sm w-full"></div>
            {/* Thumbnails row skeleton */}
            <div className="flex gap-4 mt-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[80px] h-[80px] rounded-sm bg-neutral-200/60"></div>
              ))}
            </div>
          </div>

          {/* Right Column: Purchasing Info Skeleton */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Title & SKU */}
            <div className="flex flex-col gap-2">
              <div className="w-2/3 h-7 bg-neutral-200/70 rounded"></div>
              <div className="w-32 h-3 bg-neutral-200/60 rounded"></div>
            </div>

            {/* Pricing */}
            <div className="flex flex-col gap-2">
              <div className="w-40 h-8 bg-neutral-200/70 rounded"></div>
              <div className="w-36 h-3 bg-neutral-200/60 rounded"></div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <div className="w-[180px] h-[42px] bg-neutral-200/70 rounded-sm"></div>
              <div className="w-[42px] h-[42px] bg-neutral-200/60 rounded-sm"></div>
            </div>

            {/* Check Delivery */}
            <div className="flex flex-col gap-2.5 max-w-[360px] mt-2">
              <div className="w-24 h-3 bg-neutral-200/60 rounded"></div>
              <div className="flex gap-2">
                <div className="flex-1 h-9 bg-neutral-200/60 rounded-sm"></div>
                <div className="w-24 h-9 bg-neutral-200/60 rounded-sm"></div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="w-20 h-4 bg-neutral-200/70 rounded"></div>
              <div className="w-full h-3 bg-neutral-200/60 rounded"></div>
              <div className="w-5/6 h-3 bg-neutral-200/60 rounded"></div>
            </div>

            {/* Spec Capsules */}
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-7 bg-neutral-200/60 rounded-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
