export type CatalogProduct = {
  id: string;
  image: string;
  title_en: string;
  title_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  short_description_en: string;
  short_description_ar: string;
  full_description_en: string;
  full_description_ar: string;
  warranty_en: string;
  warranty_ar: string;
  features_en: string[];
  features_ar: string[];
  specs_en?: string[];
  specs_ar?: string[];
  category: string;
  badge_en?: string;
  badge_ar?: string;
};

export const catalogProducts: CatalogProduct[] = [
  {
    id: "therapy-shower-filter",
    image: "/showerthrapy.jpg",
    title_en: "Therapy Shower Filter",
    title_ar: "فلتر شاور تيرابي",
    subtitle_en: "Shower Filter",
    subtitle_ar: "شاور نكهات",
    short_description_en:
      "Shower head filter designed to improve water quality and reduce chlorine and impurities.",
    short_description_ar:
      "رأس شاور مع فلتر لتحسين جودة المياه وتقليل الكلور والشوائب لتجربة استحمام مريحة.",
    full_description_en:
      "The Therapy Shower Filter is designed to enhance shower water quality by helping reduce chlorine and impurities for a more comfortable daily shower experience.",
    full_description_ar:
      "فلتر شاور تيرابي مصمم لتحسين جودة المياه أثناء الاستحمام من خلال تقليل الشوائب والكلور والمساعدة في توفير تجربة أكثر راحة ونظافة للاستخدام اليومي.",
    warranty_en: "1 Year Warranty",
    warranty_ar: "ضمان سنة واحدة",
    features_en: [
      "Improves water quality",
      "Helps reduce chlorine and impurities",
      "Practical and easy to install",
      "Suitable for home use",
    ],
    features_ar: [
      "تحسين جودة المياه",
      "تقليل الكلور والشوائب",
      "تصميم عملي وسهل التركيب",
      "مناسب للاستخدام المنزلي",
    ],
    specs_en: [],
    specs_ar: [],
    category: "accessory",
    badge_en: "1 Year Warranty",
    badge_ar: "ضمان سنة واحدة",
  },
  {
    id: "water-booster-pump",
    image: "/pump1.webp",
    title_en: "Water Booster Pump",
    title_ar: "مضخة تقوية المياه",
    subtitle_en: "Self-Priming Booster Pump",
    subtitle_ar: "مضخة دفع ذاتية",
    short_description_en:
      "High-performance pump designed to improve water pressure for residential and filtration use.",
    short_description_ar:
      "مضخة عالية الأداء لتحسين ضغط المياه في المنازل وأنظمة الفلاتر.",
    full_description_en:
      "The Water Booster Pump is a self-priming pump designed to increase water pressure and improve water flow in residential and filtration systems.",
    full_description_ar:
      "مضخة تقوية المياه هي مضخة دفع ذاتية مصممة لرفع ضغط المياه وتحسين تدفقها داخل الأنظمة المنزلية وأنظمة الفلاتر بكفاءة عالية.",
    warranty_en: "2 Year Warranty",
    warranty_ar: "كفالة سنتين",
    features_en: [
      "Improves water pressure",
      "High performance",
      "Suitable for residential use",
      "Suitable for filtration systems",
    ],
    features_ar: [
      "تحسين ضغط المياه",
      "أداء عالي",
      "مناسبة للاستخدام المنزلي",
      "مناسبة لأنظمة الفلاتر",
    ],
    specs_en: [],
    specs_ar: [],
    category: "pump",
    badge_en: "2 Year Warranty",
    badge_ar: "كفالة سنتين",
  },
  {
    id: "smart-return-pump",
    image: "/pump2.webp",
    title_en: "Smart Return Pump",
    title_ar: "مضخة الراجع الذكية",
    subtitle_en: "Intelligent Return Pump",
    subtitle_ar: "مضخة راجع ذكية",
    short_description_en:
      "Smart pump designed to improve water circulation and support system efficiency.",
    short_description_ar:
      "مضخة ذكية لتحسين دوران المياه والحفاظ على كفاءة النظام.",
    full_description_en:
      "The Smart Return Pump is designed to improve water circulation in filtration and residential water systems with stable and efficient performance.",
    full_description_ar:
      "مضخة الراجع الذكية مصممة لتحسين دوران المياه داخل أنظمة الفلاتر والمياه المنزلية مع أداء مستقر وتصميم عملي حديث.",
    warranty_en: "2 Year Warranty",
    warranty_ar: "كفالة سنتين",
    features_en: [
      "Improves water circulation",
      "Stable performance",
      "Modern practical design",
      "Suitable for home filtration systems",
    ],
    features_ar: [
      "تحسين دوران المياه",
      "أداء مستقر",
      "تصميم حديث",
      "مناسبة لأنظمة الفلاتر المنزلية",
    ],
    specs_en: [],
    specs_ar: [],
    category: "pump",
    badge_en: "2 Year Warranty",
    badge_ar: "كفالة سنتين",
  },
  {
    id: "water-pressure-pump",
    image: "/pump3.webp",
    title_en: "Water Pressure Pump",
    title_ar: "مضخة دفع المياه",
    subtitle_en: "Automatic Pressure Booster Pump",
    subtitle_ar: "مضخة ضغط أوتوماتيكية",
    short_description_en:
      "High performance automatic pressure pump designed to improve water pressure in homes and filtration systems.",
    short_description_ar:
      "مضخة ضغط عالية الأداء مصممة لتحسين ضغط المياه في المنازل وأنظمة الفلاتر.",
    full_description_en:
      "The Water Pressure Pump is a high performance automatic booster pump engineered to improve water pressure and flow in residential plumbing and home filtration systems. Its automatic pressure control helps maintain stable and comfortable water delivery throughout the property.",
    full_description_ar:
      "مضخة دفع المياه هي مضخة ضغط أوتوماتيكية عالية الأداء مصممة لرفع ضغط المياه وتحسين تدفقها في الشبكات المنزلية وأنظمة الفلاتر. نظام التحكم الأوتوماتيكي بالضغط يساعد على الحفاظ على تدفق ثابت ومريح للمياه في مختلف نقاط الاستخدام.",
    warranty_en: "2 Year Replacement Warranty",
    warranty_ar: "كفالة سنتين على التبديل",
    features_en: [
      "Improves water pressure",
      "Automatic pressure control",
      "Durable stainless steel pump body",
      "Suitable for home filtration systems",
    ],
    features_ar: [
      "تحسين ضغط المياه",
      "تحكم أوتوماتيكي بالضغط",
      "جسم مضخة من الستانلس ستيل",
      "مناسبة للأنظمة المنزلية والفلاتر",
    ],
    specs_en: [],
    specs_ar: [],
    category: "pump",
    badge_en: "2 Year Replacement Warranty",
    badge_ar: "كفالة سنتين على التبديل",
  },
  {
    id: "water-circulation-pump",
    image: "/pump4.webp",
    title_en: "Water Circulation Pump",
    title_ar: "مضخة الراجع",
    subtitle_en: "Hot Water Return Pump",
    subtitle_ar: "مضخة تدوير المياه",
    short_description_en:
      "Compact circulation pump designed to maintain constant water circulation in residential plumbing and filtration systems.",
    short_description_ar:
      "مضخة تدوير مصممة للحفاظ على دوران المياه بشكل مستمر في الأنظمة المنزلية وأنظمة الفلاتر.",
    full_description_en:
      "The Water Circulation Pump is a compact hot water return pump engineered to maintain stable, continuous water circulation in residential plumbing and home filtration systems. By keeping water moving through the lines, it helps reduce wait times for hot water, supports system efficiency, and improves everyday comfort.",
    full_description_ar:
      "مضخة الراجع هي مضخة تدوير مدمجة مصممة للحفاظ على دوران المياه بشكل مستمر وثابت داخل الشبكات المنزلية وأنظمة الفلاتر. من خلال إبقاء المياه في حركة دائمة، تساعد على تقليل وقت الانتظار للمياه الساخنة، وتحسين كفاءة النظام، وتوفير تجربة استخدام أكثر راحة في المنزل.",
    warranty_en: "2 Year Replacement Warranty",
    warranty_ar: "كفالة سنتين على التبديل",
    features_en: [
      "Stable water circulation",
      "Durable metal connectors",
      "Compact design",
      "Suitable for home plumbing systems",
    ],
    features_ar: [
      "دوران مستمر للمياه",
      "وصلات معدنية متينة",
      "تصميم مدمج",
      "مناسبة للأنظمة المنزلية",
    ],
    specs_en: [],
    specs_ar: [],
    category: "pump",
    badge_en: "2 Year Replacement Warranty",
    badge_ar: "كفالة سنتين على التبديل",
  },
  {
    id: "submersible-pump-control",
    image: "/pump5.jpg",
    title_en: "Submersible Pump with Control Device",
    title_ar: "مضخة غاطسة مع جهاز الكنترول",
    subtitle_en: "Sewage Submersible Pump",
    subtitle_ar: "مضخة صرف صحي غاطسة",
    short_description_en:
      "High-performance stainless steel submersible pump designed for sewage, drainage, and water transfer applications.",
    short_description_ar:
      "مضخة غاطسة عالية الأداء مصممة للاستخدام في أنظمة الصرف الصحي وتصريف المياه.",
    full_description_en:
      "This submersible pump with control device features a durable stainless steel body and is engineered for demanding sewage, drainage, and water transfer applications. The integrated control device helps automate operation and protect the system for reliable long-term performance.",
    full_description_ar:
      "مضخة غاطسة مزودة بجهاز كنترول وبجسم من الستانلس ستيل مصممة للعمل في ظروف صعبة داخل أنظمة الصرف الصحي وتصريف المياه ونقلها. يساعد جهاز الكنترول المدمج على تشغيل المضخة بشكل أوتوماتيكي وحماية النظام لضمان أداء موثوق على المدى الطويل.",
    warranty_en: "2 Year Replacement Warranty",
    warranty_ar: "كفالة سنتين على التبديل",
    features_en: [
      "Stainless steel pump body",
      "Suitable for sewage and drainage systems",
      "Includes automatic control device",
      "Durable industrial design",
    ],
    features_ar: [
      "جسم مضخة من الستانلس ستيل",
      "مناسبة للصرف الصحي وتصريف المياه",
      "مزودة بجهاز كنترول",
      "تصميم صناعي متين",
    ],
    specs_en: [],
    specs_ar: [],
    category: "pump",
    badge_en: "2 Year Replacement Warranty",
    badge_ar: "كفالة سنتين على التبديل",
  },
  {
    id: "submersible-pump-alarm",
    image: "/pump5.jpg",
    title_en: "Submersible Pump with Alarm Device",
    title_ar: "مضخة غاطسة مع جهاز إنذار",
    subtitle_en: "Sewage Alarm Pump System",
    subtitle_ar: "نظام مضخة صرف مع إنذار",
    short_description_en:
      "Submersible pump system with alarm device designed for reliable drainage and sewage system monitoring.",
    short_description_ar:
      "مضخة غاطسة مزودة بجهاز إنذار لمراقبة أنظمة الصرف وضمان تشغيل آمن وفعال.",
    full_description_en:
      "The Submersible Pump with Alarm Device combines a stainless steel submersible pump with an alarm monitoring system to support reliable drainage and sewage applications. The alarm device helps detect issues early and provides an extra layer of safety for critical installations.",
    full_description_ar:
      "تجمع مضخة غاطسة مع جهاز إنذار بين مضخة غاطسة بجسم من الستانلس ستيل ونظام إنذار لمراقبة أنظمة الصرف. يساعد جهاز الإنذار على اكتشاف المشكلات مبكراً ويوفر مستوى إضافياً من الأمان للتطبيقات الحساسة وأنظمة الصرف الصحي.",
    warranty_en: "2 Year Replacement Warranty",
    warranty_ar: "كفالة سنتين على التبديل",
    features_en: [
      "Stainless steel pump body",
      "Reliable drainage performance",
      "Includes alarm monitoring device",
      "Suitable for sewage systems",
    ],
    features_ar: [
      "جسم مضخة من الستانلس ستيل",
      "أداء موثوق لتصريف المياه",
      "مزودة بجهاز إنذار",
      "مناسبة لأنظمة الصرف الصحي",
    ],
    specs_en: [],
    specs_ar: [],
    category: "pump",
    badge_en: "2 Year Replacement Warranty",
    badge_ar: "كفالة سنتين على التبديل",
  },
  {
    id: "brass-check-valve",
    image: "/radadat.webp",
    title_en: "Brass Check Valve",
    title_ar: "رداد نحاسي",
    subtitle_en: "Check Valve / Non-Return Valve",
    subtitle_ar: "رداد منع رجوع المياه",
    short_description_en:
      "High-quality brass check valve for HVAC and plumbing systems, allowing water flow in one direction while preventing reverse flow.",
    short_description_ar:
      "رداد نحاسي عالي الجودة لأنظمة التكييف والسباكة يسمح بمرور المياه في اتجاه واحد ويمنع رجوع التدفق العكسي.",
    full_description_en:
      "This brass check valve is designed for use in HVAC and general plumbing applications where reliable one‑way water flow is required. The durable brass construction offers excellent corrosion resistance and long service life, helping protect pumps, pipelines, and equipment from reverse flow conditions.",
    full_description_ar:
      "يستخدم هذا الرداد النحاسي في أنظمة التكييف والسباكة حيث يلزم مرور المياه في اتجاه واحد فقط. يوفر جسمه المصنوع من النحاس المتين مقاومة عالية للتآكل وعمر استخدام طويل، ما يساعد على حماية المضخات وخطوط الأنابيب والمعدات من مشاكل رجوع التدفق العكسي.",
    warranty_en: "Manufacturer warranty – brass body",
    warranty_ar: "ضمان المصنع على جسم النحاس",
    features_en: [
      "Brass construction for corrosion resistance",
      "Allows one‑directional water flow",
      "Helps prevent reverse flow and system issues",
      "Suitable for HVAC and plumbing installations",
    ],
    features_ar: [
      "جسم نحاسي مقاوم للتآكل",
      "يسمح بمرور المياه في اتجاه واحد",
      "يساعد على منع رجوع التدفق ومشاكل النظام",
      "مناسب لتركيبات التكييف والسباكة",
    ],
    specs_en: [
      "Material: Brass",
      "Type: Threaded check valve",
      "Application: HVAC systems and water pipelines",
      "Sizes: Multiple sizes available",
    ],
    specs_ar: [
      "المادة: نحاس",
      "النوع: رداد ملولب",
      "الاستخدام: أنظمة التكييف وخطوط مياه الشرب",
      "المقاسات: متوفر بعدة مقاسات",
    ],
    category: "check-valve",
    badge_en: "Brass construction",
    badge_ar: "جسم نحاسي",
  },
  {
    id: "safety-valve",
    image: "/radadat2.webp",
    title_en: "Safety Valve",
    title_ar: "سيفتي بلف",
    subtitle_en: "Pressure Safety Valve",
    subtitle_ar: "صمام أمان للضغط",
    short_description_en:
      "Safety valve for HVAC and plumbing systems that automatically releases excess pressure to protect pipelines and equipment.",
    short_description_ar:
      "صمام أمان لأنظمة التكييف والسباكة يعمل على تفريغ الضغط الزائد لحماية الأنابيب والمعدات.",
    full_description_en:
      "This safety valve is designed for use in HVAC, water heater, and general plumbing systems to protect pipelines and equipment from excessive pressure. When system pressure exceeds the set limit, the valve automatically releases the excess to help maintain safe and stable operation.",
    full_description_ar:
      "يستخدم هذا السيفتي بلف في أنظمة التكييف والسخانات والسباكة لحماية الأنابيب والمعدات من الضغط الزائد. عند تجاوز الضغط للقيمة المحددة، يعمل الصمام على تفريغ الضغط الزائد بشكل تلقائي للمساعدة في الحفاظ على تشغيل آمن ومستقر للنظام.",
    warranty_en: "Safety component – follow manufacturer guidelines",
    warranty_ar: "صمام أمان – حسب تعليمات المصنع",
    features_en: [
      "Protects systems from excessive pressure",
      "Automatic pressure release function",
      "Suitable for HVAC, water heaters, and pipelines",
      "Brass/metal construction for durability",
    ],
    features_ar: [
      "يحمي الأنظمة من الضغط الزائد",
      "تفريغ أوتوماتيكي للضغط الزائد",
      "مناسب لأنظمة التكييف والسخانات وخطوط الأنابيب",
      "تصميم متين من النحاس/المعدن",
    ],
    specs_en: [
      "Type: Safety Valve",
      "Material: Brass / Metal",
      "Application: HVAC systems, water heaters, pipelines",
      "Sizes: Multiple sizes available",
    ],
    specs_ar: [
      "النوع: صمام أمان (Safety Valve)",
      "المادة: نحاس / معدن",
      "الاستخدام: أنظمة التكييف، السخانات، وخطوط الأنابيب",
      "المقاسات: متوفر بعدة مقاسات",
    ],
    category: "valve",
    badge_en: "Pressure safety",
    badge_ar: "صمام أمان",
  },
  {
    id: "water-heater-thermostat",
    image: "/termostate.jpg",
    title_en: "Water Heater Thermostat",
    title_ar: "ترموستات سخان",
    subtitle_en: "Thermostat / Temperature Controller",
    subtitle_ar: "منظم حرارة للسخان",
    short_description_en:
      "Thermostat used to control the temperature of water heaters and maintain safe and efficient operation.",
    short_description_ar:
      "ترموستات يستخدم للتحكم بدرجة حرارة السخان والحفاظ على عمل آمن وفعال.",
    full_description_en:
      "This water heater thermostat is designed to regulate the heating process and maintain the desired temperature inside the system. By monitoring and controlling water temperature, it helps prevent overheating, protects components, and supports efficient, comfortable hot water delivery in residential and HVAC applications.",
    full_description_ar:
      "يعمل ترموستات السخان على تنظيم عملية التسخين والحفاظ على الدرجة المطلوبة داخل النظام. من خلال مراقبة درجة حرارة المياه والتحكم بها، يساعد على منع ارتفاع الحرارة، وحماية مكونات السخان، وضمان توفير مياه ساخنة بكفاءة وراحة للاستخدام المنزلي وفي أنظمة التكييف.",
    warranty_en: "Safety-critical control component",
    warranty_ar: "مكون تحكم مهم للسلامة",
    features_en: [
      "Controls water heater temperature",
      "Helps prevent overheating",
      "Supports safe and efficient operation",
      "Suitable for water heaters and HVAC systems",
    ],
    features_ar: [
      "يتحكم في درجة حرارة السخان",
      "يساعد على منع ارتفاع الحرارة",
      "يدعم تشغيل آمن وكفء للنظام",
      "مناسب للسخانات وأنظمة التكييف",
    ],
    specs_en: [
      "Type: Water heater thermostat",
      "Function: Temperature control",
      "Application: Water heaters / HVAC systems",
      "Material: Heat-resistant electrical components",
    ],
    specs_ar: [
      "النوع: ترموستات سخان مياه",
      "الوظيفة: التحكم في درجة الحرارة",
      "الاستخدام: سخانات المياه / أنظمة التكييف",
      "المادة: مكونات كهربائية مقاومة للحرارة",
    ],
    category: "thermostat",
    badge_en: "Temperature control",
    badge_ar: "تحكم بالحرارة",
  },
];

