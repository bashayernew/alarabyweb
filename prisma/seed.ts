import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
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
  // Migrate legacy "admin" role to "super_admin"
  await prisma.user.updateMany({
    where: { role: "admin" },
    data: { role: "super_admin" },
  });
  console.log("Admin user upserted:", adminEmail);

  // Remove discontinued products from database
  const removedSlugs = ["spanish-booster-pump", "pressure-reducer", "filter-copper", "automatic-system"];
  const deleted = await prisma.product.deleteMany({ where: { slug: { in: removedSlugs } } });
  if (deleted.count > 0) console.log("Removed discontinued products:", deleted.count);

  // Seed products from static content (dynamic import from project root)
  const { catalogProducts } = await import("../src/content/products");
  const products = "length" in catalogProducts ? catalogProducts : [];

  let sortOrder = 0;
  for (const p of products as Array<{
    id: string;
    image: string;
    title_en: string;
    title_ar: string;
    subtitle_en: string;
    subtitle_ar: string;
    short_description_en: string;
    short_description_ar: string;
    full_description_en: string;
    full_description_ar: string;
    warranty_en: string;
    warranty_ar: string;
    features_en: string[];
    features_ar: string[];
    specs_en?: string[];
    specs_ar?: string[];
    category: string;
    badge_en?: string;
    badge_ar?: string;
  }>) {
    const isFirst = sortOrder === 0;
    await prisma.product.upsert({
      where: { slug: p.id },
      update: {
        image: p.image,
        sortOrder,
        isFeatured: isFirst,
        titleEn: p.title_en,
        titleAr: p.title_ar,
        subtitleEn: p.subtitle_en,
        subtitleAr: p.subtitle_ar,
        shortDescriptionEn: p.short_description_en,
        shortDescriptionAr: p.short_description_ar,
        fullDescriptionEn: p.full_description_en,
        fullDescriptionAr: p.full_description_ar,
        warrantyEn: p.warranty_en,
        warrantyAr: p.warranty_ar,
        featuresEn: JSON.stringify(p.features_en ?? []),
        featuresAr: JSON.stringify(p.features_ar ?? []),
        specsEn: p.specs_en ? JSON.stringify(p.specs_en) : null,
        specsAr: p.specs_ar ? JSON.stringify(p.specs_ar) : null,
        category: p.category,
        badgeEn: p.badge_en ?? null,
        badgeAr: p.badge_ar ?? null,
      },
      create: {
        slug: p.id,
        sortOrder,
        isFeatured: isFirst,
        image: p.image,
        titleEn: p.title_en,
        titleAr: p.title_ar,
        subtitleEn: p.subtitle_en,
        subtitleAr: p.subtitle_ar,
        shortDescriptionEn: p.short_description_en,
        shortDescriptionAr: p.short_description_ar,
        fullDescriptionEn: p.full_description_en,
        fullDescriptionAr: p.full_description_ar,
        warrantyEn: p.warranty_en,
        warrantyAr: p.warranty_ar,
        featuresEn: JSON.stringify(p.features_en ?? []),
        featuresAr: JSON.stringify(p.features_ar ?? []),
        specsEn: p.specs_en ? JSON.stringify(p.specs_en) : null,
        specsAr: p.specs_ar ? JSON.stringify(p.specs_ar) : null,
        category: p.category,
        badgeEn: p.badge_en ?? null,
        badgeAr: p.badge_ar ?? null,
      },
    });
    sortOrder++;
  }
  console.log("Products seeded:", products.length);

  const { servicesCatalog } = await import("../src/content/services");
  const services = "length" in servicesCatalog ? servicesCatalog : [];

  for (const s of services as Array<{
    id: string;
    category: string;
    title_en: string;
    title_ar: string;
    subtitle_en?: string;
    subtitle_ar?: string;
    description_en: string;
    description_ar: string;
    options_en?: string[];
    options_ar?: string[];
  }>) {
    await prisma.service.upsert({
      where: { slug: s.id },
      update: {
        category: s.category,
        titleEn: s.title_en,
        titleAr: s.title_ar,
        subtitleEn: s.subtitle_en ?? null,
        subtitleAr: s.subtitle_ar ?? null,
        descriptionEn: s.description_en,
        descriptionAr: s.description_ar,
        optionsEn: s.options_en ? JSON.stringify(s.options_en) : null,
        optionsAr: s.options_ar ? JSON.stringify(s.options_ar) : null,
      },
      create: {
        slug: s.id,
        category: s.category,
        titleEn: s.title_en,
        titleAr: s.title_ar,
        subtitleEn: s.subtitle_en ?? null,
        subtitleAr: s.subtitle_ar ?? null,
        descriptionEn: s.description_en,
        descriptionAr: s.description_ar,
        optionsEn: s.options_en ? JSON.stringify(s.options_en) : null,
        optionsAr: s.options_ar ? JSON.stringify(s.options_ar) : null,
      },
    });
  }
  console.log("Services seeded:", services.length);

  // Offers (seed data - new schema)
  const offerData = [
    {
      titleAr: "نظام التدفئة المركزية",
      titleEn: "Central Heating System",
      shortDescriptionAr:
        "عرض خاص على السخانات المركزية مع توفير الطاقة. تركيب شامل وصيانة دورية.",
      shortDescriptionEn:
        "Special offer on central heaters with energy savings. Full installation and periodic maintenance.",
      fullDescriptionAr:
        "عرض خاص على السخانات المركزية مع توفير الطاقة. تركيب شامل وصيانة دورية لضمان استمرارية الأداء.",
      fullDescriptionEn:
        "Special offer on central heating systems with energy savings. Full installation and periodic maintenance for reliable performance.",
      image: "",
      badgeAr: "عرض خاص",
      badgeEn: "Special Offer",
      startDate: new Date(),
      displayOrder: 0,
    },
    {
      titleAr: "فلترة المياه المركزية",
      titleEn: "Central Water Filtration",
      shortDescriptionAr:
        "عرض خاص على أنظمة فلترة المياه المركزية. مياه أنقى للشرب والاستخدام المنزلي.",
      shortDescriptionEn:
        "Special offer on central water filtration systems. Cleaner water for drinking and home use.",
      fullDescriptionAr:
        "عرض خاص على أنظمة فلترة المياه المركزية. مياه أنقى للشرب والاستخدام المنزلي مع ضمان جودة عالية.",
      fullDescriptionEn:
        "Special offer on central water filtration systems. Cleaner water for drinking and home use with high quality guarantee.",
      image: "",
      badgeAr: "عرض محدود",
      badgeEn: "Limited Offer",
      startDate: new Date(),
      displayOrder: 1,
    },
  ];
  const existingOffers = await prisma.offer.count();
  if (existingOffers === 0) {
    await prisma.offer.createMany({
      data: offerData.map((o) => ({
        titleAr: o.titleAr,
        titleEn: o.titleEn,
        shortDescriptionAr: o.shortDescriptionAr,
        shortDescriptionEn: o.shortDescriptionEn,
        fullDescriptionAr: o.fullDescriptionAr,
        fullDescriptionEn: o.fullDescriptionEn,
        image: o.image,
        badgeAr: o.badgeAr,
        badgeEn: o.badgeEn,
        startDate: o.startDate,
        displayOrder: o.displayOrder,
      })),
    });
    console.log("Offers seeded:", offerData.length);
  }

  // Maintenance services (from translations content)
  const maintenanceServices = [
    {
      titleEn: "Central Heating System Maintenance",
      titleAr: "صيانة السستم المركزي",
      descriptionEn:
        "Inspection and maintenance of central heating systems to ensure high efficiency and continuous hot water supply.",
      descriptionAr:
        "فحص وصيانة أنظمة السستم المركزي لضمان عملها بكفاءة عالية وتوفير المياه الساخنة بشكل مستمر.",
      icon: "Flame",
      displayOrder: 0,
    },
    {
      titleEn: "Home & Central Filter Maintenance",
      titleAr: "صيانة الفلاتر المنزلية والمركزية",
      descriptionEn:
        "Cleaning and maintenance of all filter types with cartridge replacement for water purity and quality.",
      descriptionAr:
        "تنظيف وصيانة جميع أنواع الفلاتر مع تبديل الشمعات لضمان نقاء المياه وجودتها.",
      icon: "Filter",
      displayOrder: 1,
    },
    {
      titleEn: "Pump Maintenance",
      titleAr: "صيانة المضخات",
      descriptionEn:
        "Inspection and maintenance of Italian and Spanish water pumps and pressure issue resolution.",
      descriptionAr:
        "فحص وصيانة مضخات المياه الإيطالية والإسبانية ومعالجة مشاكل ضغط المياه.",
      icon: "Gauge",
      displayOrder: 2,
    },
    {
      titleEn: "Tank Cleaning",
      titleAr: "غسيل وتنظيف التانكي",
      descriptionEn:
        "Cleaning and sanitizing of water tanks for clean and healthy water for use.",
      descriptionAr:
        "تنظيف وتعقيم خزانات المياه لضمان مياه نظيفة وصحية للاستخدام.",
      icon: "Droplets",
      displayOrder: 3,
    },
    {
      titleEn: "Sewage Unclogging",
      titleAr: "تسليك الصرف الصحي",
      descriptionEn:
        "Resolving blockages in drains and sewage using advanced equipment.",
      descriptionAr:
        "حل مشاكل الانسداد في المجاري والصرف الصحي باستخدام معدات متطورة.",
      icon: "Wrench",
      displayOrder: 4,
    },
    {
      titleEn: "Water Pressure Check",
      titleAr: "فحص ضغط المياه",
      descriptionEn:
        "Checking water pressure in the home and adjusting pumps for optimal water flow.",
      descriptionAr:
        "فحص ضغط المياه في المنزل وضبط المضخات لضمان تدفق المياه بشكل مثالي.",
      icon: "Zap",
      displayOrder: 5,
    },
  ];
  const existingMaintenance = await prisma.maintenanceService.count();
  if (existingMaintenance === 0) {
    await prisma.maintenanceService.createMany({
      data: maintenanceServices,
    });
    console.log("Maintenance services seeded:", maintenanceServices.length);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
