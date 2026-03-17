import { NextResponse } from "next/server";
import { serviceToJson } from "@/lib/api-helpers";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { category: "asc" }],
    });
    return NextResponse.json(services.map(serviceToJson));
  } catch (e) {
    console.error("[api/services]", e);
    return NextResponse.json([], { status: 200 });
  }
}
