import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ReportSchema = z.object({
  reason: z.enum([
    "spam",
    "offensive",
    "fake",
    "irrelevant",
    "other",
  ]),
  details: z.string().max(500).optional(),
});

// In-memory store (replace with DB when connected)
const reports = new Map<string, Array<{ reason: string; details?: string; timestamp: string }>>();

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: reviewId } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ReportSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid report data", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (!reports.has(reviewId)) {
    reports.set(reviewId, []);
  }

  reports.get(reviewId)!.push({
    reason: parsed.data.reason,
    details: parsed.data.details,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, message: "Report submitted for review" });
}

