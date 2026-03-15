import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { serviceToJson } from "@/lib/api-helpers";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { category: "asc" },
    });
    return NextResponse.json(services.map(serviceToJson));
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
