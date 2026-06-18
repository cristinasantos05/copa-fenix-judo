import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const bracket = await db.bracket.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    if (!bracket) {
      return NextResponse.json(
        { message: "Bracket not found" },
        { status: 404 },
      );
    }
    await db.bracket.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "Bracket deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error deleting bracket" },
      { status: 500 },
    );
  }
}
