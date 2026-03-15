"use client";

import Image from "next/image";
import { Droplet } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function WaterTanks() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  // Uses the provided water tank product image. Place file at `public/watergallonsmall.webp`
  // (or keep both `watergallonsmall.webp` and `watergallon.jpg` for different sizes if needed).
  const imageSrc = "/watergallonsmall.webp";

  return (
    <section
      id="tanks"
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="tanks-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="tanks-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {t.tanks.title}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {language === "ar"
              ? "خزانات مياه مخصصة لتخزين المياه على الأسطح وأنظمة المياه المركزية."
              : "High-quality rooftop water storage tanks designed for central water systems."}
          </p>
        </div>

        <div
          className={`mt-10 grid gap-6 md:mt-14 md:grid-cols-2 ${
            isRTL ? "md:direction-rtl" : ""
          }`}
        >
          {t.tanks.items.map((tank) => (
            <article
              key={tank.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[#DCEBFA] bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]"
            >
              <div className="relative h-52 w-full overflow-hidden bg-[#EAF4FF]">
                <Image
                  src={imageSrc}
                  alt={tank.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  priority={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1F32]/45 via-transparent to-transparent" />
                <div
                  className={`absolute inset-x-4 top-4 flex items-center justify-between text-[11px] font-medium text-white ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
                    <Droplet size={14} />
                    <span>
                      {language === "ar"
                        ? "خزان تخزين مركزي"
                        : "Central storage tank"}
                    </span>
                  </span>
                  <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-semibold shadow-sm">
                    {language === "ar" ? "كفالة 10 سنوات" : "10 Year Warranty"}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-[#12304A] sm:text-base">
                    {tank.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                  {tank.description}
                </p>

                <ul className="mt-2 space-y-1.5 text-xs text-[#12304A] sm:text-sm">
                  {tank.features.map((feature) => (
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

