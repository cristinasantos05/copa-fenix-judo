import { db } from "@/lib/db";

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return Response.json({ message: "OK", users });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error fetching users" }, { status: 500 });
  }
}
