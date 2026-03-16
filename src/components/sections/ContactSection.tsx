"use client";

import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function ContactSection() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const c = t.contact;
  const form = c.form;
  const whatsappNumber = `965${c.mainPhone}`;

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
            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-500 sm:text-[13px]">
                  {language === "ar" ? "الصيانة والتركيب" : "Maintenance & Installation"}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl">
                  {form.headline}
                </h2>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#6B7A8C] sm:text-sm lg:text-base">
              {form.description}
            </p>

            {/* Company name */}
            <p className="mt-6 text-lg font-bold text-[#12304A]">
              {c.companyName}
            </p>

            {/* Contact cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {/* Phone card */}
              <div
                className={`rounded-2xl border border-[#DCEBFA] bg-white/95 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition hover:shadow-lg ${
                  isRTL ? "text-right" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shadow-soft">
                    <Phone size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7A8C]">
                      {language === "ar" ? "هاتف" : "Phone"}
                    </p>
                    <div className="mt-1 space-y-1">
                      {c.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:+965${phone}`}
                          className="block text-sm font-semibold text-[#12304A] transition hover:text-primary-600"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#20bd5a] ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <MessageCircle size={18} />
                  {c.whatsapp}
                </a>
              </div>

              {/* Email card */}
              <div
                className={`rounded-2xl border border-[#DCEBFA] bg-white/95 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition hover:shadow-lg ${
                  isRTL ? "text-right" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shadow-soft">
                    <Mail size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7A8C]">
                      Email
                    </p>
                    <a
                      href={`mailto:${c.email}`}
                      className="mt-1 block break-all text-sm font-semibold text-[#12304A] transition hover:text-primary-600"
                    >
                      {c.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social media card */}
              <div
                className={`rounded-2xl border border-[#DCEBFA] bg-white/95 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition hover:shadow-lg lg:col-span-2 ${
                  isRTL ? "text-right" : ""
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7A8C]">
                  {language === "ar" ? "تابعنا" : "Follow Us"}
                </p>
                <div
                  className={`mt-3 flex gap-4 ${isRTL ? "flex-row-reverse justify-end" : ""}`}
                >
                  <a
                    href={c.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white shadow-md transition hover:scale-110 hover:shadow-lg"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-6 w-6" />
                  </a>
                  <a
                    href={c.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#000000] text-white shadow-md transition hover:scale-110 hover:shadow-lg"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Location */}
              <div
                className={`flex items-center gap-3 rounded-2xl border border-[#DCEBFA] bg-white/95 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] lg:col-span-2 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shadow-soft">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7A8C]">
                    {language === "ar" ? "الموقع" : "Location"}
                  </p>
                  <p className="text-sm font-semibold text-[#12304A]">
                    {c.address}
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
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#25D366] bg-[#25D366]/10 px-4 py-2.5 text-xs font-semibold text-[#25D366] shadow-soft transition hover:bg-[#25D366]/20 sm:text-sm"
                >
                  <MessageCircle size={18} />
                  {c.whatsapp}
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

        {/* Google Maps - below contact section */}
        <div className="mt-14">
          <h3 className={`mb-4 flex items-center gap-3 text-xl font-bold text-[#12304A] ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shadow-soft">
              <MapPin size={20} />
            </span>
            {c.ourLocation}
          </h3>
          <div
            className={`mb-4 flex items-start gap-3 rounded-2xl border border-[#DCEBFA] bg-white/95 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] ${
              isRTL ? "flex-row-reverse text-right" : ""
            }`}
          >
            <MapPin size={20} className="mt-0.5 flex-shrink-0 text-primary-600" />
            <div className="min-w-0 flex-1">
              {c.fullAddress.map((line) => (
                <p key={line} className="text-sm font-medium text-[#12304A]">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <a
            href={c.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block cursor-pointer overflow-hidden rounded-2xl border border-[#DCEBFA] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition hover:shadow-xl"
            aria-label={c.openInMaps}
          >
            <div className="relative aspect-[16/10] w-full min-h-[200px] sm:aspect-video sm:min-h-[280px]">
              <iframe
                src={c.googleMapsEmbedUrl}
                title={c.ourLocation}
                className="pointer-events-none absolute inset-0 h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </a>
          <a
            href={c.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary-500 bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-700 shadow-md transition hover:bg-primary-100 hover:border-primary-600 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <MapPin size={20} />
            {c.openInMaps}
          </a>
        </div>
      </div>
    </section>
  );
}
