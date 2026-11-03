import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E8F5EE] text-[#0B6E4F] mb-6 dark:bg-slate-800 dark:text-[#10B981]">
        <Search className="h-10 w-10" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-[#0B6E4F] dark:text-[#10B981]">
        404 — Page Not Found
      </span>
      <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
        Listing or Page Missing
      </h1>
      <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto dark:text-slate-400">
        The Nigerian business listing or page you were looking for might have been moved, renamed, or does not exist yet.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="btn-press inline-flex items-center gap-2 rounded-xl bg-[#0B6E4F] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#08563D] transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/search"
          className="btn-press inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition-colors"
        >
          <Search className="h-4 w-4" />
          <span>Browse All Businesses</span>
        </Link>
      </div>
    </div>
  );
}

