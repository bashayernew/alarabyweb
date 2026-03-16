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
    const user = await prisma.user.update({
      where: { id },
      data: { isActive: true },
      select: { id: true, email: true },
    });

    await createActivityLog({
      user: auth.user,
      action: "activate",
      module: "users",
      itemId: user.id,
      itemLabel: user.email,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to activate user" },
      { status: 500 }
    );
  }
}
