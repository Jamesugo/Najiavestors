"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight } from "lucide-react";

interface SearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  className?: string;
  compact?: boolean;
}

export function SearchBar({
  initialQuery = "",
  initialLocation = "",
  className = "",
  compact = false,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex flex-col sm:flex-row items-stretch rounded-2xl sm:rounded-full bg-white p-2 shadow-xl shadow-slate-900/10 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 ${className}`}
    >
      {/* What input */}
      <div className="flex flex-1 items-center gap-3 px-3 py-2 sm:py-2.5 sm:border-r border-slate-200 dark:border-slate-800">
        <Search className="h-5 w-5 text-[#0B6E4F] flex-shrink-0" />
        <div className="flex flex-col flex-1 text-left">
          {!compact && (
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Find
            </label>
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Restaurants, dentists, co-working, bukas..."
            className="w-full bg-transparent text-sm sm:text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white"
          />
        </div>
      </div>

      {/* Near Location input */}
      <div className="flex flex-1 items-center gap-3 px-3 py-2 sm:py-2.5 mt-1 sm:mt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
        <MapPin className="h-5 w-5 text-[#F5B700] flex-shrink-0" />
        <div className="flex flex-col flex-1 text-left">
          {!compact && (
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Near
            </label>
          )}
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Lagos, Abuja, Port Harcourt, Ikeja..."
            className="w-full bg-transparent text-sm sm:text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-press flex items-center justify-center gap-2 rounded-xl sm:rounded-full bg-[#0B6E4F] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#08563D] active:scale-95 dark:bg-[#10B981] dark:hover:bg-[#059669] flex-shrink-0 mt-2 sm:mt-0 w-full sm:w-auto"
      >
        <span>Search</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
