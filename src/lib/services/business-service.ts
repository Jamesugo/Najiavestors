import { MOCK_BUSINESSES, BusinessItem, MockReview } from "@/data/mock-businesses";
import { CATEGORIES_LIST } from "@/data/nigeria-data";

export interface BusinessFilters {
  query?: string;
  category?: string;
  state?: string;
  lga?: string;
  minRating?: number;
  priceTier?: string;
  verifiedOnly?: boolean;
  sortBy?: "relevance" | "rating" | "reviews" | "newest";
  page?: number;
  limit?: number;
}

// In-memory store for active session state (reviews, businesses, votes)
let activeBusinesses: BusinessItem[] = [...MOCK_BUSINESSES];

export async function getBusinesses(filters: BusinessFilters = {}): Promise<{
  businesses: BusinessItem[];
  total: number;
  page: number;
  totalPages: number;
}> {
  let results = [...activeBusinesses];

  // 1. Text Search (Query across name, description, city, category)
  if (filters.query && filters.query.trim()) {
    const q = filters.query.toLowerCase().trim();
    results = results.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.categoryName.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q)
    );
  }

  // 2. Category Filter
  if (filters.category && filters.category !== "all") {
    results = results.filter(
      (b) => b.categorySlug.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  // 3. State Filter
  if (filters.state && filters.state !== "all") {
    results = results.filter(
      (b) => b.state.toLowerCase() === filters.state?.toLowerCase()
    );
  }

  // 4. LGA Filter
  if (filters.lga && filters.lga !== "all") {
    results = results.filter(
      (b) => b.lga.toLowerCase() === filters.lga?.toLowerCase()
    );
  }

  // 5. Min Rating Filter
  if (filters.minRating && filters.minRating > 0) {
    results = results.filter((b) => b.rating >= (filters.minRating || 0));
  }

  // 6. Price Tier Filter
  if (filters.priceTier && filters.priceTier !== "all") {
    results = results.filter((b) => b.priceTier === filters.priceTier);
  }

  // 7. Verified Only
  if (filters.verifiedOnly) {
    results = results.filter((b) => b.verified);
  }

  // 8. Sorting
  const sortBy = filters.sortBy || "relevance";
  if (sortBy === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "reviews") {
    results.sort((a, b) => b.reviewCount - a.reviewCount);
  } else if (sortBy === "newest") {
    // Reverse id or random
    results.reverse();
  }

  const total = results.length;
  const page = Math.max(1, filters.page || 1);
  const limit = Math.max(1, filters.limit || 12);
  const totalPages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginated = results.slice(startIndex, startIndex + limit);

  return {
    businesses: paginated,
    total,
    page,
    totalPages,
  };
}

export async function getBusinessBySlug(slug: string): Promise<BusinessItem | null> {
  const biz = activeBusinesses.find((b) => b.slug === slug);
  return biz || null;
}

export async function getFeaturedBusinesses(limit: number = 6): Promise<BusinessItem[]> {
  return activeBusinesses.filter((b) => b.featured).slice(0, limit);
}

export async function getTrendingBusinesses(limit: number = 8): Promise<BusinessItem[]> {
  return [...activeBusinesses].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount).slice(0, limit);
}

export async function getRecentlyAdded(limit: number = 6): Promise<BusinessItem[]> {
  return [...activeBusinesses].slice(0, limit);
}

export async function getCategoriesWithCounts() {
  return CATEGORIES_LIST.map((cat) => {
    const count = activeBusinesses.filter((b) => b.categorySlug === cat.slug).length;
    return {
      ...cat,
      count: count > 0 ? count : cat.count,
    };
  });
}

export async function addReviewToBusiness(
  businessId: string,
  review: Omit<MockReview, "id" | "createdAt" | "helpfulCount">
): Promise<MockReview> {
  const bizIndex = activeBusinesses.findIndex((b) => b.id === businessId);
  if (bizIndex === -1) {
    throw new Error("Business not found");
  }

  const newReview: MockReview = {
    id: `rev-${Date.now()}`,
    ...review,
    createdAt: "Just now",
    helpfulCount: 0,
  };

  const biz = activeBusinesses[bizIndex];
  const updatedReviews = [newReview, ...biz.reviews];
  const newReviewCount = biz.reviewCount + 1;
  const newRating = +(
    (biz.rating * biz.reviewCount + review.rating) /
    newReviewCount
  ).toFixed(1);

  activeBusinesses[bizIndex] = {
    ...biz,
    rating: newRating,
    reviewCount: newReviewCount,
    reviews: updatedReviews,
  };

  return newReview;
}

export async function createBusinessListing(
  data: Omit<BusinessItem, "id" | "slug" | "rating" | "reviewCount" | "reviews">
): Promise<BusinessItem> {
  const slug = `${data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${data.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;
  const newBiz: BusinessItem = {
    id: `biz-${Date.now()}`,
    slug,
    ...data,
    rating: 5.0,
    reviewCount: 1,
    reviews: [
      {
        id: `rev-${Date.now()}`,
        userName: "Verified Patron",
        userCity: `${data.city}, ${data.state}`,
        rating: 5,
        content: `First review for ${data.name}! High quality service and great customer attention.`,
        createdAt: "Just now",
        helpfulCount: 1,
      },
    ],
  };

  activeBusinesses.unshift(newBiz);
  return newBiz;
}

