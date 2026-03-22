import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuth, requireWrite } from "@/lib/auth-helpers";
import { createActivityLog, getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateSchema = z.object({
  slug: z.string().optional().nullable(),
  titleAr: z.string().min(1).optional(),
  titleEn: z.string().min(1).optional(),
  shortDescriptionAr: z.string().min(1).optional(),
  shortDescriptionEn: z.string().min(1).optional(),
  fullDescriptionAr: z.string().min(1).optional(),
  fullDescriptionEn: z.string().min(1).optional(),
  image: z.string().optional(),
  badgeAr: z.string().optional().nullable(),
  badgeEn: z.string().optional().nullable(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().optional(),
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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  try {
    const { id } = await params;
    const offer = await prisma.offer.findUnique({ where: { id } });
    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }
    return NextResponse.json(offerToJson(offer));
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch offer" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;
  const meta = getRequestMeta(req);
  try {
    const { id } = await params;
    console.log("[admin/offers/update] route hit id:", id);
    const body = await req.json();
    const data = updateSchema.parse(body);
    console.log("[admin/offers/update] payload:", JSON.stringify(data));
    const offer = await prisma.offer.update({
      where: { id },
      data: {
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.titleAr !== undefined && { titleAr: data.titleAr }),
        ...(data.titleEn !== undefined && { titleEn: data.titleEn }),
        ...(data.shortDescriptionAr !== undefined && {
          shortDescriptionAr: data.shortDescriptionAr,
        }),
        ...(data.shortDescriptionEn !== undefined && {
          shortDescriptionEn: data.shortDescriptionEn,
        }),
        ...(data.fullDescriptionAr !== undefined && {
          fullDescriptionAr: data.fullDescriptionAr,
        }),
        ...(data.fullDescriptionEn !== undefined && {
          fullDescriptionEn: data.fullDescriptionEn,
        }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.badgeAr !== undefined && { badgeAr: data.badgeAr }),
        ...(data.badgeEn !== undefined && { badgeEn: data.badgeEn }),
        ...(data.startDate !== undefined && {
          startDate: new Date(data.startDate),
        }),
        ...(data.endDate !== undefined && {
          endDate:
            data.endDate &&
            typeof data.endDate === "string" &&
            data.endDate.trim() &&
            /^\d{4}-\d{2}-\d{2}$/.test(data.endDate)
              ? new Date(data.endDate)
              : null,
        }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.displayOrder !== undefined && {
          displayOrder: data.displayOrder,
        }),
        ...(data.ctaTextAr !== undefined && { ctaTextAr: data.ctaTextAr }),
        ...(data.ctaTextEn !== undefined && { ctaTextEn: data.ctaTextEn }),
      },
    });
    console.log("[admin/offers/update] db result: id=", offer.id);
    await createActivityLog({
      user: auth.user,
      action: "update",
      module: "offers",
      itemId: offer.id,
      itemLabel: offer.titleEn || offer.titleAr,
      ...meta,
    });
    return NextResponse.json(offerToJson(offer));
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors.map((x) => x.message).join(", ") },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update offer" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;
  const meta = getRequestMeta(req);
  try {
    const { id } = await params;
    const existing = await prisma.offer.findUnique({ where: { id } });
    await prisma.offer.delete({ where: { id } });
    if (existing) {
      await createActivityLog({
        user: auth.user,
        action: "delete",
        module: "offers",
        itemId: id,
        itemLabel: existing.titleEn || existing.titleAr,
        ...meta,
      });
    }
    revalidatePath("/");
    revalidatePath("/offers");
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete offer" },
      { status: 500 }
    );
  }
}
