import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { serviceToJson } from "@/lib/api-helpers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const service = await prisma.service.findFirst({
      where: { OR: [{ id: id }, { slug: id }] },
    });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(serviceToJson(service));
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}
