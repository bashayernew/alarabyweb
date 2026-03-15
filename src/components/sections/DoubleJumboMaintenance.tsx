"use client";

import Image from "next/image";
import { Filter } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function DoubleJumboMaintenance() {
  const { language, isRTL } = useLanguage();

  const titlePrimary =
    language === "ar"
      ? "عقد صيانة فلتر دبل جمبو (6 مرات)"
      : "Double Jumbo Filter Maintenance Contract (6 Visits)";

  const titleSecondary =
    language === "ar"
      ? "Double Jumbo Filter Maintenance Contract (6 Visits)"
      : "عقد صيانة فلتر دبل جمبو (6 مرات)";

  const descriptionPrimary =
    language === "ar"
      ? "خدمة صيانة دورية لفلاتر الدبل جمبو تشمل الفحص والتنظيف واستبدال الشمعات لضمان أفضل أداء وجودة للمياه."
      : "A scheduled maintenance service for double jumbo water filtration systems including inspection, cleaning, and replacement of filter cartridges to ensure optimal water quality.";

  const descriptionSecondary =
    language === "ar"
      ? "Periodic filter inspection, pressure checks, and six scheduled maintenance visits."
      : "فحص دوري للفلتر مع فحص الضغط و 6 زيارات صيانة مجدولة.";

  const details =
    language === "ar"
      ? [
          "فحص دوري للفلتر",
          "استبدال شمعات الفلتر",
          "فحص ضغط النظام",
          "تنظيف هياكل الفلاتر",
          "6 زيارات صيانة",
        ]
      : [
          "Periodic filter inspection",
          "Filter cartridge replacement",
          "System pressure check",
          "Cleaning of filtration housings",
          "Six maintenance visits",
        ];

  const packagesLabel =
    language === "ar" ? "الباقات المتوفرة" : "Available Packages";

  const packageTitle =
    language === "ar" ? "باقة 3 سنوات" : "3 Year Maintenance Package";

  const packageDescription =
    language === "ar"
      ? "تشمل تبديل الشمعات مجاناً كل 7 شهور لمدة 3 سنوات."
      : "Includes free filter cartridge replacement every 7 months for a total service period of 3 years.";

  const packageFeatures =
    language === "ar"
      ? [
          "خدمة لمدة 3 سنوات",
          "تبديل الشمعات مجاناً",
          "التبديل كل 7 شهور",
          "تحسين أداء الفلترة",
          "حماية طويلة الأمد لنظام المياه",
        ]
      : [
          "3 year service period",
          "Free cartridge replacement",
          "Replacement every 7 months",
          "Improved filtration performance",
          "Long-term water system protection",
        ];

  const imageSrc = "/doublejombo.webp";

  return (
    <section
      id="double-jumbo-maintenance"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="double-jumbo-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="double-jumbo-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {language === "ar"
              ? "عقود صيانة فلتر دبل جمبو"
              : "Double Jumbo Filter Maintenance"}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14">
          <article className="group mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[#DCEBFA] bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]">
            <div className="relative h-[240px] w-full overflow-hidden rounded-t-3xl bg-[#EAF4FF]">
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
                      ? "خدمة صيانة فلتر دبل جمبو"
                      : "Double jumbo filter service"}
                  </span>
                </span>
                <span className="rounded-full bg-primary-600 px-3 py-1 text-[10px] font-semibold shadow-sm">
                  {language === "ar" ? "6 زيارات صيانة" : "6 maintenance visits"}
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
                  {language === "ar" ? "تفاصيل الخدمة" : "Service details"}
                </p>
                <ul className="space-y-1.5 text-xs text-[#12304A] sm:text-sm">
                  {details.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2 ${
                        isRTL ? "flex-row-reverse text-right" : ""
                      }`}
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-[#DCEBFA] pt-6">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                  {packagesLabel}
                </p>
                <div
                  className={`rounded-xl border border-[#DCEBFA] bg-[#F8FBFF] p-4 shadow-[0_4px_12px_rgba(15,23,42,0.04)] ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <h4 className="text-sm font-semibold text-[#12304A] sm:text-base">
                    {packageTitle}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                    {packageDescription}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-[#12304A] sm:text-sm">
                    {packageFeatures.map((feature) => (
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
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

