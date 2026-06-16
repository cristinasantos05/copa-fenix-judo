import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const includeTeam = searchParams.get("includeTeam") === "true";
    const athletes = await db.athlete.findMany({
      include: {
        team: includeTeam,
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
