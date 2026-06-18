import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json({ message: "OK", users });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 },
    );
  }
}
