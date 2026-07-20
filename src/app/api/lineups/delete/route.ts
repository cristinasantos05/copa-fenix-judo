import { db } from "@/lib/db";
import { deleteLineUpSchema } from "@/schemas/lineUp";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const validation = deleteLineUpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid LineUp data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id } = validation.data;
    const existingLineUp = await db.lineUp.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    if (!existingLineUp) {
      return NextResponse.json(
        {
          message: "LineUp not found",
        },
        { status: 404 },
      );
    }

    await db.lineUp.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json({
      message: "LineUp deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error deleting LineUp",
      },
      { status: 500 },
    );
  }
}
