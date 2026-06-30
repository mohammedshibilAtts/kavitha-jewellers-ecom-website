"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "All Jewellery", href: "/all", active: true },
    { name: "Gold Jewellery", href: "/gold" },
    { name: "Silver Jewellery", href: "/silver" },
    { name: "Rings", href: "/rings" },
    { name: "Earrings", href: "/earrings" },
    { name: "Bangles & Bracelets", href: "/bangles-bracelets" },
    { name: "Solitaire", href: "/solitaire" },
    { name: "Mangalsutra", href: "/mangalsutra" },
    { name: "Gifts", href: "/gift" },
    { name: "Schemes", href: "/schemes" },

  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#FAFAFA] backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-b border-neutral-100 select-none font-sans transition-all duration-300">
      {/* 1. Top Announcement & Rates Bar */}
      <div className="w-full bg-[#f8ebd2] border-b border-[#F2EAE0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 w-full flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-medium tracking-wider">
          <div className="uppercase text-black  text-center sm:text-left">
            Flat 20% off on VA, for Online Gold Jewellery
          </div>
          <div className="flex items-center gap-4 text-black">
            {/* Gold Rate */}
            <div className="flex items-center gap-1.5 hover:opacity-85 transition-opacity">
              <Image
                src="/images/common/gold_coin.svg"
                alt="Gold Rate"
                width={14}
                height={14}
                className="w-3.5 h-3.5 object-contain"
              />
              <span>
                GOLD 22KT: <span className=" font-semibold">₹7,325.00</span>
              </span>
            </div>

            {/* Divider */}
            <span className="h-3 w-px bg-neutral-200" />

            {/* Silver Rate */}
            <div className="flex items-center gap-1.5 hover:opacity-85 transition-opacity">
              <Image
                src="/images/common/silver_coin.svg"
                alt="Silver Rate"
                width={14}
                height={14}
                className="w-3.5 h-3.5 object-contain"
              />
              <span>
                SILVER 999: <span className=" font-bold">₹95.00</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Left Side: Mobile Menu Button & Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-neutral-500 hover:text-primary transition-colors focus:outline-none"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo Section */}
          <Link href="/" className="flex items-center group transition-opacity hover:opacity-95">
            <Image
              src="/images/common/logo.svg"
              alt="Kavitha Jewellers Logo"
              width={235}
              height={36}
              className="h-8 md:h-9 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right Side: Search Bar & Action Controls */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Search Bar */}
          <div className="hidden md:block w-64 lg:w-80 transition-all duration-300">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search jewellery, gold coins & more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full  hover:bg-neutral-100/60 focus:bg-white border-[1.6] border-[#A6A6A6] focus:border-primary/80 rounded-[6px] pl-10 pr-4 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all duration-300"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors duration-200">
                <Search size={14} strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-5 md:gap-7 text-black">
            {/* Account */}
            <Link href="/account" className="flex flex-col items-center group cursor-pointer text-center">
              <User size={20} strokeWidth={1.6} className="text-primary transition-transform duration-200 group-hover:scale-105" />
              <span className="hidden md:inline text-[9px] font-semibold mt-1.5 tracking-wider uppercase  group-hover:text-primary transition-colors duration-200">Account</span>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="flex flex-col items-center group cursor-pointer text-center">
              <Heart size={20} strokeWidth={1.6} className="text-primary transition-transform duration-200 group-hover:scale-105" />
              <span className="hidden md:inline text-[9px] font-semibold mt-1.5 tracking-wider uppercase  group-hover:text-primary transition-colors duration-200">Wishlist</span>
            </Link>

            {/* My Cart */}
            <Link href="/cart" className="flex flex-col items-center group cursor-pointer text-center">
              <div className="relative p-0.5">
                <ShoppingCart size={20} strokeWidth={1.6} className="text-primary transition-transform duration-200 group-hover:scale-105" />
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm">
                  0
                </span>
              </div>
              <span className="hidden md:inline text-[9px] font-semibold mt-1.5 tracking-wider uppercase  group-hover:text-primary transition-colors duration-200">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Sub Navbar / Navigation Links */}
      <nav className="hidden md:block w-full border-neutral-100">
        <div className="max-w-7xl mx-auto px-8">
          <ul className="flex items-center md:justify-center gap-7 py-2.5 overflow-x-auto whitespace-nowrap scrollbar-hide text-[10px] font-semibold tracking-[0.16em] text-[#313130]">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className={`relative py-1.5 transition-colors uppercase hover:text-primary ${category.active
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full"
                      : "text-[#313130] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 "
                    }`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/35 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm h-full bg-bg-custom shadow-2xl flex flex-col p-6 z-50 animate-slide-in border-r border-neutral-100">
            {/* Header: Logo & Close Button */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
              <Image
                src="/images/common/logo.svg"
                alt="Kavitha Jewellers Logo"
                width={150}
                height={23}
                className="h-6 w-auto object-contain"
                priority
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-neutral-500 hover:text-primary transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="relative w-full mb-6">
              <input
                type="text"
                placeholder="Search jewellery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                <Search size={14} />
              </div>
            </div>

            {/* Mobile Category Links */}
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-hide">
              <h3 className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-4">Categories</h3>
              <ul className="flex flex-col gap-1">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={category.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 ${category.active
                          ? "text-primary bg-primary/5 font-bold"
                          : " hover:text-primary hover:bg-neutral-50"
                        }`}
                    >
                      <span>{category.name}</span>
                      <ChevronRight
                        size={14}
                        className={`transition-transform duration-200 ${category.active ? "text-primary translate-x-0.5" : "text-neutral-300"}`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
