"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { OrderRequestModal } from "@/components/OrderRequestModal";
import { useState } from "react";

type ProductJson = {
  id: string;
  image: string;
  title_en: string;
  title_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  full_description_en: string;
  full_description_ar: string;
  warranty_en: string;
  warranty_ar: string;
  features_en: string[];
  features_ar: string[];
  specs_en?: string[];
  specs_ar?: string[];
};

type Props = {
  product: ProductJson;
};

export default function ProductDetail({ product }: Props) {
  const { language, isRTL } = useLanguage();
  const [orderProduct, setOrderProduct] = useState(false);

  const title = language === "ar" ? product.title_ar : product.title_en;
  const subtitle =
    language === "ar" ? product.subtitle_ar : product.subtitle_en;
  const fullDescription =
    language === "ar"
      ? product.full_description_ar
      : product.full_description_en;
  const warranty =
    language === "ar" ? product.warranty_ar : product.warranty_en;
  const features =
    language === "ar" ? product.features_ar : product.features_en;
  const specs =
    language === "ar"
      ? product.specs_ar && product.specs_ar.length > 0
        ? product.specs_ar
        : null
      : product.specs_en && product.specs_en.length > 0
      ? product.specs_en
      : null;

  return (
    <section
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className={`mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          {language === "ar" ? "العودة للمنتجات" : "Back to Products"}
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#DCEBFA] bg-[#EAF4FF]/30 lg:aspect-auto lg:min-h-[400px]">
            <Image
              src={product.image}
              alt={title}
              fill
              className="object-contain p-8"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-base font-medium text-primary-600">
              {subtitle}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#6B7A8C]">
              {fullDescription}
            </p>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                {language === "ar" ? "المميزات" : "Features"}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#12304A]">
                {features.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2 ${
                      isRTL ? "flex-row-reverse text-right" : ""
                    }`}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {specs && specs.length > 0 && (
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                  {language === "ar" ? "المواصفات" : "Specifications"}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[#12304A]">
                  {specs.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2 ${
                        isRTL ? "flex-row-reverse text-right" : ""
                      }`}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                {warranty}
              </span>
              <button
                type="button"
                onClick={() => setOrderProduct(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700"
              >
                <ShoppingCart size={18} />
                {language === "ar" ? "اطلب الآن" : "Order Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {orderProduct && (
        <OrderRequestModal
          type="product"
          itemId={product.id}
          itemName={title}
          onClose={() => setOrderProduct(false)}
          language={language}
        />
      )}
    </section>
  );
}
