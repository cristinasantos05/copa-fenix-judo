import { db } from "@/lib/db";

export async function GET() {
  try {
    const cups = await db.cup.findMany({
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        updatedAt: true,
        teams: {
          select: {
            name: true,
          },
        },
      },
    });
    return Response.json({ message: "OK", cups });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error fetching cups" }, { status: 500 });
  }
}
