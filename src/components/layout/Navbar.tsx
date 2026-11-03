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
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6E4F] text-white shadow-md shadow-[#0B6E4F]/20 transition-transform group-hover:scale-105">
              <span className="text-xl font-black tracking-tight">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                Najia<span className="text-[#0B6E4F] dark:text-[#10B981]">vestors</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Nigeria Business Directory
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
        <div className="flex items-center gap-3">
          {/* Quick Search Shortcut */}
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-[#0B6E4F] hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 md:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-slate-500" />
            <span>Search</span>
          </Link>

          {/* Add Business Button */}
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
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 pr-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white transition-colors"
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
                  <span className="text-xs font-bold leading-tight truncate max-w-[100px]">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-[#0B6E4F] dark:text-[#10B981] font-semibold leading-none">
                    {user.role === "ADMIN" ? "Admin" : user.role === "BUSINESS_OWNER" ? "Owner" : "Patron"}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
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
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B6E4F] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#08563D] dark:bg-[#10B981] dark:hover:bg-[#059669]"
            >
              <UserIcon className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 md:hidden">
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span>Explore All Listings</span>
              <Search className="h-4 w-4 text-slate-400" />
            </Link>
            <Link
              href="/search?category=restaurants"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Restaurants & Bukas
            </Link>
            <Link
              href="/search?category=hotels"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Hotels & Stays
            </Link>
            <Link
              href="/search?category=coworking"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Tech & Co-working
            </Link>
            <Link
              href="/add-business"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg bg-[#E8F5EE] px-3 py-2 text-[#0B6E4F] font-semibold dark:bg-slate-800 dark:text-[#10B981]"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Your Business (Free)</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-600 font-semibold text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
