"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Droplets,
  Flame,
  Shield,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function Hero() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <section
      id="home"
      className="hero-waves relative min-h-[85vh] overflow-hidden bg-[#0A1F32] md:min-h-[90vh]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Video background */}
      <video
        src="/heroheater.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Layered gradient overlays - premium cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F32] via-[#12304A]/95 to-[#0A1F32]/98" />
      <div
        className={
          isRTL
            ? "absolute inset-0 bg-gradient-to-l from-[#0A1F32]/70 via-transparent to-transparent"
            : "absolute inset-0 bg-gradient-to-r from-[#0A1F32]/70 via-transparent to-transparent"
        }
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(47,107,255,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_50%,rgba(168,210,255,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(168,210,255,0.05),transparent_50%)]" />

      {/* Subtle water-inspired mesh gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(at 40% 20%, rgba(190, 233, 255, 0.08) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(47, 107, 255, 0.06) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(168, 210, 255, 0.05) 0px, transparent 50%)`,
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-20 pt-20 sm:px-6 sm:gap-12 sm:pb-24 sm:pt-28 md:flex-row md:items-center md:gap-16 md:pb-28 md:pt-32 lg:px-8 lg:gap-20">
        {/* Left: Copy + CTAs + Stats */}
        <div
          className={`flex-1 space-y-8 ${
            isRTL ? "md:order-2 md:pl-14 lg:pl-20" : "md:order-1 md:pr-14 lg:pr-20"
          }`}
        >
          {/* Top badge */}
          <div
            className={`inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white/95 shadow-lg backdrop-blur-md sm:px-5 sm:py-2.5 sm:text-[13px] ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Droplets size={20} className="shrink-0 opacity-90" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="max-w-2xl text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.6rem] lg:text-[3rem] lg:leading-[1.12]">
              <span className="bg-gradient-to-br from-white via-primary-100 to-secondary-200 bg-clip-text text-transparent">
                {t.hero.headline}
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/88 sm:text-lg sm:leading-[1.65]">
              {t.hero.subheadline}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-primary-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-primary-500/25 transition-all duration-200 hover:bg-primary-400 hover:shadow-2xl hover:shadow-primary-500/30 hover:-translate-y-0.5 sm:text-base"
            >
              {t.hero.cta1}
              {isRTL ? (
                <ArrowLeft size={20} className="transition group-hover:-translate-x-0.5" />
              ) : (
                <ArrowRight size={20} className="transition group-hover:translate-x-0.5" />
              )}
            </a>
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-white/20 hover:-translate-y-0.5 sm:text-base"
            >
              {t.hero.cta2}
              {isRTL ? (
                <ArrowLeft size={20} className="transition group-hover:-translate-x-0.5" />
              ) : (
                <ArrowRight size={20} className="transition group-hover:translate-x-0.5" />
              )}
            </Link>
            <a
              href={`https://wa.me/965${t.contact.mainPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/50 bg-emerald-500/20 px-6 py-3.5 text-sm font-medium text-emerald-100 transition-all duration-200 hover:bg-emerald-500/30 hover:border-emerald-400/70"
            >
              <MessageCircle size={20} />
              {t.hero.cta3}
            </a>
          </div>

          {/* Trust stats - premium cards */}
          <div
            className={`grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4 sm:gap-4 ${
              isRTL ? "sm:flex-row-reverse" : ""
            }`}
          >
            {t.trust.badges.map((badge) => (
              <div
                key={badge.label}
                className="group flex flex-col gap-1.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10 sm:px-5 sm:py-4"
              >
                <span className="text-xl font-bold text-primary-300 sm:text-2xl">
                  {badge.value}
                </span>
                <p className="text-[11px] font-medium text-white/80 sm:text-xs">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Premium product showcase */}
        <div
          className={`relative flex flex-1 items-center justify-center ${
            isRTL ? "md:order-1" : "md:order-2"
          }`}
        >
          <div className="relative w-full max-w-[420px] lg:max-w-[480px]">
            {/* Main showcase card - glass morphism */}
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              {/* Inner glow */}
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary-400/20 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-secondary-200/15 blur-3xl" />

              {/* Product image - central heater system */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/95">
                <Image
                  src="/waterheater.webp"
                  alt={
                    language === "ar"
                      ? "نظام سخان مياه مركزي"
                      : "Central water heater system"
                  }
                  fill
                  className="object-contain p-8"
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 420px, 100vw"
                  priority
                />
              </div>

              {/* Floating feature badges - desktop */}
              <div
                className={`absolute -top-2 flex flex-col gap-2 sm:top-4 ${
                  isRTL ? "-left-2 sm:left-4" : "-right-2 sm:right-4"
                }`}
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm sm:px-3 sm:py-2">
                  <Flame size={16} className="shrink-0 text-primary-600 sm:h-[18px] sm:w-[18px]" />
                  <span className="text-[10px] font-semibold text-[#12304A] sm:text-xs">
                    {language === "ar" ? "تسخين مركزي" : "Central Heating"}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm sm:px-3 sm:py-2">
                  <Droplets size={16} className="shrink-0 text-primary-600 sm:h-[18px] sm:w-[18px]" />
                  <span className="text-[10px] font-semibold text-[#12304A] sm:text-xs">
                    {language === "ar" ? "تنقية مياه" : "Water Filtration"}
                  </span>
                </div>
              </div>

              <div
                className={`absolute -bottom-2 flex flex-col gap-2 sm:bottom-4 ${
                  isRTL ? "-right-2 sm:right-4" : "-left-2 sm:left-4"
                }`}
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm sm:px-3 sm:py-2">
                  <Shield size={16} className="shrink-0 text-emerald-600 sm:h-[18px] sm:w-[18px]" />
                  <span className="text-[10px] font-semibold text-[#12304A] sm:text-xs">
                    {language === "ar" ? "ضمان حتى 10 سنوات" : "Up to 10 Year Warranty"}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm sm:px-3 sm:py-2">
                  <Zap size={16} className="shrink-0 text-amber-500 sm:h-[18px] sm:w-[18px]" />
                  <span className="text-[10px] font-semibold text-[#12304A] sm:text-xs">
                    {language === "ar" ? "كفاءة عالية" : "High Efficiency"}
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary visual - water tank hint */}
            <div
              className={`absolute -bottom-4 -right-4 hidden w-28 overflow-hidden rounded-2xl border border-white/25 bg-white/90 shadow-xl backdrop-blur-md sm:block ${
                isRTL ? "right-auto left-4" : ""
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src="/watergallonsmall.webp"
                  alt=""
                  fill
                  className="object-contain p-3"
                  sizes="112px"
                  aria-hidden
                />
              </div>
              <div className="border-t border-white/40 bg-white/80 px-2 py-1.5 text-center">
                <span className="text-[10px] font-semibold text-[#12304A]">
                  {language === "ar" ? "خزانات مياه" : "Water Tanks"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
