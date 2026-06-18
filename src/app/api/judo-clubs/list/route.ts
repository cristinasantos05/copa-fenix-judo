import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clubs = await db.judoClub.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        cups: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ message: "OK", clubs });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching clubs" },
      { status: 500 },
    );
  }
}
