// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { CATEGORIES_LIST } from "../src/data/nigeria-data";
import { MOCK_BUSINESSES } from "../src/data/mock-businesses";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Najiavestors database seed...");

  // 1. Seed Categories
  console.log("Seeding categories...");
  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES_LIST) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, icon: cat.icon, description: cat.description },
      create: {
        slug: cat.slug,
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
      },
    });
    categoryMap.set(cat.slug, created.id);
  }

  // 2. Seed Default Users
  console.log("Seeding default demo users...");
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@najiavestors.ng" },
    update: {},
    create: {
      name: "Najiavestors Admin",
      email: "admin@najiavestors.ng",
      role: "ADMIN",
    },
  });

  const demoOwner = await prisma.user.upsert({
    where: { email: "owner@terra.ng" },
    update: {},
    create: {
      name: "Bolanle Austen-Peters",
      email: "owner@terra.ng",
      role: "BUSINESS_OWNER",
    },
  });

  // 3. Seed Businesses
  console.log(`Seeding ${MOCK_BUSINESSES.length} Nigerian sample businesses...`);
  for (const biz of MOCK_BUSINESSES) {
    const categoryId = categoryMap.get(biz.categorySlug) || Array.from(categoryMap.values())[0];

    await prisma.business.upsert({
      where: { slug: biz.slug },
      update: {},
      create: {
        slug: biz.slug,
        name: biz.name,
        description: biz.description,
        categoryId: categoryId,
        address: biz.address,
        city: biz.city,
        state: biz.state,
        lga: biz.lga,
        latitude: biz.latitude,
        longitude: biz.longitude,
        phone: biz.phone,
        whatsapp: biz.whatsapp,
        website: biz.website,
        priceTier: biz.priceTier,
        verified: biz.verified,
        claimed: biz.claimed,
        ownerId: biz.claimed ? demoOwner.id : null,
        photos: biz.photos,
        hours: biz.hours,
        rating: biz.rating,
        reviewCount: biz.reviewCount,
      },
    });
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
