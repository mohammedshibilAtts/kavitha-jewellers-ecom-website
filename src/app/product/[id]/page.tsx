"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactImageMagnify = dynamic(() => import("react-image-magnify"), { ssr: false });

import {
  ShoppingCart,
  Share2,
  MapPin,
  Truck,
  ShieldCheck,
  Award,
  Users,
  Info,
  CheckCircle2,
  X,
  IndianRupee
} from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/common/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  // Fetch product from mock list
  const product = useMemo(() => {
    return products.find((p) => p.id === productId) || products[0];
  }, [productId]);

  // Related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    let list = products.filter((p) => p.category === product.category && p.id !== product.id);
    if (list.length === 0) {
      list = products.filter((p) => p.id !== product.id);
    }
    return list.slice(0, 4);
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [pincode, setPincode] = useState("641001");
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [fullscreenSlide, setFullscreenSlide] = useState(0);

  const inlineScrollRef = useRef<HTMLDivElement>(null);
  const fullscreenScrollRef = useRef<HTMLDivElement>(null);

  // Detect screen width for responsive gallery layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to scroll horizontal snap sliders programmatically
  const scrollToSlide = (ref: React.RefObject<HTMLDivElement | null>, index: number) => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      ref.current.scrollTo({
        left: width * index,
        behavior: "smooth"
      });
    }
  };

  const handleInlineScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== selectedImage) {
        setSelectedImage(index);
      }
    }
  };

  const handleFullscreenScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== fullscreenSlide) {
        setFullscreenSlide(index);
      }
    }
  };

  // Create exactly 4 thumbnails using the product image
  const displayImages = useMemo(() => {
    return Array(4).fill(product.images[0]);
  }, [product.images]);

  // Helper to convert small crop to high-resolution zoom crop
  const getLargeImageUrl = (url: string) => {
    if (!url) return "";
    return url.replace("w=500&h=500", "w=1200&h=1200");
  };

  const hasDiscount = product.discountper && product.discountper > 0;
  const discountPercent = product.discountper || 3;

  // Metal Rate calculation breakdown
  const dailyRate = product.metal === "silver" ? 95 : 7325; // Gold 22KT rate: 7325/g, Silver: 95/g
  const metalValue = Math.round(product.weight * dailyRate);

  // Making charges
  const totalBeforeTax = Math.round(product.price / 1.03);
  const makingCharges = Math.max(1200, totalBeforeTax - metalValue);
  const calculatedTax = Math.round((metalValue + makingCharges) * 0.03);

  return (
    <div className="bg-bg-custom min-h-screen py-8 select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 mb-6">
          <Link href={`/${product.category}`} className="hover:text-primary transition-colors capitalize">
            {product.category.replace("-", " & ")}
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-900 tracking-wide ">{product.name}</span>
        </div>

        {/* Main Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">

          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {isMobile ? (
              // Mobile / Tablet Swiper Gallery
              <div className="relative">
                <div
                  ref={inlineScrollRef}
                  onScroll={handleInlineScroll}
                  className="bg-[#FAF7F2]/40 aspect-square rounded-sm border border-[#F2EAE0]/30 flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
                >
                  {displayImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setFullscreenSlide(idx);
                        setIsFullscreenOpen(true);
                        setTimeout(() => {
                          scrollToSlide(fullscreenScrollRef, idx);
                        }, 60);
                      }}
                      className="w-full h-full shrink-0 snap-center relative flex items-center justify-center cursor-pointer select-none"
                    >
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        className="object-contain pointer-events-none select-none"
                        draggable={false}
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>

                {/* Dot Pagination */}
                <div className="flex justify-center gap-1.5 mt-3">
                  {displayImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImage(idx);
                        scrollToSlide(inlineScrollRef, idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${selectedImage === idx ? "w-4 bg-[#632C2F]" : "w-1.5 bg-neutral-300"
                        }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Desktop Zoom Gallery
              <>
                {/* Main Image Box */}
                <div className="bg-[#FAF7F2]/40 aspect-square rounded-sm border border-[#F2EAE0]/30 relative flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: product.name,
                          isFluidWidth: true,
                          src: displayImages[selectedImage]
                        },
                        largeImage: {
                          src: getLargeImageUrl(displayImages[selectedImage]),
                          width: 1200,
                          height: 1200
                        },
                        enlargedImagePosition: "beside",
                        className: "w-full h-full z-10",
                        imageClassName: "w-full h-full rounded-sm",
                        enlargedImageContainerClassName: "z-50 shadow-2xl border border-neutral-100 bg-white rounded-sm",
                        enlargedImageClassName: "!max-w-none"
                      }}
                    />
                  </div>
                </div>

                {/* Thumbnails Row */}
                <div className="flex gap-4 mt-1">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-[80px] h-[80px] rounded-sm bg-[#FAF7F2]/40 border transition-all relative overflow-hidden shrink-0 ${selectedImage === idx ? "border-[#632C2F] shadow-sm" : "border-[#E8E8E8] hover:border-neutral-400"
                        }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right Column: Purchasing Info */}
          <div className="lg:col-span-7 flex flex-col gap-5">

            {/* Title, SKU & Category Info */}
            <div className="flex flex-col gap-1">
              <h1 className="text-xl md:text-2xl font-bold text-[#232323] tracking-wide  leading-tight">
                {product.name}
              </h1>
              <span className="text-[10px] font-medium text-[#747474] tracking-wider">
                SKU: 202021-TYP{product.id}
              </span>
            </div>

            {/* Pricing Panel */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="flex items-center text-xl md:text-2xl font-bold text-neutral-900">
                  <IndianRupee
                    size={20}
                    strokeWidth={3}
                    className=" inline-block"
                  />
                  <span>{product.price.toLocaleString("en-IN")}</span>
                </span>

                <span className="text-xs font-bold text-primary  px-1 py-0.5 rounded-sm">
                  ({discountPercent}% OFF)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#747474] tracking-wider">
                <span>(MRP Inclusive of all taxes)</span>
                <button
                  onClick={() => setShowPriceBreakdown(true)}
                  className="text-[#632C2F] font-bold underline cursor-pointer "
                >
                  View Price Breakup
                </button>
              </div>
            </div>

            {/* Add to Cart & Share Actions */}
            <div className="flex gap-3">
              <button className="flex-1 bg-[#632C2F] hover:opacity-90 active:scale-98 text-white font-bold text-xs tracking-wider py-3 px-6 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md">
                <ShoppingCart size={15} />
                Add To Cart
              </button>
              <button className="p-3 border border-neutral-300 rounded-sm hover:bg-neutral-50 active:scale-95 transition-colors cursor-pointer">
                <Share2 size={16} className="text-neutral-600" />
              </button>
            </div>

            {/* Check Delivery Section */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Check Delivery</span>

              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 border border-neutral-200 bg-white px-3 py-2 rounded-sm text-xs text-neutral-700">
                  <MapPin size={14} className="text-[#632C2F]" />
                  <input
                    type="text"
                    value={`Delivering to ${pincode}`}
                    onChange={(e) => setPincode(e.target.value.replace("Delivering to ", ""))}
                    className="bg-transparent focus:outline-none flex-1 font-bold text-neutral-700 text-xs"
                  />
                </div>
                <button className="bg-[#632C2F] hover:opacity-95 text-white font-bold text-[10px] md:text-xs tracking-wider px-4 rounded-sm uppercase cursor-pointer">
                  Use Current Location
                </button>
              </div>

              <div className="flex items-start gap-2.5 mt-1">
                <Truck size={18} className="text-[#632C2F] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <p className="text-xs font-bold text-neutral-800">Expected Delivery by 5 - 10 Days</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">
                    Order in Next 22 Hrs 30 Mins, <span className="underline cursor-pointer">T&C</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5 mt-1">
              <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Description</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {product.description || "Add a touch of old-world charm with these jewelry pieces. Each features a lustrous, premium finish suspended from intricately designed silver/gold filigree settings."}
              </p>
            </div>

            {/* Spec Capsules */}
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-[#F9F9F9] text-neutral-700 text-[10px] font-semibold px-3 py-1.5 rounded-sm border border-neutral-200">
                {product.purity}
              </span>
              <span className="bg-[#F9F9F9] text-neutral-700 text-[10px] font-semibold px-3 py-1.5 rounded-sm border border-neutral-200">
                {product.weight} g
              </span>
              <span className="bg-[#F9F9F9] text-neutral-700 text-[10px] font-semibold px-3 py-1.5 rounded-sm border border-neutral-200">
                0.040 CT
              </span>
              <span className="bg-[#F9F9F9] text-neutral-700 text-[10px] font-semibold px-3 py-1.5 rounded-sm border border-neutral-200">
                GH-SI
              </span>
            </div>

            {/* Specifications Cards Grid */}
            <div className="bg-[#F9F9F9] border border-neutral-200 rounded-sm p-4 grid grid-cols-2 gap-4 mt-2 divide-x divide-neutral-200">

              {/* Left Column: Gold Details */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-neutral-800">
                  <Award size={16} className="text-[#632C2F]" />
                  <span className="text-xs font-bold text-neutral-800">{product.purity}</span>
                </div>
                <div className="flex flex-col gap-1 text-[10px] text-neutral-500 font-semibold uppercase tracking-wider pl-5">
                  <span>Gross: {product.weight} g</span>
                  <span>Height: 4.35 mm</span>
                  <span>Width: 9.22 mm</span>
                </div>
              </div>

              {/* Right Column: Diamond Details */}
              <div className="flex flex-col gap-2 pl-4">
                <div className="flex items-center gap-1.5 text-neutral-800">
                  <CheckCircle2 size={16} className="text-[#632C2F]" />
                  <span className="text-xs font-bold text-neutral-800">0.040 ct</span>
                </div>
                <div className="flex flex-col gap-1 text-[10px] text-neutral-500 font-semibold uppercase tracking-wider pl-5">
                  <span>GH - SI</span>
                  <span>Setting: Prong</span>
                  <span>Total Number: 7</span>
                </div>
              </div>
            </div>

            {/* Hallmark & Trust Badges */}
            <div className="grid grid-cols-3 gap-2 text-center mt-3 border-t border-neutral-100 pt-4">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={20} className="text-[#632C2F]" />
                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">
                  BIS Hallmark Jewellery
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Award size={20} className="text-[#632C2F]" />
                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">
                  Trusted with Kavitha Jewellers
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Users size={20} className="text-[#632C2F]" />
                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">
                  200+ Customers
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Price Breakdown Dialog Modal */}
        <AnimatePresence>
          {showPriceBreakdown && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPriceBreakdown(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white border border-neutral-100 rounded-sm max-w-sm w-full p-6 shadow-2xl relative z-10 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Price Breakdown
                  </h3>
                  <button
                    onClick={() => setShowPriceBreakdown(false)}
                    className="p-1 hover:bg-neutral-100 rounded-full text-neutral-400 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex flex-col gap-3 text-xs text-neutral-600">
                  <div className="flex justify-between items-center py-1 border-b border-neutral-50">
                    <span>Metal Value ({product.weight}g @ ₹{dailyRate}/g)</span>
                    <span className="font-bold text-neutral-800">₹{metalValue.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-neutral-50">
                    <span>Making Charges</span>
                    <span className="font-bold text-neutral-800">₹{makingCharges.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-neutral-50">
                    <span>GST (3%)</span>
                    <span className="font-bold text-neutral-800">₹{calculatedTax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-sm font-extrabold text-[#632C2F] border-t border-neutral-100 mt-1">
                    <span>Total Price</span>
                    <span>₹{product.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-[#F2EAE0]/60 pt-12 mt-12 w-full flex flex-col gap-6">
            <div className="text-center mb-2">
              <h2 className="font-sans text-xl md:text-2xl font-bold text-title uppercase tracking-wider">
                You May Also Like
              </h2>
              <p className="text-[11px] text-subtitle italic mt-1">Exquisite designs curated specifically for you</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Fullscreen Mobile/Tablet Swiper Modal (Flipkart-style) */}
        <AnimatePresence>
          {isFullscreenOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-200 bg-white flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-100">
                <span className="text-sm font-semibold text-neutral-600">
                  {fullscreenSlide + 1} of {displayImages.length}
                </span>
                <button
                  onClick={() => setIsFullscreenOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-800" />
                </button>
              </div>

              {/* Slider Container with Touch Swiping */}
              <div className="relative flex-1 flex items-center justify-center bg-[#FAF7F2]/30">
                {/* Horizontal scroll container with snap */}
                <div
                  ref={fullscreenScrollRef}
                  onScroll={handleFullscreenScroll}
                  className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
                >
                  {displayImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full h-full flex-shrink-0 snap-center relative flex items-center justify-center p-6"
                    >
                      <div className="w-full h-full relative">
                        <Image
                          src={img}
                          alt={`${product.name} fullscreen ${idx + 1}`}
                          fill
                          className="object-contain pointer-events-none select-none"
                          draggable={false}
                          priority
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Thumbnails Navigation */}
              <div className="px-4 py-4 border-t border-neutral-100 bg-white">
                <div className="flex justify-center gap-3 max-w-xs mx-auto">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setFullscreenSlide(idx);
                        scrollToSlide(fullscreenScrollRef, idx);
                      }}
                      className={`w-14 aspect-square rounded-sm border relative overflow-hidden bg-[#FAF7F2]/40 transition-all ${fullscreenSlide === idx ? "border-[#632C2F] ring-1 ring-[#632C2F]" : "border-neutral-200"
                        }`}
                    >
                      <Image
                        src={img}
                        alt="thumbnail"
                        fill
                        className="object-contain p-0.5"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
