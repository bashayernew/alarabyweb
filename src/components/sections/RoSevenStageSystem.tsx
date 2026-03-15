"use client";

import Image from "next/image";
import { Filter } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function RoSevenStageSystem() {
  const { language, isRTL } = useLanguage();

  const category =
    language === "ar" ? "أنظمة تنقية المياه" : "Water Filtration Systems";

  const titlePrimary =
    language === "ar"
      ? "فلتر مياه 7 مراحل"
      : "7 Stage Reverse Osmosis Water Filter";

  const titleSecondary =
    language === "ar"
      ? "7 Stage Reverse Osmosis Water Filter"
      : "فلتر مياه 7 مراحل";

  const descriptionPrimary =
    language === "ar"
      ? "نظام تنقية مياه بتقنية التناضح العكسي يتكون من 7 مراحل لتنقية المياه من الشوائب والرواسب والكلور والمواد الضارة وتحسين جودة وطعم المياه."
      : "A multi-stage reverse osmosis filtration system designed to remove impurities, sediments, chlorine, and harmful contaminants from water while improving taste and quality.";

  const descriptionSecondary =
    language === "ar"
      ? "Multi-stage RO system for household drinking water purification with improved taste and reliability."
      : "نظام تنقية مياه منزلي يوفر مياه شرب نقية بطعم أفضل واعتمادية عالية.";

  const features =
    language === "ar"
      ? [
          "نظام تنقية من 7 مراحل",
          "غشاء تناضح عكسي RO",
          "فلاتر كربونية وإزالة الرواسب",
          "تحسين قلوية المياه",
          "مقياس ضغط للمراقبة",
          "هياكل فلتر متينة",
          "مناسب للاستخدام المنزلي",
        ]
      : [
          "7 stage filtration process",
          "Reverse osmosis membrane",
          "Sediment and carbon filtration",
          "Alkaline water enhancement",
          "Pressure gauge monitoring",
          "Durable filtration housings",
          "Suitable for household water purification",
        ];

  const imageSrc = "/aquajet.webp";

  return (
    <section
      id="ro-7-stage-system"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="ro-7-stage-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ro-7-stage-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {category}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14">
          <article className="group mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[#DCEBFA] bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]">
            <div className="relative h-[260px] w-full overflow-hidden rounded-t-3xl bg-[#EAF4FF]">
              <Image
                src={imageSrc}
                alt={titlePrimary}
                fill
                className="object-contain p-6"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1F32]/35 via-transparent to-transparent" />
              <div
                className={`absolute inset-x-4 top-3 flex items-center justify-between text-[11px] font-medium text-white ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
                  <Filter size={14} />
                  <span>
                    {language === "ar"
                      ? "نظام فلتر RO منزلي"
                      : "Home RO filter system"}
                  </span>
                </span>
                <span className="rounded-full bg-primary-600 px-3 py-1 text-[10px] font-semibold shadow-sm">
                  {language === "ar" ? "7 مراحل تنقية" : "7-stage filtration"}
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

