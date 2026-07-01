"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Compass, Phone, MessageSquare } from "lucide-react";
import { ENV } from "@/config/env";

// Link Arrays for Dynamic Mapping
const QUICK_LINKS = [
  { name: "Account", href: "/account" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "My Cart", href: "/cart" },
  { name: "My Orders", href: "/orders" },
  { name: "My Schemes", href: "/schemes" },
];

const CATEGORIES = [
  { name: "Rings", href: "/rings" },
  { name: "Earrings", href: "/earrings" },
  { name: "Bangles & Bracelets", href: "/bangles-bracelets" },
  { name: "Solitaire", href: "/solitaire" },
  { name: "Necklaces & Pendants", href: "/necklaces-pendants" },
  { name: "Gold Jewellery", href: "/gold" },
  { name: "Silver Jewellery", href: "/silver" },
  { name: "Gifts", href: "/gift" },
];

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Facebook", href: "https://facebook.com" },
  { name: "WhatsApp", href: "https://whatsapp.com" },
  { name: "Youtube", href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white mt-auto border-t border-white/10 select-none">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12">

        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-5 col-span-2 md:col-span-1">
          <div className="flex items-center">
            {/* Logo Image */}
            <Image
              src="/images/common/footer_logo.svg"
              alt="Kavitha Jewellers Logo"
              width={222}
              height={44}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
          <p className="leading-relaxed text-white/90 text-[11px] font-medium">
            Kavitha Jewellers began its journey as a gold and silver retail showroom in 1999 in 28, 246/2, Medavakkam Main Road, Madipakkam, Chennai-600091. <br />
            <span className="text-white font-bold block mt-2">GSTIN NO: 33AEMPK0784F1ZZ</span>
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-primary font-bold py-2.5 px-4 rounded-[6px] transition-all text-[11px] uppercase tracking-wider self-start shadow-sm"
          >
            <span>Get Directions</span>
            <Compass size={14} className="text-primary" />
          </a>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4 col-span-1">
          <h4 className="text-white font-bold text-xs uppercase tracking-[1.5px]">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2 text-white text-[11px] font-medium tracking-[0.5px] uppercase">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#E6C280] transition-colors duration-200">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Category */}
        <div className="flex flex-col gap-2 col-span-1">
          <h4 className="text-white font-bold text-xs uppercase tracking-[1.5px]">
            Categories
          </h4>
          <ul className="flex flex-col gap-2 text-white  text-[11px] font-medium tracking-[0.5px] uppercase">
            {CATEGORIES.map((category) => (
              <li key={category.href}>
                <Link href={category.href} className="hover:text-[#E6C280] transition-colors duration-200">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Social & Contact */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-6 col-span-2 md:col-span-1">
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[1.5px] mb-3">
              Social Media
            </h4>
            <ul className="flex flex-col gap-2 text-white text-[11px] font-medium tracking-[0.5px] uppercase">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#E6C280] transition-colors duration-200"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[1.5px] mb-3">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-2 text-white text-[11px] font-medium tracking-[0.5px]">
              <li>
                <a href="tel:+919876543210" className="hover:text-[#E6C280] transition-colors duration-200 flex items-center gap-1.5">
                  <Phone size={12} className="text-[#E6C280]" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a href="tel:+919876432102" className="hover:text-[#E6C280] transition-colors duration-200 flex items-center gap-1.5">
                  <Phone size={12} className="text-[#E6C280]" />
                  <span>+91 98764 32102</span>
                </a>
              </li>
             
            
              

            </ul>
          </div>
        </div>

        {/* Column 5: App Promo & Contact */}
        <div className="flex flex-col gap-5 col-span-2 md:col-span-1">
          <h4 className="text-white font-bold text-xs uppercase tracking-[1.5px]">
            DigiGold Schemes
          </h4>
          <p className="leading-relaxed text-white/90 text-[11px] font-medium">
            Join our DigiGold Jewellery Purchase Plan and unlock exclusive benefits tailored just for you.
          </p>

          {/* Download Badges */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 max-w-[270px] md:max-w-[130px] mt-1">
            {/* Google Play Store Badge */}
            <a
              href={ENV.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#0A0A0A] border border-[#333333] hover:bg-[#111111] hover:border-[#444444] rounded-[6px] px-2.5 py-1.5 transition-all text-white w-full h-[38px] shrink-0 shadow-md"
            >
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] shrink-0">
                <path d="M3.609 2.516c-.198.204-.316.522-.316.92v17.128c0 .398.118.716.316.92l.06.06L13.237 12v-.196L3.67 2.456l-.06.06z" fill="#3bccff" />
                <path d="M16.42 15.228l-3.183-3.183V11.85l3.183-3.183.08.046 3.766 2.141c1.077.611 1.077 1.614 0 2.227l-3.766 2.141-.08.006z" fill="#ffd000" />
                <path d="M16.5 15.182L13.237 11.92 3.609 21.548c.655.693 1.733.773 2.659.245l10.232-5.816.08-.046-.08.046z" fill="#ff3c00" />
                <path d="M16.5 8.636L6.268 2.82C5.342 2.292 4.264 2.372 3.609 3.065L13.237 12.08 16.5 8.636z" fill="#00e676" />
              </svg>
              <div className="text-left leading-none">
                <div className="text-[7.5px] uppercase tracking-wider text-neutral-400 font-medium font-sans whitespace-nowrap">GET IT ON</div>
                <div className="text-[11.5px] font-bold text-white font-sans mt-0.5 whitespace-nowrap">Google Play</div>
              </div>
            </a>

            {/* Apple App Store Badge */}
            <a
              href={ENV.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#0A0A0A] border border-[#333333] hover:bg-[#111111] hover:border-[#444444] rounded-[6px] px-2.5 py-1.5 transition-all text-white w-full h-[38px] shrink-0 shadow-md"
            >
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] fill-current text-white shrink-0">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.052 1.002 1.44 2.185 3.054 3.748 2.99 1.499-.06 2.072-.977 3.876-.977 1.802 0 2.328.977 3.893.945 1.602-.027 2.637-1.47 3.619-2.9 1.139-1.665 1.606-3.275 1.633-3.36-.059-.027-3.14-1.203-3.172-4.786-.027-2.99 2.448-4.428 2.56-4.493-1.398-2.053-3.56-2.285-4.328-2.34-1.89-.153-3.41 1.036-4.328 1.036V6.896zm2.408-4.48c.806-.985 1.348-2.354 1.198-3.719-1.174.048-2.593.782-3.435 1.768-.75.867-1.407 2.254-1.228 3.593 1.31.103 2.659-.658 3.465-1.642z" />
              </svg>
              <div className="text-left leading-none">
                <div className="text-[7.5px] uppercase tracking-wider text-neutral-400 font-medium font-sans whitespace-nowrap">Download on the</div>
                <div className="text-[11.5px] font-bold text-white font-sans mt-0.5 whitespace-nowrap">App Store</div>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-black/10 py-4 px-4 border-t border-white/10 text-white/70 text-[10px] uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <span>&copy; Copyright 2026. All Rights Reserved For Kavitha Jewellers</span>
          <span>Powered by Nyttro</span>
        </div>
      </div>
    </footer>
  );
}
