import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuth, requireWrite } from "@/lib/auth-helpers";
import { createActivityLog, getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  slug: z.string().optional().nullable(),
  titleAr: z.string().min(1, "Title (AR) is required"),
  titleEn: z.string().min(1, "Title (EN) is required"),
  shortDescriptionAr: z.string().default(""),
  shortDescriptionEn: z.string().default(""),
  fullDescriptionAr: z.string().default(""),
  fullDescriptionEn: z.string().default(""),
  image: z.string().optional().default(""),
  badgeAr: z.string().optional().nullable(),
  badgeEn: z.string().optional().nullable(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  displayOrder: z.number().optional().default(0),
  ctaTextAr: z.string().optional().nullable(),
  ctaTextEn: z.string().optional().nullable(),
});

function offerToJson(o: {
  id: string;
  slug: string | null;
  titleAr: string;
  titleEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  fullDescriptionAr: string;
  fullDescriptionEn: string;
  image: string;
  badgeAr: string | null;
  badgeEn: string | null;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  displayOrder: number;
  ctaTextAr: string | null;
  ctaTextEn: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
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
    isActive: o.isActive,
    displayOrder: o.displayOrder,
    ctaTextAr: o.ctaTextAr,
    ctaTextEn: o.ctaTextEn,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
  };
}

export async function GET() {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  try {
    const offers = await prisma.offer.findMany({
      orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }],
    });
    return NextResponse.json(offers.map(offerToJson));
  } catch (e) {
    console.error("[api/admin/offers GET]", e);
    const message =
      e instanceof Error ? e.message : "Failed to fetch offers";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;
  const meta = getRequestMeta(req);
  try {
    const body = await req.json();
    const data = createSchema.parse(body);
    const offer = await prisma.offer.create({
      data: {
        slug: data.slug || null,
        titleAr: data.titleAr,
        titleEn: data.titleEn,
        shortDescriptionAr: data.shortDescriptionAr,
        shortDescriptionEn: data.shortDescriptionEn,
        fullDescriptionAr: data.fullDescriptionAr,
        fullDescriptionEn: data.fullDescriptionEn,
        image: data.image || "",
        badgeAr: data.badgeAr ?? null,
        badgeEn: data.badgeEn ?? null,
        startDate: new Date(data.startDate),
        endDate:
          data.endDate && data.endDate.trim() && /^\d{4}-\d{2}-\d{2}$/.test(data.endDate)
            ? new Date(data.endDate)
            : null,
        isActive: data.isActive ?? true,
        displayOrder: data.displayOrder ?? 0,
        ctaTextAr: data.ctaTextAr ?? null,
        ctaTextEn: data.ctaTextEn ?? null,
      },
    });
    await createActivityLog({
      user: auth.user,
      action: "create",
      module: "offers",
      itemId: offer.id,
      itemLabel: offer.titleEn || offer.titleAr,
      ...meta,
    });
    revalidatePath("/");
    revalidatePath("/offers");
    return NextResponse.json(offerToJson(offer));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors.map((x) => x.message).join(", ") },
        { status: 400 }
      );
    }
    console.error("[api/admin/offers POST]", e);
    const message =
      e instanceof Error ? e.message : "Failed to create offer";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
