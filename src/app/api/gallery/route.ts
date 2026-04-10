import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
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
    const { imageUrl, caption, category } = body;
    if (!imageUrl) return NextResponse.json({ error: "imageUrl required" }, { status: 400 });
    const item = await prisma.galleryItem.create({ data: { imageUrl, caption, category, userId: (session.user as { id: string }).id } });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
