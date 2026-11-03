"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ReviewFormProps {
  businessId: string;
  businessName: string;
}

export function ReviewForm({ businessId, businessName }: ReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [userCity, setUserCity] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId,
          userName: userName.trim(),
          userCity: userCity.trim(),
          rating,
          content: content.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setSuccess(true);
      setContent("");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-xl bg-[#E8F5EE] p-5 text-center text-[#0B6E4F] dark:bg-emerald-950/40 dark:text-emerald-300">
        <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
        <h4 className="font-bold text-sm">Review Submitted Successfully!</h4>
        <p className="text-xs mt-1">Thank you for helping others make informed decisions.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-3 text-xs font-semibold underline"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
        Write a Review for {businessName}
      </h3>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 dark:bg-red-950/50 dark:text-red-300">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Interactive Stars */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Select Your Rating
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110 focus:outline-none"
              aria-label={`Rate ${star} star`}
            >
              <Star
                className={`h-6 w-6 ${
                  (hoverRating || rating) >= star
                    ? "fill-[#F5B700] text-[#F5B700]"
                    : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            {rating} of 5 stars
          </span>
        </div>
      </div>

      {/* Name and City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Your Name
          </label>
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Babatunde Ogunlesi"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            City / State
          </label>
          <input
            type="text"
            required
            value={userCity}
            onChange={(e) => setUserCity(e.target.value)}
            placeholder="e.g. Lekki, Lagos"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Review Content */}
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
          Your Experience &amp; Feedback
        </label>
        <textarea
          rows={3}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What did you like or dislike? How was the service, taste, pricing, or atmosphere?"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-press inline-flex items-center gap-2 rounded-xl bg-[#0B6E4F] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#08563D] disabled:opacity-50 transition-colors"
      >
        <Send className="h-3.5 w-3.5" />
        <span>{isSubmitting ? "Submitting..." : "Post Review"}</span>
      </button>
    </form>
  );
}

