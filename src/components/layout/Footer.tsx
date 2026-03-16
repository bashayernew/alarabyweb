"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const c = t.contact;
  const whatsappNumber = `965${c.mainPhone}`;

  return (
    <footer className="bg-[#050915] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className={isRTL ? "md:col-start-4" : ""}>
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-primary-200">
                  {c.companyName}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  {t.brand.tagline}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              {t.footer.about}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-200">
              {t.footer.quickLinks}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              {[
                { label: t.nav.home, href: "/" },
                { label: t.nav.aboutAndServices, href: "/services" },
                { label: t.nav.products, href: "/products" },
                { label: t.nav.offers, href: "/offers" },
                { label: t.nav.contact, href: "/#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-primary-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-200">
              {t.footer.contact}
            </h4>
            <div className="mt-4 space-y-3 text-sm text-neutral-300">
              {c.phones.map((phone) => (
                <div
                  key={phone}
                  className={`flex items-center gap-3 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <Phone size={18} className="text-primary-300" />
                  <a
                    href={`tel:+965${phone}`}
                    className="transition hover:text-primary-200"
                  >
                    {phone}
                  </a>
                </div>
              ))}
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Mail size={18} className="text-primary-300" />
                <a
                  href={`mailto:${c.email}`}
                  className="transition hover:text-primary-200"
                >
                  {c.email}
                </a>
              </div>
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <MapPin size={18} className="text-primary-300" />
                <span>{c.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-200">
              {t.footer.followUs}
            </h4>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366]/20 px-3 py-2 text-sm text-[#25D366] transition hover:bg-[#25D366]/30"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a
                href={c.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={c.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 hover:scale-110"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} {c.companyName}. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}

