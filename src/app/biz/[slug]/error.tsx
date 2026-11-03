"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function BusinessError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 pb-32 md:pb-0">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
          <span className="text-4xl">🏪</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Business not found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
          We couldn&apos;t load this business listing. It may have been removed
          or the link might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="rounded-xl bg-[#0B6E4F] px-6 py-3 text-sm font-bold text-white hover:bg-[#08563D] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/search"
            className="rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Browse businesses
          </Link>
        </div>
      </div>
    </div>
  );
}

