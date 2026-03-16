import { NextResponse } from "next/server";
import { serviceToJson } from "@/lib/api-helpers";
import { servicesCatalog } from "@/content/services";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/db");
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { category: "asc" }],
    });
    return NextResponse.json(services.map(serviceToJson));
  } catch (e) {
    console.error("[api/services] Database unavailable, falling back to static catalog:", e);
    return NextResponse.json(servicesCatalog);
  }
}
