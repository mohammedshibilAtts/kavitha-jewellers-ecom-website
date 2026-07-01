"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SliderImage {
  src: string;
  alt: string;
}

interface HeroSliderProps {
  images: SliderImage[];
  autoplayInterval?: number; // in ms
  aspectRatio?: string; // e.g. "1352/646"
  className?: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : direction > 0 ? "-100%" : 0,
    opacity: 0,
  }),
};

export default function HeroSlider({
  images,
  autoplayInterval = 5000,
  aspectRatio = "1352/646",
  className = "",
}: HeroSliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const currentIndex = ((page % images.length) + images.length) % images.length;

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setPage(([prevPage]) => [prevPage + 1, 1]);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [page, images.length, autoplayInterval]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    const dir = index > currentIndex ? 1 : -1;
    setPage([page + (index - currentIndex), dir]);
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50; // distance in px
    const velocityThreshold = 500; // speed in px/s

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      // Swiped left -> next
      setPage(([prevPage]) => [prevPage + 1, 1]);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      // Swiped right -> prev
      setPage(([prevPage]) => [prevPage - 1, -1]);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-neutral-100/50 shadow-xs bg-[#FFFCFC] ${className}`}
      style={{ aspectRatio }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 select-none cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            priority={currentIndex === 0}
            className="object-contain object-center pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Carousel Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
