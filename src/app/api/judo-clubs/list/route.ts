import { db } from "@/lib/db";

export async function GET() {
  try {
    const clubs = await db.judoClub.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        cups: {
          select: {
            name: true,
          },
        },
      },
    });
    return Response.json({ message: "OK", clubs });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error fetching clubs" }, { status: 500 });
  }
}
