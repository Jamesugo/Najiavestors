# Najiavestors — Nigeria Business Directory & Reviews (Yelp for Nigeria) 🇳🇬

A production-ready, mobile-first business directory for Nigeria, modeled on Yelp. Connects patrons, local residents, and diaspora investors with vetted businesses, authentic reviews, opening hours, and direct WhatsApp click-to-chat across all 36 States and the FCT.

---

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 with mobile-first responsiveness (320px to 1440px+)
- **Design Tokens:** Deep Green primary (`#0B6E4F`), Warm Gold accent (`#F5B700`), Charcoal text (`#1F2937`), Soft Gray background (`#F8FAFC`), and Dark Mode support
- **Icons:** Lucide React
- **Validation:** Zod schemas for all client and server mutations
- **Database & ORM:** PostgreSQL + Prisma (Neon / Supabase ready)
- **Map:** OpenStreetMap & Leaflet integration

---

## 🇳🇬 Nigerian Specifics Built-in

1. **Complete Geolocation Coverage:** All 36 States + Federal Capital Territory (FCT) with all 774 Local Government Areas (LGAs).
2. **WhatsApp Direct Chat:** One-click WhatsApp link generator (`wa.me/+234...`) with pre-filled business inquiry text.
3. **Phone Formatting:** Automatic normalization and validation for Nigerian mobile and landline numbers (+234 format).
4. **Naira Price Tiers:**
   - `₦` Budget (Under ₦3,000)
   - `₦₦` Moderate (₦3,000 - ₦10,000)
   - `₦₦₦` Expensive (₦10,000 - ₦30,000)
   - `₦₦₦₦` Luxury (Above ₦30,000)
5. **Low-Bandwidth Friendly:** Lazy-loaded images with shimmer skeletons and fast initial page load times.

---

## 📦 Core Feature Modules

- **Home Page (`/`)**: Hero search bar (keyword + Nigerian location), top categories grid, trending businesses, recently added listings, and community reviews.
- **Search & Filter (`/search`)**: Filter by category, state, LGA, rating (4+ stars), price tier, and verified status. Sort by relevance, rating, and review count. Includes interactive Map / List toggle.
- **Business Profile (`/biz/[slug]`)**: Photo gallery, opening hours, verified badge, Google Maps link, WhatsApp button, phone dialer, star ratings, and review submission.
- **Add Business (`/add-business`)**: 3-step listing creation with dynamic Nigerian state/LGA selectors and WhatsApp integration.
- **Claim Listing (`/claim-business`)**: CAC registration and ownership verification portal.
- **Admin Dashboard (`/admin`)**: Moderation table for reviewing, approving, and verifying businesses.
- **Authentication (`/auth/signin`)**: Multi-role login (Patron, Business Owner, Admin) with Google sign-in support.
- **SEO Ready**: Dynamic OpenGraph tags, JSON-LD `LocalBusiness` schema, `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Database Seeding (Optional for PostgreSQL)
```bash
npx prisma db push
npx prisma db seed
```
*(The application also includes an active in-memory service layer loaded with 50 realistic Nigerian businesses out of the box).*

---

## 🚢 Deployment to Vercel

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Deploy Najiavestors MVP"
   git push origin main
   ```
2. Import the repository into [Vercel](https://vercel.com).
3. Connect a PostgreSQL database (e.g. [Neon](https://neon.tech) or [Supabase](https://supabase.com)).
4. Add `DATABASE_URL` in your Vercel Environment Variables.
5. Deploy!
