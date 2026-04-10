import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const items = await prisma.project.findMany({ include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } });
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
    const { title, description, status, fundingBody, amount, startYear, endYear } = body;
    if (!title || !description) return NextResponse.json({ error: "Title and description required" }, { status: 400 });
    const item = await prisma.project.create({ data: { title, description, status: status || "ONGOING", fundingBody, amount, startYear: startYear ? Number(startYear) : null, endYear: endYear ? Number(endYear) : null, userId: (session.user as { id: string }).id } });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
