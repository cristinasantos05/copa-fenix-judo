import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const includeTeam = searchParams.get("includeTeam") === "true";
    const athletes = await db.athlete.findMany({
      include: {
        team: includeTeam,
      },
    });
    return NextResponse.json({ message: "OK", athletes });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching athletes" },
      { status: 500 },
    );
  }
}
