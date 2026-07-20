import { db } from "@/lib/db";
import { updateAthleteSchema } from "@/schemas/athlete";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validation = updateAthleteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid athlete data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id, name, age, weight, teamId } = validation.data;
    const [existingAthlete, team] = await Promise.all([
      db.athlete.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      }),

      db.team.findUnique({
        where: {
          id: teamId,
        },
        select: {
          id: true,
        },
      }),
    ]);

    if (!existingAthlete) {
      return NextResponse.json(
        { message: "Athlete not found" },
        { status: 404 },
      );
    }

    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }
    const athletes = await db.athlete.update({
      where: {
        id,
      },
      data: {
        name,
        age,
        weight,
        teamId,
      },
    });
    return NextResponse.json({ message: "OK", athletes });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error updating athlete" },
      { status: 500 },
    );
  }
}
