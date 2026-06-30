"use client"
import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Heart, ShoppingBag, Info, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/common/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
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

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "breakdown">("details");

  const hasDiscount = product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Metal Rate calculation breakdown
  const dailyRate = product.metal === "silver" ? 95 : 7325; // Gold 22KT rate: 7325/g, Silver: 95/g
  const metalValue = Math.round(product.weight * dailyRate);
  
  // Making charges: let's calculate back from final price
  // final_price = (metalValue + making_charges) * 1.03
  // metalValue + making_charges = final_price / 1.03
  // making_charges = (final_price / 1.03) - metalValue
  const totalBeforeTax = Math.round(product.price / 1.03);
  const makingCharges = Math.max(1000, totalBeforeTax - metalValue);
  const calculatedTax = Math.round((metalValue + makingCharges) * 0.03);

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-bg-custom min-h-screen py-8 select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={10} strokeWidth={2.5} />
          <Link href={`/${product.category}`} className="hover:text-primary transition-colors capitalize">{product.category.replace("-", " & ")}</Link>
          <ChevronRight size={10} strokeWidth={2.5} />
          <span className="text-neutral-700">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-[#FAF6EE] aspect-square rounded-2xl border border-neutral-100 relative p-8 flex items-center justify-center overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain p-6"
                priority
              />

              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-green-600 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-[4px] shadow-md">
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl bg-[#FAF6EE] border-2 transition-all p-2 relative flex items-center justify-center ${
                    selectedImage === idx ? "border-primary shadow-sm" : "border-transparent hover:border-neutral-200"
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
          </div>

          {/* Right Column: Product Purchasing Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Title & Category Info */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none">
                {product.purity} • {product.weight}g
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-neutral-800 uppercase tracking-wide leading-tight mt-1">
                {product.name}
              </h1>
              <p className="text-[11px] text-neutral-500 leading-relaxed mt-2">{product.description}</p>
            </div>

            {/* Pricing Panel */}
            <div className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-[0_2px_15px_rgba(0,0,0,0.01)] flex flex-col gap-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-extrabold text-neutral-900">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xs font-semibold text-neutral-400 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-[4px]">
                      SAVE ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                    </span>
                  </>
                )}
              </div>
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider leading-none mt-1">
                Prices inclusive of all taxes (GST 3%)
              </span>
            </div>

            {/* Quantity Controller & Add/Wishlist Actions */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-neutral-200 rounded-full bg-white px-1">
                  <button
                    onClick={decrementQty}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold hover:bg-neutral-50 active:scale-95 transition-transform"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-neutral-800">{quantity}</span>
                  <button
                    onClick={incrementQty}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold hover:bg-neutral-50 active:scale-95 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button className="flex-1 bg-primary hover:opacity-90 active:scale-98 text-white font-bold text-xs tracking-widest py-3.5 rounded-full transition-all uppercase shadow-md flex items-center justify-center gap-2">
                  <ShoppingBag size={15} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3.5 rounded-full border border-neutral-200 bg-white transition-colors duration-200 active:scale-95 shadow-sm ${
                    isWishlisted ? "text-red-500 border-red-200 bg-red-50/20" : "text-neutral-400 hover:text-red-500"
                  }`}
                  aria-label="Wishlist product"
                >
                  <Heart size={18} className={isWishlisted ? "fill-red-500" : ""} />
                </button>
              </div>
            </div>

            {/* Info Tabs (Specs vs Price Breakdown) */}
            <div className="border border-neutral-100 rounded-2xl overflow-hidden bg-white shadow-[0_2px_15px_rgba(0,0,0,0.01)] mt-4">
              <div className="flex border-b border-neutral-100 bg-neutral-50/50">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === "details" ? "border-primary text-primary bg-white" : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  Product Details
                </button>
                <button
                  onClick={() => setActiveTab("breakdown")}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === "breakdown" ? "border-primary text-primary bg-white" : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  Price Breakdown
                </button>
              </div>

              <div className="p-5">
                {activeTab === "details" ? (
                  <table className="w-full text-xs text-left text-neutral-600">
                    <tbody>
                      <tr className="border-b border-neutral-50">
                        <td className="py-2.5 font-bold uppercase tracking-wider text-neutral-400 text-[9px] w-1/3">Metal</td>
                        <td className="py-2.5 font-semibold text-neutral-800 capitalize">{product.metal} ({product.purity})</td>
                      </tr>
                      <tr className="border-b border-neutral-50">
                        <td className="py-2.5 font-bold uppercase tracking-wider text-neutral-400 text-[9px]">Gross Weight</td>
                        <td className="py-2.5 font-semibold text-neutral-800">{product.weight} g</td>
                      </tr>
                      <tr className="border-b border-neutral-50">
                        <td className="py-2.5 font-bold uppercase tracking-wider text-neutral-400 text-[9px]">Purity Type</td>
                        <td className="py-2.5 font-semibold text-neutral-800">{product.purity}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold uppercase tracking-wider text-neutral-400 text-[9px]">Gender</td>
                        <td className="py-2.5 font-semibold text-neutral-800">Unisex / Women</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full text-xs text-left text-neutral-600">
                    <tbody>
                      <tr className="border-b border-neutral-50">
                        <td className="py-2.5 font-bold uppercase tracking-wider text-neutral-400 text-[9px] w-1/3">Metal Value</td>
                        <td className="py-2.5 font-semibold text-neutral-800">₹{metalValue.toLocaleString("en-IN")} <span className="text-[10px] text-neutral-400">({product.weight}g @ ₹{dailyRate}/g)</span></td>
                      </tr>
                      <tr className="border-b border-neutral-50">
                        <td className="py-2.5 font-bold uppercase tracking-wider text-neutral-400 text-[9px]">Making Charges</td>
                        <td className="py-2.5 font-semibold text-neutral-800">₹{makingCharges.toLocaleString("en-IN")}</td>
                      </tr>
                      <tr className="border-b border-neutral-50">
                        <td className="py-2.5 font-bold uppercase tracking-wider text-neutral-400 text-[9px]">GST (3%)</td>
                        <td className="py-2.5 font-semibold text-neutral-800">₹{calculatedTax.toLocaleString("en-IN")}</td>
                      </tr>
                      <tr className="font-bold text-neutral-900">
                        <td className="py-3 uppercase tracking-wider text-neutral-800 text-[10px]">Total Price</td>
                        <td className="py-3 text-sm font-extrabold text-primary">₹{(metalValue + makingCharges + calculatedTax).toLocaleString("en-IN")}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 text-center mt-2">
              <div className="flex flex-col items-center gap-1.5 p-3 bg-white border border-neutral-50 rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.005)]">
                <ShieldCheck size={18} className="text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-wide text-neutral-600">100% Certified</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 bg-white border border-neutral-50 rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.005)]">
                <Truck size={18} className="text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-wide text-neutral-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 bg-white border border-neutral-50 rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.005)]">
                <RotateCcw size={18} className="text-primary" />
                <span className="text-[9px] font-bold uppercase tracking-wide text-neutral-600">Easy Returns</span>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-[#F2EAE0]/60 pt-12 mt-12 w-full flex flex-col gap-6">
            <div className="text-center mb-2">
              <h2 className="font-sans text-xl md:text-2xl font-bold text-title uppercase tracking-wider">You May Also Like</h2>
              <p className="text-[11px] text-subtitle italic mt-1">Exquisite designs curated specifically for you</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
