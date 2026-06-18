import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const athlete = await db.athlete.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!athlete) {
      return NextResponse.json(
        { message: "Athlete not found" },
        { status: 404 },
      );
    }
    await db.athlete.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "Athlete deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error deleting athlete" },
      { status: 500 },
    );
  }
}
