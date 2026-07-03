"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSchemes } from "@/lib/hooks/useScheme";

export default function SchemesSlider() {
  const { data: schemes, isLoading } = useSchemes();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSchemes = schemes || [];

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || activeSchemes.length === 0) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 300;
    const gap = 24; // md:gap-6
    const step = cardWidth + gap;
    const index = Math.round(el.scrollLeft / step);
    setActiveIndex(index % activeSchemes.length);
  };

  const scrollToSlide = (index: number) => {
    const el = scrollRef.current;
    if (!el || activeSchemes.length === 0) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 300;
    const gap = 24;
    const step = cardWidth + gap;
    el.scrollTo({ left: index * step, behavior: "smooth" });
    setActiveIndex(index % activeSchemes.length);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isHovered || activeSchemes.length <= 1) return;

    const interval = setInterval(() => {
      const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 300;
      const gap = 24;
      const step = cardWidth + gap;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        setActiveIndex(0);
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, activeSchemes]);

  if (isLoading || activeSchemes.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 w-full py-8 relative flex flex-col gap-6 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center w-full"
      >
        <h2 className="font-sans text-xl md:text-2xl font-bold text-title">Join Our Schemes</h2>
        <p className="text-[11px] text-subtitle">Discover our gold and silver purchase plans</p>
      </motion.div>

      {/* Auto-scrolling schemes container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex overflow-x-auto overflow-y-hidden gap-4 md:gap-6 pt-2 pb-2 w-full justify-start snap-x snap-mandatory scrollbar-hide"
      >
        {[...activeSchemes, ...activeSchemes].map((scheme, index) => (
          <motion.div
            key={`${scheme._id}-${index}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-[85vw] sm:w-[45vw] md:w-[31.5%] lg:w-[31.5%] shrink-0 snap-start overflow-hidden rounded-2xl border border-neutral-100/50 shadow-xs bg-[#FFFCFC]"
            style={{ aspectRatio: "24/10" }}
          >
            <Image
              src={`${scheme.pathurl}${scheme.logo}`}
              alt={scheme.scheme_name}
              fill
              className="object-cover object-center pointer-events-none"
              unoptimized
            />
          </motion.div>
        ))}
      </div>

      {/* Dots Navigation */}
      {activeSchemes.length > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-2 z-20">
          {activeSchemes.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-4 bg-primary" : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
