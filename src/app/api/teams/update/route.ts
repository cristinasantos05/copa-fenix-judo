import { db } from "@/lib/db";
import { updateTeamSchema } from "@/schemas/teams";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const validation = updateTeamSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid team data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id, name, gender } = validation.data;

    const existingTeam = await db.team.findUnique({
      where: {
        id,
      },
    });

    if (!existingTeam) {
      return Response.json(
        {
          message: "Team not found",
        },
        { status: 404 },
      );
    }

    const teamWithSameData = await db.team.findFirst({
      where: {
        name,
        gender,
        NOT: {
          id,
        },
      },
    });

    if (teamWithSameData) {
      return Response.json(
        {
          message: "Another team with this name and gender already exists",
        },
        { status: 409 },
      );
    }

    const updatedTeam = await db.team.update({
      where: {
        id,
      },
      data: {
        name,
        gender,
      },
      select: {
        id: true,
        name: true,
        gender: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return Response.json({
      message: "Team updated successfully",
      team: updatedTeam,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Error updating team",
      },
      { status: 500 },
    );
  }
}
