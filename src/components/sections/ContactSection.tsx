"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function ContactSection() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const form = t.contact.form;

  return (
    <section
      id="maintenance"
      className="section-divider bg-gradient-to-b from-white to-[#EAF4FF] py-16 sm:py-20 lg:py-24"
    >
      <div
        id="contact"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          {/* Info side */}
          <div className={isRTL ? "lg:pl-10" : "lg:pr-10"}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-500 sm:text-[13px]">
              {language === "ar" ? "الصيانة والتركيب" : "Maintenance & Installation"}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl">
              {form.headline}
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#6B7A8C] sm:text-sm lg:text-base">
              {form.description}
            </p>

            <div className="mt-6 space-y-3 text-sm text-[#12304A]">
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse text-right" : ""
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600 shadow-soft">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7A8C]">
                    {language === "ar" ? "هاتف" : "Phone"}
                  </p>
                  <a
                    href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                    className="text-sm font-semibold text-[#12304A]"
                  >
                    {t.contact.phone}
                  </a>
                </div>
              </div>
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse text-right" : ""
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600 shadow-soft">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7A8C]">
                    Email
                  </p>
                  <a
                    href={`mailto:${t.contact.email}`}
                    className="text-sm font-semibold text-[#12304A]"
                  >
                    {t.contact.email}
                  </a>
                </div>
              </div>
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse text-right" : ""
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600 shadow-soft">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7A8C]">
                    {language === "ar" ? "الموقع" : "Location"}
                  </p>
                  <p className="text-sm font-semibold text-[#12304A]">
                    {t.contact.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="rounded-3xl border border-[#DCEBFA] bg-white/95 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.10)] sm:p-6 lg:p-7">
            <form
              className="space-y-4 text-xs sm:text-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7A8C]"
                >
                  {form.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-[#DCEBFA] bg-white px-3 py-2 text-xs text-[#12304A] shadow-soft outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7A8C]"
                >
                  {form.phoneLabel}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full rounded-xl border border-[#DCEBFA] bg-white px-3 py-2 text-xs text-[#12304A] shadow-soft outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="propertyType"
                  className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7A8C]"
                >
                  {form.propertyLabel}
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  className="w-full rounded-xl border border-[#DCEBFA] bg-white px-3 py-2 text-xs text-[#12304A] shadow-soft outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 sm:text-sm"
                >
                  {form.propertyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7A8C]"
                >
                  {form.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-[#DCEBFA] bg-white px-3 py-2 text-xs text-[#12304A] shadow-soft outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 sm:text-sm"
                />
              </div>

              <div
                className={`flex flex-col gap-3 pt-2 sm:flex-row ${
                  isRTL ? "sm:flex-row-reverse" : ""
                }`}
              >
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-primary-700 sm:text-sm"
                >
                  {form.submitLabel}
                </button>
                <a
                  href={`https://wa.me/${t.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-xs font-semibold text-primary-700 shadow-soft transition hover:border-primary-400 hover:bg-primary-50 sm:text-sm"
                >
                  {t.contact.whatsapp}
                </a>
              </div>

              <p className="pt-1 text-[11px] leading-snug text-[#6B7A8C]">
                {language === "ar"
                  ? "لن يتم مشاركة بياناتك مع أي طرف ثالث. نستخدمها فقط للتواصل معك بخصوص طلبك."
                  : "Your details are kept private and used only to contact you regarding your request."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

