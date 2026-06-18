import { db } from "@/lib/db";
import { updateTeamSchema } from "@/schemas/teams";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validation = updateTeamSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
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
      select: {
        id: true,
      },
    });
    if (!existingTeam) {
      return NextResponse.json(
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
      return NextResponse.json(
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
    return NextResponse.json({
      message: "Team updated successfully",
      team: updatedTeam,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error updating team",
      },
      { status: 500 },
    );
  }
}
