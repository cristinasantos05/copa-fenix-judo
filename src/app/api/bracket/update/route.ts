import { db } from "@/lib/db";
import { updateBracketSchema } from "@/schemas/bracket";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validation = updateBracketSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid bracket data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id, cupId } = validation.data;
    const [bracket, cup] = await Promise.all([
      db.bracket.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      }),
      db.cup.findUnique({
        where: {
          id: cupId,
        },
        select: {
          id: true,
        },
      }),
    ]);
    if (!bracket) {
      return NextResponse.json(
        {
          message: "Bracket not found",
        },
        { status: 404 },
      );
    }

    if (!cup) {
      return NextResponse.json(
        {
          message: "Cup not found",
        },
        { status: 404 },
      );
    }

    const updatedBracket = await db.bracket.update({
      where: {
        id,
      },
      data: {
        cupId,
      },
      include: {
        cup: true,
        teams: true,
      },
    });
    return NextResponse.json({
      message: "Bracket updated successfully",
      bracket: updatedBracket,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error updating bracket",
      },
      { status: 500 },
    );
  }
}
