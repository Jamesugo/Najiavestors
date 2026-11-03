import { NextResponse } from "next/server";
import { z } from "zod";
import { createBusinessListing } from "@/lib/services/business-service";
import { isValidNigerianPhone } from "@/data/nigeria-data";

const BusinessSchema = z.object({
  name: z.string().min(2, "Business name is required"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  categorySlug: z.string().min(1, "Category is required"),
  categoryName: z.string().min(1, "Category name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  lga: z.string().min(2, "LGA is required"),
  phone: z.string().refine(isValidNigerianPhone, "Valid Nigerian phone number required (+234 or 080...)"),
  whatsapp: z.string().refine(isValidNigerianPhone, "Valid Nigerian WhatsApp number required"),
  website: z.string().url().optional().or(z.literal("")),
  priceTier: z.enum(["BUDGET", "MODERATE", "EXPENSIVE", "LUXURY"]),
  photos: z.array(z.string()).default([]),
  hours: z.record(z.string(), z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = BusinessSchema.parse(body);

    const newBusiness = await createBusinessListing({
      ...validated,
      latitude: 6.5244,
      longitude: 3.3792,
      website: validated.website || undefined,
      verified: true, // auto-verified for demo MVP
      claimed: true,
      photos: validated.photos.length > 0 ? validated.photos : [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
      ],
      hours: validated.hours || {
        "Monday": "8:00 AM - 6:00 PM",
        "Tuesday": "8:00 AM - 6:00 PM",
        "Wednesday": "8:00 AM - 6:00 PM",
        "Thursday": "8:00 AM - 6:00 PM",
        "Friday": "8:00 AM - 6:00 PM",
        "Saturday": "9:00 AM - 4:00 PM",
        "Sunday": "Closed"
      },
    });

    return NextResponse.json({ success: true, business: newBusiness }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || "Failed to create business" }, { status: 500 });
  }
}

