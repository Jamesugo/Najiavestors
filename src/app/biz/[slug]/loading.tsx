export default function BusinessLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-32">
      {/* Photo gallery skeleton */}
      <div className="relative">
        <div className="block md:hidden h-64 sm:h-80 animate-pulse bg-slate-200 dark:bg-slate-700" />
        <div className="hidden md:grid grid-cols-3 gap-1 h-72">
          <div className="col-span-2 animate-pulse bg-slate-200 dark:bg-slate-700" />
          <div className="grid grid-rows-2 gap-1">
            <div className="animate-pulse bg-slate-300 dark:bg-slate-600" />
            <div className="animate-pulse bg-slate-300 dark:bg-slate-600" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content skeleton */}
          <main className="flex-1 min-w-0 space-y-6">
            {/* Business header */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="h-9 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-5 w-40 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-5 w-56 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
              <div className="flex gap-3 pt-2">
                <div className="h-12 w-40 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
                <div className="h-12 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>

            {/* About section */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
              <div className="h-5 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>

            {/* Reviews skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="space-y-1">
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                      <div className="h-3 w-16 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </div>
                  <div className="h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </main>

          {/* Sidebar skeleton */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0 space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

