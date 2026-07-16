import { db } from "@/lib/db";
import { athleteSchema } from "@/schemas/athlete";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = athleteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid athlete data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const [team, existingAthlete] = await Promise.all([
      db.team.findUnique({
        where: {
          id: validation.data.teamId,
        },
        select: {
          id: true,
        },
      }),

      db.athlete.findFirst({
        where: {
          name: validation.data.name,
          teamId: validation.data.teamId,
        },
        select: {
          id: true,
        },
      }),
    ]);

    if (!team) {
      return NextResponse.json(
        {
          message: "Team not found",
        },
        { status: 404 },
      );
    }

    if (existingAthlete) {
      return NextResponse.json(
        { message: "Athlete already exists" },
        { status: 409 },
      );
    }

    const athlete = await db.athlete.create({
      data: validation.data,
    });
    return NextResponse.json(
      { message: "Athlete created successfully", athlete },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error creating athlete" },
      { status: 500 },
    );
  }
}
