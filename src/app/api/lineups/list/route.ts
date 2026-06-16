import { db } from "@/lib/db";

export async function GET() {
  try {
    const LineUp = await db.lineUp.findMany({
      include: {
        bracket: true,
        athletes: true,
      },
    });
    return Response.json({ message: "OK", LineUp });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error fetching LineUp" }, { status: 500 });
  }
}
