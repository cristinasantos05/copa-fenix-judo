import { db } from "@/lib/db";
import { updateLineUpSchema } from "@/schemas/lineUp";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const validation = updateLineUpSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid LineUp data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id, bracketId } = validation.data;

    const existingLineUp = await db.lineUp.findUnique({
      where: {
        id,
      },
    });

    if (!existingLineUp) {
      return Response.json(
        {
          message: "LineUp not found",
        },
        { status: 404 },
      );
    }

    const bracket = await db.bracket.findUnique({
      where: {
        id: bracketId,
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

    const updatedLineUp = await db.lineUp.update({
      where: {
        id,
      },
      data: {
        bracketId,
      },
      include: {
        bracket: true,
        athletes: true,
      },
    });

    return Response.json({
      message: "LineUp updated successfully",
      lineUp: updatedLineUp,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Error updating LineUp",
      },
      { status: 500 },
    );
  }
}
