"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/content/translations";

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];

  const projects = [
    {
      id: 1,
      labelAr: "فيلا سكنية – مشرف",
      labelEn: "Residential Villa – Mishref",
    },
    {
      id: 2,
      labelAr: "عمارة سكنية – حولي",
      labelEn: "Residential Building – Hawalli",
    },
    {
      id: 3,
      labelAr: "مجمع تجاري – الفحيحيل",
      labelEn: "Commercial Complex – Fahaheel",
    },
    {
      id: 4,
      labelAr: "مكتب إداري – مدينة الكويت",
      labelEn: "Administrative Office – Kuwait City",
    },
    {
      id: 5,
      labelAr: "مستشفى خاص – السالمية",
      labelEn: "Private Hospital – Salmiya",
    },
    {
      id: 6,
      labelAr: "مدرسة خاصة – الفروانية",
      labelEn: "Private School – Farwaniya",
    },
  ];

  return (
    <section
      id="projects"
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="projects-heading"
            className="text-2xl font-extrabold tracking-tight text-[#12304A] sm:text-3xl lg:text-4xl"
          >
            {t.projects.title}
          </h2>
          <p className="mt-3 text-sm text-[#6B7A8C] sm:text-base">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group relative h-56 overflow-hidden rounded-2xl border border-[#DCEBFA] bg-gradient-to-br from-primary-50 via-[#BEE9FF]/60 to-secondary-200/80 shadow-[0_10px_26px_rgba(15,23,42,0.14)]"
            >
              {/* Replace gradient area with real project image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-primary-900/35 opacity-0 transition group-hover:opacity-100" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 p-3 text-xs font-semibold text-[#12304A] shadow-lg sm:text-sm">
                {language === "ar" ? project.labelAr : project.labelEn}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

