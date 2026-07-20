import { db } from "@/lib/db";
import { createBracketSchema } from "@/schemas/bracket";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = createBracketSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid bracket data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { cupId, teamIds } = validation.data;
    const [cup, teams] = await Promise.all([
      db.cup.findUnique({
        where: {
          id: cupId,
        },
        select: {
          id: true,
        },
      }),

      db.team.findMany({
        where: {
          id: {
            in: teamIds,
          },
        },
      }),
    ]);

    if (!cup) {
      return NextResponse.json({ message: "Cup not found" }, { status: 404 });
    }

    if (teams.length !== teamIds.length) {
      return NextResponse.json(
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
    return NextResponse.json(
      { message: "Bracket created successfully", bracket },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error creating bracket" },
      { status: 500 },
    );
  }
}
