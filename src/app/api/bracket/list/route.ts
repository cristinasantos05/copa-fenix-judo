import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brackets = await db.bracket.findMany({
      include: {
        cup: true,
        teams: true,
      },
    });
    return NextResponse.json({ message: "OK", brackets });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching brackets" },
      { status: 500 },
    );
  }
}
