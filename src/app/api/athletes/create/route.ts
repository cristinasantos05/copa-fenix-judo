import { db } from "@/lib/db";
import { athleteSchema } from "@/schemas/athlete";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = athleteSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid athlete data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const team = await db.team.findUnique({
      where: {
        id: validation.data.teamId,
      },
    });

    if (!team) {
      return Response.json(
        {
          message: "Team not found",
        },
        { status: 404 },
      );
    }

    const existingAthlete = await db.athlete.findFirst({
      where: {
        name: validation.data.name,
        teamId: validation.data.teamId,
      },
    });

    if (existingAthlete) {
      return Response.json(
        { message: "Athlete already exists" },
        { status: 409 },
      );
    }

    const athlete = await db.athlete.create({
      data: validation.data,
    });
    return Response.json(
      { message: "Athlete created successfully", athlete },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error creating athlete" },
      { status: 500 },
    );
  }
}
