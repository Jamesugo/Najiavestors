import { MetadataRoute } from "next";
import { MOCK_BUSINESSES } from "@/data/mock-businesses";
import { CATEGORIES_LIST } from "@/data/nigeria-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://najiavestors.ng";

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/add-business`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/claim-business`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Dynamic business detail pages
  const businessPages: MetadataRoute.Sitemap = MOCK_BUSINESSES.map((b) => ({
    url: `${baseUrl}/biz/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic category search pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES_LIST.map((c) => ({
    url: `${baseUrl}/search?category=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...businessPages];
}

