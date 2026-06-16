import { db } from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const bracket = await db.bracket.findUnique({
      where: {
        id,
      },
    });
    if (!bracket) {
      return Response.json({ message: "Bracket not found" }, { status: 404 });
    }
    await db.bracket.delete({
      where: {
        id,
      },
    });
    return Response.json({ message: "OK" });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error fetching brackets" },
      { status: 500 },
    );
  }
}
