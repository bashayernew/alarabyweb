"use client";

import Image from "next/image";
import { Flame } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function WaterHeaterSystems() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const products = t.heaterSystems.products;

  // Uses the provided water heater image for all three products for now.
  const imageSrc = "/waterheater.webp";

  return (
    <section
      id="heater-systems"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="heater-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="heater-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {t.heaterSystems.title}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {t.heaterSystems.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[#DCEBFA] bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]"
            >
              {/* Image block */}
              <div className="relative h-44 w-full overflow-hidden bg-[#EAF4FF]">
                <Image
                  src={imageSrc}
                  alt={product.title}
                  fill
                  className="object-contain p-6"
                  sizes="(min-width: 1024px) 360px, 100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1F32]/35 via-transparent to-transparent" />
                <div
                  className={`absolute inset-x-4 top-3 flex items-center justify-between text-[11px] font-medium text-white ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
                    <Flame size={14} />
                    <span>
                      {language === "ar"
                        ? "نظام سخانات مركزية"
                        : "Central heater system"}
                    </span>
                  </span>
                  <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-semibold shadow-sm">
                    {product.warrantyLabel}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-[#12304A] sm:text-base">
                  {product.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                  {product.description}
                </p>

                <ul className="mt-1.5 space-y-1.5 text-xs text-[#12304A] sm:text-sm">
                  {product.features.map((feature) => (
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

                <div className="mt-3">
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-primary-700 sm:text-sm"
                  >
                    {language === "ar" ? "اطلب عرض سعر" : "Request Quote"}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

