import { db } from "@/lib/db";
import { createTeamSchema } from "@/schemas/teams";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = createTeamSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid team data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { name, gender } = validation.data;
    const existingTeam = await db.team.findFirst({
      where: {
        name,
        gender,
      },
      select: {
        id: true,
      },
    });
    if (existingTeam) {
      return NextResponse.json(
        {
          message: "Team already exists",
        },
        { status: 409 },
      );
    }
    const team = await db.team.create({
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
    return NextResponse.json(
      {
        message: "Team created successfully",
        team,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error creating team",
      },
      { status: 500 },
    );
  }
}
