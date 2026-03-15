import { NextResponse } from "next/server";
import { getSession } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}
