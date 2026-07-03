"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export interface CompatibleCategory {
  _id: string;
  name?: string;
  category_name?: string;
  image?: string;
  categoryBanner?: string;
  isActive?: boolean;
  pathurl?: string
}

interface CategoryCardProps {
  category: CompatibleCategory;
  className?: string;
  index?: number;
}

import { encodeId } from "@/lib/utils/obfuscate";

export default function CategoryCard({ category, className = "", index = 0 }: CategoryCardProps) {
  const name = category.name || category.category_name || "Category";
  const pathurl = category.pathurl || "";
  const imageSrc = category.image ? `${pathurl}${category.image}` : "/images/placeholder.png";

  // Generate category slug automatically: e.g. "Necklaces & Pendants" -> "necklaces-pendants"
  const slug = name
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/ and /g, "-")
    .replace(/\s+/g, "-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.6,
        delay: index * 0.05
      }}
      whileHover={{ y: -4 }}
      className={className}
    >
      <Link
        href={`/category/${encodeId(category._id)}`}
        className="group flex flex-col items-center gap-2 cursor-pointer w-full"
      >
        {/* Category Image Box */}
        <div className="w-full aspect-square rounded-2xl  relative ">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-contain p-4 rounded-3xl transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"
          />
        </div>

        {/* Category Name */}
        <span className="font-semibold text-center text-[11px] md:text-xs text-neutral-800 group-hover:text-primary transition-colors leading-tight uppercase tracking-wider">
          {name}
        </span>
      </Link>
    </motion.div>
  );
}
