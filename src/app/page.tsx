import Link from "next/link";
import {
  Utensils,
  Beer,
  Hotel,
  Laptop,
  ShoppingBag,
  HeartPulse,
  Car,
  Home,
  CheckCircle2,
  TrendingUp,
  Clock,
  MessageSquare,
  ShieldCheck,
  Building2,
  Users,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { BusinessCard } from "@/components/ui/BusinessCard";
import { StarRating } from "@/components/ui/StarRating";
import {
  getTrendingBusinesses,
  getRecentlyAdded,
  getCategoriesWithCounts,
} from "@/lib/services/business-service";

// Map category icons to Lucide components
const categoryIconMap: Record<string, React.ElementType> = {
  Utensils,
  Beer,
  Hotel,
  Laptop,
  ShoppingBag,
  HeartPulse,
  Car,
  Home,
};

export default async function HomePage() {
  const [trending, recentlyAdded, categories] = await Promise.all([
    getTrendingBusinesses(6),
    getRecentlyAdded(4),
    getCategoriesWithCounts(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-[#0B6E4F] to-[#08563D] text-white pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-100 backdrop-blur-md mb-6 border border-white/15">
            <Sparkles className="h-3.5 w-3.5 text-[#F5B700]" />
            <span>Nigeria&apos;s Most Trusted Business Directory &amp; Yelp</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
            Discover Top Vetted Businesses in{" "}
            <span className="text-[#F5B700] underline decoration-[#F5B700]/40 underline-offset-8">
              Nigeria
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            From Lagos seafood bukas and Abuja garden lounges to Port Harcourt grills and tech co-working spaces — find real reviews, photos, and direct WhatsApp links.
          </p>

          {/* Hero Search Bar */}
          <div className="mt-8 max-w-3xl mx-auto">
            <SearchBar />
          </div>

          {/* Quick Trending Searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-100/90">
            <span className="font-semibold text-white">Popular:</span>
            <Link
              href="/search?q=Amala"
              className="rounded-full bg-white/15 px-3 py-1 hover:bg-white/25 transition-colors"
            >
              Amala Bodija
            </Link>
            <Link
              href="/search?category=restaurants&state=Lagos"
              className="rounded-full bg-white/15 px-3 py-1 hover:bg-white/25 transition-colors"
            >
              Seafood Okro VI
            </Link>
            <Link
              href="/search?category=coworking"
              className="rounded-full bg-white/15 px-3 py-1 hover:bg-white/25 transition-colors"
            >
              Yaba Tech Hubs
            </Link>
            <Link
              href="/search?category=hotels&state=FCT"
              className="rounded-full bg-white/15 px-3 py-1 hover:bg-white/25 transition-colors"
            >
              Maitama Stays
            </Link>
            <Link
              href="/search?category=home-services"
              className="rounded-full bg-white/15 px-3 py-1 hover:bg-white/25 transition-colors"
            >
              Solar Engineers
            </Link>
          </div>
        </div>

        {/* Highlight Stats Bar */}
        <div className="relative mx-auto max-w-5xl mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">36 + FCT</div>
            <div className="text-xs text-emerald-200 mt-0.5">States Covered</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#F5B700]">10,000+</div>
            <div className="text-xs text-emerald-200 mt-0.5">Verified Listings</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">100% Free</div>
            <div className="text-xs text-emerald-200 mt-0.5">WhatsApp Direct Chat</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">4.8 / 5.0</div>
            <div className="text-xs text-emerald-200 mt-0.5">Community Trust Score</div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight dark:text-white">
              Explore Top Categories
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Hand-picked sectors tailored to everyday Nigerian lifestyle and commerce
            </p>
          </div>
          <Link
            href="/search"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#0B6E4F] hover:underline dark:text-[#10B981]"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = categoryIconMap[cat.icon] || Building2;
            return (
              <Link
                key={cat.slug}
                href={`/search?category=${cat.slug}`}
                className="card-hover-lift group flex flex-col p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-[#0B6E4F]/40 dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#0B6E4F] group-hover:bg-[#0B6E4F] group-hover:text-white transition-colors dark:bg-slate-800 dark:text-[#10B981] dark:group-hover:bg-[#10B981] dark:group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-[#0B6E4F] dark:text-white dark:group-hover:text-[#10B981] transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
                  {cat.description}
                </p>
                <span className="mt-3 text-[11px] font-semibold text-[#0B6E4F] dark:text-[#10B981]">
                  {cat.count}+ places
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. TRENDING BUSINESSES */}
      <section className="py-12 sm:py-16 bg-slate-100/60 dark:bg-slate-900/40 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B6E4F] dark:text-[#10B981]">
                <TrendingUp className="h-4 w-4" />
                <span>Popular Right Now</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight dark:text-white">
                Trending Businesses in Nigeria
              </h2>
            </div>
            <Link
              href="/search?sortBy=reviews"
              className="text-sm font-semibold text-[#0B6E4F] hover:underline dark:text-[#10B981] flex items-center gap-1"
            >
              <span>See more</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((biz) => (
              <BusinessCard key={biz.id} business={biz} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECENTLY ADDED */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              <span>Fresh Additions</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight dark:text-white">
              Recently Added &amp; Verified
            </h2>
          </div>
          <Link
            href="/search?sortBy=newest"
            className="text-sm font-semibold text-[#0B6E4F] hover:underline dark:text-[#10B981] flex items-center gap-1"
          >
            <span>Explore all</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyAdded.map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
      </section>

      {/* 5. RECENT REVIEWS SHOWCASE */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight dark:text-white">
              Recent Reviews from the Community
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Authentic feedback from verified customers across Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={5} showNumber={false} size="sm" />
                <span className="text-xs text-slate-400">2 days ago</span>
              </div>
              <p className="text-sm text-slate-700 italic dark:text-slate-300">
                &ldquo;The best Seafood Okro in Lagos! The atmosphere is genuinely authentic and the art gallery upstairs makes it a complete cultural experience.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Chidinma Okoro</span>
                  <span className="block text-slate-400">Lekki, Lagos</span>
                </div>
                <Link
                  href="/biz/terra-kulture-restaurant-victoria-island"
                  className="font-semibold text-[#0B6E4F] hover:underline dark:text-[#10B981]"
                >
                  Terra Kulture
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={5} showNumber={false} size="sm" />
                <span className="text-xs text-slate-400">Yesterday</span>
              </div>
              <p className="text-sm text-slate-700 italic dark:text-slate-300">
                &ldquo;Words cannot describe the texture of the amala. Get the ogufe (goat meat) and fresh ewedu! A must-visit whenever in Oyo state.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Kayode Adeleke</span>
                  <span className="block text-slate-400">Ring Road, Ibadan</span>
                </div>
                <Link
                  href="/biz/amala-skye-bodija-ibadan"
                  className="font-semibold text-[#0B6E4F] hover:underline dark:text-[#10B981]"
                >
                  Amala Skye
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={5} showNumber={false} size="sm" />
                <span className="text-xs text-slate-400">4 days ago</span>
              </div>
              <p className="text-sm text-slate-700 italic dark:text-slate-300">
                &ldquo;If you come to Port Harcourt and don&apos;t eat here, you haven&apos;t arrived! The spicy pepper sauce and charcoal fish are completely unmatched.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Tari Briggs</span>
                  <span className="block text-slate-400">Old GRA, Port Harcourt</span>
                </div>
                <Link
                  href="/biz/bole-king-port-harcourt-gra"
                  className="font-semibold text-[#0B6E4F] hover:underline dark:text-[#10B981]"
                >
                  Bole King
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BUSINESS OWNER CALLOUT BANNER */}
      <section className="bg-[#E8F5EE] dark:bg-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-[#0B6E4F]/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0B6E4F]/10 px-3 py-1 text-xs font-semibold text-[#0B6E4F] dark:text-[#10B981] mb-3">
              <ShieldCheck className="h-4 w-4" />
              <span>For Nigerian Business Owners</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Get Your Business Discovered by Thousands of Customers
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Claim or create your free listing today. Add photos, opening hours, WhatsApp click-to-chat, and build trustworthy social proof through verified customer reviews.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <Link
              href="/add-business"
              className="btn-press w-full sm:w-auto text-center rounded-xl bg-[#0B6E4F] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#08563D] transition-colors"
            >
              List Business (Free)
            </Link>
            <Link
              href="/claim-business"
              className="btn-press w-full sm:w-auto text-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white transition-colors"
            >
              Claim Listing
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
