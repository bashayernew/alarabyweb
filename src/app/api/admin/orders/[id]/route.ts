import { NextRequest, NextResponse } from "next/server";
import { requireWrite } from "@/lib/auth-helpers";
import { createActivityLog, buildChangeDetails, getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";
import { z } from "zod";

const STATUSES = ["new", "contacted", "in progress", "completed", "cancelled"] as const;
const updateOrderSchema = z.object({
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
    const data = updateOrderSchema.parse(body);
    const existing = await prisma.productOrder.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    const updateData: { status: string; completedById?: string; completedByName?: string; completedAt?: Date } = {
      status: data.status,
    };
    if (data.status === "completed") {
      updateData.completedById = auth.user.id;
      updateData.completedByName = auth.user.name || auth.user.email || "Admin";
      updateData.completedAt = new Date();
    }
    const order = await prisma.productOrder.update({
      where: { id },
      data: updateData,
    });
    await createActivityLog({
      user: auth.user,
      action: "update",
      module: "orders",
      itemId: id,
      itemLabel: existing.customerName || existing.id,
      details: buildChangeDetails([{ field: "status", oldValue: existing.status, newValue: data.status }]),
      ...meta,
    });
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
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
