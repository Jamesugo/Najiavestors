import Link from "next/link";
import {
  Filter,
  SlidersHorizontal,
  MapPin,
  Search as SearchIcon,
  RotateCcw,
  ShieldCheck,
  Map as MapIcon,
  List as ListIcon,
  ChevronDown,
} from "lucide-react";
import { BusinessCard } from "@/components/ui/BusinessCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { getBusinesses, getCategoriesWithCounts } from "@/lib/services/business-service";
import { NIGERIAN_STATES, PRICE_TIERS } from "@/data/nigeria-data";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    location?: string;
    category?: string;
    state?: string;
    lga?: string;
    minRating?: string;
    priceTier?: string;
    verifiedOnly?: string;
    sortBy?: "relevance" | "rating" | "reviews" | "newest";
    page?: string;
    view?: "list" | "map";
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const location = params.location || "";
  const selectedCategory = params.category || "all";
  const selectedState = params.state || (location && NIGERIAN_STATES[location] ? location : "all");
  const selectedLga = params.lga || "all";
  const minRating = params.minRating ? parseFloat(params.minRating) : 0;
  const priceTier = params.priceTier || "all";
  const verifiedOnly = params.verifiedOnly === "true";
  const sortBy = params.sortBy || "relevance";
  const currentPage = parseInt(params.page || "1", 10);
  const viewMode = params.view || "list";

  const [categories, searchData] = await Promise.all([
    getCategoriesWithCounts(),
    getBusinesses({
      query: query || (location && !NIGERIAN_STATES[location] ? location : undefined),
      category: selectedCategory,
      state: selectedState,
      lga: selectedLga,
      minRating,
      priceTier,
      verifiedOnly,
      sortBy,
      page: currentPage,
      limit: 12,
    }),
  ]);

  const { businesses, total, totalPages } = searchData;
  const stateNames = Object.keys(NIGERIAN_STATES).sort();
  const availableLgas = selectedState !== "all" && NIGERIAN_STATES[selectedState] ? NIGERIAN_STATES[selectedState] : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      
      {/* Top Search Bar Header */}
      <div className="border-b border-slate-200 bg-white py-4 px-4 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <div className="w-full flex-1">
            <SearchBar initialQuery={query} initialLocation={location} compact />
          </div>

          {/* Quick Stats & View Switcher */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">{total}</strong> results found
            </span>

            {/* List / Map toggle */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-700 dark:bg-slate-800">
              <Link
                href={`/search?${new URLSearchParams({ ...params, view: "list" }).toString()}`}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === "list"
                    ? "bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <ListIcon className="h-3.5 w-3.5" />
                <span>List</span>
              </Link>
              <Link
                href={`/search?${new URLSearchParams({ ...params, view: "map" }).toString()}`}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  viewMode === "map"
                    ? "bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <MapIcon className="h-3.5 w-3.5" />
                <span>Map</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                  <SlidersHorizontal className="h-4 w-4 text-[#0B6E4F]" />
                  <span>Filters</span>
                </div>
                <Link
                  href="/search"
                  className="text-xs font-medium text-slate-500 hover:text-[#0B6E4F] dark:hover:text-[#10B981] flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </Link>
              </div>

              {/* Category Filter */}
              <div className="mt-5">
                <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                  Category
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  <Link
                    href={`/search?${new URLSearchParams({ ...params, category: "all", page: "1" }).toString()}`}
                    className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                      selectedCategory === "all"
                        ? "bg-[#E8F5EE] text-[#0B6E4F] font-bold dark:bg-slate-800 dark:text-[#10B981]"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[10px] text-slate-400">50+</span>
                  </Link>

                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/search?${new URLSearchParams({ ...params, category: cat.slug, page: "1" }).toString()}`}
                      className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                        selectedCategory === cat.slug
                          ? "bg-[#E8F5EE] text-[#0B6E4F] font-bold dark:bg-slate-800 dark:text-[#10B981]"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] text-slate-400">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Nigerian State Filter */}
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                  State (All 36 + FCT)
                </label>
                <form action="/search" method="GET">
                  {/* Keep other params */}
                  {query && <input type="hidden" name="q" value={query} />}
                  {selectedCategory !== "all" && <input type="hidden" name="category" value={selectedCategory} />}
                  
                  <select
                    name="state"
                    defaultValue={selectedState}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="all">All States</option>
                    {stateNames.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  {/* LGA dropdown if state selected */}
                  {availableLgas.length > 0 && (
                    <div className="mt-3">
                      <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                        Select LGA
                      </label>
                      <select
                        name="lga"
                        defaultValue={selectedLga}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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

                  <button
                    type="submit"
                    className="mt-3 w-full rounded-lg bg-slate-900 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors"
                  >
                    Apply Location
                  </button>
                </form>
              </div>

              {/* Price Tier Filter */}
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                  Price Tier
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["all", "BUDGET", "MODERATE", "EXPENSIVE", "LUXURY"] as const).map((tier) => {
                    const label = tier === "all" ? "All" : PRICE_TIERS[tier].label;
                    return (
                      <Link
                        key={tier}
                        href={`/search?${new URLSearchParams({ ...params, priceTier: tier, page: "1" }).toString()}`}
                        className={`text-center py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          priceTier === tier
                            ? "bg-[#0B6E4F] text-white"
                            : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                  Rating
                </label>
                <div className="space-y-1.5">
                  {[
                    { label: "Any Rating", val: "0" },
                    { label: "4.5 & Above", val: "4.5" },
                    { label: "4.0 & Above", val: "4.0" },
                    { label: "3.5 & Above", val: "3.5" },
                  ].map((r) => (
                    <Link
                      key={r.val}
                      href={`/search?${new URLSearchParams({ ...params, minRating: r.val, page: "1" }).toString()}`}
                      className={`block px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        params.minRating === r.val || (!params.minRating && r.val === "0")
                          ? "bg-[#E8F5EE] text-[#0B6E4F] font-bold dark:bg-slate-800 dark:text-[#10B981]"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Verified Filter */}
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={`/search?${new URLSearchParams({
                    ...params,
                    verifiedOnly: verifiedOnly ? "false" : "true",
                    page: "1",
                  }).toString()}`}
                  className={`flex items-center gap-2 rounded-xl p-2.5 text-xs font-semibold transition-colors ${
                    verifiedOnly
                      ? "bg-emerald-50 text-[#0B6E4F] border border-[#0B6E4F]/30 dark:bg-slate-800 dark:text-[#10B981]"
                      : "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 text-[#0B6E4F]" />
                  <span>Verified Listings Only</span>
                </Link>
              </div>

            </div>
          </aside>

          {/* MAIN RESULTS FEED */}
          <main className="lg:col-span-3">
            
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {query ? (
                  <span>
                    Results for &ldquo;<strong className="text-slate-900 dark:text-white">{query}</strong>&rdquo;
                  </span>
                ) : (
                  <span>Showing all Nigerian business listings</span>
                )}
                {selectedState !== "all" && (
                  <span className="ml-1 inline-flex items-center gap-1 text-xs text-[#0B6E4F] font-bold">
                    in {selectedState}
                  </span>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Sort by:</span>
                <div className="flex items-center gap-1">
                  {[
                    { label: "Recommended", val: "relevance" },
                    { label: "Highest Rated", val: "rating" },
                    { label: "Most Reviews", val: "reviews" },
                  ].map((s) => (
                    <Link
                      key={s.val}
                      href={`/search?${new URLSearchParams({ ...params, sortBy: s.val, page: "1" }).toString()}`}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        sortBy === s.val
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                          : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                      }`}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* MAP VIEW */}
            {viewMode === "map" && (
              <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#0B6E4F]" />
                    Interactive Directory Map (OpenStreetMap Nigeria)
                  </span>
                  <span>{businesses.length} pins loaded</span>
                </div>
                
                {/* Visual OpenStreetMap container */}
                <div className="relative h-72 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <iframe
                    title="Nigeria Directory Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=2.6,4.2,14.6,13.8&layer=mapnik`}
                    className="opacity-80"
                  />
                  <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-md backdrop-blur-md dark:bg-slate-900/95 dark:text-white">
                    📍 Showing businesses across Nigeria
                  </div>
                </div>
              </div>
            )}

            {/* RESULTS GRID / LIST */}
            {businesses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {businesses.map((biz) => (
                  <BusinessCard key={biz.id} business={biz} />
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mx-auto dark:bg-slate-800">
                  <SearchIcon className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  No businesses found
                </h3>
                <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto dark:text-slate-400">
                  We couldn&apos;t find any businesses matching your exact search filters. Try broadening your location or resetting filters.
                </p>
                <div className="mt-6">
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0B6E4F] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#08563D] transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset All Filters</span>
                  </Link>
                </div>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  const isCurrent = pNum === currentPage;
                  return (
                    <Link
                      key={pNum}
                      href={`/search?${new URLSearchParams({ ...params, page: pNum.toString() }).toString()}`}
                      className={`h-9 w-9 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                        isCurrent
                          ? "bg-[#0B6E4F] text-white shadow-sm"
                          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                      }`}
                    >
                      {pNum}
                    </Link>
                  );
                })}
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

