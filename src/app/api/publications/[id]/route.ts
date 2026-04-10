import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const pub = await prisma.publication.findUnique({ where: { id } });
    if (!pub) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const sessionUser = session.user as { id: string; role?: string };
    if (sessionUser.role !== "SUPERVISOR" && pub.userId !== sessionUser.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await req.json();
    const updated = await prisma.publication.update({ where: { id }, data: { ...body, year: body.year ? Number(body.year) : undefined } });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const pub = await prisma.publication.findUnique({ where: { id } });
    if (!pub) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const sessionUser = session.user as { id: string; role?: string };
    if (sessionUser.role !== "SUPERVISOR" && pub.userId !== sessionUser.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    await prisma.publication.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
