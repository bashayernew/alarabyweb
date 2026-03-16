"use client";

import Link from "next/link";
import {
  Flame,
  Filter,
  Gauge,
  Droplets,
  Wrench,
  Settings,
  CheckCircle2,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

const HERO_IMAGE = "/waterheater.webp";

const SERVICES = [
  {
    icon: Settings,
    title: "تركيب السستم المركزي",
    description: "تركيب أنظمة التدفئة المركزية للمنازل والمباني مع ضمان كفاءة عالية.",
  },
  {
    icon: Filter,
    title: "صيانة الفلاتر المنزلية والمركزية",
    description: "تنظيف وتبديل الشمعات لضمان نقاء المياه وجودتها.",
  },
  {
    icon: Gauge,
    title: "تركيب وصيانة المضخات",
    description: "تركيب وصيانة مضخات المياه لضمان ضغط وتدفق مثالي.",
  },
  {
    icon: Droplets,
    title: "تنظيف خزانات المياه",
    description: "تنظيف وتعقيم الخزانات لضمان مياه نظيفة وصحية.",
  },
  {
    icon: Wrench,
    title: "تسليك الصرف الصحي",
    description: "حل مشاكل الانسداد في المجاري باستخدام معدات متطورة.",
  },
  {
    icon: Flame,
    title: "صيانة السخانات",
    description: "فحص وصيانة السخانات المركزية لضمان استمرارية الأداء.",
  },
];

const WHY_CHOOSE = [
  "فريق فني متخصص",
  "خبرة في أنظمة المياه والسستم المركزي",
  "سرعة في الاستجابة",
  "جودة في العمل والخدمة",
];

export default function AboutPage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const whatsappNumber = `965${t.contact.mainPhone}`;

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Section 1 — Hero */}
      <section className="relative min-h-[50vh] overflow-hidden bg-[#12304A]">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12304A]/90 via-[#12304A]/75 to-[#12304A]/90" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            من نحن
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/95 sm:text-lg">
            شركة الرائد العربي متخصصة في أنظمة المياه والسستم المركزي، حيث نقدم
            حلولاً متكاملة تشمل تركيب وصيانة السخانات المركزية، فلاتر المياه،
            المضخات، وتنظيف الخزانات. نحرص على تقديم خدمات عالية الجودة باستخدام
            أفضل المعدات وفريق فني متخصص لضمان أفضل أداء لأنظمة المياه في المنازل
            والمباني.
          </p>
        </div>
      </section>

      {/* Section 2 — Our Experience */}
      <section className="section-divider bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl">
            خبرتنا
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#6B7A8C] sm:text-lg">
            نمتلك خبرة واسعة في مجال أنظمة المياه والسستم المركزي، حيث قمنا
            بتنفيذ العديد من المشاريع وتركيب وصيانة الأنظمة المختلفة للمنازل
            والمباني. يعتمد عملنا على الدقة في التنفيذ واستخدام أفضل المعدات
            لضمان الكفاءة العالية وطول عمر الأنظمة.
          </p>
        </div>
      </section>

      {/* Section 3 — Our Services */}
      <section className="section-divider bg-gradient-to-b from-white to-[#EAF4FF]/40 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl">
              خدماتنا
            </h2>
            <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
              نقدم مجموعة شاملة من الخدمات لأنظمة المياه والسستم المركزي
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group flex flex-col rounded-2xl border border-[#DCEBFA] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md">
                    <Icon className="h-6 w-6" size={24} strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#12304A]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7A8C]">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4 — Why Choose Us */}
      <section className="section-divider bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl">
              لماذا تختارنا؟
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-[#DCEBFA] bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <CheckCircle2
                  className="h-6 w-6 shrink-0 text-primary-600"
                  size={24}
                />
                <span className="text-sm font-semibold text-[#12304A] sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Contact CTA */}
      <section className="section-divider bg-[#12304A] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            تواصل معنا
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
            إذا كنت بحاجة إلى تركيب أو صيانة أنظمة المياه، تواصل معنا الآن وسيقوم
            فريقنا بخدمتك في أسرع وقت.
          </p>

          <div
            className={`mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center ${
              isRTL ? "sm:flex-row-reverse" : ""
            }`}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Phone size={20} />
              تواصل معنا
            </Link>
            <Link
              href={`https://wa.me/${whatsappNumber}?text=أحتاج طلب خدمة`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] hover:shadow-xl"
            >
              <MessageCircle size={22} />
              طلب خدمة
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
