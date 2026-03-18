import { NextResponse } from "next/server";
import { serviceToJson } from "@/lib/api-helpers";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { category: "asc" }],
    });
    const res = NextResponse.json(services.map(serviceToJson));
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  } catch (e) {
    console.error("[api/services]", e);
    return NextResponse.json([], { status: 200 });
  }
}
