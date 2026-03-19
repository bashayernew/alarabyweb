import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  try {
    const requests = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        service: {
          select: {
            slug: true,
            titleEn: true,
            titleAr: true,
          },
        },
      },
    });
    return NextResponse.json(requests);
  } catch (e) {
    console.error("[admin/requests] query failed:", e);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}
