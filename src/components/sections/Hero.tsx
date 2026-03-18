"use client";

import { useEffect, useRef, useState } from "react";
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

type HeroProduct = { id: string; image: string; title_en: string; title_ar: string } | null;

export default function Hero() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroProduct, setHeroProduct] = useState<HeroProduct>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const play = () => video.play().catch(() => {});
    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    play();
    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
    };
  }, []);

  useEffect(() => {
    fetch("/api/products?hero=1", { cache: "no-store" })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setHeroProduct(data))
      .catch(() => setHeroProduct(null));
  }, []);

  return (
    <section
      id="home"
      className="hero-waves relative min-h-[85vh] overflow-hidden bg-[#0A1F32] sm:min-h-[80vh] md:min-h-[90vh]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Video background - poster shows when autoplay blocked or loading */}
      <video
        ref={videoRef}
        src="/heroheater.mp4"
        poster="/waterheater.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover object-center"
        style={{ minHeight: "100%", minWidth: "100%" }}
      />
      {/* Stronger overlay on mobile for text readability; lighter on desktop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10 sm:from-black/40 sm:via-black/12 sm:to-transparent md:from-black/30 md:via-black/8 md:to-transparent" />

      {/* Mobile: 1 col, order badge→headline→media→subheadline→ctas→stats. Desktop: 2-col grid */}
      <div
        className={`relative z-10 mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 gap-4 px-3 pb-10 pt-10 min-[360px]:gap-5 min-[360px]:px-4 min-[360px]:pb-12 min-[360px]:pt-12 sm:gap-6 sm:px-6 sm:pb-16 sm:pt-16 md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto_auto] md:items-center md:gap-x-16 md:gap-y-6 md:pb-28 md:pt-32 lg:gap-x-20 lg:px-8 ${
          isRTL ? "md:[direction:rtl]" : ""
        }`}
      >
        {/* Badge + Headline - row 1 on desktop. RTL: content on right (col 2) */}
        <div
          className={`flex flex-col gap-3 min-[360px]:gap-4 md:row-start-1 ${
            isRTL ? "md:col-start-2 md:pl-14 lg:pl-20" : "md:col-start-1 md:pr-14 lg:pr-20"
          }`}
        >
          {/* 1. Badge */}
          <div
            className={`order-1 inline-flex max-w-[calc(100%-0.5rem)] items-center gap-1.5 self-start rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[10px] font-medium text-white shadow-lg backdrop-blur-md min-[360px]:max-w-[95%] min-[360px]:gap-2 min-[360px]:px-3 min-[360px]:py-2 min-[360px]:text-[11px] sm:max-w-none sm:px-4 sm:py-2.5 sm:text-xs md:px-5 md:text-[13px] ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Droplets size={16} className="shrink-0 opacity-90 min-[360px]:h-[18px] min-[360px]:w-[18px] sm:h-5 sm:w-5" />
            <span className="truncate">{t.hero.badge}</span>
          </div>

          {/* 2. Headline - mobile: stronger shadow for readability over video */}
          <h1
            className="max-w-[95%] text-balance text-[1.5rem] font-extrabold leading-[1.25] tracking-tight min-[360px]:text-[1.65rem] min-[375px]:text-[1.75rem] min-[390px]:text-[1.85rem] min-[412px]:text-[1.95rem] min-[430px]:text-[2.05rem] sm:max-w-xl sm:text-3xl md:max-w-2xl md:text-[2.6rem] lg:text-[3rem] lg:leading-[1.12]"
            style={{
              color: "#FFFFFF",
              textShadow:
                "0 1px 3px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.5)",
            }}
          >
            {t.hero.headline}
          </h1>

        </div>

        {/* Media - Mobile: after headline. Desktop: LTR=right col, RTL=left col */}
        <div
          className={`flex w-full justify-center md:row-span-5 md:row-start-1 md:items-center ${
            isRTL ? "md:col-start-1 md:justify-start" : "md:col-start-2 md:justify-end"
          }`}
        >
            <div className="relative mx-auto w-full max-w-[260px] min-[360px]:max-w-[280px] min-[375px]:max-w-[290px] min-[390px]:max-w-[300px] min-[412px]:max-w-[320px] min-[430px]:max-w-[340px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px]">
              <Link
                href={heroProduct ? `/products/${heroProduct.id}` : "/products"}
                className="block"
              >
              <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/[0.1] p-2.5 shadow-2xl backdrop-blur-xl min-[360px]:rounded-2xl min-[360px]:p-3 sm:rounded-3xl sm:p-5 md:p-8">
                <div className="absolute -top-24 -right-24 hidden h-48 w-48 rounded-full bg-primary-400/20 blur-3xl md:block" />
                <div className="absolute -bottom-16 -left-16 hidden h-40 w-40 rounded-full bg-secondary-200/15 blur-3xl md:block" />

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/95 min-[360px]:rounded-xl sm:rounded-2xl">
                  <Image
                    src={
                      heroProduct?.image
                        ? heroProduct.image.startsWith("/")
                          ? heroProduct.image
                          : `/${heroProduct.image}`
                        : "/waterheater.webp"
                    }
                    alt={heroProduct ? (language === "ar" ? heroProduct.title_ar : heroProduct.title_en) : (language === "ar" ? "نظام سخان مياه مركزي" : "Central water heater system")}
                    fill
                    className="object-contain object-center p-3 min-[360px]:p-4 sm:p-6 md:p-8"
                    sizes="(min-width: 1024px) 480px, (min-width: 768px) 420px, (min-width: 640px) 360px, (min-width: 430px) 340px, (min-width: 390px) 300px, 260px"
                    priority
                  />
                </div>

                {/* Desktop: floating badges */}
                <div className={`absolute top-2 hidden flex-col gap-2 md:flex md:top-4 ${isRTL ? "left-4" : "right-4"}`}>
                  <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/95 px-2.5 py-1.5 shadow-lg sm:px-3 sm:py-2">
                    <Flame size={16} className="shrink-0 text-primary-600 sm:h-[18px] sm:w-[18px]" />
                    <span className="text-[10px] font-semibold text-[#12304A] sm:text-xs">{language === "ar" ? "تسخين مركزي" : "Central Heating"}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/95 px-2.5 py-1.5 shadow-lg sm:px-3 sm:py-2">
                    <Droplets size={16} className="shrink-0 text-primary-600 sm:h-[18px] sm:w-[18px]" />
                    <span className="text-[10px] font-semibold text-[#12304A] sm:text-xs">{language === "ar" ? "تنقية مياه" : "Water Filtration"}</span>
                  </div>
                </div>
                <div className={`absolute bottom-2 hidden flex-col gap-2 md:flex md:bottom-4 ${isRTL ? "right-4" : "left-4"}`}>
                  <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/95 px-2.5 py-1.5 shadow-lg sm:px-3 sm:py-2">
                    <Shield size={16} className="shrink-0 text-emerald-600 sm:h-[18px] sm:w-[18px]" />
                    <span className="text-[10px] font-semibold text-[#12304A] sm:text-xs">{language === "ar" ? "ضمان حتى 10 سنوات" : "Up to 10 Year Warranty"}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/95 px-2.5 py-1.5 shadow-lg sm:px-3 sm:py-2">
                    <Zap size={16} className="shrink-0 text-amber-500 sm:h-[18px] sm:w-[18px]" />
                    <span className="text-[10px] font-semibold text-[#12304A] sm:text-xs">{language === "ar" ? "كفاءة عالية" : "High Efficiency"}</span>
                  </div>
                </div>

                {/* Mobile: single minimal badge row - compact, premium */}
                <div className="mt-2 flex flex-wrap justify-center gap-1.5 sm:mt-3 md:hidden">
                  <span className="rounded-md border border-white/30 bg-white/95 px-2 py-0.5 text-[8px] font-semibold text-[#12304A] min-[360px]:rounded-lg min-[360px]:py-1 min-[360px]:text-[9px] min-[390px]:text-[10px]">
                    {language === "ar" ? "تسخين مركزي" : "Central Heating"}
                  </span>
                  <span className="rounded-md border border-white/30 bg-white/95 px-2 py-0.5 text-[8px] font-semibold text-[#12304A] min-[360px]:rounded-lg min-[360px]:py-1 min-[360px]:text-[9px] min-[390px]:text-[10px]">
                    {language === "ar" ? "ضمان 10 سنوات" : "10 Year Warranty"}
                  </span>
                </div>
              </div>
              </Link>

              {/* Water tank hint - desktop only */}
              <div className={`absolute -bottom-4 -right-4 hidden w-28 overflow-hidden rounded-2xl border border-white/25 bg-white/90 shadow-xl backdrop-blur-md md:block ${isRTL ? "right-auto left-4" : ""}`}>
                <div className="relative aspect-square">
                  <Image src="/watergallonsmall.webp" alt="" fill className="object-contain p-3" sizes="112px" aria-hidden />
                </div>
                <div className="border-t border-white/40 bg-white/80 px-2 py-1.5 text-center">
                  <span className="text-[10px] font-semibold text-[#12304A]">{language === "ar" ? "خزانات مياه" : "Water Tanks"}</span>
                </div>
              </div>
            </div>
        </div>

        {/* Subheadline - row 2 on desktop. Mobile: stronger shadow for readability */}
        <p
            className={`max-w-[92%] break-words text-[13px] font-medium leading-[1.65] text-white min-[360px]:max-w-[95%] min-[360px]:text-sm min-[390px]:text-[15px] sm:max-w-xl sm:text-base sm:leading-[1.65] sm:text-white/95 md:row-start-2 md:text-lg md:max-w-2xl ${isRTL ? "md:col-start-2" : "md:col-start-1"}`}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.5)" }}
          >
            {t.hero.subheadline}
          </p>

        {/* CTA buttons - row 3 on desktop. Mobile: full-width, 44px+ touch targets */}
        <div className={`flex flex-col gap-2.5 min-[360px]:gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:row-start-3 ${isRTL ? "md:col-start-2 sm:flex-row-reverse" : "md:col-start-1"}`}>
            <a
              href="#contact"
              className="group flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary-500/25 transition-all duration-200 active:scale-[0.98] min-[360px]:min-h-[48px] min-[360px]:rounded-2xl min-[360px]:px-6 min-[360px]:py-4 sm:w-auto sm:min-w-[180px] sm:px-8 md:hover:bg-primary-400 md:hover:shadow-2xl md:hover:-translate-y-0.5 bg-primary-500"
            >
              {t.hero.cta1}
              {isRTL ? <ArrowLeft size={20} className="shrink-0" /> : <ArrowRight size={20} className="shrink-0" />}
            </a>
            <Link
              href="/products"
              className="group flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-xl border-2 border-white/40 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 active:scale-[0.98] min-[360px]:min-h-[48px] min-[360px]:rounded-2xl min-[360px]:px-6 min-[360px]:py-4 sm:w-auto sm:min-w-[180px] sm:px-8 md:hover:border-white/60 md:hover:bg-white/20 md:hover:-translate-y-0.5"
            >
              {t.hero.cta2}
              {isRTL ? <ArrowLeft size={20} className="shrink-0" /> : <ArrowRight size={20} className="shrink-0" />}
            </Link>
            <a
              href={`https://wa.me/965${t.contact.mainPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/50 bg-emerald-500/20 px-5 py-3.5 text-sm font-medium text-emerald-100 transition-all duration-200 active:scale-[0.98] min-[360px]:min-h-[48px] min-[360px]:rounded-2xl min-[360px]:px-6 min-[360px]:py-4 sm:w-auto sm:min-w-[160px] md:hover:bg-emerald-500/30 md:hover:border-emerald-400/70"
            >
              <MessageCircle size={20} className="shrink-0" />
              {t.hero.cta3}
            </a>
          </div>

        {/* Trust stats - row 4 on desktop. Mobile: 2x2 grid, readable */}
        <div className={`grid grid-cols-2 gap-2 min-[360px]:gap-2.5 sm:grid-cols-4 sm:gap-4 md:row-start-4 ${isRTL ? "md:col-start-2" : "md:col-start-1"}`}>
            {t.trust.badges.map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col gap-0.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-2.5 backdrop-blur-sm min-[360px]:rounded-xl min-[360px]:px-3 min-[360px]:py-3 sm:gap-1.5 sm:rounded-2xl sm:px-5 sm:py-4"
              >
                <span className="text-base font-bold text-primary-300 min-[360px]:text-lg min-[390px]:text-xl sm:text-2xl">{badge.value}</span>
                <p className="text-[9px] font-medium text-white/80 min-[360px]:text-[10px] min-[390px]:text-[11px] sm:text-xs">{badge.label}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
