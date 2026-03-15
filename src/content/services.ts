export type ServiceCategory =
  | "installation"
  | "repair"
  | "maintenance"
  | "water-system"
  | "pump"
  | "heater";

export type Service = {
  id: string;
  category: ServiceCategory;
  title_en: string;
  title_ar: string;
  subtitle_en?: string;
  subtitle_ar?: string;
  description_en: string;
  description_ar: string;
  options_en?: string[];
  options_ar?: string[];
};

export const servicesCatalog: Service[] = [
  {
    id: "installation-maintenance",
    category: "installation",
    title_en: "Installation & Maintenance",
    title_ar: "التركيب والصيانة",
    description_en:
      "Professional installation and preventive maintenance services for water heaters, pumps, filters, and water systems.",
    description_ar:
      "خدمات تركيب وصيانة احترافية للسخانات والمضخات والفلاتر وأنظمة المياه.",
  },
  {
    id: "integrated-solutions",
    category: "water-system",
    title_en: "Integrated Water System Solutions",
    title_ar: "الحلول المتكاملة",
    description_en:
      "End-to-end design and implementation of integrated water, heating, and filtration systems tailored to your property.",
    description_ar:
      "تصميم وتنفيذ أنظمة مياه وتسخين وفلترة متكاملة حسب احتياج العقار.",
  },
  {
    id: "central-heaters-service",
    category: "heater",
    title_en: "Central Heater Services",
    title_ar: "خدمات السخانات المركزية",
    description_en:
      "Assessment, sizing, and configuration services for central water heater systems in villas and buildings.",
    description_ar:
      "خدمات معاينة وتحديد حجم وتركيب أنظمة السخانات المركزية للفلل والمباني.",
  },
  {
    id: "pumps-tanks-service",
    category: "pump",
    title_en: "Pumps & Tanks Services",
    title_ar: "خدمات المضخات والخزانات",
    description_en:
      "Setup, balancing, and optimization services for booster pumps, circulation pumps, and water storage tanks.",
    description_ar:
      "خدمات تركيب وضبط وتشغيل مضخات الدفع ومضخات الراجع وخزانات المياه.",
  },
  {
    id: "water-filters-service",
    category: "water-system",
    title_en: "Water Filter Services",
    title_ar: "خدمات فلاتر المياه",
    description_en:
      "Installation and upgrade services for residential water filtration systems and RO units.",
    description_ar:
      "تركيب وتحديث أنظمة فلاتر المياه المنزلية ووحدات التناضح العكسي (RO).",
  },
  {
    id: "after-sales",
    category: "maintenance",
    title_en: "After-Sales Support",
    title_ar: "خدمة ما بعد البيع",
    description_en:
      "Scheduled visits, system checks, and customer support to keep your water systems running reliably.",
    description_ar:
      "زيارات مجدولة وفحص للأنظمة ودعم للعملاء لضمان عمل أنظمة المياه بكفاءة.",
  },
  {
    id: "water-heater-repair",
    category: "repair",
    title_en: "Water Heater Repair",
    title_ar: "تصليح سخان",
    description_en:
      "Professional repair service for residential and commercial water heaters. Our technicians diagnose faults and restore safe and proper heater operation.",
    description_ar:
      "خدمة احترافية لتصليح السخانات المنزلية والتجارية. يقوم الفنيون بفحص الأعطال وإصلاحها لضمان عودة السخان للعمل بشكل آمن وطبيعي.",
  },
  {
    id: "maintenance-services",
    category: "maintenance",
    title_en: "Maintenance Services",
    title_ar: "خدمات الصيانة",
    description_en:
      "Professional maintenance solutions for HVAC, plumbing, water heating, and water system equipment to ensure reliable long-term performance.",
    description_ar:
      "حلول صيانة احترافية لأنظمة التكييف والسباكة والتسخين وأنظمة المياه لضمان الأداء الموثوق على المدى الطويل.",
    options_en: ["Partial Maintenance", "One-Time Maintenance", "Annual Maintenance"],
    options_ar: ["صيانة جزئية", "صيانة مرة واحدة", "صيانة سنوية"],
  },
];

