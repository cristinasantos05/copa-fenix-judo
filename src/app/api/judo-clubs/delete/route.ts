import { db } from "@/lib/db";
import { deleteJudoClubSchema } from "@/schemas/judoClub";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const validation = deleteJudoClubSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid JudoClub data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id } = validation.data;
    const club = await db.judoClub.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        cups: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!club) {
      return NextResponse.json(
        {
          message: "JudoClub not found",
        },
        { status: 404 },
      );
    }
    if (club.cups.length > 0) {
      return NextResponse.json(
        {
          message: "Cannot delete a JudoClub associated with cups",
        },
        { status: 409 },
      );
    }

    await db.judoClub.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      message: "JudoClub deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error deleting JudoClub",
      },
      { status: 500 },
    );
  }
}
