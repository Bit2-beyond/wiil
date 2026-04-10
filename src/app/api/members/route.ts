import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const members = await prisma.user.findMany({
      where: { role: "MEMBER" },
      select: { id: true, name: true, email: true, position: true, degree: true, joinYear: true, bio: true, profileImage: true, linkedin: true, googleScholar: true, researchInterests: true, role: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "SUPERVISOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { name, email, password, position, degree, joinYear, bio, profileImage, linkedin, googleScholar, researchInterests } = body;
    if (!name || !email || !password) return NextResponse.json({ error: "name, email, password required" }, { status: 400 });
    const hashed = await bcrypt.hash(password, 12);
    const member = await prisma.user.create({
      data: { name, email, password: hashed, role: "MEMBER", position, degree, joinYear: joinYear ? Number(joinYear) : null, bio, profileImage, linkedin, googleScholar, researchInterests },
    });
    const { password: _, ...memberOut } = member;
    return NextResponse.json(memberOut, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
