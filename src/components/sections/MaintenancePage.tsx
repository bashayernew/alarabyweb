"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Flame,
  Filter,
  Gauge,
  Droplets,
  Wrench,
  Zap,
  CheckCircle2,
  MessageCircle,
  Phone,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";
import { MaintenanceOrderModal } from "@/components/MaintenanceOrderModal";

const HERO_IMAGE = "/maintan1.webp";

const ICON_MAP: Record<string, typeof Flame> = {
  Flame,
  Filter,
  Gauge,
  Droplets,
  Wrench,
  Zap,
};

export type MaintenanceServiceFromApi = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon?: string | null;
  image?: string | null;
};

export default function MaintenancePage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const whatsappNumber = `965${t.contact.mainPhone}`;
  const mp = t.maintenancePage;

  const [services, setServices] = useState<MaintenanceServiceFromApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] =
    useState<MaintenanceServiceFromApi | null>(null);

  useEffect(() => {
    fetch("/api/maintenance-services")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        } else {
          setServices(
            mp.services.map((s, i) => ({
              id: `static-${i}`,
              titleEn: s.title,
              titleAr: s.title,
              descriptionEn: s.description,
              descriptionAr: s.description,
              icon: Object.keys(ICON_MAP)[i] ?? "Wrench",
            }))
          );
        }
      })
      .catch(() => {
        setServices(
          mp.services.map((s, i) => ({
            id: `static-${i}`,
            titleEn: s.title,
            titleAr: s.title,
            descriptionEn: s.description,
            descriptionAr: s.description,
            icon: Object.keys(ICON_MAP)[i] ?? "Wrench",
          }))
        );
      })
      .finally(() => setLoading(false));
  }, [language, mp.services]);

  const requestLabel = language === "ar" ? "اطلب الخدمة" : "Request Service";

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Section 1 — Hero */}
      <section className="relative min-h-[50vh] overflow-hidden bg-[#12304A]">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12304A]/90 via-[#12304A]/75 to-[#12304A]/90" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {mp.heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
            {mp.heroText}
          </p>
        </div>
      </section>

      {/* Section 2 — Our Maintenance Services */}
      <section className="section-divider bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl">
              {mp.servicesTitle}
            </h2>
            <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
              {mp.servicesSubtitle}
            </p>
          </div>

          {loading ? (
            <div className="mt-12 flex justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
            </div>
          ) : services.length === 0 ? (
            <p className="mt-12 text-center text-slate-500">
              {language === "ar"
                ? "لا توجد خدمات صيانة متاحة حالياً."
                : "No maintenance services available at the moment."}
            </p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {services.map((service, i) => {
                const iconName = service.icon ?? Object.keys(ICON_MAP)[i];
                const Icon =
                  ICON_MAP[iconName as keyof typeof ICON_MAP] ?? Wrench;
                const title =
                  language === "ar" ? service.titleAr : service.titleEn;
                const description =
                  language === "ar"
                    ? service.descriptionAr
                    : service.descriptionEn;
                return (
                  <article
                    key={service.id}
                    className="group flex flex-col rounded-2xl border border-[#DCEBFA] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md">
                      <Icon className="h-6 w-6" size={24} strokeWidth={2} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#12304A]">
                      {title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7A8C]">
                      {description}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (service.id.startsWith("static-")) {
                          window.open(
                            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                              `${mp.whatsappMessage} - ${title}`
                            )}`,
                            "_blank"
                          );
                        } else {
                          setSelectedService(service);
                        }
                      }}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700"
                    >
                      {requestLabel}
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Section 3 — Why Choose Us */}
      <section className="section-divider bg-gradient-to-b from-white to-[#EAF4FF]/50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl">
              {mp.whyChooseTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {mp.whyChoose.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-[#DCEBFA] bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <CheckCircle2
                  className="h-6 w-6 shrink-0 text-primary-600"
                  size={24}
                />
                <span className="text-sm font-semibold text-[#12304A] sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Call to Action */}
      <section className="section-divider bg-[#12304A] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {mp.ctaTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
            {mp.ctaText}
          </p>

          <div
            className={`mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center ${
              isRTL ? "sm:flex-row-reverse" : ""
            }`}
          >
            <Link
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mp.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] hover:shadow-xl"
            >
              <MessageCircle size={22} />
              {mp.ctaRequest}
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Phone size={20} />
              {mp.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      {selectedService && (
        <MaintenanceOrderModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          language={language}
        />
      )}
    </div>
  );
}
