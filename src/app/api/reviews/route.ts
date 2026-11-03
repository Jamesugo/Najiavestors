import { NextResponse } from "next/server";
import { z } from "zod";
import { addReviewToBusiness } from "@/lib/services/business-service";

const ReviewSchema = z.object({
  businessId: z.string().min(1, "Business ID is required"),
  userName: z.string().min(2, "Name must be at least 2 characters"),
  userCity: z.string().min(2, "City is required"),
  rating: z.number().int().min(1).max(5),
  content: z.string().min(10, "Review must be at least 10 characters long"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = ReviewSchema.parse(body);

    const newReview = await addReviewToBusiness(validated.businessId, {
      userName: validated.userName,
      userCity: validated.userCity,
      rating: validated.rating,
      content: validated.content,
    });

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || "Failed to submit review" }, { status: 500 });
  }
}
