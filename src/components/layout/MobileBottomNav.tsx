"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, LayoutGrid, User } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Search", href: "/search", icon: Search },
    { label: "Add", href: "/add-business", icon: PlusCircle, isHighlight: true },
    { label: "Explore", href: "/search?category=all", icon: LayoutGrid },
    { label: "Account", href: "/auth/signin", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-40 block w-full border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isHighlight) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B6E4F] text-white shadow-lg shadow-[#0B6E4F]/30 transition-transform active:scale-95">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-semibold text-[#0B6E4F] mt-1 dark:text-[#10B981]">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center px-3 py-1 text-center transition-colors ${
                isActive
                  ? "text-[#0B6E4F] dark:text-[#10B981]"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
