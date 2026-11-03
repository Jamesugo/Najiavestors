import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  reviewCount?: number;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showNumber = true,
  reviewCount,
}: StarRatingProps) {
  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-semibold",
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <Star
              key={i}
              className={`${iconSizes[size]} ${
                filled
                  ? "fill-[#F5B700] text-[#F5B700]"
                  : half
                  ? "fill-[#F5B700]/50 text-[#F5B700]"
                  : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"
              }`}
            />
          );
        })}
      </div>

      {showNumber && (
        <span className={`font-bold text-slate-800 dark:text-slate-100 ${textSizes[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}
