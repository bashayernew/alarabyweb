import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const MAINTENANCE_BOOTSTRAP = [
  { titleEn: "Central Heating System Maintenance", titleAr: "صيانة السستم المركزي", descriptionEn: "Inspection and maintenance of central heating systems to ensure high efficiency and continuous hot water supply.", descriptionAr: "فحص وصيانة أنظمة السستم المركزي لضمان عملها بكفاءة عالية وتوفير المياه الساخنة بشكل مستمر.", icon: "Flame", displayOrder: 0 },
  { titleEn: "Home & Central Filter Maintenance", titleAr: "صيانة الفلاتر المنزلية والمركزية", descriptionEn: "Cleaning and maintenance of all filter types with cartridge replacement for water purity and quality.", descriptionAr: "تنظيف وصيانة جميع أنواع الفلاتر مع تبديل الشمعات لضمان نقاء المياه وجودتها.", icon: "Filter", displayOrder: 1 },
  { titleEn: "Pump Maintenance", titleAr: "صيانة المضخات", descriptionEn: "Inspection and maintenance of Italian and Spanish water pumps and pressure issue resolution.", descriptionAr: "فحص وصيانة مضخات المياه الإيطالية والإسبانية ومعالجة مشاكل ضغط المياه.", icon: "Gauge", displayOrder: 2 },
  { titleEn: "Tank Cleaning", titleAr: "غسيل وتنظيف التانكي", descriptionEn: "Cleaning and sanitizing of water tanks for clean and healthy water for use.", descriptionAr: "تنظيف وتعقيم خزانات المياه لضمان مياه نظيفة وصحية للاستخدام.", icon: "Droplets", displayOrder: 3 },
  { titleEn: "Sewage Unclogging", titleAr: "تسليك الصرف الصحي", descriptionEn: "Resolving blockages in drains and sewage using advanced equipment.", descriptionAr: "حل مشاكل الانسداد في المجاري والصرف الصحي باستخدام معدات متطورة.", icon: "Wrench", displayOrder: 4 },
  { titleEn: "Water Pressure Check", titleAr: "فحص ضغط المياه", descriptionEn: "Checking water pressure in the home and adjusting pumps for optimal water flow.", descriptionAr: "فحص ضغط المياه في المنزل وضبط المضخات لضمان تدفق المياه بشكل مثالي.", icon: "Zap", displayOrder: 5 },
];

export async function GET() {
  try {
    let services = await prisma.maintenanceService.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { titleEn: "asc" }],
    });

    if (services.length === 0) {
      const totalCount = await prisma.maintenanceService.count();
      console.log("[public/maintenance] rows fetched: 0, total in DB:", totalCount, "— bootstrapping defaults");
      if (totalCount === 0) {
        await prisma.maintenanceService.createMany({ data: MAINTENANCE_BOOTSTRAP });
        services = await prisma.maintenanceService.findMany({
          where: { isActive: true },
          orderBy: [{ displayOrder: "asc" }, { titleEn: "asc" }],
        });
        console.log("[public/maintenance] bootstrapped, final rows:", services.length);
      } else {
        console.log("[public/maintenance] rows exist but all isActive=false, filters applied excluded all");
      }
    } else {
      console.log("[public/maintenance] rows fetched:", services.length);
    }

    const res = NextResponse.json(services);
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.headers.set("Pragma", "no-cache");
    return res;
  } catch (e) {
    console.error("[public/maintenance] query failed:", e);
    const res = NextResponse.json(
      { error: "Failed to fetch maintenance services" },
      { status: 500 }
    );
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  }
}
