import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  MessageSquare,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Search,
} from "lucide-react";
import { getBusinesses, getCategoriesWithCounts } from "@/lib/services/business-service";
import { StarRating } from "@/components/ui/StarRating";

export default async function AdminDashboardPage() {
  const [{ businesses, total }, categories] = await Promise.all([
    getBusinesses({ limit: 8 }),
    getCategoriesWithCounts(),
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 dark:bg-slate-950 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B6E4F] uppercase tracking-wider dark:text-[#10B981]">
              <ShieldCheck className="h-4 w-4" />
              <span>Najiavestors Administration Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Admin &amp; Moderation Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/add-business"
              className="rounded-xl bg-[#0B6E4F] px-4 py-2 text-xs font-bold text-white hover:bg-[#08563D] transition-colors"
            >
              + Create Listing
            </Link>
          </div>
        </div>

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase">Total Businesses</span>
              <Building2 className="h-5 w-5 text-[#0B6E4F]" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">50+</div>
            <span className="text-[11px] text-emerald-600 font-medium">Across all 36 States</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase">Active Reviews</span>
              <MessageSquare className="h-5 w-5 text-[#F5B700]" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">1,420</div>
            <span className="text-[11px] text-slate-500 font-medium">98.4% community satisfaction</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase">Pending Claims</span>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">4</div>
            <span className="text-[11px] text-amber-600 font-medium">Requires CAC check</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase">Registered Users</span>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">2,850</div>
            <span className="text-[11px] text-blue-600 font-medium">+142 this week</span>
          </div>
        </div>

        {/* Listings Moderation Table */}
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Business Listings &amp; Claims
              </h2>
              <p className="text-xs text-slate-500">Approve, verify, or review submitted Nigerian businesses</p>
            </div>
            <span className="text-xs text-slate-400">Live directory sync</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider dark:bg-slate-800 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3">Business</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Rating</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {businesses.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{b.name}</div>
                      <div className="text-[10px] text-slate-400">{b.phone}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                      {b.categoryName}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                      {b.city}, {b.state}
                    </td>
                    <td className="px-5 py-3.5">
                      <StarRating rating={b.rating} showNumber size="sm" />
                    </td>
                    <td className="px-5 py-3.5">
                      {b.verified ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Approved</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <Link
                        href={`/biz/${b.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <span>View</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

