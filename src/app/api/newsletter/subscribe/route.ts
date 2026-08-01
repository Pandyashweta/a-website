import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const SubscribeSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = SubscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email format", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { email, firstName } = parsed.data;

    // Insert or update subscriber in DB
    const subscriber = await db.subscriber.upsert({
      where: { email },
      update: {
        firstName: firstName || undefined,
        status: "SUBSCRIBED",
      },
      create: {
        email,
        firstName,
        status: "SUBSCRIBED",
      },
    });

    return NextResponse.json(
      {
        message: "Successfully subscribed",
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          status: subscriber.status,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Subscribe Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
