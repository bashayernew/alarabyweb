"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full bg-primary-50 p-1">
      <button
        type="button"
        onClick={() => setLanguage("ar")}
        className={`px-3 py-1.5 text-xs font-semibold transition-all md:text-sm ${
          language === "ar"
            ? "rounded-full bg-primary-500 text-white shadow-sm"
            : "rounded-full text-neutral-600 hover:text-primary-500"
        }`}
      >
        العربية
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 text-xs font-semibold transition-all md:text-sm ${
          language === "en"
            ? "rounded-full bg-primary-500 text-white shadow-sm"
            : "rounded-full text-neutral-600 hover:text-primary-500"
        }`}
      >
        English
      </button>
    </div>
  );
}

