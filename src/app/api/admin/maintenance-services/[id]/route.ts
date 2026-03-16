import { NextRequest, NextResponse } from "next/server";
import { requireWrite } from "@/lib/auth-helpers";
import { createActivityLog, getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateSchema = z.object({
  titleEn: z.string().min(1).optional(),
  titleAr: z.string().min(1).optional(),
  descriptionEn: z.string().min(1).optional(),
  descriptionAr: z.string().min(1).optional(),
  icon: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().optional(),
});

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
    const data = updateSchema.parse(body);
    const service = await prisma.maintenanceService.update({
      where: { id },
      data: {
        ...(data.titleEn !== undefined && { titleEn: data.titleEn }),
        ...(data.titleAr !== undefined && { titleAr: data.titleAr }),
        ...(data.descriptionEn !== undefined && {
          descriptionEn: data.descriptionEn,
        }),
        ...(data.descriptionAr !== undefined && {
          descriptionAr: data.descriptionAr,
        }),
        ...(data.icon !== undefined && { icon: data.icon }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.displayOrder !== undefined && {
          displayOrder: data.displayOrder,
        }),
      },
    });
    await createActivityLog({
      user: auth.user,
      action: "update",
      module: "maintenance_services",
      itemId: service.id,
      itemLabel: service.titleEn || service.titleAr,
      ...meta,
    });
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
      { error: "Failed to update maintenance service" },
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
    const existing = await prisma.maintenanceService.findUnique({ where: { id } });
    await prisma.maintenanceService.delete({ where: { id } });
    if (existing) {
      await createActivityLog({
        user: auth.user,
        action: "delete",
        module: "maintenance_services",
        itemId: id,
        itemLabel: existing.titleEn || existing.titleAr,
        ...meta,
      });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete maintenance service" },
      { status: 500 }
    );
  }
}
