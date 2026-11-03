"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { NIGERIAN_STATES, CATEGORIES_LIST, PRICE_TIERS } from "@/data/nigeria-data";

export default function AddBusinessPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    categorySlug: "restaurants",
    categoryName: "Restaurants & Bukas",
    tagline: "",
    description: "",
    priceTier: "MODERATE" as const,
    state: "Lagos",
    lga: "Ikeja",
    city: "Ikeja",
    address: "",
    phone: "",
    whatsapp: "",
    website: "",
    photoUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  });

  const stateNames = Object.keys(NIGERIAN_STATES).sort();
  const availableLgas = NIGERIAN_STATES[formData.state] || [];

  const handleStateChange = (newState: string) => {
    const lgas = NIGERIAN_STATES[newState] || [];
    setFormData((prev) => ({
      ...prev,
      state: newState,
      lga: lgas[0] || "",
    }));
  };

  const handleCategoryChange = (slug: string) => {
    const found = CATEGORIES_LIST.find((c) => c.slug === slug);
    setFormData((prev) => ({
      ...prev,
      categorySlug: slug,
      categoryName: found?.name || "Business",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          photos: [formData.photoUrl],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create business listing");
      }

      router.push(`/biz/${data.business.slug}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-950 pb-24">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5EE] px-3 py-1 text-xs font-semibold text-[#0B6E4F] dark:bg-slate-800 dark:text-[#10B981] mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Free Listing for Nigerian Businesses</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Add Your Business to Najiavestors
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto dark:text-slate-400">
            Reach thousands of daily customers, collect authentic reviews, and receive direct inquiries via WhatsApp.
          </p>

          {/* Stepper Header */}
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4">
            {[
              { num: 1, label: "Basic Info" },
              { num: 2, label: "Location" },
              { num: 3, label: "Contact & Publish" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    step >= s.num
                      ? "bg-[#0B6E4F] text-white"
                      : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {s.num}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {s.label}
                </span>
                {s.num < 3 && <div className="h-0.5 w-6 bg-slate-200 dark:bg-slate-800 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-xs text-red-700 dark:bg-red-950/50 dark:text-red-300">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Multi-step Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-slate-800">
                  Step 1: Business Details
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Bukka Hut Lekki"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Primary Category *
                    </label>
                    <select
                      value={formData.categorySlug}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {CATEGORIES_LIST.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Price Range Tier
                    </label>
                    <select
                      value={formData.priceTier}
                      onChange={(e) => setFormData({ ...formData, priceTier: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {Object.entries(PRICE_TIERS).map(([key, val]) => (
                        <option key={key} value={key}>
                          {val.label} - {val.name} ({val.desc})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Short Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Authentic charcoal-grilled Nigerian suya & chilled drinks"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell patrons about your services, signature dishes or products, atmosphere, and what makes your establishment unique."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.name || !formData.tagline || !formData.description) {
                        setError("Please complete all required fields.");
                        return;
                      }
                      setError(null);
                      setStep(2);
                    }}
                    className="btn-press inline-flex items-center gap-2 rounded-xl bg-[#0B6E4F] px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#08563D]"
                  >
                    <span>Next: Location</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Location */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-slate-800">
                  Step 2: Nigerian Location &amp; Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      State (All 36 + FCT) *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {stateNames.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Local Government Area (LGA) *
                    </label>
                    <select
                      value={formData.lga}
                      onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {availableLgas.map((lga) => (
                        <option key={lga} value={lga}>
                          {lga}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Victoria Island, Bodija, Wuse 2"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. 24 Admiralty Way, Lekki Phase 1"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.address || !formData.city) {
                        setError("Please fill in the street address and city.");
                        return;
                      }
                      setError(null);
                      setStep(3);
                    }}
                    className="btn-press inline-flex items-center gap-2 rounded-xl bg-[#0B6E4F] px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#08563D]"
                  >
                    <span>Next: Contact Info</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact & Submit */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-slate-800">
                  Step 3: Contact Channels &amp; Photos
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Business Phone Number (+234) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 08031234567 or +2348031234567"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      WhatsApp Chat Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="e.g. 08031234567 (for direct chat)"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Website or Social Profile (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yourbusiness.ng"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Photo URL (Cover Image)
                  </label>
                  <input
                    type="url"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-press inline-flex items-center gap-2 rounded-xl bg-[#0B6E4F] px-8 py-3 text-xs font-bold text-white shadow-md hover:bg-[#08563D] disabled:opacity-50 transition-colors"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isSubmitting ? "Publishing Listing..." : "Publish Business (Free)"}</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}
