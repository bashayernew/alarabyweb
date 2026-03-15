"use client";

import Image from "next/image";
import { Flame } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function WaterHeaterParts() {
  const { language, isRTL } = useLanguage();

  const texts = {
    category: language === "ar" ? "قطع غيار السخانات" : "Water Heater Parts",
    title: language === "ar" ? "شمعة سخان" : "Water Heater Heating Element",
    titleAlt: language === "ar" ? "Water Heater Heating Element" : "شمعة سخان",
    description:
      language === "ar"
        ? "شمعة سخان كهربائي تستخدم داخل السخانات لتسخين المياه بكفاءة عالية وتتميز بالمتانة والأداء الموثوق."
        : "Electric heating element used inside water heaters to heat water efficiently. Designed for durability and reliable heating performance.",
    descriptionAlt:
      language === "ar"
        ? "Electric heating element used inside water heaters to heat water efficiently. Designed for durability and reliable heating performance."
        : "شمعة سخان كهربائي تستخدم داخل السخانات لتسخين المياه بكفاءة عالية وتتميز بالمتانة والأداء الموثوق.",
    features:
      language === "ar"
        ? [
            "عنصر تسخين عالي الكفاءة",
            "مقاوم للتآكل",
            "متوافق مع معظم السخانات الكهربائية",
            "تصميم متين",
            "سهل التركيب",
          ]
        : [
            "High efficiency heating element",
            "Corrosion resistant metal",
            "Compatible with most electric water heaters",
            "Durable industrial design",
            "Easy installation",
          ],
  };

  const imageSrc = "/heatercandle.webp";

  return (
    <section
      id="heater-parts"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="heater-parts-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="heater-parts-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {texts.category}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14">
          <article className="group mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[#DCEBFA] bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]">
            <div className="relative h-64 w-full overflow-hidden bg-[#EAF4FF]">
              <Image
                src={imageSrc}
                alt={texts.title}
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
                  <Flame size={14} />
                  <span>
                    {language === "ar"
                      ? "قطع غيار سخانات"
                      : "Water heater spare parts"}
                  </span>
                </span>
                <span className="rounded-full bg-primary-600 px-3 py-1 text-[10px] font-semibold shadow-sm">
                  {language === "ar" ? "عنصر تسخين كهربائي" : "Electric element"}
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
                  {texts.title}
                </h3>
                <p className="text-xs font-medium text-[#4B5A6C] sm:text-sm">
                  {texts.titleAlt}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                  {texts.description}
                </p>
                <p className="text-[11px] leading-relaxed text-[#94A3B8] sm:text-xs">
                  {texts.descriptionAlt}
                </p>
              </div>

              <div className="mt-1.5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                  {language === "ar" ? "الميزات" : "Features"}
                </p>
                <ul className="space-y-1.5 text-xs text-[#12304A] sm:text-sm">
                  {texts.features.map((feature) => (
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

