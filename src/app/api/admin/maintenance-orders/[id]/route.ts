import { NextRequest, NextResponse } from "next/server";
import { requireWrite } from "@/lib/auth-helpers";
import { createActivityLog, buildChangeDetails, getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";
import { z } from "zod";

const STATUSES = ["new", "in_progress", "completed", "cancelled"] as const;

const updateSchema = z.object({
  status: z.enum(STATUSES),
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
    const { status } = updateSchema.parse(body);
    const existing = await prisma.maintenanceOrder.findUnique({ where: { id } });
    const updateData: { status: string; completedById?: string; completedByName?: string; completedAt?: Date } = {
      status,
    };
    if (status === "completed") {
      updateData.completedById = auth.user.id;
      updateData.completedByName = auth.user.name || auth.user.email || "Admin";
      updateData.completedAt = new Date();
    }
    const order = await prisma.maintenanceOrder.update({
      where: { id },
      data: updateData,
    });
    if (existing) {
      await createActivityLog({
        user: auth.user,
        action: "update",
        module: "maintenance_orders",
        itemId: id,
        itemLabel: existing.serviceTitleAr || existing.customerName,
        details: buildChangeDetails([{ field: "status", oldValue: existing.status, newValue: status }]),
        ...meta,
      });
    }
    return NextResponse.json(order);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors.map((x) => x.message).join(", ") },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update maintenance order" },
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
    const existing = await prisma.maintenanceOrder.findUnique({ where: { id } });
    await prisma.maintenanceOrder.delete({ where: { id } });
    if (existing) {
      await createActivityLog({
        user: auth.user,
        action: "delete",
        module: "maintenance_orders",
        itemId: id,
        itemLabel: existing.serviceTitleAr || existing.customerName,
        ...meta,
      });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete maintenance order" },
      { status: 500 }
    );
  }
}
