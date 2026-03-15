"use client";

import { motion } from "framer-motion";
import {
  Droplet,
  Filter,
  Zap,
  Wrench,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

const icons = [Droplet, Filter, Zap, Wrench, Layers, HeartHandshake];

export default function Services() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <section
      id="services"
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="services-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {t.services.title}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {language === "ar"
              ? "خدمات متكاملة مصممة لأنظمة المياه والسخانات المركزية في الكويت."
              : "A complete set of services tailored for water systems and central heaters in Kuwait."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                role="button"
                tabIndex={0}
                className="group flex cursor-pointer flex-col rounded-2xl border border-[#DCEBFA] bg-gradient-to-br from-white to-[#EAF4FF]/40 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white shadow-md">
                    {Icon && <Icon size={20} />}
                  </div>
                  <h3 className="text-sm font-semibold text-[#12304A] sm:text-base">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                  {service.description}
                </p>

                {service.options && Array.isArray(service.options) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.options.map((opt: string) => (
                      <button
                        key={opt}
                        type="button"
                        className="rounded-full border border-primary-100 bg-white/70 px-3 py-1 text-[11px] font-medium text-primary-700 shadow-sm transition hover:border-primary-300 hover:bg-primary-50"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                <div
                  className={`mt-4 inline-flex items-center text-xs font-semibold text-primary-600 transition ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <span>
                    {language === "ar" ? "تفاصيل الخدمة عند الطلب" : "Details on request"}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

