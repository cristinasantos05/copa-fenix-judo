import { db } from "@/lib/db";
import { updateCupSchema } from "@/schemas/cup";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const validation = updateCupSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
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
    });

    if (!existingCup) {
      return Response.json(
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
      return Response.json(
        {
          message: "Another cup with this name already exists",
        },
        { status: 409 },
      );
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (parsedEndDate < parsedStartDate) {
      return Response.json(
        {
          message: "End date cannot be before start date",
        },
        { status: 400 },
      );
    }

    const updatedCup = await db.cup.update({
      where: {
        id,
      },
      data: {
        name,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
      },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
      },
    });

    return Response.json({
      message: "Cup updated successfully",
      cup: updatedCup,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Error updating cup",
      },
      { status: 500 },
    );
  }
}
