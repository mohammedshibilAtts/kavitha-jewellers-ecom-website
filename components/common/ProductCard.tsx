"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Product as DbProduct } from "@/lib/api/types";
import { motion } from "framer-motion";

export interface ProductImageObject {
  thumbnail?: string;
  detail?: string;
  zoom?: string;
}

export interface CompatibleProduct {
  _id?: string;
  id?: number;
  name?: string;
  product_name?: string;
  price?: number;
  totalprice?: number;
  originalPrice?: number;
  discountper?: number;
  purity?: string;
  weight?: number;
  grossWeight?: number;
  images?: string[];
  product_image: (string | ProductImageObject)[];
  category?: string;
  description?: string;
  metal?: string;
  bestSeller?: boolean;
  currentMetalRate?: number;
  priceBreakup?: any;
  rating?: number;
  pathurl?: string;
}

interface ProductCardProps {
  product: CompatibleProduct;
  className?: string;
  index?: number;
}

import { encodeId } from "@/lib/utils/obfuscate";

export default function ProductCard({ product, className = "", index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Resolve database vs mock product properties
  const id = product._id || product.id || "";
  const name = product.product_name || product.name || "Product Name";
  const price = product.price || product.totalprice || 0;
  const originalPrice = product.originalPrice || price;
  const discountper = product.discountper || 0;
  const purity = product.purity || "22kt";
  const weight = product.weight || product.grossWeight || 0;

  let imageSrc = "/images/placeholder.png";
  if (product.images && product.images[0]) {
    imageSrc = product.images[0];
  } else if (product.product_image && product.product_image[0]) {
    const pimg = product.product_image[0];
    const pathurl = product.pathurl || "";
    if (typeof pimg === "string") {
      imageSrc = pimg;
    } else {
      const detailFile = pimg.detail || pimg.thumbnail || pimg.zoom;
      imageSrc = detailFile ? `${pathurl}${detailFile}` : "/images/placeholder.png";
    }
  }

  // Guard against invalid/relative URLs for Next.js Image loader
  if (imageSrc) {
    if (!imageSrc.startsWith("/") && !imageSrc.startsWith("http://") && !imageSrc.startsWith("https://")) {
      // If it looks like an absolute S3 path without protocol, prefix it or default it
      imageSrc = "/images/placeholder.png";
    }
  } else {
    imageSrc = "/images/placeholder.png";
  }



  const hasDiscount = discountper > 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Only apply stagger delay to the first row of visible cards (8 items) to ensure smooth initial load, 
  // while allowing scrolled/subsequent items to render instantly without delay.
  const staggerDelay = index < 8 ? index * 0.03 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay: staggerDelay
      }}
      whileHover={{ y: -6 }}
      className={`flex flex-col shrink-0 snap-start ${className}`}
    >
      <Link
        href={`/product/${encodeId(String(id))}`}
        className="group flex flex-col w-full h-full"
      >
        {/* 1. Image Viewport */}
        <div className="bg-[#FAF7F2]/40 aspect-square flex items-center justify-center relative p-4 overflow-hidden border-b border-[#F2EAE0]/30">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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
              {purity} • {weight}g
            </span>

            {/* Product Name */}
            <h3 className="font-semibold text-[11px] md:text-xs  line-clamp-1 mt-0.5 uppercase tracking-wide group-hover:text-primary transition-colors leading-tight">
              {name}
            </h3>
          </div>

          <div className="flex flex-col gap-1.5 ">
            {/* Pricing Info */}
            <div className="flex items-baseline justify-between ">
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-[#232323] text-xs md:text-sm">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                {hasDiscount && (
                  <span className="text-[12px] text-primary font-semibold">
                    {`(${discountper}% OFF)`}
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
