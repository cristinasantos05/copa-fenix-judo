import { db } from "@/lib/db";

export async function GET() {
  try {
    const brackets = await db.bracket.findMany({
      include: {
        cup: true,
        teams: true,
      },
    });
    return Response.json({ message: "OK", brackets });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error fetching brackets" },
      { status: 500 },
    );
  }
}
