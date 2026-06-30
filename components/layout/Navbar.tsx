"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronRight, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tickerIndex, setTickerIndex] = useState(0);

  // Auto-rotate announcement / rates ticker on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#FAFAFA] backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-b border-neutral-100 select-none font-sans transition-all duration-300">
        {/* 1. Top Announcement & Rates Bar */}
        <div className="w-full bg-[#FAF6EE] border-b border-[#F2EAE0]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 w-full flex items-center justify-between text-[10px] font-medium tracking-wider">
            
            {/* Desktop Version: Full layout */}
            <div className="hidden md:flex justify-between items-center w-full">
              <div className="uppercase text-black">
                Flat 20% off on VA, for Online Gold Jewellery
              </div>
              <div className="flex items-center gap-4 text-black">
                {/* Gold Rate */}
                <div className="flex items-center gap-1.5 hover:opacity-85 transition-opacity animate-fade-in">
                  <Image
                    src="/images/common/gold_coin.svg"
                    alt="Gold Rate"
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5 object-contain"
                  />
                  <span>
                    GOLD 22KT: <span className="font-semibold">₹7,325.00</span>
                  </span>
                </div>

                {/* Divider */}
                <span className="h-3 w-px bg-neutral-200" />

                {/* Silver Rate */}
                <div className="flex items-center gap-1.5 hover:opacity-85 transition-opacity animate-fade-in">
                  <Image
                    src="/images/common/silver_coin.svg"
                    alt="Silver Rate"
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5 object-contain"
                  />
                  <span>
                    SILVER 999: <span className="font-bold">₹95.00</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Version: Clean Sliding Ticker */}
            <div className="md:hidden w-full overflow-hidden h-4 flex items-center justify-center">
              <div className="text-center w-full uppercase text-black font-semibold tracking-wider text-[9px]">
                {tickerIndex === 0 && (
                  <div className="animate-fade-in">Flat 20% off on VA, for Online Gold Jewellery</div>
                )}
                {tickerIndex === 1 && (
                  <div className="animate-fade-in flex items-center justify-center gap-2.5">
                    {/* Gold Rate */}
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/common/gold_coin.svg"
                        alt="Gold Rate"
                        width={11}
                        height={11}
                        className="w-3 h-3 object-contain"
                      />
                      <span>GOLD 22K: ₹7,325.00</span>
                    </div>
                    {/* Divider */}
                    <span className="h-2 w-px bg-neutral-300" />
                    {/* Silver Rate */}
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/common/silver_coin.svg"
                        alt="Silver Rate"
                        width={11}
                        height={11}
                        className="w-3 h-3 object-contain"
                      />
                      <span>SILVER 999: ₹95.00</span>
                    </div>
                  </div>
                )}
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
                  className="w-full hover:bg-neutral-100/60 focus:bg-white border-[1.6px] border-[#A6A6A6] focus:border-primary/80 rounded-[6px] pl-10 pr-4 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors duration-200">
                  <Search size={14} strokeWidth={1.8} />
                </div>
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex items-center gap-5 md:gap-7 text-black">
              {/* Account */}
              <Link href="/account" className="hidden md:flex flex-col items-center group cursor-pointer text-center">
                <User size={20} strokeWidth={1.6} className="text-primary transition-transform duration-200 group-hover:scale-105" />
                <span className="hidden md:inline text-[9px] font-semibold mt-1.5 tracking-wider uppercase group-hover:text-primary transition-colors duration-200">Account</span>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="hidden md:flex flex-col items-center group cursor-pointer text-center">
                <Heart size={20} strokeWidth={1.6} className="text-primary transition-transform duration-200 group-hover:scale-105" />
                <span className="hidden md:inline text-[9px] font-semibold mt-1.5 tracking-wider uppercase group-hover:text-primary transition-colors duration-200">Wishlist</span>
              </Link>

              {/* My Cart */}
              <Link href="/cart" className="flex flex-col items-center group cursor-pointer text-center">
                <div className="relative p-0.5">
                  <ShoppingCart size={20} strokeWidth={1.6} className="text-primary transition-transform duration-200 group-hover:scale-105" />
                  <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm">
                    0
                  </span>
                </div>
                <span className="hidden md:inline text-[9px] font-semibold mt-1.5 tracking-wider uppercase group-hover:text-primary transition-colors duration-200">Cart</span>
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
                        : "text-[#313130] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                      }`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation (Rendered outside the header to escape backdrop-blur viewport containment) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/35 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm h-full bg-bg-custom shadow-2xl flex flex-col p-6 z-[100] animate-slide-in border-r border-neutral-100">
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
            <div className="relative w-full mb-6 group">
              <input
                type="text"
                placeholder="Search jewellery, gold coins & more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full hover:bg-neutral-100/60 focus:bg-white border-[1.6px] border-[#A6A6A6] focus:border-primary/80 rounded-[6px] pl-10 pr-4 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all duration-300"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors duration-200">
                <Search size={14} strokeWidth={1.8} />
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
                          : "text-neutral-700 hover:text-primary hover:bg-neutral-50"
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

              {/* Mobile Drawer Footer Actions */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-3">
                <div className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-1">My Account</div>
                
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <User size={16} className="text-primary" />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Heart size={16} className="text-primary" />
                  <span>My Wishlist</span>
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <ShoppingBag size={16} className="text-primary" />
                  <span>My Orders</span>
                </Link>

                <div className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider mt-3 mb-1">Customer Support</div>
                
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 98765 43210</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
