"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function Testimonials() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <section className="section-divider bg-gradient-to-b from-[#EAF4FF] to-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 lg:mt-14">
          {t.testimonials.items.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl border border-[#DCEBFA] bg-white/95 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
            >
              <div
                className={`flex gap-1 text-yellow-400 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
                aria-hidden="true"
              >
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={index} size={16} className="fill-yellow-400" />
                ))}
              </div>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-[#12304A] sm:text-sm">
                {item.text}
              </p>
              <div className="mt-4 border-t border-[#DCEBFA] pt-3">
                <p className="text-xs font-semibold text-[#12304A] sm:text-sm">
                  {item.name}
                </p>
                <p className="text-[11px] text-[#6B7A8C]">{item.company}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

