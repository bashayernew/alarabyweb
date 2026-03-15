"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Users,
  Zap,
  Award,
  Wrench,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

const iconMap = {
  CheckCircle,
  Users,
  Zap,
  Award,
  Wrench,
  MapPin,
  ShieldCheck,
};

export default function WhyChooseUs() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="bg-gradient-to-b from-[#EAF4FF] to-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl">
            {t.whyChoose.title}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {language === "ar"
              ? "نركز على الجودة والموثوقية في كل مشروع من مشاريع أنظمة المياه."
              : "We focus on quality and reliability in every water system project we deliver."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {t.whyChoose.items.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col rounded-2xl border border-[#DCEBFA] bg-white/90 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white shadow-md">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-[#12304A] sm:text-base">
                  {item.title}
                </h3>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

