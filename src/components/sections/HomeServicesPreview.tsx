"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Droplet, Wrench, Layers } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { servicesCatalog } from "@/content/services";

const iconByCategory: Record<string, any> = {
  installation: Layers,
  repair: Wrench,
  maintenance: Wrench,
  "water-system": Droplet,
  pump: Droplet,
  heater: Layers,
};

export default function HomeServicesPreview() {
  const { language, isRTL } = useLanguage();

  const highlighted = servicesCatalog.slice(0, 4);

  return (
    <section
      id="home-services-preview"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="home-services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="home-services-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {language === "ar" ? "خدماتنا" : "Our Services"}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {language === "ar"
              ? "نقدم خدمات التركيب والتصليح والصيانة لأنظمة المياه والسخانات والمضخات والفلاتر والمعدات المرتبطة بها."
              : "We provide installation, repair, and maintenance services for water systems, heaters, pumps, filters, and related equipment."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {highlighted.map((service, index) => {
            const Icon =
              iconByCategory[service.category] ?? Wrench;
            const title =
              language === "ar" ? service.title_ar : service.title_en;
            const description =
              language === "ar"
                ? service.description_ar
                : service.description_en;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col rounded-2xl border border-[#DCEBFA] bg-gradient-to-br from-white to-[#EAF4FF]/40 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white shadow-md">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-[#12304A] sm:text-base">
                    {title}
                  </h3>
                </div>
                <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                  {description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700"
          >
            {language === "ar" ? "عرض جميع الخدمات" : "View All Services"}
          </Link>
        </div>
      </div>
    </section>
  );
}

