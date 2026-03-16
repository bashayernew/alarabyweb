import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const services = await prisma.maintenanceService.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { titleEn: "asc" }],
    });
    return NextResponse.json(services);
  } catch (e) {
    console.error("[api/maintenance-services]", e);
    return NextResponse.json(
      { error: "Failed to fetch maintenance services" },
      { status: 500 }
    );
  }
}
