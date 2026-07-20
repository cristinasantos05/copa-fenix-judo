import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cups = await db.cup.findMany({
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        updatedAt: true,
        teams: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ message: "OK", cups });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching cups" },
      { status: 500 },
    );
  }
}
