"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplet, Wrench, Layers } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { OrderRequestModal } from "@/components/OrderRequestModal";

type Service = {
  id: string;
  category: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  options_en?: string[];
  options_ar?: string[];
};

const categoryIcon: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  installation: Layers,
  repair: Wrench,
  maintenance: Wrench,
  "water-system": Droplet,
  pump: Droplet,
  heater: Layers,
};

export default function ServicesCatalog() {
  const { language, isRTL } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [requestService, setRequestService] = useState<Service | null>(null);

  useEffect(() => {
    fetch(`/api/services?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="services"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="services-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {language === "ar" ? "خدماتنا" : "Our Services"}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {language === "ar"
              ? "نوفر خدمات تركيب وتصليح وصيانة لأنظمة المياه والسخانات والمضخات والفلاتر والمعدات المرتبطة بها."
              : "We provide installation, repair, and maintenance services for water systems, heaters, pumps, filters, and related equipment."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service: Service, index: number) => {
            const Icon =
              categoryIcon[service.category] ?? Wrench;
            const title =
              language === "ar" ? service.title_ar : service.title_en;
            const description =
              language === "ar"
                ? service.description_ar
                : service.description_en;
            const options =
              language === "ar" ? service.options_ar : service.options_en;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                role="button"
                tabIndex={0}
                className="group flex cursor-pointer flex-col rounded-2xl border border-[#DCEBFA] bg-gradient-to-br from-white to-[#EAF4FF]/40 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <div className="flex items-center gap-3">
                  {/* Placeholder icon area for future service-specific icons/images */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white shadow-md">
                    <Icon size={20} />
                  </div>
                  <div
                    className={`flex flex-col ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    <h3 className="text-sm font-semibold text-[#12304A] sm:text-base">
                      {title}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                  {description}
                </p>

                {options && options.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {options.map((opt) => (
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

                <button
                  type="button"
                  onClick={() => setRequestService(service)}
                  className={`mt-4 inline-flex items-center rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-primary-700 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  {language === "ar" ? "اطلب الخدمة" : "Request Service"}
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>

      {requestService && (
        <OrderRequestModal
          type="service"
          itemId={requestService.id}
          itemName={language === "ar" ? requestService.title_ar : requestService.title_en}
          onClose={() => setRequestService(null)}
          language={language}
        />
      )}
    </section>
  );
}

