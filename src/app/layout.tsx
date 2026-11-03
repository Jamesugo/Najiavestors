import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Najiavestors | Nigeria Business Directory & Reviews (Yelp for Nigeria)",
  description:
    "Discover, review, and connect with top vetted restaurants, hotels, tech hubs, and services across Lagos, Abuja, Port Harcourt, and all 36 Nigerian states.",
  keywords: [
    "Nigeria business directory",
    "Yelp for Nigeria",
    "Lagos restaurants",
    "Abuja hotels",
    "Naija businesses",
    "Nigerian tech hubs",
    "Bukas and grills",
    "Verified reviews Nigeria",
  ],
  openGraph: {
    title: "Najiavestors | Nigeria's Premier Business Directory",
    description: "Explore verified businesses, reviews, photos, and WhatsApp links across Nigeria.",
    type: "website",
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B6E4F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#1F2937] dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
