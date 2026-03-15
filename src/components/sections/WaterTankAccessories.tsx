"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function WaterTankAccessories() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const data = t.tankAccessories.floatSwitch;

  const imageSrc = "/floatswitch.webp";

  return (
    <section
      id="tank-accessories"
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="tank-accessories-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="tank-accessories-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {t.tankAccessories.title}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {language === "ar"
              ? "حلول تحكم ذكية لمستوى المياه تحمي المضخات والخزانات."
              : "Smart level-control accessories that protect your pumps and tanks."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14">
          <article className="group mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[#DCEBFA] bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]">
            {/* Image */}
            <div className="relative h-60 w-full overflow-hidden bg-[#EAF4FF]">
              <Image
                src={imageSrc}
                alt={data.title}
                fill
                className="object-contain p-8"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 p-5 sm:p-6 lg:p-7">
              <h3 className="text-base font-semibold text-[#12304A] sm:text-lg">
                {data.title}
              </h3>

              <p className="text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                {data.description}
              </p>

              <div
                className={`grid gap-4 text-xs sm:grid-cols-2 sm:text-sm ${
                  isRTL ? "sm:direction-rtl" : ""
                }`}
              >
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                    {language === "ar" ? "الميزات" : "Features"}
                  </p>
                  <ul className="space-y-1.5">
                    {data.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2 ${
                          isRTL ? "flex-row-reverse text-right" : ""
                        }`}
                      >
                        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                          <CheckCircle2 size={11} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                    {language === "ar" ? "الاستخدامات" : "Applications"}
                  </p>
                  <ul className="space-y-1.5">
                    {data.applications.map((app) => (
                      <li
                        key={app}
                        className={`flex items-start gap-2 ${
                          isRTL ? "flex-row-reverse text-right" : ""
                        }`}
                      >
                        <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                        <span>{app}</span>
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

