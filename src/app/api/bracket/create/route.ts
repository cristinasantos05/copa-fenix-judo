import { db } from "@/lib/db";
import { createBracketSchema } from "@/schemas/bracket";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = createBracketSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid bracket data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { cupId, teamIds } = validation.data;
    const cup = await db.cup.findUnique({
      where: {
        id: cupId,
      },
    });

    if (!cup) {
      return Response.json({ message: "Cup not found" }, { status: 404 });
    }
    const teams = await db.team.findMany({
      where: {
        id: {
          in: teamIds,
        },
      },
    });

    if (teams.length !== teamIds.length) {
      return Response.json(
        { message: "One or more teams not found" },
        { status: 404 },
      );
    }
    const bracket = await db.bracket.create({
      data: {
        cupId,
        teams: {
          connect: teamIds.map((id) => ({ id })),
        },
      },
      include: {
        cup: true,
        teams: true,
      },
    });
    return Response.json(
      { message: "Bracket created successfully", bracket },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error creating bracket" },
      { status: 500 },
    );
  }
}
