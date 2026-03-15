"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-[#050915] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className={isRTL ? "md:col-start-4" : ""}>
            <h3 className="text-2xl font-extrabold tracking-tight text-primary-200">
              {language === "ar" ? "أكوا سيستمز" : "Aqua Systems"}
            </h3>
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
                { label: t.nav.services, href: "/services" },
                { label: t.nav.products, href: "/products" },
                { label: t.nav.contact, href: "#contact" },
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
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Phone size={18} className="text-primary-300" />
                <a
                  href="tel:+96599346138"
                  className="transition hover:text-primary-200"
                >
                  {t.contact.phone}
                </a>
              </div>
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Mail size={18} className="text-primary-300" />
                <a
                  href="mailto:info@water-systems.com"
                  className="transition hover:text-primary-200"
                >
                  {t.contact.email}
                </a>
              </div>
              <div
                className={`flex items-center gap-3 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <MapPin size={18} className="text-primary-300" />
                <span>{t.contact.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary-200">
              {t.footer.followUs}
            </h4>
            <div className="mt-4 space-y-2 text-sm text-neutral-300">
              <a
                href="https://wa.me/96599346138"
                className="block transition hover:text-primary-200"
              >
                WhatsApp
              </a>
              <a href="#" className="block transition hover:text-primary-200">
                Instagram
              </a>
              <a href="#" className="block transition hover:text-primary-200">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Aqua Systems. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}

