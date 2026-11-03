"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Search,
  PlusCircle,
  Menu,
  X,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Building2,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#0B6E4F] text-white shadow-md shadow-[#0B6E4F]/20 transition-transform active:scale-95 group-hover:scale-105">
              <span className="text-lg sm:text-xl font-black tracking-tight">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                Najia<span className="text-[#0B6E4F] dark:text-[#10B981]">vestors</span>
              </span>
              <span className="hidden min-[420px]:block text-[9px] sm:text-[10px] font-medium tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Nigeria Directory
              </span>
            </div>
          </Link>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Link
              href="/search?category=restaurants"
              className="hover:text-[#0B6E4F] dark:hover:text-[#10B981] transition-colors"
            >
              Restaurants & Bukas
            </Link>
            <Link
              href="/search?category=hotels"
              className="hover:text-[#0B6E4F] dark:hover:text-[#10B981] transition-colors"
            >
              Hotels
            </Link>
            <Link
              href="/search?category=coworking"
              className="hover:text-[#0B6E4F] dark:hover:text-[#10B981] transition-colors"
            >
              Tech & Co-working
            </Link>
            <Link
              href="/search?category=shopping"
              className="hover:text-[#0B6E4F] dark:hover:text-[#10B981] transition-colors"
            >
              Fashion
            </Link>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quick Search Shortcut */}
          <Link
            href="/search"
            className="flex items-center justify-center h-9 w-9 sm:h-auto sm:w-auto rounded-full sm:rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-[#0B6E4F] hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:px-3 sm:py-1.5 sm:text-xs"
            aria-label="Search directory"
          >
            <Search className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            <span className="hidden sm:inline ml-1.5">Search</span>
          </Link>

          {/* Add Business Button (Desktop & Tablet) */}
          <Link
            href="/add-business"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#0B6E4F]/30 bg-[#E8F5EE] px-3.5 py-2 text-xs font-semibold text-[#0B6E4F] transition-all hover:bg-[#0B6E4F] hover:text-white dark:border-[#10B981]/40 dark:bg-slate-800 dark:text-[#10B981] dark:hover:bg-[#10B981] dark:hover:text-white"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Business</span>
          </Link>

          {/* User Auth State */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1 sm:pr-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white transition-colors"
                aria-label="User account menu"
              >
                <div className="relative h-7 w-7 rounded-lg overflow-hidden bg-[#0B6E4F] text-white flex items-center justify-center text-xs font-bold">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold leading-tight truncate max-w-[90px]">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-[#0B6E4F] dark:text-[#10B981] font-semibold leading-none">
                    {user.role === "ADMIN" ? "Admin" : user.role === "BUSINESS_OWNER" ? "Owner" : "Patron"}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50 text-xs"
                >
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <span className="mt-1 inline-block rounded-sm bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-[#0B6E4F] dark:bg-slate-800 dark:text-[#10B981]">
                      {user.role.replace("_", " ")}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/add-business"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <PlusCircle className="h-4 w-4 text-[#0B6E4F]" />
                      <span>Add New Business</span>
                    </Link>

                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <ShieldCheck className="h-4 w-4 text-blue-500" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <Link
                      href="/claim-business"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Building2 className="h-4 w-4 text-amber-500" />
                      <span>Claim a Listing</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 font-semibold"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg bg-[#0B6E4F] px-3 sm:px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#08563D] dark:bg-[#10B981] dark:hover:bg-[#059669]"
            >
              <UserIcon className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button (44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-slate-600 hover:bg-slate-100 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 md:hidden shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl p-3 text-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
            >
              <div className="flex items-center gap-2.5">
                <Search className="h-4 w-4 text-[#0B6E4F]" />
                <span className="font-bold">Explore All Businesses</span>
              </div>
              <span className="text-xs text-slate-400">36 States</span>
            </Link>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/search?category=restaurants"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-slate-200/80 p-2.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300"
              >
                🍲 Bukas &amp; Grills
              </Link>
              <Link
                href="/search?category=hotels"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-slate-200/80 p-2.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300"
              >
                🏨 Hotels &amp; Stays
              </Link>
              <Link
                href="/search?category=coworking"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-slate-200/80 p-2.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300"
              >
                💻 Tech Co-work
              </Link>
              <Link
                href="/search?category=shopping"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-slate-200/80 p-2.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300"
              >
                👗 Bespoke Fashion
              </Link>
            </div>

            <Link
              href="/add-business"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0B6E4F] p-3 text-white font-bold text-xs shadow-sm mt-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span>List Your Business (Free)</span>
            </Link>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 p-2 hover:text-[#0B6E4F]"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Admin Console</span>
              </Link>

              <Link
                href="/claim-business"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 p-2 hover:text-[#0B6E4F]"
              >
                <Building2 className="h-4 w-4" />
                <span>Claim Listing</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
