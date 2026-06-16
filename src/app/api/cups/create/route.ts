import { db } from "@/lib/db";
import { createCupSchema } from "@/schemas/cup";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = createCupSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid cup data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const existingCup = await db.cup.findFirst({
      where: {
        name: validation.data.name,
      },
    });

    if (existingCup) {
      return Response.json(
        {
          message: "Cup already exists",
        },
        { status: 409 },
      );
    }

    const startDate = new Date(validation.data.startDate);
    const endDate = new Date(validation.data.endDate);

    if (endDate < startDate) {
      return Response.json(
        {
          message: "End date cannot be before start date",
        },
        { status: 400 },
      );
    }

    const cup = await db.cup.create({
      data: {
        name: validation.data.name,
        startDate,
        endDate,
      },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
      },
    });

    return Response.json(
      {
        message: "Cup created successfully",
        cup,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Error creating cup",
      },
      { status: 500 },
    );
  }
}
