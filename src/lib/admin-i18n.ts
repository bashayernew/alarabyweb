/**
 * Admin dashboard i18n - translations and helpers.
 * Translations stored in src/i18n/admin/{lang}.json
 */

import ar from "@/i18n/admin/ar.json";
import en from "@/i18n/admin/en.json";

export type AdminLang = "ar" | "en";

const STORAGE_KEY = "admin_language";

const translations: Record<AdminLang, Record<string, unknown>> = {
  ar: ar as Record<string, unknown>,
  en: en as Record<string, unknown>,
};

export function getStoredAdminLang(): AdminLang {
  if (typeof window === "undefined") return "ar";
  const stored = window.localStorage.getItem(STORAGE_KEY) as AdminLang | null;
  return stored === "en" ? "en" : "ar";
}

export function setStoredAdminLang(lang: AdminLang): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lang);
  }
}

export function getAdminTranslations(lang: AdminLang): Record<string, unknown> {
  return translations[lang] ?? translations.ar;
}

/** Get nested value by dot path: "nav.dashboard" -> "لوحة التحكم" */
export function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const p of parts) {
    if (current && typeof current === "object" && p in current) {
      current = (current as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

export function formatAdminDate(dateStr: string, lang: AdminLang): string {
  const d = new Date(dateStr);
  return lang === "ar"
    ? d.toLocaleDateString("ar-KW", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
