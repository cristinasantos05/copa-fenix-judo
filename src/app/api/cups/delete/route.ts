import { db } from "@/lib/db";
import { deleteCupSchema } from "@/schemas/cup";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const validation = deleteCupSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
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
    });

    if (!cup) {
      return Response.json(
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

    return Response.json({
      message: "Cup deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Error deleting cup",
      },
      { status: 500 },
    );
  }
}
