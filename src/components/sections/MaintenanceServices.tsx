"use client";

import { Wrench, Droplets, Filter, Flame } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const services = [
  {
    key: "double-jumbo",
    icon: Filter,
    titleEn: "Double Jumbo Filter Maintenance Contract",
    titleAr: "عقد صيانة فلتر دبل جمبو (6 مرات)",
    descriptionEn:
      "Periodic maintenance contract for double jumbo filtration systems including cleaning, filter inspection, and performance checks with six service visits.",
    descriptionAr:
      "عقد صيانة دوري لفلاتر الدبل جمبو يشمل الفحص والتنظيف والتأكد من كفاءة عمل النظام مع 6 زيارات صيانة.",
  },
  {
    key: "tank-cleaning",
    icon: Droplets,
    titleEn: "Water Tank Cleaning",
    titleAr: "غسيل تانكي",
    descriptionEn:
      "Professional cleaning and sanitizing of water storage tanks to ensure safe and clean water supply.",
    descriptionAr:
      "تنظيف وتعقيم خزانات المياه لضمان مياه نظيفة وصحية للاستخدام.",
  },
  {
    key: "drain-cleaning",
    icon: Wrench,
    titleEn: "Drain Cleaning & Sewer Unclogging",
    titleAr: "غسيل جورة وتسليك مجاري",
    descriptionEn:
      "Drain and sewer cleaning service to remove blockages and restore normal water flow.",
    descriptionAr:
      "خدمة تنظيف وتسليك المجاري لإزالة الانسدادات وضمان تدفق المياه بشكل طبيعي.",
  },
  {
    key: "heater-cleaning",
    icon: Flame,
    titleEn: "Water Heater Cleaning",
    titleAr: "غسيل سخان",
    descriptionEn:
      "Cleaning service for water heaters to remove sediment buildup and improve heating efficiency.",
    descriptionAr:
      "تنظيف السخانات من الرواسب لتحسين كفاءة التسخين وإطالة عمر السخان.",
  },
];

export default function MaintenanceServices() {
  const { language, isRTL } = useLanguage();

  const sectionTitle = language === "ar" ? "خدماتنا" : "Our Services";

  return (
    <section
      id="maintenance-services"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="maintenance-services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="maintenance-services-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {sectionTitle}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            const title =
              language === "ar" ? service.titleAr : service.titleEn;
            const titleAlt =
              language === "ar" ? service.titleEn : service.titleAr;
            const description =
              language === "ar" ? service.descriptionAr : service.descriptionEn;

            return (
              <article
                key={service.key}
                className="group flex h-full flex-col rounded-2xl border border-[#DCEBFA] bg-gradient-to-br from-white to-[#EAF4FF]/40 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
              >
                <div
                  className={`flex items-center gap-3 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white shadow-md">
                    <Icon size={20} />
                  </div>
                  <div
                    className={`space-y-0.5 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    <h3 className="text-sm font-semibold text-[#12304A] sm:text-base">
                      {title}
                    </h3>
                    <p className="text-[11px] font-medium text-[#6B7A8C] sm:text-xs">
                      {titleAlt}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                  {description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

