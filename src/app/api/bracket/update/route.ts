import { db } from "@/lib/db";
import { updateBracketSchema } from "@/schemas/bracket";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const validation = updateBracketSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid bracket data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id, cupId } = validation.data;

    const bracket = await db.bracket.findUnique({
      where: {
        id,
      },
    });

    if (!bracket) {
      return Response.json(
        {
          message: "Bracket not found",
        },
        { status: 404 },
      );
    }

    const cup = await db.cup.findUnique({
      where: {
        id: cupId,
      },
    });

    if (!cup) {
      return Response.json(
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

    return Response.json({
      message: "Bracket updated successfully",
      bracket: updatedBracket,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Error updating bracket",
      },
      { status: 500 },
    );
  }
}
