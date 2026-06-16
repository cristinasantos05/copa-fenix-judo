import { db } from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const athlete = await db.athlete.findUnique({
      where: {
        id,
      },
    });

    if (!athlete) {
      return Response.json({ message: "Athlete not found" }, { status: 404 });
    }
    const athletes = await db.athlete.delete({
      where: {
        id,
      },
    });
    return Response.json({ message: "OK", athletes });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error fetching athletes" },
      { status: 500 },
    );
  }
}
