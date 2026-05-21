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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, gender } = body;
    const team = await db.team.create({
      data: {
        name,
        gender,
      },
      select: {
        id: true,
        name: true,
        gender: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return Response.json(
      { message: "Team created successfully", team },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error creating team" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const teams = await db.team.delete({
      where: {
        id,
      },
    });
    return Response.json({ message: "OK", teams });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error fetching teams" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { id, name, gender } = await req.json();
  try {
    const team = await db.team.update({
      where: {
        id,
      },
      data: {
        name,
        gender,
      },
    });
    return Response.json({ message: "OK", team });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error updating team" }, { status: 500 });
  }
}
