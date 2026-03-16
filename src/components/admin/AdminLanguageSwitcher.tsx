"use client";

import { useAdminLanguage } from "@/hooks/useAdminLanguage";

export function AdminLanguageSwitcher() {
  const { lang, setLang } = useAdminLanguage();

  return (
    <div className="flex rounded-lg border border-slate-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setLang("ar")}
        className={`px-3 py-2 text-sm font-medium transition-colors ${
          lang === "ar"
            ? "bg-primary-100 text-primary-700"
            : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        العربية
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-3 py-2 text-sm font-medium transition-colors ${
          lang === "en"
            ? "bg-primary-100 text-primary-700"
            : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        English
      </button>
    </div>
  );
}
