import { db } from "@/lib/db";

export async function GET() {
  try {
    const teams = await db.team.findMany({
      select: {
        id: true,
        name: true,
        gender: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return Response.json({ message: "OK", teams });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error fetching teams" }, { status: 500 });
  }
}
