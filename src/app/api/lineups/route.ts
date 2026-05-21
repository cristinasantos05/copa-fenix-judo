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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { bracketId } = body;
    const LineUp = await db.lineUp.create({
      data: {
        bracketId,
      },
      include: {
        bracket: true,
        athletes: true,
      },
    });
    return Response.json(
      { message: "LineUp created successfully", LineUp },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error creating LineUp" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const LineUp = await db.lineUp.delete({
      where: {
        id,
      },
    });
    return Response.json({ message: "OK", LineUp });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error fetching LineUp" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { id, bracketId } = await req.json();
  try {
    const LineUp = await db.lineUp.update({
      where: {
        id,
      },
      data: {
        bracketId: bracketId,
      },
      include: {
        bracket: true,
        athletes: true,
      },
    });
    return Response.json({ message: "OK", LineUp });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Error updating LineUp" }, { status: 500 });
  }
}
