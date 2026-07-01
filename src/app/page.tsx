"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import ProductCard from "@/components/common/ProductCard";
import CategoryCard from "@/components/common/CategoryCard";
import CardSlider from "@/components/common/CardSlider";
import HeroSlider from "@/components/common/HeroSlider";
import { motion } from "framer-motion";

const heroImages = [
  { src: "/images/hero_banner.svg", alt: "Timeless Beauty Hero Banner" },
  { src: "/images/banner_2.png", alt: "Special Offer Banner" },
];

const getResponsiveCardClass = (index: number) => {
  if (index >= 8) return "hidden lg:block";
  if (index >= 6) return "hidden md:block";
  if (index >= 4) return "hidden sm:block";
  return "";
};

export default function Home() {
  const categories = [
    { name: "Rings", image: "/images/categories/rings.png" },
    { name: "Earrings", image: "/images/categories/earrings.png" },
    { name: "Necklaces & Pendants", image: "/images/categories/necklaces.png" },
    { name: "Bangles and Bracelets", image: "/images/categories/bangles.png" },
    { name: "Solitaire", image: "/images/categories/solitaire.png" },
    { name: "Mangalsutra", image: "/images/categories/mangalsutra.png" },
    { name: "Gold Coins", image: "/images/categories/solitaire.png" },
    { name: "Nose Pins", image: "/images/categories/rings.png" },
    { name: "Chains", image: "/images/categories/necklaces.png" },
    { name: "Bracelets", image: "/images/categories/bangles.png" },
  ];



  // Latest Arrivals (10 products)
  const latestArrivals = products.slice(0, 10);

  // Bestsellers (5 products)
  const bestSellers = products.slice(3, 8);

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
        {categories.map((category, index) => (
          <CategoryCard
            key={category.name}
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
              key={product.id}
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
            key={product.id}
            product={product}
            index={index}
            className="w-[160px] sm:w-[190px] md:w-[230px] lg:w-[250px] py-2"
          />
        ))}
      </CardSlider>

      {/* 5. Join Our Schemes */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full py-8 relative flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center w-full"
        >
          <h2 className="font-sans text-xl md:text-2xl font-bold text-title">Join Our Schemes</h2>
        </motion.div>

        {/* Banner Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full overflow-hidden rounded-2xl border border-neutral-100/50 shadow-xs bg-[#FFFCFC]"
          style={{ aspectRatio: "1512/512" }}
        >
          <Image
            src="/images/scheme_banner.svg"
            alt="Join Our Schemes Banner"
            fill
            className="object-contain object-center"
          />
        </motion.div>
      </section>

    </div>
  );
}
