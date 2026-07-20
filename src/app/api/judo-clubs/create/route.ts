import { db } from "@/lib/db";
import { createJudoClubSchema } from "@/schemas/judoClub";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = createJudoClubSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid JudoClub data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { name, cupIds } = validation.data;
    const existingJudoClub = await db.judoClub.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
      },
    });
    if (existingJudoClub) {
      return NextResponse.json(
        {
          message: "JudoClub already exists",
        },
        { status: 409 },
      );
    }
    if (cupIds && cupIds.length > 0) {
      const cups = await db.cup.findMany({
        where: {
          id: {
            in: cupIds,
          },
        },
      });
      if (cups.length !== cupIds.length) {
        return NextResponse.json(
          {
            message: "One or more cups were not found",
          },
          { status: 404 },
        );
      }
    }
    const judoClub = await db.judoClub.create({
      data: {
        name,
        cups: cupIds
          ? {
              connect: cupIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        cups: true,
      },
    });
    return NextResponse.json(
      {
        message: "JudoClub created successfully",
        judoClub,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        message: "Error creating JudoClub",
      },
      { status: 500 },
    );
  }
}
