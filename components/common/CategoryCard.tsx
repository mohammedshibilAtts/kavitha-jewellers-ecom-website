"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  category: {
    name: string;
    image: string;
  };
  className?: string;
}

export default function CategoryCard({ category, className = "" }: CategoryCardProps) {
  // Generate category slug automatically: e.g. "Necklaces & Pendants" -> "necklaces-pendants"
  const slug = category.name
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/ and /g, "-")
    .replace(/\s+/g, "-");

  return (
    <Link
      href={`/${slug}`}
      className={`group flex flex-col items-center gap-2 cursor-pointer ${className}`}
    >
      {/* Category Image Box */}
      <div className="w-full aspect-square rounded-2xl  relative ">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-contain p-4 rounded-3xl transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 15vw"

        />
      </div>

      {/* Category Name */}
      <span className="font-semibold text-center text-[11px] md:text-xs text-neutral-800 group-hover:text-primary transition-colors leading-tight uppercase tracking-wider">
        {category.name}
      </span>
    </Link>
  );
}
