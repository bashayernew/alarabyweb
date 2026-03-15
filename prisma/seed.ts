import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@aquasystems.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const hash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: hash,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("Admin user upserted:", adminEmail);

  // Seed products from static content (dynamic import from project root)
  const { catalogProducts } = await import("../src/content/products");
  const products = "length" in catalogProducts ? catalogProducts : [];

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
    await prisma.product.upsert({
      where: { slug: p.id },
      update: {
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
      create: {
        slug: p.id,
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
