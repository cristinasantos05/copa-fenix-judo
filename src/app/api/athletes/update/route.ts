import { db } from "@/lib/db";
import { updateAthleteSchema } from "@/schemas/athlete";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validation = updateAthleteSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid athlete data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }
    const { id, name, age, weight, teamId } = validation.data;

    const existingAthlete = await db.athlete.findUnique({
      where: {
        id,
      },
    });

    if (!existingAthlete) {
      return Response.json({ message: "Athlete not found" }, { status: 404 });
    }
    const team = await db.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (!team) {
      return Response.json({ message: "Team not found" }, { status: 404 });
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
    return Response.json({ message: "OK", athletes });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error updating athlete" },
      { status: 500 },
    );
  }
}
