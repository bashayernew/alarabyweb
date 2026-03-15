"use client";

import Image from "next/image";
import { Droplets } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function LimescaleFilter() {
  const { language, isRTL } = useLanguage();

  const category =
    language === "ar"
      ? "ملحقات معالجة المياه"
      : "Water Treatment Accessories";

  const titlePrimary =
    language === "ar" ? "فلتر الكلس" : "Limescale Protection Filter";

  const titleSecondary =
    language === "ar"
      ? "Limescale Protection Filter"
      : "فلتر الكلس";

  const descriptionPrimary =
    language === "ar"
      ? "فلتر مضاد للكلس مصمم لمنع تراكم الترسبات الكلسية في السخانات والأنابيب وأنظمة المياه المنزلية مما يساعد على إطالة عمر المعدات وتحسين كفاءة النظام."
      : "A compact anti-scale filter designed to prevent limescale buildup in water heaters, pipes, and household water systems. Helps extend the life of plumbing equipment and improves system efficiency.";

  const descriptionSecondary =
    language === "ar"
      ? "Compact anti-scale filter for heaters, pipes, and home water systems."
      : "فلتر مضاد للكلس مدمج للسخانات والأنابيب وأنظمة المياه المنزلية.";

  const features =
    language === "ar"
      ? [
          "يمنع تراكم الكلس",
          "يحمي السخانات والأنابيب",
          "يحسن كفاءة نظام المياه",
          "هيكل معدني متين",
          "سهل التركيب على خط المياه",
        ]
      : [
          "Prevents limescale buildup",
          "Protects water heaters and pipes",
          "Improves water system efficiency",
          "Durable stainless steel housing",
          "Easy inline installation",
        ];

  const imageSrc = "/calsi.webp";

  return (
    <section
      id="limescale-filter"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="limescale-filter-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="limescale-filter-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {category}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14">
          <article className="group mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[#DCEBFA] bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]">
            <div className="relative h-[220px] w-full overflow-hidden rounded-t-[12px] bg-white">
              <Image
                src={imageSrc}
                alt={titlePrimary}
                fill
                className="object-contain p-6"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1F32]/20 via-transparent to-transparent" />
              <div
                className={`absolute inset-x-4 top-3 flex items-center justify-between text-[11px] font-medium text-[#12304A] ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 shadow-sm backdrop-blur-sm">
                  <Droplets size={14} />
                  <span>
                    {language === "ar"
                      ? "ملحقات معالجة المياه"
                      : "Water treatment accessory"}
                  </span>
                </span>
                <span className="rounded-full bg-primary-600 px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                  {language === "ar" ? "حماية من الكلس" : "Anti-scale"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:p-6 lg:p-7">
              <div
                className={`space-y-1 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <h3 className="text-base font-semibold text-[#12304A] sm:text-lg">
                  {titlePrimary}
                </h3>
                <p className="text-xs font-medium text-[#4B5A6C] sm:text-sm">
                  {titleSecondary}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                  {descriptionPrimary}
                </p>
                <p className="text-[11px] leading-relaxed text-[#94A3B8] sm:text-xs">
                  {descriptionSecondary}
                </p>
              </div>

              <div className="mt-1.5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                  {language === "ar" ? "الميزات" : "Features"}
                </p>
                <ul className="space-y-1.5 text-xs text-[#12304A] sm:text-sm">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 ${
                        isRTL ? "flex-row-reverse text-right" : ""
                      }`}
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
