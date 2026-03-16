"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";
import { Calendar, Loader2, ArrowLeft, ArrowRight } from "lucide-react";

type Offer = {
  id: string;
  titleAr: string;
  titleEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  image: string;
  startDate: string;
};

const LATEST_COUNT = 2;

export default function Offers() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch("/api/offers");
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

  const latestOffers = offers.slice(0, LATEST_COUNT);

  if (loading) {
    return (
      <section
        id="offers"
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-labelledby="offers-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
          </div>
        </div>
      </section>
    );
  }

  if (offers.length === 0) {
    return null;
  }

  return (
    <section
      id="offers"
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="offers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="offers-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {t.offers.title}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {t.offers.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14">
          {latestOffers.map((offer) => (
            <Link
              key={offer.id}
              href="/offers"
              className="group block"
            >
              <article className="relative overflow-hidden rounded-2xl border border-[#DCEBFA] bg-white shadow-[0_10px_26px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  {offer.image ? (
                    <img
                      src={offer.image}
                      alt={language === "ar" ? offer.titleAr : offer.titleEn}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary-50 via-[#EAF4FF] to-secondary-100 p-6">
                      <span className="text-xl font-bold text-primary-600">
                        {language === "ar" ? offer.titleAr : offer.titleEn}
                      </span>
                      <span className="text-center text-sm text-[#6B7A8C] line-clamp-2">
                        {(language === "ar"
                          ? offer.shortDescriptionAr
                          : offer.shortDescriptionEn
                        ).slice(0, 80)}
                        ...
                      </span>
                    </div>
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
                  <h3 className="text-lg font-bold text-[#12304A]">
                    {language === "ar" ? offer.titleAr : offer.titleEn}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-[#6B7A8C]">
                    {language === "ar"
                      ? offer.shortDescriptionAr
                      : offer.shortDescriptionEn}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/offers"
            className={`inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {language === "ar" ? "عرض الكل" : "View all offers"}
            {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </Link>
        </div>
      </div>
    </section>
  );
}
