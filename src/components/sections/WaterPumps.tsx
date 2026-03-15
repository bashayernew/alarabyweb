"use client";

import Image from "next/image";
import { Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function WaterPumps() {
  const { language, isRTL } = useLanguage();

  const sectionTitle =
    language === "ar" ? "مضخات المياه" : "Water Pumps";

  const name =
    language === "ar"
      ? "Self-Priming Booster Pump"
      : "Self-Priming Booster Pump";

  const arabicLabel = "مضخة الدفع ذاتية\nكفالة سنتين على التبديل";

  const description =
    language === "ar"
      ? "مضخة دفع ذاتية مصممة لزيادة ضغط المياه في المنازل مع أداء موثوق وكفاءة عالية."
      : "Self-priming booster pump designed to increase household water pressure with reliable, efficient performance.";

  const imageSrc = "/pump1.webp";

  return (
    <section
      id="water-pumps"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="water-pumps-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="water-pumps-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {sectionTitle}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          <article className="group mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-[#DCEBFA] bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]">
            <div className="relative h-48 w-full overflow-hidden rounded-t-3xl bg-[#EAF4FF]">
              <Image
                src={imageSrc}
                alt="Self-Priming Booster Pump"
                fill
                className="object-contain p-6"
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1F32]/35 via-transparent to-transparent" />
              <div
                className={`absolute inset-x-4 top-3 flex items-center justify-between text-[11px] font-medium text-white ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
                  <Zap size={14} />
                  <span>
                    {language === "ar"
                      ? "مضخة تعزيز الضغط"
                      : "Booster pump"}
                  </span>
                </span>
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-semibold shadow-sm">
                  {language === "ar" ? "ضمان سنتين" : "2 Year Warranty"}
                </span>
              </div>
            </div>

            <div
              className={`flex flex-1 flex-col gap-2 p-5 sm:p-6 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <h3 className="text-sm font-semibold text-[#12304A] sm:text-base">
                {name}
              </h3>
              <p className="text-xs font-medium text-primary-700 sm:text-sm whitespace-pre-line">
                {arabicLabel}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                {description}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

