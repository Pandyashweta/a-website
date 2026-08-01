import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const subscribers = await db.subscriber.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        email: true,
        firstName: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        total: subscribers.length,
        subscribers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API GET Subscribers Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
