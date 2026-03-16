import type { Product, Service } from "@prisma/client";

export function productToJson(p: Product) {
  return {
    id: p.slug,
    dbId: p.id,
    image: p.image,
    price: p.price ?? undefined,
    title_en: p.titleEn,
    title_ar: p.titleAr,
    subtitle_en: p.subtitleEn,
    subtitle_ar: p.subtitleAr,
    short_description_en: p.shortDescriptionEn,
    short_description_ar: p.shortDescriptionAr,
    full_description_en: p.fullDescriptionEn,
    full_description_ar: p.fullDescriptionAr,
    warranty_en: p.warrantyEn,
    warranty_ar: p.warrantyAr,
    features_en: JSON.parse(p.featuresEn) as string[],
    features_ar: JSON.parse(p.featuresAr) as string[],
    specs_en: p.specsEn ? (JSON.parse(p.specsEn) as string[]) : undefined,
    specs_ar: p.specsAr ? (JSON.parse(p.specsAr) as string[]) : undefined,
    category: p.category,
    badge_en: p.badgeEn ?? undefined,
    badge_ar: p.badgeAr ?? undefined,
  };
}

export function serviceToJson(s: Service) {
  return {
    id: s.slug,
    dbId: s.id,
    image: s.image ?? undefined,
    category: s.category,
    title_en: s.titleEn,
    title_ar: s.titleAr,
    subtitle_en: s.subtitleEn ?? undefined,
    subtitle_ar: s.subtitleAr ?? undefined,
    description_en: s.descriptionEn,
    description_ar: s.descriptionAr,
    options_en: s.optionsEn ? (JSON.parse(s.optionsEn) as string[]) : undefined,
    options_ar: s.optionsAr ? (JSON.parse(s.optionsAr) as string[]) : undefined,
  };
}
