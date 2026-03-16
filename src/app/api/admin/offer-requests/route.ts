import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  try {
    const requests = await prisma.offerRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch offer requests" },
      { status: 500 }
    );
  }
}
