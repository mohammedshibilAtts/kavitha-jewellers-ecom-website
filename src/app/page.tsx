"use client";

import React from "react";
import Link from "next/link";
import ProductCard, { CompatibleProduct } from "@/components/common/ProductCard";
import CategoryCard, { CompatibleCategory } from "@/components/common/CategoryCard";
import CardSlider from "@/components/common/CardSlider";
import HeroSlider from "@/components/common/HeroSlider";
import SchemesSlider from "@/components/common/SchemesSlider";
import { motion } from "framer-motion";
import { useActiveCategories } from "@/lib/hooks/useCategory";
import { useProductsList } from "@/lib/hooks/useProducts";

const heroImages = [
  { src: "https://aupay-img.s3.eu-north-1.amazonaws.com/kavithajewellers_new/webadmin/assets/banners/1783059366165.png", alt: "Timeless Beauty Hero Banner" },
  { src: "/images/banner_2.png", alt: "Special Offer Banner" },
  { src: "https://aupay-cdn.aupay.auss.co/kavitha-testing/image.png", alt: "Special Offer" },
  { src: "/images/banner_4.png", alt: "Special " },
];

const getResponsiveCardClass = (index: number) => {
  if (index >= 8) return "hidden lg:block";
  if (index >= 6) return "hidden md:block";
  if (index >= 4) return "hidden sm:block";
  return "";
};

export default function Home() {
  const { data: dbCategories, isLoading: categoriesLoading } = useActiveCategories();
  const { data: dbProducts, isLoading: productsLoading } = useProductsList();

  if (categoriesLoading || productsLoading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-bg-custom">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-subtitle animate-pulse">Loading Collection...</span>
        </div>
      </div>
    );
  }

  // Resolve dynamic categories
  const categoriesToRender: CompatibleCategory[] = (dbCategories && dbCategories.length > 0
    ? dbCategories
    : []) as CompatibleCategory[];

  // Resolve dynamic products
  const allProducts: CompatibleProduct[] = (dbProducts || []) as CompatibleProduct[];

  // Latest Arrivals (10 products)
  const latestArrivals = allProducts.slice(0, 10);

  // Bestsellers (5 products)
  const bestSellers = allProducts.filter((p: CompatibleProduct) => p.bestSeller).length > 0
    ? allProducts.filter((p: CompatibleProduct) => p.bestSeller).slice(0, 8)
    : allProducts.slice(3, 8);

  return (
    <div className="w-full flex flex-col relative">

      {/* 1. Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full pt-4 relative">
        <HeroSlider images={heroImages} autoplayInterval={5000} />
      </section>

      {/* 2. Shop By Category */}
      <CardSlider
        title="Shop By Category"
        subtitle="Crafting elegance that transcends generations"
      >
        {categoriesToRender.map((category: CompatibleCategory, index: number) => (
          <CategoryCard
            key={category._id}
            category={category}
            index={index}
            className="w-[140px] sm:w-[160px] md:w-[160px] shrink-0 snap-start"
          />
        ))}
      </CardSlider>

      {/* 3. Latest Arrivals */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-1 mx-auto text-center"
        >
          <h2 className="font-sans text-xl md:text-2xl font-bold text-title">Latest Arrivals</h2>
          <p className="text-[11px] text-subtitle ">Crafting elegance that transcends generations</p>
        </motion.div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {latestArrivals.map((product, index) => (
            <ProductCard
              key={product._id || product.id || index}
              product={product}
              index={index}
              className={getResponsiveCardClass(index)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mx-auto">
          <Link href="/all" className="font-sans text-xs font-bold text-title hover:text-primary border-b border-title hover:border-primary pb-1 uppercase tracking-wider transition-colors">
            VIEW ALL
          </Link>
        </div>
      </section>

      {/* 4. Our Bestselling Items */}
      <CardSlider
        title="Our Bestselling items"
        subtitle="Crafting elegance that transcends generations"
        className=""
      >
        {bestSellers.map((product, index) => (
          <ProductCard
            key={product._id || product.id || index}
            product={product}
            index={index}
            className="w-[160px] sm:w-[190px] md:w-[230px] lg:w-[250px] py-2"
          />
        ))}
      </CardSlider>

      {/* 5. Join Our Schemes */}
      <SchemesSlider />

    </div>
  );
}
