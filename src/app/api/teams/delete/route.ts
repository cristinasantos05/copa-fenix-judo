import { db } from "@/lib/db";
import { deleteTeamSchema } from "@/schemas/teams";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const validation = deleteTeamSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          message: "Invalid team data",
          errors: z.treeifyError(validation.error),
        },
        { status: 400 },
      );
    }

    const { id } = validation.data;

    const team = await db.team.findUnique({
      where: {
        id,
      },
      include: {
        athletes: true,
        cups: true,
        brackets: true,
      },
    });

    if (!team) {
      return Response.json(
        {
          message: "Team not found",
        },
        { status: 404 },
      );
    }

    if (
      team.athletes.length > 0 ||
      team.cups.length > 0 ||
      team.brackets.length > 0
    ) {
      return Response.json(
        {
          message:
            "Cannot delete a team with associated athletes, cups or brackets",
        },
        { status: 409 },
      );
    }

    await db.team.delete({
      where: {
        id,
      },
    });

    return Response.json({
      message: "Team deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Error deleting team",
      },
      { status: 500 },
    );
  }
}
