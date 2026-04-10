import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const items = await prisma.alumni.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string }).role !== "SUPERVISOR") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const { name, degree, yearStart, yearEnd, currentPosition, email, imageUrl } = body;
    if (!name || !degree) return NextResponse.json({ error: "name and degree required" }, { status: 400 });
    const item = await prisma.alumni.create({ data: { name, degree, yearStart: yearStart ? Number(yearStart) : null, yearEnd: yearEnd ? Number(yearEnd) : null, currentPosition, email, imageUrl } });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
