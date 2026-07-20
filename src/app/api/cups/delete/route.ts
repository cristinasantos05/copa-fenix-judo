import { db } from "@/lib/db";
import { deleteCupSchema } from "@/schemas/cup";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const validation = deleteCupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid cup data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id } = validation.data;
    const cup = await db.cup.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    if (!cup) {
      return NextResponse.json(
        {
          message: "Cup not found",
        },
        { status: 404 },
      );
    }

    await db.cup.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      message: "Cup deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        message: "Error deleting cup",
      },
      { status: 500 },
    );
  }
}
