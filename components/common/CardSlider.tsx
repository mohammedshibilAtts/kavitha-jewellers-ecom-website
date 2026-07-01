"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import SliderNavigation from "./SliderNavigation";

interface CardSliderProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function CardSlider({
  title,
  subtitle,
  children,
  className = "",
}: CardSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    updateScrollButtons();
    // Add window resize listener to update scroll button visibility state
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [children]);

  return (
    <section className={`max-w-7xl mx-auto px-4 md:px-8 py-8 w-full flex flex-col gap-8 relative ${className}`}>
      <div className="relative w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-1 mx-auto text-center"
        >
          <h2 className="font-sans text-xl md:text-2xl font-bold text-title">{title}</h2>
          {subtitle && (
            <p className="text-[11px] text-subtitle">{subtitle}</p>
          )}
        </motion.div>
      </div>

      {/* Scrolling Container Wrapper */}
      <div className="relative w-full">
        {/* Navigation Arrows */}
        <div className="absolute -top-4 right-0 z-20 flex items-center gap-1.5">
          <SliderNavigation
            onPrev={() => scroll("left")}
            onNext={() => scroll("right")}
            prevDisabled={!canScrollLeft}
            nextDisabled={!canScrollRight}
          />
        </div>

        {/* Scrolling Container */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth gap-4 md:gap-6 mt-2 pt-2 pb-2 w-full snap-x snap-mandatory" 
        >
          {children}
        </div>
      </div>
    </section>
  );
}
