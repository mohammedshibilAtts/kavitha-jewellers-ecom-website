"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export default function ProductCard({ product, className = "", index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const hasDiscount = product.discountper;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 0.8,
        delay: index * 0.05
      }}
      whileHover={{ y: -6 }}
      className={`flex flex-col  shrink-0 snap-start ${className}`}
    >
      <Link
        href={`/product/${product.id}`}
        className="group flex flex-col w-full h-full"
      >
        {/* 1. Image Viewport */}
        <div className="bg-[#FAF7F2]/40 aspect-square flex items-center justify-center relative p-4 overflow-hidden border-b border-[#F2EAE0]/30">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />

          {/* Heart/Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-3 bg-white rounded-[8px] p-1.5 hover:text-red-400 z-10 cursor-pointer"
            aria-label="Add to wishlist"
          >
            <Heart size={20} strokeWidth={1.6} className={`text-[#DA0000] transition-transform duration-200 group-hover:scale-105 ${isWishlisted ? "fill-[#DA0000] text-[#DA0000]" : "text-black"} `} />
          </button>
        </div>

        {/* 2. Product Details */}
        <div className="p-3.5 flex flex-col gap-1.5 flex-1 justify-between">
          <div className="flex flex-col gap-1">
            {/* Metal purity and weight */}
            <span className="text-[10px] font-medium  text-primary uppercase tracking-wider leading-none">
              {product.purity} • {product.weight}g
            </span>

            {/* Product Name */}
            <h3 className="font-semibold text-[11px] md:text-xs  line-clamp-1 mt-0.5 uppercase tracking-wide group-hover:text-primary transition-colors leading-tight">
              {product.name}
            </h3>
          </div>

          <div className="flex flex-col gap-1.5 ">
            {/* Pricing Info */}
            <div className="flex items-baseline justify-between ">
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-[#232323] text-xs md:text-sm">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {hasDiscount && (
                  <span className="text-[12px] text-primary font-semibold">
                    {`(${product.discountper}% OFF)`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
