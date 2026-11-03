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
} from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { getBusinessBySlug, getBusinesses } from "@/lib/services/business-service";
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

  // JSON-LD LocalBusiness Schema
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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. PHOTO GALLERY HERO */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 h-64 md:h-80 overflow-hidden">
            {business.photos.slice(0, 3).map((photo, idx) => (
              <div key={idx} className="relative h-full w-full bg-slate-800">
                <Image
                  src={photo}
                  alt={`${business.name} photo ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BUSINESS HEADER */}
      <section className="border-b border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {business.categoryName}
              </span>
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                {priceLabel} ({priceName})
              </span>
              {business.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F5EE] px-2.5 py-1 text-xs font-semibold text-[#0B6E4F] dark:bg-slate-800 dark:text-[#10B981]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Business</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {business.name}
            </h1>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium max-w-2xl">
              {business.tagline || business.description}
            </p>

            <div className="mt-3 flex items-center gap-4">
              <StarRating rating={business.rating} reviewCount={business.reviewCount} size="lg" />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press flex-1 md:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#20BA5A] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
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
                <span>Claim Listing</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 3. CONTENT GRID (Details & Reviews) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT 2 COLS: About & Reviews */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* About Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                About {business.name}
              </h2>
              <p className="mt-4 text-sm text-slate-700 leading-relaxed dark:text-slate-300 whitespace-pre-line">
                {business.description}
              </p>

              {business.website && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B6E4F] hover:underline dark:text-[#10B981]"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Visit Official Website</span>
                  </a>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Customer Reviews
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Ratings &amp; authentic feedback from verified visitors
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <StarRating rating={business.rating} reviewCount={business.reviewCount} size="md" />
                </div>
              </div>

              {/* Review Input Component */}
              <div className="mt-6 pb-8 border-b border-slate-100 dark:border-slate-800">
                <ReviewForm businessId={business.id} businessName={business.name} />
              </div>

              {/* Existing Reviews List */}
              <div className="mt-8 space-y-6">
                {business.reviews.length > 0 ? (
                  business.reviews.map((rev) => (
                    <article
                      key={rev.id}
                      className="rounded-xl border border-slate-100 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-800/50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {rev.userName}
                          </h4>
                          <span className="text-xs text-slate-400">{rev.userCity}</span>
                        </div>
                        <span className="text-xs text-slate-400">{rev.createdAt}</span>
                      </div>

                      <div className="mt-2.5">
                        <StarRating rating={rev.rating} showNumber={false} size="sm" />
                      </div>

                      <p className="mt-3 text-sm text-slate-700 leading-relaxed dark:text-slate-300">
                        {rev.content}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                        <button
                          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                          title="Vote helpful"
                        >
                          <ThumbsUp className="h-3.5 w-3.5 text-slate-400" />
                          <span>Helpful ({rev.helpfulCount})</span>
                        </button>

                        <button
                          className="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors"
                          title="Report review"
                        >
                          <Flag className="h-3 w-3" />
                          <span>Report</span>
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    No customer reviews yet. Be the first to review {business.name}!
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* RIGHT 1 COL: Hours, Location & Contact */}
          <div className="space-y-6">
            
            {/* Location & Map Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
                Location &amp; Address
              </h3>
              
              <div className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <MapPin className="h-5 w-5 text-[#0B6E4F] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {business.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {business.lga} LGA, {business.city}, {business.state} State
                  </p>
                </div>
              </div>

              {/* Map Embed */}
              <div className="mt-4 h-48 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
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
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white mb-4">
                <Clock className="h-5 w-5 text-[#0B6E4F]" />
                <span>Opening Hours</span>
              </div>

              <div className="space-y-2 text-xs">
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
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
                Direct Contact
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <a href={`tel:${business.phone}`} className="font-medium text-slate-800 hover:underline dark:text-slate-200">
                    {business.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
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

    </div>
  );
}

