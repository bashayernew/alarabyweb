"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  type AdminLang,
  getStoredAdminLang,
  setStoredAdminLang,
  getAdminTranslations,
  getNested,
} from "@/lib/admin-i18n";

interface AdminLanguageContextValue {
  lang: AdminLang;
  setLang: (lang: AdminLang) => void;
  isRTL: boolean;
  t: (key: string, vars?: Record<string, string | number>) => string;
  formatDate: (dateStr: string) => string;
}

const AdminLanguageContext = createContext<AdminLanguageContextValue | undefined>(undefined);

export function AdminLanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<AdminLang>("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLangState(getStoredAdminLang());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang, mounted]);

  const setLang = useCallback((newLang: AdminLang) => {
    setLangState(newLang);
    setStoredAdminLang(newLang);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const tr = getAdminTranslations(lang);
      let value = getNested(tr, key) ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          value = value.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return value;
    },
    [lang]
  );

  const formatDate = useCallback(
    (dateStr: string): string => {
      const d = new Date(dateStr);
      return lang === "ar"
        ? d.toLocaleDateString("ar-KW", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : d.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
    },
    [lang]
  );

  const value: AdminLanguageContextValue = {
    lang,
    setLang,
    isRTL: lang === "ar",
    t,
    formatDate,
  };

  return (
    <AdminLanguageContext.Provider value={value}>
      {children}
    </AdminLanguageContext.Provider>
  );
}

export function useAdminLanguage() {
  const ctx = useContext(AdminLanguageContext);
  if (!ctx) {
    throw new Error("useAdminLanguage must be used within AdminLanguageProvider");
  }
  return ctx;
}
