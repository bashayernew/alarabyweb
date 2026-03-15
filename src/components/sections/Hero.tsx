"use client";

import { ArrowRight, ArrowLeft, PhoneCall } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function Hero() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <section
      id="home"
      className="hero-waves relative min-h-[70vh] overflow-hidden bg-[#12304A]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#12304A] via-[#1e4a6e] to-[#12304A]" />
      <div className="absolute inset-0 bg-[#12304A]/70" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-4 pb-16 pt-24 sm:px-6 md:flex-row md:items-center md:pb-24 md:pt-32 lg:px-8">
        <div
          className={`flex-1 space-y-6 ${
            isRTL ? "md:order-2 md:pl-12" : "md:order-1 md:pr-12"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-primary-800 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {language === "ar"
              ? "حلول متكاملة لأنظمة المياه في الكويت"
              : "End-to-end water system solutions in Kuwait"}
          </div>

          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            <span className="bg-gradient-to-br from-white via-primary-100 to-secondary-200 bg-clip-text text-transparent">
              {t.hero.headline}
            </span>
          </h1>

          <p className="max-w-xl text-balance text-sm leading-relaxed text-white/90 sm:text-base">
            {t.hero.subheadline}
          </p>

          <div
            className={`flex flex-col gap-3 pt-2 sm:flex-row ${
              isRTL ? "sm:flex-row-reverse" : ""
            }`}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-primary-700 hover:shadow-lg sm:text-sm"
            >
              {t.hero.cta1}
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </a>
            <a
              href="https://wa.me/96599346138"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-white/20 sm:text-sm"
            >
              <PhoneCall size={18} />
              {t.hero.cta2}
            </a>
          </div>

          <div
            className={`mt-6 flex flex-wrap gap-5 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {t.trust.badges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 shadow-sm">
                  <span className="text-sm font-bold text-primary-600">
                    {badge.value}
                  </span>
                </div>
                <p className="text-xs font-medium text-white/90 sm:text-sm">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`flex-1 ${
            isRTL ? "md:order-1" : "md:order-2"
          } flex justify-center`}
        >
          <div className="relative h-72 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-md">
            <div className="absolute inset-x-5 top-5 rounded-2xl bg-white/95 p-4 shadow-lg">
              <div className="flex items-center justify-between text-xs text-[#6B7A8C]">
                <span>
                  {language === "ar"
                    ? "نظام تسخين مركزي"
                    : "Central heating system"}
                </span>
                <span>
                  {language === "ar" ? "توفير في الطاقة" : "Energy savings"}
                </span>
              </div>
              <div className="mt-4 h-24 rounded-xl bg-gradient-to-br from-primary-200/60 to-secondary-300/60" />
            </div>
            <div className="absolute inset-x-8 bottom-6 rounded-2xl bg-white/95 p-4 shadow-lg">
              <div className="flex items-center justify-between text-xs text-[#6B7A8C]">
                <span>
                  {language === "ar"
                    ? "فلتر مياه مركزي"
                    : "Central water filtration"}
                </span>
                <span>
                  {language === "ar" ? "مياه أنقى" : "Cleaner water"}
                </span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-gradient-to-r from-primary-400 to-secondary-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
