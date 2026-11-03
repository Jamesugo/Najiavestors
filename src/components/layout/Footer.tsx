import Link from "next/link";
import { MapPin, Mail, Phone, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B6E4F] text-white">
                <span className="text-lg font-black">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Najia<span className="text-[#0B6E4F] dark:text-[#10B981]">vestors</span>
              </span>
            </Link>
            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed dark:text-slate-400">
              Nigeria&apos;s premier, mobile-first business directory. Discover, review, and connect directly with vetted restaurants, tech hubs, luxury stays, and services across all 36 States and the FCT.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-800 font-medium dark:bg-emerald-950/60 dark:text-emerald-300">
                🇳🇬 Built for Nigeria
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-800 font-medium dark:bg-amber-950/60 dark:text-amber-300">
                ⭐ Yelp-style Reviews
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-900 uppercase dark:text-white">
              Explore Categories
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/search?category=restaurants" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Restaurants & Bukas
                </Link>
              </li>
              <li>
                <Link href="/search?category=hotels" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Hotels & Stays
                </Link>
              </li>
              <li>
                <Link href="/search?category=coworking" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Tech & Co-working
                </Link>
              </li>
              <li>
                <Link href="/search?category=shopping" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Fashion & Markets
                </Link>
              </li>
              <li>
                <Link href="/search?category=health" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Healthcare & Spas
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Nigerian Hubs */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-900 uppercase dark:text-white">
              Popular Cities
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/search?state=Lagos" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Lagos (VI, Lekki, Ikeja, Yaba)
                </Link>
              </li>
              <li>
                <Link href="/search?state=FCT" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Abuja (Wuse 2, Maitama, Jabi)
                </Link>
              </li>
              <li>
                <Link href="/search?state=Rivers" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Port Harcourt (GRA, Trans-Amadi)
                </Link>
              </li>
              <li>
                <Link href="/search?state=Oyo" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Ibadan (Bodija, Ring Road)
                </Link>
              </li>
              <li>
                <Link href="/search?state=Enugu" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Enugu (Independence Layout)
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Owners */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-900 uppercase dark:text-white">
              For Business Owners
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/add-business" className="font-semibold text-[#0B6E4F] dark:text-[#10B981]">
                  + Add Your Business
                </Link>
              </li>
              <li>
                <Link href="/claim-business" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Claim Your Listing
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-[#0B6E4F] dark:hover:text-[#10B981]">
                  Review Guidelines
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:border-slate-800 gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Najiavestors Directory. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Empowering Nigerian commerce with verified insights.
          </p>
        </div>
      </div>
    </footer>
  );
}
