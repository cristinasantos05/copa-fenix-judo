import { db } from "@/lib/db";
import { createLineUpSchema } from "@/schemas/lineUp";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = createLineUpSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid LineUp data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { bracketId } = validation.data;

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

    const lineUp = await db.lineUp.create({
      data: {
        bracketId,
      },
      include: {
        bracket: true,
        athletes: true,
      },
    });

    return Response.json(
      {
        message: "LineUp created successfully",
        lineUp,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Error creating LineUp",
      },
      { status: 500 },
    );
  }
}
