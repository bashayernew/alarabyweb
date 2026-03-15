"use client";

import Image from "next/image";
import { Filter } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function RoFilters() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  const ro = {
    title: language === "ar" ? "شمعات RO" : "RO Filters",
    productTitle: language === "ar" ? "شمعة فلتر RO" : "RO Membrane Filter",
    description:
      language === "ar"
        ? "شمعة فلتر RO عالية الكفاءة مصممة لأنظمة تنقية المياه، تعمل على إزالة الأملاح والملوثات والشوائب للحصول على مياه نقية وصالحة للشرب."
        : "High-efficiency reverse osmosis membrane filter designed for water purification systems. Removes dissolved salts, impurities, and contaminants to produce clean drinking water.",
    features:
      language === "ar"
        ? [
            "كفاءة ترشيح عالية",
            "إزالة الأملاح الذائبة",
            "متوافق مع معظم أنظمة RO",
            "عمر تشغيل طويل",
            "غشاء ترشيح متين",
          ]
        : [
            "High filtration efficiency",
            "Removes dissolved salts",
            "Compatible with most RO systems",
            "Long service life",
            "Durable membrane material",
          ],
  };

  const packagesLabel =
    language === "ar" ? "الباقات المتوفرة" : "Available Packages";

  const packageTitle =
    language === "ar" ? "باقة سنتين" : "2 Year Service Package";

  const packageDescription =
    language === "ar"
      ? "تشمل تبديل الشمعات مجاناً كل 3 شهور لمدة سنتين للحفاظ على أفضل أداء لنظام الفلترة."
      : "Includes free cartridge replacement every 3 months during the 2-year service period to maintain optimal water filtration performance.";

  const packageFeatures =
    language === "ar"
      ? [
          "خدمة لمدة سنتين",
          "تبديل الشمعات مجاناً",
          "التبديل كل 3 شهور",
          "تحسين جودة المياه",
          "الحفاظ على كفاءة النظام",
        ]
      : [
          "2 year service coverage",
          "Free cartridge replacement",
          "Replacement every 3 months",
          "Improved water quality",
          "System performance maintenance",
        ];

  const imageSrc = "/rocandle.jpg";

  return (
    <section
      id="ro-filters"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="ro-filters-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="ro-filters-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {ro.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14">
          <article className="group mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[#DCEBFA] bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]">
            <div className="relative h-64 w-full overflow-hidden bg-[#EAF4FF]">
              <Image
                src={imageSrc}
                alt={ro.productTitle}
                fill
                className="object-contain p-8"
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
                      ? "فلتر أغشية RO"
                      : "RO membrane filter"}
                  </span>
                </span>
                <span className="rounded-full bg-primary-600 px-3 py-1 text-[10px] font-semibold shadow-sm">
                  {language === "ar" ? "تنقية عالية الكفاءة" : "High efficiency"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:p-6 lg:p-7">
              <h3 className="text-base font-semibold text-[#12304A] sm:text-lg">
                {ro.productTitle}
              </h3>

              <p className="text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                {ro.description}
              </p>

              <div className="mt-1.5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                  {language === "ar" ? "الميزات" : "Features"}
                </p>
                <ul className="space-y-1.5 text-xs text-[#12304A] sm:text-sm">
                  {ro.features.map((feature) => (
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

