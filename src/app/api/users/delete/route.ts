import { db } from "@/lib/db";
import { deleteUserSchema } from "@/schemas/users";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const validation = deleteUserSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid user data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id } = validation.data;

    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return Response.json(
        {
          message: "User not found",
        },
        { status: 404 },
      );
    }

    await db.user.delete({
      where: {
        id,
      },
    });

    return Response.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Error deleting user",
      },
      { status: 500 },
    );
  }
}
