"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";
import {
  Calendar,
  Loader2,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";
import { OfferRequestModal } from "@/components/OfferRequestModal";

type Offer = {
  id: string;
  slug?: string | null;
  titleAr: string;
  titleEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  fullDescriptionAr: string;
  fullDescriptionEn: string;
  image: string;
  badgeAr?: string | null;
  badgeEn?: string | null;
  startDate: string;
  endDate?: string | null;
  ctaTextAr?: string | null;
  ctaTextEn?: string | null;
};

export default function OffersCatalog() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [requestOffer, setRequestOffer] = useState<Offer | null>(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch("/api/offers", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setOffers(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  const ctaLabel =
    language === "ar" ? "اطلب العرض" : "Request Offer";

  if (loading) {
    return (
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl">
            {t.offers.title}
          </h1>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {t.offers.subtitle}
          </p>
        </div>

        {offers.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-[#DCEBFA] bg-[#EAF4FF]/30 p-12 text-center">
            <p className="text-[#6B7A8C]">
              {language === "ar"
                ? "لا توجد عروض حالياً. تابعنا لمعرفة أحدث العروض."
                : "No offers at the moment. Follow us for the latest offers."}
            </p>
            <Link
              href="/"
              className={`mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {language === "ar" ? "العودة للرئيسية" : "Back to home"}
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {offers.map((offer) => {
              const title =
                language === "ar" ? offer.titleAr : offer.titleEn;
              const shortDesc =
                language === "ar"
                  ? offer.shortDescriptionAr
                  : offer.shortDescriptionEn;
              const badge =
                language === "ar" ? offer.badgeAr : offer.badgeEn;
              const isExpired =
                offer.endDate &&
                new Date(offer.endDate) < new Date();

              return (
                <article
                  key={offer.id}
                  className="group relative overflow-hidden rounded-2xl border border-[#DCEBFA] bg-white shadow-[0_10px_26px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div
                    className="aspect-[4/3] cursor-pointer overflow-hidden bg-slate-100"
                    onClick={() => setSelectedOffer(offer)}
                  >
                    {offer.image ? (
                      <img
                        src={offer.image}
                        alt={title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary-50 via-[#EAF4FF] to-secondary-100 p-6">
                        <span className="text-2xl font-bold text-primary-600">
                          {title}
                        </span>
                        <span className="text-center text-sm text-[#6B7A8C] line-clamp-2">
                          {shortDesc.slice(0, 60)}...
                        </span>
                      </div>
                    )}
                    {badge && (
                      <span className="absolute right-3 top-3 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
                        {badge}
                      </span>
                    )}
                    {isExpired && (
                      <span className="absolute left-3 top-3 rounded-full bg-slate-600 px-3 py-1 text-xs font-semibold text-white">
                        {language === "ar" ? "منتهي" : "Expired"}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2 text-xs text-primary-600">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={offer.startDate}>
                        {new Date(offer.startDate).toLocaleDateString(
                          language === "ar" ? "ar-KW" : "en-GB",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    </div>
                    <h2 className="text-lg font-bold text-[#12304A]">
                      {title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B7A8C]">
                      {shortDesc}
                    </p>
                    <button
                      type="button"
                      onClick={() => setRequestOffer(offer)}
                      disabled={!!isExpired}
                      className="mt-4 w-full rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {!!isExpired
                        ? language === "ar"
                          ? "العرض منتهي"
                          : "Offer expired"
                        : ctaLabel}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Offer details modal */}
      {selectedOffer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => setSelectedOffer(null)}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div
            className={`relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl ${
              isRTL ? "text-right" : "text-left"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedOffer(null)}
              className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="p-6">
              {selectedOffer.image && (
                <div className="mb-4 aspect-video overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={selectedOffer.image}
                    alt={
                      language === "ar"
                        ? selectedOffer.titleAr
                        : selectedOffer.titleEn
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-bold text-[#12304A]">
                {language === "ar"
                  ? selectedOffer.titleAr
                  : selectedOffer.titleEn}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7A8C]">
                {language === "ar"
                  ? selectedOffer.fullDescriptionAr
                  : selectedOffer.fullDescriptionEn}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedOffer(null);
                  setRequestOffer(selectedOffer);
                }}
                className="mt-6 w-full rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700"
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {requestOffer && (
        <OfferRequestModal
          offer={requestOffer}
          onClose={() => setRequestOffer(null)}
          language={language}
        />
      )}
    </section>
  );
}
