import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getBusinesses } from "@/lib/services/business-service";

const HelpfulVoteSchema = z.object({
  reviewId: z.string().min(1),
  businessSlug: z.string().min(1),
});

// In-memory store for helpful votes (replace with DB when connected)
const helpfulVotes = new Map<string, Set<string>>();

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: reviewId } = await context.params;

  // Simple IP-based deduplication (replace with user ID when auth is real)
  const voterIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const parsed = HelpfulVoteSchema.safeParse({
    reviewId,
    businessSlug: new URL(request.url).searchParams.get("slug") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!helpfulVotes.has(reviewId)) {
    helpfulVotes.set(reviewId, new Set());
  }

  const voters = helpfulVotes.get(reviewId)!;

  if (voters.has(voterIp)) {
    // Toggle: remove vote if already voted
    voters.delete(voterIp);
    return NextResponse.json({ helpful: voters.size, voted: false });
  }

  voters.add(voterIp);
  return NextResponse.json({ helpful: voters.size, voted: true });
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: reviewId } = await context.params;
  const votes = helpfulVotes.get(reviewId)?.size ?? 0;
  return NextResponse.json({ helpful: votes });
}

