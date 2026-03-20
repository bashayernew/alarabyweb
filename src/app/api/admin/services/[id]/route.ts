import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuth, requireWrite } from "@/lib/auth-helpers";
import { createActivityLog, buildChangeDetails, getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateServiceSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  image: z.string().optional().nullable(),
  category: z.string().min(1).optional(),
  titleEn: z.string().min(1).optional(),
  titleAr: z.string().min(1).optional(),
  subtitleEn: z.string().optional().nullable(),
  subtitleAr: z.string().optional().nullable(),
  descriptionEn: z.string().min(1).optional(),
  descriptionAr: z.string().min(1).optional(),
  optionsEn: z.string().optional().nullable(),
  optionsAr: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch service" },
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
    const body = await req.json();
    const data = updateServiceSchema.parse(body);
    console.log("[admin/services/update] payload:", JSON.stringify(data));
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await prisma.service.findUnique({ where: { slug: data.slug } });
      if (slugExists) {
        return NextResponse.json(
          { error: "Service with this slug already exists" },
          { status: 400 }
        );
      }
    }
    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.titleEn !== undefined && { titleEn: data.titleEn }),
        ...(data.titleAr !== undefined && { titleAr: data.titleAr }),
        ...(data.subtitleEn !== undefined && { subtitleEn: data.subtitleEn }),
        ...(data.subtitleAr !== undefined && { subtitleAr: data.subtitleAr }),
        ...(data.descriptionEn !== undefined && { descriptionEn: data.descriptionEn }),
        ...(data.descriptionAr !== undefined && { descriptionAr: data.descriptionAr }),
        ...(data.optionsEn !== undefined && { optionsEn: data.optionsEn }),
        ...(data.optionsAr !== undefined && { optionsAr: data.optionsAr }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
      },
    });
    const changes: Array<{ field: string; oldValue: unknown; newValue: unknown }> = [];
    if (data.titleEn !== undefined && data.titleEn !== existing.titleEn)
      changes.push({ field: "titleEn", oldValue: existing.titleEn, newValue: data.titleEn });
    if (data.titleAr !== undefined && data.titleAr !== existing.titleAr)
      changes.push({ field: "titleAr", oldValue: existing.titleAr, newValue: data.titleAr     });
    console.log("[admin/services/update] db result: id=", service.id, "slug=", service.slug);
    await createActivityLog({
      user: auth.user,
      action: "update",
      module: "services",
      itemId: service.id,
      itemLabel: service.titleEn || service.titleAr,
      details: changes.length > 0 ? buildChangeDetails(changes) : undefined,
      ...meta,
    });
    revalidatePath("/");
    revalidatePath("/services");
    return NextResponse.json(service);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors.map((x) => x.message).join(", ") },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update service" },
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
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    await prisma.service.delete({ where: { id } });
    await createActivityLog({
      user: auth.user,
      action: "delete",
      module: "services",
      itemId: id,
      itemLabel: existing.titleEn || existing.titleAr,
      ...meta,
    });
    revalidatePath("/");
    revalidatePath("/services");
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
