import { db } from "@/lib/db";
import { createUserSchema } from "@/schemas/users";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid user data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { name, email, password } = validation.data;

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return Response.json(
        {
          message: "User already exists",
        },
        { status: 409 },
      );
    }

    const user = await db.user.create({
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

    return Response.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Error creating user",
      },
      { status: 500 },
    );
  }
}
