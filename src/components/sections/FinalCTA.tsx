"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function FinalCTA() {
  const { language, isRTL } = useLanguage();

  return (
    <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-[#12304A] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {language === "ar"
            ? "جاهزون لتجهيز نظام المياه في مشروعك؟"
            : "Ready to upgrade your water system in Kuwait?"}
        </h2>
        <p className="mt-3 text-balance text-xs text-primary-100 sm:mt-4 sm:text-sm lg:text-base">
          {language === "ar"
            ? "تواصل معنا للحصول على استشارة مجانية وعرض سعر يناسب احتياجك بدقة."
            : "Get in touch for a free consultation and a tailored quotation for your property."}
        </p>

        <div
          className={`mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row ${
            isRTL ? "sm:flex-row-reverse" : ""
          }`}
        >
          <a
            href="https://wa.me/96599346138"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-xs font-semibold text-primary-700 shadow-md transition hover:bg-primary-50 sm:text-sm"
          >
            {language === "ar" ? "تواصل عبر واتساب" : "Contact on WhatsApp"}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl border border-primary-200/70 bg-primary-700 px-6 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-primary-800 sm:text-sm"
          >
            {language === "ar" ? "اطلب عرض سعر" : "Request a Quote"}
          </a>
        </div>
      </div>
    </section>
  );
}

