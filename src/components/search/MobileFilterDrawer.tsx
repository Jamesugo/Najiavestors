"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, X, RotateCcw, ShieldCheck, Check } from "lucide-react";
import { NIGERIAN_STATES, PRICE_TIERS } from "@/data/nigeria-data";

interface MobileFilterDrawerProps {
  categories: { slug: string; name: string; count: number }[];
  currentParams: Record<string, string | undefined>;
}

export function MobileFilterDrawer({ categories, currentParams }: MobileFilterDrawerProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Local state for mobile form
  const [selectedState, setSelectedState] = useState(currentParams.state || "all");
  const [selectedLga, setSelectedLga] = useState(currentParams.lga || "all");
  const [selectedCategory, setSelectedCategory] = useState(currentParams.category || "all");
  const [selectedPriceTier, setSelectedPriceTier] = useState(currentParams.priceTier || "all");
  const [selectedMinRating, setSelectedMinRating] = useState(currentParams.minRating || "0");
  const [verifiedOnly, setVerifiedOnly] = useState(currentParams.verifiedOnly === "true");

  const stateNames = Object.keys(NIGERIAN_STATES).sort();
  const availableLgas = selectedState !== "all" && NIGERIAN_STATES[selectedState] ? NIGERIAN_STATES[selectedState] : [];

  // Count active filters
  let activeCount = 0;
  if (selectedState !== "all") activeCount++;
  if (selectedCategory !== "all") activeCount++;
  if (selectedPriceTier !== "all") activeCount++;
  if (selectedMinRating !== "0") activeCount++;
  if (verifiedOnly) activeCount++;

  const handleApply = () => {
    const params = new URLSearchParams();
    if (currentParams.q) params.set("q", currentParams.q);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedState !== "all") params.set("state", selectedState);
    if (selectedLga !== "all") params.set("lga", selectedLga);
    if (selectedPriceTier !== "all") params.set("priceTier", selectedPriceTier);
    if (selectedMinRating !== "0") params.set("minRating", selectedMinRating);
    if (verifiedOnly) params.set("verifiedOnly", "true");
    if (currentParams.sortBy) params.set("sortBy", currentParams.sortBy);
    params.set("page", "1");

    setIsOpen(false);
    router.push(`/search?${params.toString()}`);
  };

  const handleReset = () => {
    setSelectedState("all");
    setSelectedLga("all");
    setSelectedCategory("all");
    setSelectedPriceTier("all");
    setSelectedMinRating("0");
    setVerifiedOnly(false);
  };

  return (
    <>
      {/* Mobile Filter Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-white transition-all active:scale-95"
      >
        <SlidersHorizontal className="h-3.5 w-3.5 text-[#0B6E4F]" />
        <span>Filters</span>
        {activeCount > 0 && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0B6E4F] text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {/* Drawer Overlay & Modal Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200">
          <div className="relative max-h-[85vh] w-full rounded-t-3xl bg-white p-5 pb-8 shadow-2xl overflow-y-auto dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom duration-250">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#0B6E4F]" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Filter Businesses
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-slate-500 hover:text-[#0B6E4F] flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Filter Options */}
            <div className="space-y-5 pt-4 text-xs">
              
              {/* Category */}
              <div>
                <label className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      selectedCategory === "all"
                        ? "bg-[#0B6E4F] text-white"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                        selectedCategory === c.slug
                          ? "bg-[#0B6E4F] text-white"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* State & LGA */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                  Nigerian State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    const lgas = NIGERIAN_STATES[e.target.value] || [];
                    setSelectedLga(lgas[0] || "all");
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm font-medium text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="all">All States</option>
                  {stateNames.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                {availableLgas.length > 0 && (
                  <div className="mt-3">
                    <label className="font-semibold text-slate-500 block mb-1">
                      Local Government Area (LGA)
                    </label>
                    <select
                      value={selectedLga}
                      onChange={(e) => setSelectedLga(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm font-medium text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="all">All LGAs</option>
                      {availableLgas.map((lga) => (
                        <option key={lga} value={lga}>
                          {lga}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Price Tier */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                  Price Tier
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["all", "BUDGET", "MODERATE", "EXPENSIVE", "LUXURY"] as const).map((tier) => {
                    const label = tier === "all" ? "All" : PRICE_TIERS[tier].label;
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setSelectedPriceTier(tier)}
                        className={`py-2 rounded-xl text-center font-bold transition-all ${
                          selectedPriceTier === tier
                            ? "bg-[#0B6E4F] text-white shadow-xs"
                            : "border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                  Rating
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Any Rating", val: "0" },
                    { label: "4.5 & Above", val: "4.5" },
                    { label: "4.0 & Above", val: "4.0" },
                    { label: "3.5 & Above", val: "3.5" },
                  ].map((r) => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => setSelectedMinRating(r.val)}
                      className={`py-2 px-3 rounded-xl text-left font-semibold transition-all ${
                        selectedMinRating === r.val
                          ? "bg-[#E8F5EE] text-[#0B6E4F] border border-[#0B6E4F]/40 font-bold dark:bg-slate-800 dark:text-[#10B981]"
                          : "border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Only */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    verifiedOnly
                      ? "bg-[#E8F5EE] text-[#0B6E4F] border-[#0B6E4F]/40 font-bold dark:bg-slate-800 dark:text-[#10B981]"
                      : "border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#0B6E4F]" />
                    <span>Verified Businesses Only</span>
                  </div>
                  {verifiedOnly && <Check className="h-4 w-4" />}
                </button>
              </div>

            </div>

            {/* Bottom Apply Bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-900">
              <button
                type="button"
                onClick={handleApply}
                className="btn-press w-full rounded-xl bg-[#0B6E4F] py-3 text-sm font-bold text-white shadow-md active:scale-95 transition-all"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

