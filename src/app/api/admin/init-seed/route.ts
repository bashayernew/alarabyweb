import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const MAINTENANCE_SERVICES = [
  { titleEn: "Central Heating System Maintenance", titleAr: "صيانة السستم المركزي", descriptionEn: "Inspection and maintenance of central heating systems to ensure high efficiency and continuous hot water supply.", descriptionAr: "فحص وصيانة أنظمة السستم المركزي لضمان عملها بكفاءة عالية وتوفير المياه الساخنة بشكل مستمر.", icon: "Flame", displayOrder: 0 },
  { titleEn: "Home & Central Filter Maintenance", titleAr: "صيانة الفلاتر المنزلية والمركزية", descriptionEn: "Cleaning and maintenance of all filter types with cartridge replacement for water purity and quality.", descriptionAr: "تنظيف وصيانة جميع أنواع الفلاتر مع تبديل الشمعات لضمان نقاء المياه وجودتها.", icon: "Filter", displayOrder: 1 },
  { titleEn: "Pump Maintenance", titleAr: "صيانة المضخات", descriptionEn: "Inspection and maintenance of Italian and Spanish water pumps and pressure issue resolution.", descriptionAr: "فحص وصيانة مضخات المياه الإيطالية والإسبانية ومعالجة مشاكل ضغط المياه.", icon: "Gauge", displayOrder: 2 },
  { titleEn: "Tank Cleaning", titleAr: "غسيل وتنظيف التانكي", descriptionEn: "Cleaning and sanitizing of water tanks for clean and healthy water for use.", descriptionAr: "تنظيف وتعقيم خزانات المياه لضمان مياه نظيفة وصحية للاستخدام.", icon: "Droplets", displayOrder: 3 },
  { titleEn: "Sewage Unclogging", titleAr: "تسليك الصرف الصحي", descriptionEn: "Resolving blockages in drains and sewage using advanced equipment.", descriptionAr: "حل مشاكل الانسداد في المجاري والصرف الصحي باستخدام معدات متطورة.", icon: "Wrench", displayOrder: 4 },
  { titleEn: "Water Pressure Check", titleAr: "فحص ضغط المياه", descriptionEn: "Checking water pressure in the home and adjusting pumps for optimal water flow.", descriptionAr: "فحص ضغط المياه في المنزل وضبط المضخات لضمان تدفق المياه بشكل مثالي.", icon: "Zap", displayOrder: 5 },
];

/**
 * One-time setup: creates admin user. Optionally seeds empty tables.
 * GET /api/admin/init-seed?secret=YOUR_INIT_SECRET
 * GET /api/admin/init-seed?secret=YOUR_INIT_SECRET&maintenance=1  — seed maintenance if empty
 * Add INIT_SECRET to Vercel env vars (e.g. run: openssl rand -hex 16)
 */
export async function GET(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    const expected = process.env.INIT_SECRET;

    if (!expected || secret !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }

    const adminEmail = process.env.ADMIN_EMAIL ?? "admin123@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

    const hashed = await bcrypt.hash(adminPassword, 10);

    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { passwordHash: hashed, role: "super_admin", isActive: true },
      create: {
        email: adminEmail,
        passwordHash: hashed,
        name: "Admin",
        role: "super_admin",
        isActive: true,
      },
    });

    const result: { ok: boolean; message: string; email: string; maintenance?: string } = {
      ok: true,
      message: "Admin user created",
      email: adminEmail,
    };

    const seedMaintenance = req.nextUrl.searchParams.get("maintenance") === "1";
    if (seedMaintenance) {
      const count = await prisma.maintenanceService.count();
      if (count === 0) {
        await prisma.maintenanceService.createMany({ data: MAINTENANCE_SERVICES });
        result.maintenance = `Seeded ${MAINTENANCE_SERVICES.length} maintenance services`;
        console.log("[init-seed] Maintenance services seeded");
      } else {
        result.maintenance = `Already has ${count} maintenance services, skipped`;
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("[init-seed] ERROR:", err);
    return NextResponse.json(
      {
        error: "Seed failed",
        details: err.message,
        stack: err.stack,
      },
      { status: 500 }
    );
  }
}
