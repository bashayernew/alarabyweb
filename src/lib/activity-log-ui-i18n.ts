/**
 * UI-only translations for activity log action/module strings (DB values stay English).
 */

const actionMap = {
  create: { en: "Create", ar: "إنشاء" },
  update: { en: "Update", ar: "تحديث" },
  delete: { en: "Delete", ar: "حذف" },
  export: { en: "Export", ar: "تصدير" },
  sign_in: { en: "Sign In", ar: "تسجيل الدخول" },
  sign_out: { en: "Sign Out", ar: "تسجيل الخروج" },
  activate: { en: "Activate", ar: "تفعيل" },
  deactivate: { en: "Deactivate", ar: "إلغاء التفعيل" },
} as const;

/** Stored as `module` in DB; maps entity-like resource names. */
const entityMap = {
  products: { en: "Products", ar: "المنتجات" },
  services: { en: "Services", ar: "الخدمات" },
  offers: { en: "Offers", ar: "العروض" },
  offer_requests: { en: "Offer Requests", ar: "طلبات العروض" },
  maintenance_services: { en: "Maintenance Services", ar: "خدمات الصيانة" },
  maintenance_orders: { en: "Maintenance Orders", ar: "طلبات الصيانة" },
  orders: { en: "Orders", ar: "الطلبات" },
  requests: { en: "Service Requests", ar: "طلبات الخدمة" },
  users: { en: "Users", ar: "المستخدمين" },
  export: { en: "Export", ar: "تصدير" },
  auth: { en: "Authentication", ar: "المصادقة" },
} as const;

const roleMap = {
  editor: { en: "Editor", ar: "محرر" },
  admin: { en: "Admin", ar: "مدير" },
  super_admin: { en: "Super Admin", ar: "مشرف عام" },
  viewer: { en: "Viewer", ar: "مشاهد" },
} as const;

const detailKeyMap = {
  role: { en: "Role", ar: "الدور" },
} as const;

type MapEntry = { en: string; ar: string };

function pickLang(isArabic: boolean): "ar" | "en" {
  return isArabic ? "ar" : "en";
}

export function translateAction(action: string, isArabic: boolean): string {
  if (!action) return "";
  const lang = pickLang(isArabic);
  const row = actionMap[action as keyof typeof actionMap] as MapEntry | undefined;
  return row?.[lang] ?? action;
}

/** Maps stored `module` values to localized labels. */
export function translateEntity(entity: string, isArabic: boolean): string {
  if (!entity) return "";
  const lang = pickLang(isArabic);
  const row = entityMap[entity as keyof typeof entityMap] as MapEntry | undefined;
  return row?.[lang] ?? entity;
}

export function translateRole(role: string, isArabic: boolean): string {
  if (!role) return "";
  const lang = pickLang(isArabic);
  const row = roleMap[role as keyof typeof roleMap] as MapEntry | undefined;
  return row?.[lang] ?? role;
}

function translateDetailKey(key: string, isArabic: boolean): string {
  const lang = pickLang(isArabic);
  const row = detailKeyMap[key as keyof typeof detailKeyMap] as MapEntry | undefined;
  return row?.[lang] ?? key;
}

function translateDetailPrimitive(value: unknown, isArabic: boolean): string {
  if (value === null || value === undefined) return String(value);
  if (typeof value === "string") {
    const asRole = roleMap[value as keyof typeof roleMap] as MapEntry | undefined;
    if (asRole) return asRole[pickLang(isArabic)];
    return value;
  }
  return JSON.stringify(value);
}

/**
 * Renders details for display: translates known keys (e.g. role) and role string values inside change objects.
 */
export function formatActivityDetails(
  d: Record<string, unknown> | null,
  isArabic: boolean
): string | null {
  if (!d) return null;
  const arrow = isArabic ? " ← " : " → ";
  const parts: string[] = [];
  for (const [k, v] of Object.entries(d)) {
    const label = translateDetailKey(k, isArabic);
    const val = v as { old?: unknown; new?: unknown };
    if (val && typeof val === "object" && "old" in val && "new" in val) {
      parts.push(
        `${label}: ${translateDetailPrimitive(val.old, isArabic)}${arrow}${translateDetailPrimitive(val.new, isArabic)}`
      );
    } else {
      parts.push(`${label}: ${translateDetailPrimitive(v, isArabic)}`);
    }
  }
  return parts.join("; ");
}
