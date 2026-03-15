"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { catalogProducts } from "@/content/products";

export default function HomeProductsPreview() {
  const { language, isRTL } = useLanguage();

  // Pick one representative product per category for teaser
  const uniqueByCategory = Array.from(
    new Map(catalogProducts.map((p) => [p.category, p])).values(),
  ).slice(0, 4);

  return (
    <section
      id="home-products-preview"
      dir={isRTL ? "rtl" : "ltr"}
      className="section-divider bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="home-products-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="home-products-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {language === "ar" ? "المنتجات" : "Featured Products"}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {language === "ar"
              ? "اكتشف مجموعتنا من أنظمة المياه والمضخات والسخانات والفلاتر والثرموستات والملحقات."
              : "Discover our range of water systems, pumps, heaters, filters, thermostats, and accessories."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {uniqueByCategory.map((product, index) => {
            const title =
              language === "ar" ? product.title_ar : product.title_en;
            const subtitle =
              language === "ar" ? product.subtitle_ar : product.subtitle_en;

            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#DCEBFA] bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-t-2xl bg-white">
                  <Image
                    src={product.image}
                    alt={title}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 260px, (min-width: 768px) 50vw, 100vw"
                  />
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
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700"
          >
            {language === "ar" ? "عرض جميع المنتجات" : "View All Products"}
          </Link>
        </div>
      </div>
    </section>
  );
}

