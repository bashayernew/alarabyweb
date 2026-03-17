import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

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

    await prisma.$connect();

    const hash = bcrypt.hashSync(adminPassword, 10);

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
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("INIT SEED ERROR:", err);
    return NextResponse.json(
      {
        error: "Seed failed",
        details: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      },
      { status: 500 }
    );
  }
}
