import { db } from "@/lib/db";
import { updateUserSchema } from "@/schemas/users";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validation = updateUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid user data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id, name, email, password } = validation.data;
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const userWithSameEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (userWithSameEmail && userWithSameEmail.id !== id) {
      return NextResponse.json(
        {
          message: "Another user with this email already exists",
        },
        { status: 409 },
      );
    }

    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error updating user",
      },
      { status: 500 },
    );
  }
}
