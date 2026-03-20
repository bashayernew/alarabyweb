import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET() {
  try {
    const now = new Date();
    const offers = await prisma.offer.findMany({
      where: {
        isActive: true,
        OR: [{ endDate: null }, { endDate: { gte: now } }],
      },
      orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }],
    });
    console.log("[public/offers] rows fetched:", offers.length);
    const res = NextResponse.json(
      offers.map((o) => ({
        id: o.id,
        slug: o.slug,
        titleAr: o.titleAr,
        titleEn: o.titleEn,
        shortDescriptionAr: o.shortDescriptionAr,
        shortDescriptionEn: o.shortDescriptionEn,
        fullDescriptionAr: o.fullDescriptionAr,
        fullDescriptionEn: o.fullDescriptionEn,
        image: o.image,
        badgeAr: o.badgeAr,
        badgeEn: o.badgeEn,
        startDate: o.startDate.toISOString().split("T")[0],
        endDate: o.endDate?.toISOString().split("T")[0] ?? null,
        ctaTextAr: o.ctaTextAr,
        ctaTextEn: o.ctaTextEn,
      }))
    );
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.headers.set("Pragma", "no-cache");
    return res;
  } catch (e) {
    console.error("[api/offers]", e);
    return NextResponse.json([], { status: 200 });
  }
}
