"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, LayoutGrid, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Search", href: "/search", icon: Search },
    { label: "Add", href: "/add-business", icon: PlusCircle, isHighlight: true },
    { label: "Categories", href: "/search?category=all", icon: LayoutGrid },
    { label: isAuthenticated ? "Profile" : "Sign In", href: isAuthenticated ? "/admin" : "/auth/signin", icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 z-40 block w-full border-t border-slate-200/90 bg-white/95 px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/95 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isHighlight) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-6 group"
                aria-label="Add Business"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B6E4F] text-white shadow-lg shadow-[#0B6E4F]/35 transition-transform active:scale-90 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold text-[#0B6E4F] mt-1 dark:text-[#10B981]">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 text-center transition-transform active:scale-95 ${
                isActive
                  ? "text-[#0B6E4F] dark:text-[#10B981] font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
              <span className="text-[10px] mt-0.5 leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
