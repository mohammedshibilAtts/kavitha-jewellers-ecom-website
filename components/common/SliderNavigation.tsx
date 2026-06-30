"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderNavigationProps {
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
}

export default function SliderNavigation({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  className = "",
}: SliderNavigationProps) {
  return (
    <div className={`flex items-center gap-1.5 z-10 ${className}`}>
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        className={`p-1.5 border bg-[#FAF6EE] border-gray-200 rounded-full text-[#232323] transition-colors ${
          prevDisabled ? "opacity-30 cursor-not-allowed" : "hover:border-gray-400 cursor-pointer"
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`p-1.5 border bg-[#FAF6EE] border-gray-200 rounded-full text-[#232323] transition-colors ${
          nextDisabled ? "opacity-30 cursor-not-allowed" : "hover:border-gray-400 cursor-pointer"
        }`}
        aria-label="Next slide"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
