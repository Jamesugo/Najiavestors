import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  Phone,
  MessageCircle,
  Globe,
  Clock,
  ShieldCheck,
  Star,
  Share2,
  Bookmark,
  ThumbsUp,
  Flag,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Camera,
} from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { getBusinessBySlug } from "@/lib/services/business-service";
import { PRICE_TIERS, getWhatsAppLink } from "@/data/nigeria-data";
import { ReviewForm } from "@/components/reviews/ReviewForm";

interface BusinessPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    return { title: "Business Not Found | Najiavestors" };
  }

  return {
    title: `${business.name} - Reviews, Photos & Phone | Najiavestors`,
    description: `${business.description.slice(0, 160)}... Located in ${business.city}, ${business.state}.`,
    openGraph: {
      title: `${business.name} | Najiavestors Nigeria Directory`,
      description: business.tagline || business.description,
      images: business.photos[0] ? [{ url: business.photos[0] }] : [],
    },
  };
}

export default async function BusinessDetailPage({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const priceLabel = PRICE_TIERS[business.priceTier]?.label || "₦₦";
  const priceName = PRICE_TIERS[business.priceTier]?.name || "Moderate";
  const whatsappUrl = getWhatsAppLink(business.whatsapp || business.phone, business.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    image: business.photos,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.state,
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.latitude,
      longitude: business.longitude,
    },
    url: business.website || `https://najiavestors.ng/biz/${business.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
    },
    priceRange: priceLabel,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-28 md:pb-20">
      
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. PHOTO GALLERY HERO */}
      <section className="bg-slate-900 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Single large hero image with count badge */}
          <div className="block md:hidden relative h-56 w-full bg-slate-800">
            <Image
              src={business.photos[0] || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"}
              alt={business.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
              <Camera className="h-3.5 w-3.5" />
              <span>{business.photos.length} photos</span>
            </div>
          </div>

          {/* Desktop: 3-column collage */}
          <div className="hidden md:grid grid-cols-3 gap-1 h-80 overflow-hidden">
            {business.photos.slice(0, 3).map((photo, idx) => (
              <div key={idx} className="relative h-full w-full bg-slate-800">
                <Image
                  src={photo}
                  alt={`${business.name} photo ${idx + 1}`}
                  fill
                  sizes="33vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BUSINESS HEADER */}
      <section className="border-b border-slate-200 bg-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {business.categoryName}
              </span>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                {priceLabel} ({priceName})
              </span>
              {business.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F5EE] px-2 py-0.5 text-xs font-semibold text-[#0B6E4F] dark:bg-slate-800 dark:text-[#10B981]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {business.name}
            </h1>

            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
              {business.tagline || business.description}
            </p>

            <div className="mt-2.5 flex items-center gap-3">
              <StarRating rating={business.rating} reviewCount={business.reviewCount} size="md" />
            </div>
          </div>

          {/* Action CTAs (Desktop / Tablet) */}
          <div className="hidden sm:flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press flex-1 md:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#20BA5A] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Chat</span>
            </a>

            <a
              href={`tel:${business.phone}`}
              className="btn-press flex-1 md:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B6E4F] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#08563D] transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </a>

            {!business.claimed && (
              <Link
                href={`/claim-business?slug=${business.slug}`}
                className="btn-press inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <span>Claim</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 3. CONTENT GRID (Details & Reviews) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          
          {/* LEFT 2 COLS: About & Reviews */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-10">
            
            {/* About Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                About {business.name}
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed dark:text-slate-300 whitespace-pre-line">
                {business.description}
              </p>

              {business.website && (
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0B6E4F] hover:underline dark:text-[#10B981]"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Visit Official Website</span>
                  </a>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Customer Reviews
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Ratings &amp; feedback from verified visitors
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <StarRating rating={business.rating} reviewCount={business.reviewCount} size="md" />
                </div>
              </div>

              {/* Review Input Component */}
              <div className="mt-5 pb-6 border-b border-slate-100 dark:border-slate-800">
                <ReviewForm businessId={business.id} businessName={business.name} />
              </div>

              {/* Existing Reviews List */}
              <div className="mt-6 space-y-4 sm:space-y-6">
                {business.reviews.length > 0 ? (
                  business.reviews.map((rev) => (
                    <article
                      key={rev.id}
                      className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-800/50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {rev.userName}
                          </h4>
                          <span className="text-[11px] sm:text-xs text-slate-400">{rev.userCity}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.createdAt}</span>
                      </div>

                      <div className="mt-2">
                        <StarRating rating={rev.rating} showNumber={false} size="sm" />
                      </div>

                      <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed dark:text-slate-300">
                        {rev.content}
                      </p>

                      <div className="mt-3.5 flex items-center justify-between text-xs text-slate-500">
                        <button
                          className="flex items-center gap-1.5 rounded-lg px-2 py-1 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                          title="Vote helpful"
                        >
                          <ThumbsUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400" />
                          <span className="text-[11px]">Helpful ({rev.helpfulCount})</span>
                        </button>

                        <button
                          className="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors"
                          title="Report review"
                        >
                          <Flag className="h-3 w-3" />
                          <span className="text-[11px]">Report</span>
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-500 text-xs sm:text-sm">
                    No customer reviews yet. Be the first to review {business.name}!
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* RIGHT 1 COL: Hours, Location & Contact */}
          <div className="space-y-5 sm:space-y-6">
            
            {/* Location & Map Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2.5">
                Location &amp; Address
              </h3>
              
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <MapPin className="h-4 w-4 text-[#0B6E4F] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {business.address}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {business.lga} LGA, {business.city}, {business.state}
                  </p>
                </div>
              </div>

              {/* Map Embed */}
              <div className="mt-3.5 h-40 sm:h-48 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <iframe
                  title="Business location map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${(business.longitude || 3.4) - 0.01},${(business.latitude || 6.4) - 0.01},${(business.longitude || 3.4) + 0.01},${(business.latitude || 6.4) + 0.01}&layer=mapnik&marker=${business.latitude || 6.4},${business.longitude || 3.4}`}
                />
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${business.name} ${business.address} ${business.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center text-xs font-semibold text-[#0B6E4F] hover:underline dark:text-[#10B981]"
              >
                Get Directions on Google Maps ↗
              </a>
            </div>

            {/* Operating Hours Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-3">
                <Clock className="h-4 w-4 text-[#0B6E4F]" />
                <span>Opening Hours</span>
              </div>

              <div className="space-y-1.5 text-xs">
                {business.hours &&
                  Object.entries(business.hours).map(([day, time]) => (
                    <div
                      key={day}
                      className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-800/60"
                    >
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {day}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">{time}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-3">
                Direct Contact
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <a href={`tel:${business.phone}`} className="font-medium text-slate-800 hover:underline dark:text-slate-200">
                    {business.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#0B6E4F] hover:underline dark:text-[#10B981]"
                  >
                    WhatsApp Click-to-Chat
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. STICKY MOBILE BOTTOM ACTION BAR */}
      <div className="sm:hidden fixed bottom-[max(3.8rem,calc(env(safe-area-inset-bottom)+3.5rem))] left-0 right-0 z-30 p-2.5 bg-white/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 dark:bg-slate-900/95 shadow-lg">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-xs font-bold text-white shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp Chat</span>
          </a>

          <a
            href={`tel:${business.phone}`}
            className="btn-press flex items-center justify-center gap-1.5 rounded-xl bg-[#0B6E4F] py-2.5 px-4 text-xs font-bold text-white shadow-sm"
          >
            <Phone className="h-4 w-4" />
            <span>Call</span>
          </a>
        </div>
      </div>

    </div>
  );
}
