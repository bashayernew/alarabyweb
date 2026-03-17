import type { Product, Service } from "@prisma/client";

function safeParseJson<T>(json: string, fallback: T): T {
  try {
    if (!json || json.trim() === "") return fallback;
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

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
    features_en: safeParseJson<string[]>(p.featuresEn, []),
    features_ar: safeParseJson<string[]>(p.featuresAr, []),
    specs_en: p.specsEn ? safeParseJson<string[]>(p.specsEn, []) : undefined,
    specs_ar: p.specsAr ? safeParseJson<string[]>(p.specsAr, []) : undefined,
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
