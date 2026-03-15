"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function Process() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <section className="bg-gradient-to-b from-white to-[#EAF4FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl">
            {t.process.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-4" dir={isRTL ? "rtl" : "ltr"}>
          {t.process.steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white shadow-md">
                {step.number}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#12304A] sm:text-base">
                {step.title}
              </h3>
              <p className="mt-1 text-center text-xs text-[#6B7A8C] sm:text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

