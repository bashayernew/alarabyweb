"use client";

import { Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function PlumbingAccessories() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const items = t.accessories.items;

  return (
    <section
      id="plumbing-accessories"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="plumbing-accessories-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="plumbing-accessories-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {t.accessories.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {items.map(
            (
              item: {
                name: string;
                description: string;
              },
              index: number,
            ) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                role="button"
                tabIndex={0}
                className="group flex cursor-pointer flex-col rounded-2xl border border-[#DCEBFA] bg-gradient-to-br from-white to-[#EAF4FF]/40 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <div className="flex items-center gap-3">
                  {/* Placeholder icon area for future images/icons */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white shadow-md">
                    <Wrench size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-[#12304A] sm:text-base">
                    {item.name}
                  </h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                  {item.description}
                </p>
              </motion.article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

