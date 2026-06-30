"use client";

import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2A1617] text-[#D8C7C7] text-xs font-sans mt-auto border-t-2 border-primary/30">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {/* Gold Monogram */}
            <div className="w-7 h-7 rounded bg-gradient-to-br from-[#E6C280] to-[#C59B4C] flex items-center justify-center shadow">
              <span className="text-primary font-serif font-bold text-xs italic">KJ</span>
            </div>
            <span className="font-serif text-sm font-bold tracking-widest text-[#E6C280]">
              KAVITHA JEWELLERS
            </span>
          </div>
          <p className="leading-relaxed text-gray-400 text-[11px]">
            Kavitha Jewellers began its journey as a gold and silver retail showroom in 1999 in 28, 246/2, Medavakkam Main Road, Madipakkam, Chennai-600091. <br />
            <strong>GSTIN NO: 33AEMPK0784F1ZZ</strong>
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-100 text-primary font-bold py-2 px-4 rounded transition-all text-[11px] self-start"
          >
            Get Direction <Compass size={14} className="text-primary" />
          </a>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold text-[12px] uppercase tracking-wider mb-4">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5 text-gray-400">
            <li><Link href="/account" className="hover:text-[#E6C280] transition-colors">Account</Link></li>
            <li><Link href="/wishlist" className="hover:text-[#E6C280] transition-colors">Wishlist</Link></li>
            <li><Link href="/cart" className="hover:text-[#E6C280] transition-colors">My Cart</Link></li>
            <li><Link href="/orders" className="hover:text-[#E6C280] transition-colors">My Order</Link></li>
            <li><Link href="/schemes" className="hover:text-[#E6C280] transition-colors">My Schemes</Link></li>
          </ul>
        </div>

        {/* Column 3: Category */}
        <div>
          <h4 className="text-white font-bold text-[12px] uppercase tracking-wider mb-4">
            Category
          </h4>
          <ul className="flex flex-col gap-2.5 text-gray-400">
            <li><Link href="/rings" className="hover:text-[#E6C280] transition-colors">Rings</Link></li>
            <li><Link href="/earrings" className="hover:text-[#E6C280] transition-colors">Ear Rings</Link></li>
            <li><Link href="/bangles-bracelets" className="hover:text-[#E6C280] transition-colors">Bangles And Bracelets</Link></li>
            <li><Link href="/solitaire" className="hover:text-[#E6C280] transition-colors">Solitaire</Link></li>
            <li><Link href="/necklaces-pendants" className="hover:text-[#E6C280] transition-colors">Necklaces & Pendants</Link></li>
            <li><Link href="/gold" className="hover:text-[#E6C280] transition-colors">Gold Jewellery</Link></li>
            <li><Link href="/silver" className="hover:text-[#E6C280] transition-colors">Silver Jewellery</Link></li>
            <li><Link href="/gift" className="hover:text-[#E6C280] transition-colors">Gift</Link></li>
          </ul>
        </div>

        {/* Column 4: Social */}
        <div>
          <h4 className="text-white font-bold text-[12px] uppercase tracking-wider mb-4">
            Social
          </h4>
          <ul className="flex flex-col gap-2.5 text-gray-400">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6C280] transition-colors">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6C280] transition-colors">Facebook</a></li>
            <li><a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6C280] transition-colors">WhatsApp</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6C280] transition-colors">Twitter</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6C280] transition-colors">Youtube</a></li>
          </ul>
        </div>

        {/* Column 5: App Promo & Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-[12px] uppercase tracking-wider">
            Kavitha Jewellers
          </h4>
          <p className="leading-relaxed text-gray-400 text-[11px]">
            Join our DigiGold Jewellery Purchase Plan and unlock exclusive benefits tailored just for you.
          </p>

          {/* Download Badges */}
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row mt-1">
            {/* Google Play Store Badge */}
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#1F0F10] border border-gray-700 hover:border-gray-500 rounded px-2.5 py-1.5 transition-colors text-white w-32">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white shrink-0">
                <path d="M5.25 3v18c0 .35.15.68.41.9l9.34-9.33L5.66 3.22a1.23 1.23 0 0 0-.41-.22M16.5 12l3.41-3.41c.26-.26.26-.69 0-.95L17.5 5.25 15.5 11l1 1m-1.78.78L6.88 20.62c.22-.05.42-.15.56-.3L13.72 14l1 1.22M14.72 12l2.45-2.45-3.45-2L6.88 3.38c.14-.15.34-.25.56-.3l9.37 5.41a1 1 0 0 1 0 1.73l-2.09 1.78" />
              </svg>
              <div className="text-left leading-none">
                <div className="text-[7px] uppercase font-bold text-gray-400">GET IT ON</div>
                <div className="text-[10px] font-extrabold font-sans">Google Play</div>
              </div>
            </a>

            {/* Apple App Store Badge */}
            <a href="https://apple.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#1F0F10] border border-gray-700 hover:border-gray-500 rounded px-2.5 py-1.5 transition-colors text-white w-32">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white shrink-0">
                <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.01 0-1.4-.62-2.52-.62-1.12 0-1.54.6-2.5.62-1 .02-2.13-.97-3.13-1.92-2.02-1.94-3.56-5.48-3.56-8.81 0-5.28 3.44-8.08 6.83-8.08 1.07 0 2.08.38 2.74.38.65 0 1.88-.47 3.16-.47 1.34 0 2.57.48 3.37 1.35-2.82 1.66-2.35 5.53.51 6.7-1.17 2.8-2.52 5.56-4.32 7.27M12.03 4.31c.58-.7 1.45-1.17 2.3-1.17.1 0 .2.01.27.02-.08 1.86-1.18 3.31-2.3 3.31-.58 0-1.46-.47-2.3-1.17.84-1.25 1.45-2.29 2.03-2.99" />
              </svg>
              <div className="text-left leading-none">
                <div className="text-[7px] uppercase font-bold text-gray-400">Download on the</div>
                <div className="text-[10px] font-extrabold font-sans">App Store</div>
              </div>
            </a>
          </div>

          {/* Contact Numbers */}
          <div className="mt-2 text-gray-400 text-[11px] leading-relaxed">
            <span className="font-bold text-white block">Contact Us</span>
            +91-9876543210 <br />
            +91-9876432102 <br />
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-[#E6C280] font-bold hover:underline">
              Whatsapp chat With Us
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#1F0F10] py-4 px-4 border-t border-gray-800 text-[#8C7A7A] text-[10px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>&copy; Copyright 2026. All Rights Reserved For Kavitha Jewellers</span>
          <span>Powered by NetiN</span>
        </div>
      </div>
    </footer>
  );
}
