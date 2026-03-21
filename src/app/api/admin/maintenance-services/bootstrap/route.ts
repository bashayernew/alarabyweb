import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const MAINTENANCE_DEFAULTS = [
  { titleEn: "Central Heating System Maintenance", titleAr: "صيانة السستم المركزي", descriptionEn: "Inspection and maintenance of central heating systems to ensure high efficiency and continuous hot water supply.", descriptionAr: "فحص وصيانة أنظمة السستم المركزي لضمان عملها بكفاءة عالية وتوفير المياه الساخنة بشكل مستمر.", icon: "Flame", displayOrder: 0 },
  { titleEn: "Home & Central Filter Maintenance", titleAr: "صيانة الفلاتر المنزلية والمركزية", descriptionEn: "Cleaning and maintenance of all filter types with cartridge replacement for water purity and quality.", descriptionAr: "تنظيف وصيانة جميع أنواع الفلاتر مع تبديل الشمعات لضمان نقاء المياه وجودتها.", icon: "Filter", displayOrder: 1 },
  { titleEn: "Pump Maintenance", titleAr: "صيانة المضخات", descriptionEn: "Inspection and maintenance of Italian and Spanish water pumps and pressure issue resolution.", descriptionAr: "فحص وصيانة مضخات المياه الإيطالية والإسبانية ومعالجة مشاكل ضغط المياه.", icon: "Gauge", displayOrder: 2 },
  { titleEn: "Tank Cleaning", titleAr: "غسيل وتنظيف التانكي", descriptionEn: "Cleaning and sanitizing of water tanks for clean and healthy water for use.", descriptionAr: "تنظيف وتعقيم خزانات المياه لضمان مياه نظيفة وصحية للاستخدام.", icon: "Droplets", displayOrder: 3 },
  { titleEn: "Sewage Unclogging", titleAr: "تسليك الصرف الصحي", descriptionEn: "Resolving blockages in drains and sewage using advanced equipment.", descriptionAr: "حل مشاكل الانسداد في المجاري والصرف الصحي باستخدام معدات متطورة.", icon: "Wrench", displayOrder: 4 },
  { titleEn: "Water Pressure Check", titleAr: "فحص ضغط المياه", descriptionEn: "Checking water pressure in the home and adjusting pumps for optimal water flow.", descriptionAr: "فحص ضغط المياه في المنزل وضبط المضخات لضمان تدفق المياه بشكل مثالي.", icon: "Zap", displayOrder: 5 },
];

/**
 * POST /api/admin/maintenance-services/bootstrap
 * ?replace=1 -> Delete all and re-seed the 6 defaults (use when page has wrong/placeholder data)
 * No query -> Seed only when table is empty
 */
export async function POST(req: NextRequest) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;
  try {
    const { searchParams } = new URL(req.url);
    const replace = searchParams.get("replace") === "1";
    const count = await prisma.maintenanceService.count();

    if (replace || count === 0) {
      if (replace && count > 0) {
        console.log("[admin/maintenance/bootstrap] replace mode: deleting", count, "existing rows");
        await prisma.maintenanceService.deleteMany({});
      }
      console.log("[admin/maintenance/bootstrap] seeding", MAINTENANCE_DEFAULTS.length, "default services");
      await prisma.maintenanceService.createMany({ data: MAINTENANCE_DEFAULTS });
      const after = await prisma.maintenanceService.count();
      console.log("[admin/maintenance/bootstrap] db result: created", after, "rows");
      revalidatePath("/");
      revalidatePath("/maintenance");
      revalidatePath("/admin/maintenance-services");
      return NextResponse.json({ ok: true, message: replace ? "Reset and seeded" : "Seeded", count: after });
    }

    console.log("[admin/maintenance/bootstrap] table has", count, "rows, skipping");
    return NextResponse.json({ ok: true, message: "Already has data", count });
  } catch (e) {
    console.error("[admin/maintenance/bootstrap] failed:", e);
    return NextResponse.json(
      { error: "Bootstrap failed", details: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
