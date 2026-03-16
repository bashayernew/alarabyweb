import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  try {
    const orders = await prisma.maintenanceOrder.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch maintenance orders" },
      { status: 500 }
    );
  }
}
