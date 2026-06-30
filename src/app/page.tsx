"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Gem, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  const categories = [
    { name: "Rings", image: "/images/categories/rings.png" },
    { name: "Earrings", image: "/images/categories/earrings.png" },
    { name: "Necklaces & Pendants", image: "/images/categories/necklaces.png" },
    { name: "Bangles and Bracelets", image: "/images/categories/bangles.png" },
    { name: "Solitaire", image: "/images/categories/solitaire.png" },
    { name: "Mangalsutra", image: "/images/categories/mangalsutra.png" },
  ];

  // Latest Arrivals (10 products)
  const latestArrivals = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: "Auris Spark Drop",
    price: "₹48,140",
    discount: "5% OFF",
    image: "/images/earring_product.png",
  }));

  // Bestsellers (5 products)
  const bestSellers = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 11,
    name: "Auris Spark Drop",
    price: "₹48,140",
    discount: "5% OFF",
    image: "/images/earring_product.png",
  }));

  return (
    <div className="w-full flex flex-col bg-bg-custom pb-16 relative">

      {/* 1. Hero Banner */}
      <section className="relative w-full aspect-[21/9] min-h-[300px] md:min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 select-none">
          <Image
            src="/images/hero_banner.png"
            alt="Timeless Beauty Hero Banner"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Text Overlay (Left Aligned) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex justify-start">
            <div className="max-w-md md:max-w-xl text-normal flex flex-col items-start gap-3 md:gap-4 pl-4 md:pl-0">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-primary">
                TIMELESS BEAUTY,
              </span>
              <h1 className="font-serif text-3xl md:text-6xl font-bold tracking-wide text-title leading-none">
                MADE FOR YOU
              </h1>

              {/* Gold Ornament Cross Icon */}
              <div className="flex items-center justify-center my-0.5">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" />
                </svg>
              </div>

              <p className="text-[11px] md:text-sm text-subtitle max-w-sm md:max-w-md leading-relaxed">
                Discover exquisite craftsmanship and timeless designs that celebrate every you.
              </p>

              <button className="mt-2 border border-primary hover:bg-primary hover:text-white text-primary font-bold text-[10px] md:text-xs tracking-wider px-6 py-2.5 transition-all uppercase flex items-center gap-1.5">
                Explore Collection <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Icons (Right Aligned Edge) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110"
            aria-label="WhatsApp Chat"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.02-5.11-2.884-6.974C16.588 1.91 14.11 8.87 11.478 8.87c-5.443 0-9.866 4.42-9.87 9.86-.001 1.702.461 3.32 1.34 4.743l-.953 3.486 3.562-.934z" />
            </svg>
          </a>
          {/* Chat/Support Icon */}
          <button
            className="w-10 h-10 rounded-full bg-primary hover:opacity-90 shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110"
            aria-label="Customer Support"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 2.02.6 3.9 1.63 5.47L2.1 21.9c-.2.4.1.9.6.7l4.43-1.53C8.7 21.7 10.3 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.48 0-2.9-.3-4.17-.87l-.3-.13-2.62.9.9-2.58-.14-.28C5.1 14.86 4.8 13.48 4.8 12 4.8 8.03 8.03 4.8 12 4.8s7.2 3.23 7.2 7.2-3.23 7.2-7.2 7.2z" />
            </svg>
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          <span className="w-4 h-1.5 rounded-full bg-primary" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        </div>
      </section>

      {/* 2. Shop By Category */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 w-full flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1 mx-auto text-center">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-title">Shop By Category</h2>
            <p className="text-[11px] text-subtitle italic">Crafting elegance that transcends generations</p>
          </div>
          {/* Arrows */}
          <div className="flex items-center gap-1.5 absolute right-4 md:right-8 lg:right-16 mt-2">
            <button className="p-1.5 border border-gray-200 hover:border-gray-400 rounded-full text-subtitle hover:text-normal transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1.5 border border-gray-200 hover:border-gray-400 rounded-full text-subtitle hover:text-normal transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-4">
          {categories.map((category) => (
            <Link href="/all" key={category.name} className="flex flex-col items-center gap-3 group cursor-pointer">
              {/* Category Image Box */}
              <div className="w-full aspect-square rounded-lg border border-gray-100 overflow-hidden relative bg-[#FAF9F6] transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-sm">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover object-center p-2"
                />
              </div>
              <span className="font-semibold text-center text-[11px] md:text-xs text-title group-hover:text-primary transition-colors leading-tight">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Latest Arrivals */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full flex flex-col gap-6">
        <div className="flex flex-col gap-1 mx-auto text-center">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-title">Latest Arrivals</h2>
          <p className="text-[11px] text-subtitle italic">Crafting elegance that transcends generations</p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {latestArrivals.map((product) => (
            <div
              key={product.id}
              className="bg-bg-custom rounded border border-gray-100 overflow-hidden group flex flex-col relative"
            >
              {/* Product Image Frame */}
              <div className="bg-[#FAF9F6] aspect-square flex items-center justify-center relative p-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center p-3 transition-transform duration-300 group-hover:scale-105"
                />

                {/* Heart/Wishlist Button */}
                <button className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 shadow-sm transition-colors z-10">
                  <Heart size={14} />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-3 flex flex-col items-center text-center gap-1 flex-1">
                <button className="text-[9px] text-subtitle hover:text-primary underline tracking-wide">
                  Check Delivery Date
                </button>
                <h3 className="font-bold text-[11px] md:text-xs text-title line-clamp-1 mt-1 leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-extrabold text-title text-xs md:text-sm">{product.price}</span>
                  <span className="text-[9px] md:text-[10px] text-red-600 font-bold bg-red-50 px-1 rounded">({product.discount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mx-auto mt-6">
          <Link href="/all" className="font-serif text-xs font-bold text-title hover:text-primary border-b border-title hover:border-primary pb-1 uppercase tracking-wider transition-colors">
            VIEW ALL
          </Link>
        </div>
      </section>

      {/* 4. Our Bestselling Items */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full flex flex-col gap-6 relative">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1 mx-auto text-center">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-title">Our Bestselling items</h2>
            <p className="text-[11px] text-subtitle italic">Crafting elegance that transcends generations</p>
          </div>
          {/* Arrows */}
          <div className="flex items-center gap-1.5 absolute right-4 md:right-8 lg:right-16 mt-2">
            <button className="p-1.5 border border-gray-200 hover:border-gray-400 rounded-full text-subtitle hover:text-normal transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1.5 border border-gray-200 hover:border-gray-400 rounded-full text-subtitle hover:text-normal transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Bestseller Row (5 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="bg-bg-custom rounded border border-gray-100 overflow-hidden group flex flex-col relative"
            >
              {/* Product Image Frame */}
              <div className="bg-[#FAF9F6] aspect-square flex items-center justify-center relative p-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center p-3 transition-transform duration-300 group-hover:scale-105"
                />

                {/* Heart/Wishlist Button */}
                <button className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 shadow-sm transition-colors z-10">
                  <Heart size={14} />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-3 flex flex-col items-center text-center gap-1 flex-1">
                <button className="text-[9px] text-subtitle hover:text-primary underline tracking-wide">
                  Check Delivery Date
                </button>
                <h3 className="font-bold text-[11px] md:text-xs text-title line-clamp-1 mt-1 leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-extrabold text-title text-xs md:text-sm">{product.price}</span>
                  <span className="text-[9px] md:text-[10px] text-red-600 font-bold bg-red-50 px-1 rounded">({product.discount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Join Our Schemes */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full flex flex-col gap-6">
        <div className="text-center">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-title">Join Our Schemes</h2>
        </div>

        {/* Banner Frame */}
        <div className="relative w-full aspect-[21/8] min-h-[220px] rounded-lg overflow-hidden border border-gray-100 shadow-md">
          {/* Background Image */}
          <div className="absolute inset-0 select-none">
            <Image
              src="/images/scheme_banner.png"
              alt="Join Our Schemes Banner"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Banner Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent flex flex-col justify-between p-6 md:p-8">
            {/* Top Text Content */}
            <div className="flex flex-col items-start gap-1 md:gap-2 max-w-sm md:max-w-md text-white">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-amber-200">
                • GRACE IN •
              </span>
              <h3 className="font-serif text-xl md:text-4xl font-extrabold tracking-wide text-white leading-tight">
                EVERY DETAIL
              </h3>
              <p className="text-[10px] md:text-xs text-gray-200 max-w-xs mt-1">
                Delicate designs that add beauty to your everyday.
              </p>

              <button className="mt-3 bg-primary hover:opacity-90 text-white font-bold text-[10px] md:text-xs tracking-wider px-6 py-2 rounded-full transition-all shadow flex items-center gap-1.5 uppercase active:scale-95">
                MADE FOR YOU <span className="text-[12px]">&hearts;</span>
              </button>
            </div>

            {/* Bottom 3 Features Badges */}
            <div className="grid grid-cols-3 gap-2 md:gap-6 pt-4 border-t border-white/15 text-white w-full max-w-lg">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded bg-primary/85 text-[#E6C280]">
                  <Gem size={12} />
                </span>
                <span className="text-[9px] md:text-[10px] font-bold tracking-wide uppercase text-gray-100">
                  PREMIUM QUALITY
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded bg-primary/85 text-[#E6C280]">
                  <ShieldCheck size={12} />
                </span>
                <span className="text-[9px] md:text-[10px] font-bold tracking-wide uppercase text-gray-100">
                  TRUSTED CRAFTSMANSHIP
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded bg-primary/85 text-[#E6C280]">
                  <Sparkles size={12} />
                </span>
                <span className="text-[9px] md:text-[10px] font-bold tracking-wide uppercase text-gray-100">
                  SKIN FRIENDLY
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
