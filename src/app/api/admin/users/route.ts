import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { requireSuperAdmin } from "@/lib/auth-helpers";
import { createActivityLog } from "@/lib/activity-log";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["super_admin", "editor", "viewer"]),
});

export async function GET() {
  const auth = await requireSuperAdmin();
  if (auth.res) return auth.res;

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
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
    return NextResponse.json(
      users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        isActive: u.isActive,
        lastLoginAt: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
        createdAt: u.createdAt.toISOString(),
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireSuperAdmin();
  if (auth.res) return auth.res;

  try {
    const body = await req.json();
    const data = createUserSchema.parse(body);

    const email = data.email.trim().toLowerCase();
    const existingRows = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT id FROM "User" WHERE email = ${email}
    `;
    if (existingRows.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name: data.name.trim(),
        passwordHash: hash,
        role: data.role,
        isActive: true,
      },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    await createActivityLog({
      user: auth.user,
      action: "create",
      module: "users",
      itemId: user.id,
      itemLabel: user.email,
      details: { role: user.role },
    });

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
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
