import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/auth-helpers";
import { createActivityLog } from "@/lib/activity-log";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireSuperAdmin();
  if (auth.res) return auth.res;

  try {
    const { id } = await params;

    if (id === auth.user.id) {
      return NextResponse.json(
        { error: "Cannot deactivate your own account" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (existing.role === "super_admin") {
      const superAdminCount = await prisma.user.count({
        where: { role: "super_admin", isActive: true },
      });
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: "Cannot deactivate the only Super Admin" },
          { status: 400 }
        );
      }
    }

    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    await createActivityLog({
      user: auth.user,
      action: "deactivate",
      module: "users",
      itemId: id,
      itemLabel: existing.email,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to deactivate user" },
      { status: 500 }
    );
  }
}
