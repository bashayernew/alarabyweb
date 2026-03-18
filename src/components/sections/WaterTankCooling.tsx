"use client";

import Image from "next/image";
import Link from "next/link";
import { Snowflake } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";
import { OrderRequestModal } from "@/components/OrderRequestModal";

type ApiProduct = {
  id: string;
  image: string;
  title_en: string;
  title_ar: string;
  short_description_en: string;
  short_description_ar: string;
  features_en: string[];
  features_ar: string[];
  warranty_en: string;
  warranty_ar: string;
};

const COOLING_SLUGS = ["water-cooling-device", "dynamo-cooling-system", "saudi-dynamo-cooling-system"];

export default function WaterTankCooling() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const fallbackProducts = t.coolingSystems.products;
  const [products, setProducts] = useState<Array<{
    slug: string;
    title: string;
    description: string;
    features: string[];
    warrantyLabel: string;
    image: string;
  }>>(() => fallbackProducts.map((p) => ({ ...p, features: [...p.features], image: "/watertankcooler.webp" })));
  const [orderProduct, setOrderProduct] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => res.ok ? res.json() : [])
      .then((data: ApiProduct[]) => {
        const list = Array.isArray(data) ? data : [];
        const coolingMap = new Map(list.map((p) => [p.id, p]));
        const merged = COOLING_SLUGS.map((slug) => {
          const api = coolingMap.get(slug);
          const fallback = fallbackProducts.find((f) => f.slug === slug);
          if (api) {
            return {
              slug: api.id,
              title: language === "ar" ? api.title_ar : api.title_en,
              description: language === "ar" ? api.short_description_ar : api.short_description_en,
              features: language === "ar" ? api.features_ar : api.features_en,
              warrantyLabel: language === "ar" ? api.warranty_ar : api.warranty_en,
              image: api.image?.startsWith("/") ? api.image : `/${api.image}`,
            };
          }
          return fallback
            ? { ...fallback, features: [...fallback.features], image: "/watertankcooler.webp" }
            : null;
        }).filter(Boolean) as Array<{
          slug: string;
          title: string;
          description: string;
          features: string[];
          warrantyLabel: string;
          image: string;
        }>;
        setProducts(merged.length > 0 ? merged : fallbackProducts.map((p) => ({ ...p, features: [...p.features], image: "/watertankcooler.webp" })));
      })
      .catch(() => setProducts(fallbackProducts.map((p) => ({ ...p, features: [...p.features], image: "/watertankcooler.webp" }))));
  }, [language]);

  const getImageForSlug = (slug: string) =>
    products.find((p) => p.slug === slug)?.image ?? "/watertankcooler.webp";

  return (
    <section
      id="tank-cooling"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="cooling-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cooling-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {t.coolingSystems.title}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {t.coolingSystems.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[#DCEBFA] bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]"
            >
              {/* Image block */}
              <div className="relative min-h-[220px] w-full overflow-hidden bg-[#EAF4FF] sm:min-h-[240px]">
                <Image
                  src={product.image || getImageForSlug(product.slug)}
                  alt={product.title}
                  fill
                  className="object-contain p-6"
                  sizes="(min-width: 1024px) 360px, 100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1F32]/35 via-transparent to-transparent" />
                <div
                  className={`absolute inset-x-4 top-3 flex items-center justify-between text-[11px] font-medium text-white ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 backdrop-blur-sm">
                    <Snowflake size={14} />
                    <span>
                      {language === "ar"
                        ? "وحدة تبريد مائية"
                        : "Water cooling unit"}
                    </span>
                  </span>
                  <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-semibold shadow-sm">
                    {product.warrantyLabel}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-[#12304A] sm:text-base">
                  {product.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#6B7A8C] sm:text-sm">
                  {product.description}
                </p>

                <ul className="mt-1.5 space-y-1.5 text-xs text-[#12304A] sm:text-sm">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 ${
                        isRTL ? "flex-row-reverse text-right" : ""
                      }`}
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3 ${
                    isRTL ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOrderProduct(product.slug)}
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-primary-700 sm:text-sm"
                  >
                    {language === "ar" ? "اطلب عرض سعر" : "Request Quote"}
                  </button>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex flex-1 items-center justify-center rounded-xl border-2 border-primary-600 bg-white px-4 py-2.5 text-xs font-semibold text-primary-600 transition hover:bg-primary-50 sm:text-sm"
                  >
                    {language === "ar" ? "عرض المنتج" : "View Product"}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {orderProduct && (
        <OrderRequestModal
          type="product"
          itemId={orderProduct}
          itemName={
            products.find((x) => x.slug === orderProduct)?.title ?? ""
          }
          onClose={() => setOrderProduct(null)}
          language={language}
        />
      )}
    </section>
  );
}
