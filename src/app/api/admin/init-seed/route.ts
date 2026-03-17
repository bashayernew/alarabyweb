import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

/**
 * One-time setup: creates admin user. Call once after deploy.
 * GET /api/admin/init-seed?secret=YOUR_INIT_SECRET
 * Add INIT_SECRET to Vercel env vars (e.g. run: openssl rand -hex 16)
 */
export async function GET(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    const expected = process.env.INIT_SECRET;

    if (!expected || secret !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmail = process.env.ADMIN_EMAIL ?? "admin123@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
    const hash = await bcrypt.hash(adminPassword, 10);

    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { passwordHash: hash, role: "super_admin", isActive: true },
      create: {
        email: adminEmail,
        passwordHash: hash,
        name: "Admin",
        role: "super_admin",
        isActive: true,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Admin user created",
      email: adminEmail,
    });
  } catch (e) {
    console.error("[init-seed]", e);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
