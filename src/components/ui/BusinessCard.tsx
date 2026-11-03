import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, MessageCircle, ShieldCheck, ExternalLink } from "lucide-react";
import { BusinessItem } from "@/data/mock-businesses";
import { StarRating } from "@/components/ui/StarRating";
import { PRICE_TIERS, getWhatsAppLink } from "@/data/nigeria-data";

interface BusinessCardProps {
  business: BusinessItem;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const priceLabel = PRICE_TIERS[business.priceTier]?.label || "₦₦";
  const whatsappUrl = getWhatsAppLink(business.whatsapp || business.phone, business.name);
  const photo = business.photos[0] || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80";

  return (
    <article className="card-hover-lift group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-all dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:shadow-md">
      
      {/* Thumbnail */}
      <Link href={`/biz/${business.slug}`} className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={photo}
          alt={business.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="rounded-full bg-slate-900/80 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-md">
            {business.categoryName}
          </span>
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-slate-800 backdrop-blur-md dark:bg-slate-900/90 dark:text-white">
            {priceLabel}
          </span>
        </div>

        {business.verified && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-[#0B6E4F] px-2.5 py-0.5 text-xs font-medium text-white shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified</span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/biz/${business.slug}`} className="block">
            <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-[#0B6E4F] dark:text-white dark:group-hover:text-[#10B981] transition-colors">
              {business.name}
            </h3>
          </Link>
        </div>

        {/* Rating */}
        <div className="mt-2">
          <StarRating rating={business.rating} reviewCount={business.reviewCount} size="sm" />
        </div>

        {/* Tagline / Snippet */}
        <p className="mt-2 text-xs text-slate-600 line-clamp-2 dark:text-slate-400 leading-relaxed">
          {business.tagline || business.description}
        </p>

        {/* Location Info */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1 truncate">
            <MapPin className="h-3.5 w-3.5 text-[#0B6E4F] flex-shrink-0" />
            <span className="truncate">
              {business.city}, {business.state}
            </span>
          </div>

          {/* Quick Contact Buttons */}
          <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
            <a
              href={`tel:${business.phone}`}
              className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label={`Call ${business.name}`}
              title="Call Business"
            >
              <Phone className="h-3.5 w-3.5" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366]/15 p-1.5 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              aria-label={`WhatsApp ${business.name}`}
              title="Chat on WhatsApp"
            >
              <MessageCircle className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

      </div>
    </article>
  );
}

