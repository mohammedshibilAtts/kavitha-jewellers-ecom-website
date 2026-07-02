import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SortDropdownProps {
  sortBy: string;
  onChange: (sort: string) => void;
}

const SORT_OPTIONS = [
  { value: "popular", label: "Popularity" },
  { value: "low-to-high", label: "Price: Low to High" },
  { value: "high-to-low", label: "Price: High to Low" },
];

export default function SortDropdown({ sortBy, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize current value
  const currentValue = sortBy === "price-asc" ? "low-to-high" : sortBy === "price-desc" ? "high-to-low" : sortBy;
  const currentOption = SORT_OPTIONS.find((opt) => opt.value === currentValue) || SORT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative font-sans select-none" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 border border-[#DADADA] bg-white px-4 py-2 rounded-sm text-xs font-semibold text-neutral-700 min-w-[195px] cursor-pointer hover:border-[#632C2F] active:bg-neutral-50 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
      >
        <span className="text-neutral-400 font-medium">Sort by:</span>
        <span className="font-bold text-neutral-800 flex-1 text-left line-clamp-1">
          {currentOption.label}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} className="text-neutral-500" />
        </motion.div>
      </button>

      {/* Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-1.5 w-[195px] bg-white border border-[#DADADA] rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.06)] z-30 overflow-hidden flex flex-col"
          >
            {SORT_OPTIONS.map((opt) => {
              const isSelected = opt.value === currentValue;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`flex items-center justify-between px-4 py-2.5 text-xs font-medium cursor-pointer transition-colors text-left ${
                    isSelected
                      ? "bg-[#632C2F]/5 text-[#632C2F] font-bold"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check size={12} className="text-[#632C2F]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
