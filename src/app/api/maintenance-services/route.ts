import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const services = await prisma.maintenanceService.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { titleEn: "asc" }],
    });
    const res = NextResponse.json(services);
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  } catch (e) {
    console.error("[api/maintenance-services]", e);
    return NextResponse.json(
      { error: "Failed to fetch maintenance services" },
      { status: 500 }
    );
  }
}
