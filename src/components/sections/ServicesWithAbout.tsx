"use client";

import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";
import ServicesCatalog from "./ServicesCatalog";

const HERO_IMAGE = "/waterheater.webp";

export default function ServicesWithAbout() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const p = t.aboutServicesPage;
  const whatsappNumber = `965${t.contact.mainPhone}`;
  const whatsappText =
    language === "ar" ? "أحتاج طلب خدمة" : "I need a service request";

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Section 1 — About Hero */}
      <section className="relative min-h-[50vh] overflow-hidden bg-[#12304A]">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12304A]/90 via-[#12304A]/75 to-[#12304A]/90" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {p.heroTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/95 sm:text-lg">
            {p.heroText}
          </p>
        </div>
      </section>

      {/* Section 2 — Our Experience */}
      <section className="section-divider bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl">
            {p.experienceTitle}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6B7A8C] sm:text-lg">
            {p.experienceText}
          </p>
        </div>
      </section>

      {/* Section 3 — Services Catalog */}
      <ServicesCatalog />

      {/* Section 4 — Why Choose Us */}
      <section className="section-divider bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl">
              {p.whyChooseTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {p.whyChoose.map((item) => (
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

      {/* Section 5 — Contact CTA */}
      <section className="section-divider bg-[#12304A] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {p.ctaTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
            {p.ctaText}
          </p>

          <div
            className={`mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center ${
              isRTL ? "sm:flex-row-reverse" : ""
            }`}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Phone size={20} />
              {p.ctaContact}
            </Link>
            <Link
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] hover:shadow-xl"
            >
              <MessageCircle size={22} />
              {p.ctaRequest}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
