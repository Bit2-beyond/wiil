import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const pubs = await prisma.publication.findMany({ include: { user: { select: { name: true } } }, orderBy: { year: "desc" } });
    return NextResponse.json(pubs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const sessionUser = session.user as { id: string; role?: string };
    const body = await req.json();
    const { title, authors, venue, year, type, doi, link, abstract } = body;
    if (!title || !authors || !venue || !year) return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    const pub = await prisma.publication.create({ data: { title, authors, venue, year: Number(year), type: type || "CONFERENCE", doi, link, abstract, userId: sessionUser.id } });
    return NextResponse.json(pub, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
