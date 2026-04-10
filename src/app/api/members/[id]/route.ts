import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, position: true, degree: true, joinYear: true, bio: true, profileImage: true, linkedin: true, googleScholar: true, researchInterests: true, role: true } });
  if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(member);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const sessionUser = session.user as { id: string; role?: string };
    const { id } = await params;
    if (sessionUser.role !== "SUPERVISOR" && sessionUser.id !== id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await req.json();
    const { name, position, degree, joinYear, bio, profileImage, linkedin, googleScholar, researchInterests } = body;
    const updated = await prisma.user.update({ where: { id }, data: { name, position, degree, joinYear: joinYear ? Number(joinYear) : null, bio, profileImage, linkedin, googleScholar, researchInterests } });
    const { password: _, ...out } = updated;
    return NextResponse.json(out);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "SUPERVISOR") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
