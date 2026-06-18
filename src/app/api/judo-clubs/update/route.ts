import { db } from "@/lib/db";
import { updateJudoClubSchema } from "@/schemas/judoClub";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validation = updateJudoClubSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid JudoClub data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id, name } = validation.data;
    const existingClub = await db.judoClub.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    if (!existingClub) {
      return NextResponse.json(
        {
          message: "JudoClub not found",
        },
        { status: 404 },
      );
    }

    const clubWithSameName = await db.judoClub.findFirst({
      where: {
        name,
        NOT: {
          id,
        },
      },
    });
    if (clubWithSameName) {
      return NextResponse.json(
        {
          message: "Another JudoClub with this name already exists",
        },
        { status: 409 },
      );
    }

    const updatedClub = await db.judoClub.update({
      where: {
        id,
      },
      data: {
        name,
      },
      include: {
        cups: true,
      },
    });
    return NextResponse.json({
      message: "JudoClub updated successfully",
      club: updatedClub,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error updating JudoClub",
      },
      { status: 500 },
    );
  }
}
