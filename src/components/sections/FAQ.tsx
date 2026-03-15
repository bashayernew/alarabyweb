"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function FAQ() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="faq-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {t.faq.title}
          </h2>
        </div>

        <div className="mt-8 space-y-3 sm:mt-10">
          {t.faq.items.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-[#DCEBFA] bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-xs font-semibold text-[#12304A] sm:px-5 sm:py-4 sm:text-sm ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-primary-600 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-[#DCEBFA] bg-[#F5F8FE] px-4 py-3 text-xs text-[#6B7A8C] sm:px-5 sm:py-4 sm:text-sm">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

