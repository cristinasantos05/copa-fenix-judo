import { db } from "@/lib/db";

export async function GET() {
  try {
    const athletes = await db.athlete.findMany({
      include: {
        team: true,
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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, age, weight, teamId } = body;
    const athlete = await db.athlete.create({
      data: {
        name,
        age,
        weight,
        teamId,
      },
    });
    return Response.json(
      { message: "Athlete created successfully", athlete },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error creating athlete" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
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

export async function PUT(req: Request) {
  const { id, name, age, weight, teamId } = await req.json();
  try {
    const athletes = await db.athlete.update({
      where: {
        id,
      },
      data: {
        name,
        age,
        weight,
        teamId,
      },
    });
    return Response.json({ message: "OK", athletes });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Error updating athlete" },
      { status: 500 },
    );
  }
}
