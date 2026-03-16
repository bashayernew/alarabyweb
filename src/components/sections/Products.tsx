"use client";

import Image from "next/image";
import { ShoppingCart, Droplet, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";
import { catalogProducts, type CatalogProduct } from "@/content/products";
import { useEffect, useState } from "react";
import { OrderRequestModal } from "@/components/OrderRequestModal";

export default function Products() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [products, setProducts] = useState<CatalogProduct[]>(catalogProducts);
  const [activeProduct, setActiveProduct] = useState<CatalogProduct | null>(
    null,
  );
  const [orderProduct, setOrderProduct] = useState<CatalogProduct | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!Array.isArray(data)) return;
        // Merge API products with catalog: API overrides by id, then add any catalog items not in API
        const byId = new Map<string, CatalogProduct>();
        catalogProducts.forEach((p) => byId.set(p.id, p));
        data.forEach((p: CatalogProduct) => byId.set(p.id, p));
        setProducts(Array.from(byId.values()));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!activeProduct) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProduct(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeProduct]);

  return (
    <section
      id="products"
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="products-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {t.products.title}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {language === "ar"
              ? "منتجات مختارة بعناية لأنظمة المياه في المنازل والمباني."
              : "Carefully selected products for residential and commercial water systems."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {products.map((product, index) => {
            const warrantyLabel =
              language === "ar" ? product.warranty_ar : product.warranty_en;
            const title =
              language === "ar" ? product.title_ar : product.title_en;
            const subtitle =
              language === "ar" ? product.subtitle_ar : product.subtitle_en;
            const shortDescription =
              language === "ar"
                ? product.short_description_ar
                : product.short_description_en;
            const badge =
              language === "ar"
                ? product.badge_ar ?? product.warranty_ar
                : product.badge_en ?? product.warranty_en;

            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                role="button"
                tabIndex={0}
                onClick={() => setActiveProduct(product)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveProduct(product);
                  }
                }}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#DCEBFA] bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <div className="relative h-44 w-full overflow-hidden rounded-t-2xl bg-white">
                  <Image
                    src={product.image}
                    alt={title}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 280px, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  {badge && (
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                      {badge}
                    </span>
                  )}
                </div>
                <div
                  className={`flex flex-1 flex-col p-5 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <h3 className="text-sm font-semibold text-[#12304A] sm:text-base">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-primary-600 sm:text-sm">
                    {subtitle}
                  </p>
                  <p className="mt-2 text-xs text-[#6B7A8C] sm:text-sm">
                    {shortDescription}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-[#6B7280]">
                      {warrantyLabel}
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOrderProduct(product);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOrderProduct(product);
                        }
                      }}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-md transition group-hover:bg-primary-700"
                    >
                      <ShoppingCart size={14} />
                      {language === "ar" ? "اطلب الآن" : "Order Now"}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {activeProduct && (
        <ProductDetailsModal
          product={activeProduct}
          language={language}
          isRTL={isRTL}
          onClose={() => setActiveProduct(null)}
          onOrderClick={() => {
            setOrderProduct(activeProduct);
            setActiveProduct(null);
          }}
        />
      )}

      {orderProduct && (
        <OrderRequestModal
          type="product"
          itemId={orderProduct.id}
          itemName={language === "ar" ? orderProduct.title_ar : orderProduct.title_en}
          onClose={() => setOrderProduct(null)}
          language={language}
        />
      )}
    </section>
  );
}

type ProductDetailsModalProps = {
  product: CatalogProduct;
  language: "ar" | "en";
  isRTL: boolean;
  onClose: () => void;
  onOrderClick?: () => void;
};

function ProductDetailsModal({
  product,
  language,
  isRTL,
  onClose,
  onOrderClick,
}: ProductDetailsModalProps) {
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
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-6 sm:px-6"
      onClick={onClose}
    >
      <div
        className={`relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.35)] transition ${
          isRTL ? "text-right" : "text-left"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#111827] shadow-sm hover:bg-white"
          aria-label={language === "ar" ? "إغلاق" : "Close"}
        >
          <X size={18} />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative h-56 w-full bg-white md:h-full">
            <Image
              src={product.image}
              alt={title}
              fill
              className="object-contain p-6"
              sizes="(min-width: 1024px) 320px, 50vw"
            />
          </div>
          <div className="flex flex-col gap-3 p-5 sm:p-6 md:p-7">
            <div>
              <h3 className="text-base font-semibold text-[#111827] sm:text-lg">
                {title}
              </h3>
              <p className="mt-1 text-xs font-medium text-primary-600 sm:text-sm">
                {subtitle}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#4B5563] sm:text-sm">
                {fullDescription}
              </p>
            </div>

            <div className="mt-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                {language === "ar" ? "المميزات" : "Features"}
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-[#111827] sm:text-sm">
                {features.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2 ${
                      isRTL ? "flex-row-reverse text-right" : ""
                    }`}
                  >
                    <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {specs && (
              <div className="mt-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600">
                  {language === "ar" ? "المواصفات" : "Specifications"}
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-[#111827] sm:text-sm">
                  {specs.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2 ${
                        isRTL ? "flex-row-reverse text-right" : ""
                      }`}
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold text-[#111827] sm:text-sm">
                {warranty}
              </span>
              <button
                type="button"
                onClick={onOrderClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-primary-700"
              >
                <ShoppingCart size={14} />
                {language === "ar" ? "اطلب الآن" : "Order Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

