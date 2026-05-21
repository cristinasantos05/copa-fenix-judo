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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, cupIds } = body;
    const club = await db.judoClub.create({
      data: {
        name,
        cupIds,
      },
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
    return Response.json(
      { message: "Club created successfully", club },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error creating club" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const clubs = await db.judoClub.delete({
      where: {
        id,
      },
    });
    return Response.json({ message: "OK", clubs });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error fetching clubs" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { id, name } = await req.json();
  try {
    const club = await db.judoClub.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return Response.json({ message: "OK", club });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error updating club" }, { status: 500 });
  }
}
