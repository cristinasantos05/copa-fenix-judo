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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { cupIds, teamIds } = body;
    const bracket = await db.bracket.create({
      data: {
        cupId: cupIds[0],
        teamIds,
      },
    });
    return Response.json(
      { message: "Bracket created successfully", bracket },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error creating bracket" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const brackets = await db.bracket.delete({
      where: {
        id,
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

export async function PUT(req: Request) {
  const { id, cupId } = await req.json();
  try {
    const brackets = await db.bracket.update({
      where: {
        id,
      },
      data: {
        cupId,
      },
    });
    return Response.json({ message: "OK", brackets });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error updating bracket" },
      { status: 500 },
    );
  }
}
