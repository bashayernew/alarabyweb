"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.products, href: "/products" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.maintenance, href: "#maintenance" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-primary-100/60 bg-white/92 shadow-soft backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center gap-6">
          {/* Logo block */}
          <div
            className={`flex flex-1 items-center ${
              isRTL ? "order-3 justify-end" : "order-1 justify-start"
            }`}
          >
            <Link
              href="/"
              className={
                isRTL
                  ? "flex flex-row-reverse items-center gap-2 sm:gap-3"
                  : "flex items-center gap-2 sm:gap-3"
              }
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white shadow-soft sm:h-10 sm:w-10">
                <span className="h-4 w-4 rounded-full border border-white/60 bg-white/10" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-extrabold tracking-tight text-primary-800 sm:text-base">
                  {language === "ar" ? "أكوا سيستمز" : "Aqua Systems"}
                </span>
                <span className="hidden text-[11px] font-medium tracking-wide text-primary-500/80 sm:block">
                  {language === "ar"
                    ? "حلول أنظمة المياه والتسخين المركزي"
                    : "Water & central heating systems"}
                </span>
              </span>
            </Link>
          </div>

          {/* Center navigation (desktop) */}
          <div
            className={`hidden flex-none items-center justify-center md:flex ${
              isRTL ? "order-2" : "order-2"
            }`}
          >
            <div
              className={`flex items-center gap-5 lg:gap-7 text-[13px] font-medium ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {navItems.map((item) => {
                const isHome = item.href === "#home";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap border-b-2 pb-1 px-1 transition-colors ${
                      isHome
                        ? "border-primary-300 text-primary-800"
                        : "border-transparent text-neutral-600 hover:border-primary-200 hover:text-primary-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Actions: language + CTA + mobile toggle */}
          <div
            className={`flex flex-1 items-center gap-3 ${
              isRTL ? "order-1 justify-start" : "order-3 justify-end"
            }`}
          >
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <a
              href="https://wa.me/96599346138"
              className="hidden items-center justify-center rounded-full bg-primary-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-primary-700 sm:inline-flex md:text-sm"
            >
              {language === "ar" ? "واتساب" : "WhatsApp"}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-full border border-primary-100 p-2 text-neutral-700 transition hover:border-primary-300 hover:text-primary-700 md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-primary-100 bg-white/98 px-4 pb-4 pt-2 shadow-sm backdrop-blur-md md:hidden">
          <div
            className={`flex flex-col gap-2 text-sm font-medium ${
              isRTL ? "items-end text-right" : "items-start text-left"
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-full rounded-lg px-2 py-2 text-neutral-700 transition hover:bg-primary-50 hover:text-primary-700 whitespace-nowrap"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className={`mt-3 flex w-full items-center justify-between gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <LanguageSwitcher />
              <a
                href="https://wa.me/96599346138"
                className="flex-1 rounded-full bg-primary-600 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-primary-700"
                onClick={() => setOpen(false)}
              >
                {language === "ar" ? "تواصل عبر واتساب" : "Contact on WhatsApp"}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

