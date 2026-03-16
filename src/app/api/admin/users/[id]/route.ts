import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { requireSuperAdmin } from "@/lib/auth-helpers";
import { createActivityLog, buildChangeDetails } from "@/lib/activity-log";

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.enum(["super_admin", "editor", "viewer"]).optional(),
  password: z.string().min(6).optional().nullable(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireSuperAdmin();
  if (auth.res) return auth.res;

  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireSuperAdmin();
  if (auth.res) return auth.res;

  try {
    const { id } = await params;
    const body = await req.json();
    const data = updateUserSchema.parse(body);

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent demoting the last super_admin
    if (data.role && data.role !== "super_admin" && existing.role === "super_admin") {
      const superAdminCount = await prisma.user.count({
        where: { role: "super_admin", isActive: true },
      });
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: "Cannot change role: at least one active Super Admin is required" },
          { status: 400 }
        );
      }
    }

    const changes: Array<{ field: string; oldValue: unknown; newValue: unknown }> = [];
    if (data.name !== undefined && data.name !== existing.name) {
      changes.push({ field: "name", oldValue: existing.name, newValue: data.name });
    }
    if (data.email !== undefined) {
      const newEmail = data.email.trim().toLowerCase();
      if (newEmail !== existing.email) {
        const emailExists = await prisma.user.findUnique({ where: { email: newEmail } });
        if (emailExists && emailExists.id !== id) {
          return NextResponse.json(
            { error: "Email already in use" },
            { status: 400 }
          );
        }
        changes.push({ field: "email", oldValue: existing.email, newValue: newEmail });
      }
    }
    if (data.role !== undefined && data.role !== existing.role) {
      changes.push({ field: "role", oldValue: existing.role, newValue: data.role });
    }

    const updateData: {
      name?: string;
      email?: string;
      role?: string;
      passwordHash?: string;
    } = {};
    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.email !== undefined) updateData.email = data.email.trim().toLowerCase();
    if (data.role !== undefined) updateData.role = data.role;
    if (data.password !== undefined && data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
      changes.push({ field: "password", oldValue: "[hidden]", newValue: "[updated]" });
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    if (changes.length > 0) {
      await createActivityLog({
        user: auth.user,
        action: "update",
        module: "users",
        itemId: user.id,
        itemLabel: user.email,
        details: buildChangeDetails(changes),
      });
    }

    return NextResponse.json(user);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors.map((x) => x.message).join(", ") },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireSuperAdmin();
  if (auth.res) return auth.res;

  try {
    const { id } = await params;

    if (id === auth.user.id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
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
          { error: "Cannot delete the only Super Admin" },
          { status: 400 }
        );
      }
    }

    await prisma.user.delete({ where: { id } });

    await createActivityLog({
      user: auth.user,
      action: "delete",
      module: "users",
      itemId: id,
      itemLabel: existing.email,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
