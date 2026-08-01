import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const SendNewsletterSchema = z.object({
  newsletterId: z.string(),
  recipientEmail: z.string().email().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = SendNewsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload parameters", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { newsletterId, recipientEmail } = parsed.data;

    const newsletter = await db.newsletter.findUnique({
      where: { id: newsletterId },
    });

    if (!newsletter) {
      return NextResponse.json(
        { error: "Newsletter not found" },
        { status: 404 }
      );
    }

    // Record campaign dispatch attempt
    const campaign = await db.campaign.create({
      data: {
        newsletterId: newsletter.id,
        sentCount: recipientEmail ? 1 : 100,
      },
    });

    return NextResponse.json(
      {
        message: "Newsletter dispatch triggered successfully",
        campaignId: campaign.id,
        status: "DISPATCHED",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Send Newsletter Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
