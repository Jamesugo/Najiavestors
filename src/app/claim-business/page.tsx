"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck, CheckCircle2, AlertCircle, Building2, Phone, FileText } from "lucide-react";

function ClaimBusinessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("slug") || "";

  const [businessName, setBusinessName] = useState(
    initialSlug ? initialSlug.replace(/-/g, " ").toUpperCase() : ""
  );
  const [cacNumber, setCacNumber] = useState("");
  const [applicantRole, setApplicantRole] = useState("Owner / CEO");
  const [phone, setPhone] = useState("");
  const [proofUrl, setProofUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 700);
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-[#E8F5EE] p-8 text-center text-[#0B6E4F] dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
        <CheckCircle2 className="h-12 w-12 mx-auto mb-3" />
        <h2 className="text-xl font-bold">Claim Request Submitted!</h2>
        <p className="mt-2 text-xs max-w-md mx-auto text-emerald-800 dark:text-emerald-200">
          Our verification team will review your CAC registration and official contact within 24 hours. You will receive an SMS and WhatsApp confirmation once approved.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 rounded-xl bg-[#0B6E4F] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#08563D] transition-colors"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Business to Claim *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Terra Kulture Restaurant"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              CAC Registration Number (RC / BN) *
            </label>
            <input
              type="text"
              required
              value={cacNumber}
              onChange={(e) => setCacNumber(e.target.value)}
              placeholder="e.g. RC-1498231 or BN-8921"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Your Position at the Company *
            </label>
            <select
              value={applicantRole}
              onChange={(e) => setApplicantRole(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Owner / CEO">Owner / Founder / CEO</option>
              <option value="General Manager">General Manager / Director</option>
              <option value="Marketing Lead">Marketing &amp; PR Lead</option>
              <option value="Authorized Legal Counsel">Authorized Legal Counsel</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Official Verification Phone (Must match business records) *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 08031234567"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Proof of Ownership (CAC Certificate link or Corporate Utility Bill)
          </label>
          <input
            type="url"
            value={proofUrl}
            onChange={(e) => setProofUrl(e.target.value)}
            placeholder="https://drive.google.com/... or Cloudinary URL"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-press w-full rounded-xl bg-[#0B6E4F] py-3 text-xs font-bold text-white shadow-md hover:bg-[#08563D] disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Submitting Request..." : "Submit Claim for Verification"}
        </button>
      </form>
    </div>
  );
}

export default function ClaimBusinessPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-950 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5EE] px-3 py-1 text-xs font-semibold text-[#0B6E4F] dark:bg-slate-800 dark:text-[#10B981] mb-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Official Business Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Claim Your Business Listing
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Verify ownership with your Corporate Affairs Commission (CAC) details to unlock full control, manage opening hours, and respond directly to customer reviews.
          </p>
        </div>

        <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading claim form...</div>}>
          <ClaimBusinessContent />
        </Suspense>
      </div>
    </div>
  );
}
