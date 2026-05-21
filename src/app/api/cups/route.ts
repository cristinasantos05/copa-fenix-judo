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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, startDate, endDate } = body;
    const cup = await db.cup.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
      },
    });
    return Response.json(
      { message: "Cup created successfully", cup },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error creating cup" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const cups = await db.cup.delete({
      where: {
        id,
      },
    });
    return Response.json({ message: "OK", cups });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error fetching cups" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { id, name, startDate, endDate } = await req.json();
  try {
    const cup = await db.cup.update({
      where: {
        id,
      },
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    return Response.json({ message: "OK", cup });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error updating cup" }, { status: 500 });
  }
}
