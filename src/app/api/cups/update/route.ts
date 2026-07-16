import { db } from "@/lib/db";
import { updateCupSchema } from "@/schemas/cup";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validation = updateCupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid cup data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id, name, startDate, endDate } = validation.data;
    const existingCup = await db.cup.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    if (!existingCup) {
      return NextResponse.json(
        {
          message: "Cup not found",
        },
        { status: 404 },
      );
    }
    const cupWithSameName = await db.cup.findFirst({
      where: {
        name,
        NOT: {
          id,
        },
      },
    });
    if (cupWithSameName) {
      return NextResponse.json(
        {
          message: "Another cup with this name already exists",
        },
        { status: 409 },
      );
    }

    const updatedCup = await db.cup.update({
      where: {
        id,
      },
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
      },
    });
    return NextResponse.json({
      message: "Cup updated successfully",
      cup: updatedCup,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error updating cup",
      },
      { status: 500 },
    );
  }
}
