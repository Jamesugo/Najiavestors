export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950">
      {/* Sticky search bar skeleton */}
      <div className="sticky top-14 sm:top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 px-4 py-3">
        <div className="mx-auto max-w-7xl">
          <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-20">
        {/* Filter bar skeleton */}
        <div className="flex items-center gap-2 mb-5">
          <div className="h-9 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-9 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-9 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700 hidden sm:block" />
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar skeleton */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                  ))}
                </div>
              ))}
            </div>
          </aside>

          {/* Results skeleton */}
          <main className="flex-1 min-w-0">
            <div className="h-5 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="h-44 sm:h-48 animate-pulse bg-slate-200 dark:bg-slate-700" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                    <div className="flex gap-2 pt-1">
                      <div className="h-9 flex-1 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
                      <div className="h-9 flex-1 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

