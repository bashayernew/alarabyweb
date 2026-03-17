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
    category: "accessory",
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
    category: "accessory",
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
    category: "accessory",
    badge_en: "Temperature control",
    badge_ar: "تحكم بالحرارة",
  },
  // Water tanks
  {
    id: "tank-1000",
    image: "/watergallonsmall.webp",
    title_en: "1000 Gallon Water Tank",
    title_ar: "تانكي مياه 1000 جالون",
    subtitle_en: "Central Storage Tank",
    subtitle_ar: "خزان تخزين مركزي",
    short_description_en:
      "Heavy-duty 1000 gallon polyethylene water tank designed for residential and commercial water storage systems.",
    short_description_ar:
      "تانكي مياه بسعة 1000 جالون مصنوع من البولي إيثيلين عالي الجودة، مصمم لتخزين المياه في المنازل والمباني التجارية.",
    full_description_en:
      "Heavy-duty 1000 gallon polyethylene water tank designed for residential and commercial water storage systems. Built to withstand extreme heat conditions common in Kuwait and the Gulf region.",
    full_description_ar:
      "تانكي مياه بسعة 1000 جالون مصنوع من البولي إيثيلين عالي الجودة، مصمم لتخزين المياه في المنازل والمباني التجارية، ومناسب لدرجات الحرارة العالية في الكويت ودول الخليج.",
    warranty_en: "10 Year Warranty",
    warranty_ar: "كفالة 10 سنوات",
    features_en: ["1000 Gallon Capacity", "Durable Polyethylene", "UV Resistant", "Rooftop Installation", "10 Year Warranty"],
    features_ar: ["سعة 1000 جالون", "مصنوع من بولي إيثيلين عالي الجودة", "مقاوم لأشعة الشمس", "مناسب للتركيب على الأسطح", "كفالة 10 سنوات"],
    specs_en: [],
    specs_ar: [],
    category: "tank",
    badge_en: "10 Year Warranty",
    badge_ar: "كفالة 10 سنوات",
  },
  {
    id: "tank-1200",
    image: "/watergallonsmall.webp",
    title_en: "1200 Gallon Water Tank",
    title_ar: "تانكي مياه 1200 جالون",
    subtitle_en: "Central Storage Tank",
    subtitle_ar: "خزان تخزين مركزي",
    short_description_en:
      "Large-capacity 1200 gallon water tank ideal for villas, residential buildings, and commercial water storage.",
    short_description_ar:
      "خزان مياه بسعة 1200 جالون مناسب للفلل والمباني السكنية والتجارية.",
    full_description_en:
      "Large-capacity 1200 gallon water tank ideal for villas, residential buildings, and commercial water storage. Engineered for durability and long-term performance in hot climates.",
    full_description_ar:
      "خزان مياه بسعة 1200 جالون مناسب للفلل والمباني السكنية والتجارية، مصمم لتحمل درجات الحرارة العالية ويضمن أداء طويل الأمد.",
    warranty_en: "10 Year Warranty",
    warranty_ar: "كفالة 10 سنوات",
    features_en: ["1200 Gallon Capacity", "Industrial Grade Polyethylene", "Heat Resistant", "Large Homes & Buildings", "10 Year Warranty"],
    features_ar: ["سعة 1200 جالون", "بولي إيثيلين صناعي عالي الجودة", "مقاوم للحرارة", "مناسب للمنازل الكبيرة والمباني", "كفالة 10 سنوات"],
    specs_en: [],
    specs_ar: [],
    category: "tank",
    badge_en: "10 Year Warranty",
    badge_ar: "كفالة 10 سنوات",
  },
  // Water heater systems
  {
    id: "american-80-mexico",
    image: "/waterheater.webp",
    title_en: "American 80 Gallon Water Heater (Mexican Assembly)",
    title_ar: "سخان 80 جالون أمريكي تجميع مكسيكي",
    subtitle_en: "Central Heater System",
    subtitle_ar: "نظام سخانات مركزية",
    short_description_en:
      "Complete 80 gallon water heating system with filtration and pump for reliable hot water supply.",
    short_description_ar:
      "نظام سخان مياه بسعة 80 جالون مناسب للمنازل والمباني التجارية ويشمل نظام فلترة ومضخة.",
    full_description_en:
      "Complete 80 gallon water heating system designed for residential and commercial applications. Includes filtration and pump components for reliable hot water supply.",
    full_description_ar:
      "نظام سخان مياه بسعة 80 جالون مناسب للمنازل والمباني التجارية ويشمل نظام فلترة ومضخة لضمان توفير مياه ساخنة بشكل مستمر.",
    warranty_en: "6 Years Full Warranty",
    warranty_ar: "كفالة 6 سنوات شامل",
    features_en: ["80 Gallon Capacity", "High efficiency heating", "Durable metal tank", "Integrated filtration", "Pump support", "6 Year Warranty"],
    features_ar: ["سعة 80 جالون", "نظام تسخين عالي الكفاءة", "خزان معدني متين", "نظام فلترة مدمج", "نظام مضخة متكامل", "كفالة 6 سنوات"],
    specs_en: [],
    specs_ar: [],
    category: "heater",
    badge_en: "6 Years Full Warranty",
    badge_ar: "كفالة 6 سنوات شامل",
  },
  {
    id: "american-80",
    image: "/waterheater.webp",
    title_en: "American 80 Gallon Water Heater",
    title_ar: "سخان 80 جالون أمريكي",
    subtitle_en: "Central Heater System",
    subtitle_ar: "نظام سخانات مركزية",
    short_description_en:
      "80 gallon water heater suitable for villas and buildings, integrates with filtration and pump systems.",
    short_description_ar:
      "نظام سخان مياه بسعة 80 جالون للمنازل والفلل مع إمكانية ربطه بأنظمة الترشيح والمضخات المركزية.",
    full_description_en:
      "80 gallon water heater suitable for villas and buildings, designed to integrate with central filtration and pump systems.",
    full_description_ar:
      "نظام سخان مياه بسعة 80 جالون للمنازل والفلل مع إمكانية ربطه بأنظمة الترشيح والمضخات المركزية.",
    warranty_en: "6 Years Full Warranty",
    warranty_ar: "كفالة 6 سنوات شامل",
    features_en: ["80 Gallon Capacity", "High efficiency heating", "Durable metal tank", "Filtration compatible", "Residential & commercial", "6 Year Warranty"],
    features_ar: ["سعة 80 جالون", "نظام تسخين عالي الكفاءة", "خزان معدني متين", "متوافق مع أنظمة الفلترة والمضخات", "مناسب للاستخدام السكني والتجاري", "كفالة 6 سنوات"],
    specs_en: [],
    specs_ar: [],
    category: "heater",
    badge_en: "6 Years Full Warranty",
    badge_ar: "كفالة 6 سنوات شامل",
  },
  {
    id: "italian-80",
    image: "/waterheater.webp",
    title_en: "Italian 80 Gallon Water Heater",
    title_ar: "سخان 80 جالون إيطالي",
    subtitle_en: "Central Heater System",
    subtitle_ar: "نظام سخانات مركزية",
    short_description_en:
      "80 gallon Italian-designed water heater for reliable, continuous hot water in central systems.",
    short_description_ar:
      "سخان مياه 80 جالون بتصميم إيطالي يوفر أداء موثوقاً للمباني التي تحتاج إلى مياه ساخنة بشكل متواصل.",
    full_description_en:
      "80 gallon Italian-designed water heater engineered for reliable, continuous hot water in central systems.",
    full_description_ar:
      "سخان مياه 80 جالون بتصميم إيطالي يوفر أداء موثوقاً للمباني التي تحتاج إلى مياه ساخنة بشكل متواصل.",
    warranty_en: "6 Years Full Warranty",
    warranty_ar: "كفالة 6 سنوات شامل",
    features_en: ["80 Gallon Capacity", "Italian quality design", "Insulated metal tank", "Central systems", "Stable performance", "6 Year Warranty"],
    features_ar: ["سعة 80 جالون", "تصميم إيطالي عالي الجودة", "خزان معدني معزول", "مناسب للأنظمة المركزية", "أداء ثابت في مختلف الظروف", "كفالة 6 سنوات"],
    specs_en: [],
    specs_ar: [],
    category: "heater",
    badge_en: "6 Years Full Warranty",
    badge_ar: "كفالة 6 سنوات شامل",
  },
  // Standalone water cooling units (individual units, not full systems)
  {
    id: "water-cooling-device",
    image: "/watertankcooler.webp",
    title_en: "Water Cooling Unit",
    title_ar: "جهاز تبريد المائي",
    subtitle_en: "Standalone Cooling Unit",
    subtitle_ar: "وحدة تبريد مائية",
    short_description_en:
      "High-efficiency water cooling unit designed to cool water effectively for residential and commercial applications.",
    short_description_ar:
      "جهاز تبريد مائي عالي الكفاءة يستخدم لتبريد المياه بكفاءة عالية، مناسب للاستخدام المنزلي والتجاري.",
    full_description_en:
      "High-efficiency water cooling unit designed to cool water effectively for residential and commercial applications.",
    full_description_ar:
      "جهاز تبريد مائي عالي الكفاءة يستخدم لتبريد المياه بكفاءة عالية، مناسب للاستخدام المنزلي والتجاري.",
    warranty_en: "2-year cooling warranty",
    warranty_ar: "كفالة سنتين شرط التبريد",
    features_en: [
      "Efficient water cooling system",
      "Suitable for residential and commercial use",
      "Reliable and stable performance",
      "Durable construction",
      "2-year cooling warranty",
    ],
    features_ar: [
      "نظام تبريد مائي فعال",
      "مناسب للاستخدام المنزلي والتجاري",
      "أداء ثابت وموثوق",
      "تصميم متين",
      "كفالة سنتين شرط التبريد",
    ],
    specs_en: [],
    specs_ar: [],
    category: "cooling",
    badge_en: "2 Year Cooling Warranty",
    badge_ar: "كفالة سنتين شرط التبريد",
  },
  {
    id: "dynamo-cooling-system",
    image: "/watertankcooler.webp",
    title_en: "Water Cooling System with Dynamo",
    title_ar: "جهاز تبريد نظام دينمو المائي",
    subtitle_en: "Dynamo-Powered Cooling",
    subtitle_ar: "تبريد بنظام الدينمو",
    short_description_en:
      "Water cooling unit powered by a dynamo system providing stable performance and efficient cooling.",
    short_description_ar:
      "جهاز تبريد يعمل بنظام الدينمو المائي لتوفير أداء تبريد مستقر وكفاءة تشغيل عالية.",
    full_description_en:
      "Water cooling unit powered by a dynamo system providing stable performance and efficient cooling.",
    full_description_ar:
      "جهاز تبريد يعمل بنظام الدينمو المائي لتوفير أداء تبريد مستقر وكفاءة تشغيل عالية.",
    warranty_en: "1-year cooling warranty",
    warranty_ar: "كفالة سنة شرط التبريد",
    features_en: [
      "Dynamo powered water cooling system",
      "High operational efficiency",
      "Strong build for continuous use",
      "Suitable for homes and buildings",
      "1-year cooling warranty",
    ],
    features_ar: [
      "نظام دينمو مائي",
      "كفاءة تشغيل عالية",
      "تصميم قوي للاستخدام المستمر",
      "مناسب للمنازل والمباني",
      "كفالة سنة شرط التبريد",
    ],
    specs_en: [],
    specs_ar: [],
    category: "cooling",
    badge_en: "1 Year Cooling Warranty",
    badge_ar: "كفالة سنة شرط التبريد",
  },
  {
    id: "saudi-dynamo-cooling-system",
    image: "/watertankcooler.webp",
    title_en: "Saudi Dynamo Water Cooling Unit",
    title_ar: "جهاز تبريد نظام دينمو سعودي",
    subtitle_en: "Saudi Dynamo Cooling",
    subtitle_ar: "تبريد دينمو سعودي",
    short_description_en:
      "Water cooling unit using a Saudi dynamo system delivering powerful cooling with efficient energy usage.",
    short_description_ar:
      "جهاز تبريد يعمل بنظام الدينمو السعودي يوفر أداء تبريد قوي مع استهلاك طاقة فعال.",
    full_description_en:
      "Water cooling unit using a Saudi dynamo system delivering powerful cooling with efficient energy usage.",
    full_description_ar:
      "جهاز تبريد يعمل بنظام الدينمو السعودي يوفر أداء تبريد قوي مع استهلاك طاقة فعال.",
    warranty_en: "1-year cooling warranty",
    warranty_ar: "كفالة سنة شرط التبريد",
    features_en: [
      "Saudi dynamo cooling system",
      "Strong and efficient cooling",
      "Suitable for residential and commercial use",
      "Durable design",
      "1-year cooling warranty",
    ],
    features_ar: [
      "نظام دينمو سعودي",
      "تبريد قوي وفعال",
      "مناسب للاستخدام السكني والتجاري",
      "تصميم متين",
      "كفالة سنة شرط التبريد",
    ],
    specs_en: [],
    specs_ar: [],
    category: "cooling",
    badge_en: "1 Year Cooling Warranty",
    badge_ar: "كفالة سنة شرط التبريد",
  },
  // Tank accessories
  {
    id: "float-switch",
    image: "/floatswitch.webp",
    title_en: "Electrical Float Switch",
    title_ar: "عوامة كهربائية للتحكم بمستوى المياه",
    subtitle_en: "Water Level Control",
    subtitle_ar: "تحكم بمستوى المياه",
    short_description_en:
      "Electrical float switch for automatic water level control in tanks, preventing overflow and protecting pumps.",
    short_description_ar:
      "عوامة كهربائية تستخدم للتحكم التلقائي في مستوى المياه داخل الخزانات.",
    full_description_en:
      "Electrical float switch designed to automatically control water levels inside tanks. It activates or stops pumps based on the water level, preventing overflow and protecting pumps from running dry.",
    full_description_ar:
      "عوامة كهربائية تستخدم للتحكم التلقائي في مستوى المياه داخل الخزانات. تقوم بتشغيل أو إيقاف المضخة حسب مستوى الماء لمنع فيضان الخزان وحماية المضخة من العمل بدون ماء.",
    warranty_en: "Manufacturer warranty",
    warranty_ar: "ضمان المصنع",
    features_en: ["Automatic water level control", "Waterproof design", "Suitable for water tanks", "Long cable for installation"],
    features_ar: ["تحكم تلقائي في مستوى المياه", "تصميم مقاوم للماء", "مناسب لخزانات المياه", "كابل كهربائي طويل لسهولة التركيب"],
    specs_en: [],
    specs_ar: [],
    category: "accessory",
    badge_en: "Level control",
    badge_ar: "تحكم بالمستوى",
  },
  // Heater parts
  {
    id: "heater-element",
    image: "/heatercandle.webp",
    title_en: "Water Heater Heating Element",
    title_ar: "شمعة سخان",
    subtitle_en: "Electric Heating Element",
    subtitle_ar: "عنصر تسخين كهربائي",
    short_description_en:
      "Electric heating element used inside water heaters to heat water efficiently with durability and reliable performance.",
    short_description_ar:
      "شمعة سخان كهربائي تستخدم داخل السخانات لتسخين المياه بكفاءة عالية وتتميز بالمتانة والأداء الموثوق.",
    full_description_en:
      "Electric heating element used inside water heaters to heat water efficiently. Designed for durability and reliable heating performance.",
    full_description_ar:
      "شمعة سخان كهربائي تستخدم داخل السخانات لتسخين المياه بكفاءة عالية وتتميز بالمتانة والأداء الموثوق.",
    warranty_en: "Manufacturer warranty",
    warranty_ar: "ضمان المصنع",
    features_en: ["High efficiency heating", "Corrosion resistant", "Compatible with most electric heaters", "Durable design", "Easy installation"],
    features_ar: ["عنصر تسخين عالي الكفاءة", "مقاوم للتآكل", "متوافق مع معظم السخانات الكهربائية", "تصميم متين", "سهل التركيب"],
    specs_en: [],
    specs_ar: [],
    category: "accessory",
    badge_en: "Electric element",
    badge_ar: "عنصر تسخين كهربائي",
  },
  // Filters (from section components + audit missing items)
  {
    id: "filter-7-stage",
    image: "/aquajet.webp",
    title_en: "7-Stage RO Water Filter",
    title_ar: "فلتر مياه 7 مراحل",
    subtitle_en: "Multi-Stage Reverse Osmosis System",
    subtitle_ar: "نظام تنقية مياه بتقنية التناضح العكسي",
    short_description_en:
      "Multi-stage reverse osmosis filtration system designed to remove impurities, sediments, chlorine, and harmful contaminants from water.",
    short_description_ar:
      "نظام تنقية مياه بتقنية التناضح العكسي يتكون من 7 مراحل لتنقية المياه من الشوائب والرواسب والكلور والمواد الضارة.",
    full_description_en:
      "A multi-stage reverse osmosis filtration system designed to remove impurities, sediments, chlorine, and harmful contaminants from water while improving taste and quality. Suitable for household drinking water purification.",
    full_description_ar:
      "نظام تنقية مياه بتقنية التناضح العكسي يتكون من 7 مراحل لتنقية المياه من الشوائب والرواسب والكلور والمواد الضارة وتحسين جودة وطعم المياه. مناسب للاستخدام المنزلي.",
    warranty_en: "Manufacturer warranty",
    warranty_ar: "ضمان المصنع",
    features_en: [
      "7 stage filtration process",
      "Reverse osmosis membrane",
      "Sediment and carbon filtration",
      "Alkaline water enhancement",
      "Pressure gauge monitoring",
      "Durable filtration housings",
    ],
    features_ar: [
      "نظام تنقية من 7 مراحل",
      "غشاء تناضح عكسي RO",
      "فلاتر كربونية وإزالة الرواسب",
      "تحسين قلوية المياه",
      "مقياس ضغط للمراقبة",
      "هياكل فلتر متينة",
    ],
    specs_en: [],
    specs_ar: [],
    category: "filter",
    badge_en: "7-stage RO",
    badge_ar: "7 مراحل تنقية",
  },
  {
    id: "filter-ro-2yr",
    image: "/rofilter.webp",
    title_en: "RO Filter 2-Year Package",
    title_ar: "فلتر RO كفالة سنتين",
    subtitle_en: "Free Cartridge Replacement Every 3 Months",
    subtitle_ar: "تبديل الشمعات مجاناً كل 3 شهور",
    short_description_en:
      "RO water filter system with 2-year warranty and free cartridge replacement every 3 months.",
    short_description_ar:
      "فلتر RO مع كفالة سنتين وتبديل الشمعات مجاناً كل 3 شهور للحفاظ على أفضل أداء.",
    full_description_en:
      "High-efficiency reverse osmosis water filter with 2-year warranty. Includes free cartridge replacement every 3 months to maintain optimal water purification performance.",
    full_description_ar:
      "فلتر RO عالي الكفاءة مع كفالة سنتين. يشمل تبديل الشمعات مجاناً كل 3 شهور للحفاظ على أفضل أداء لتنقية المياه.",
    warranty_en: "2 Year Warranty – Free Cartridges Every 3 Months",
    warranty_ar: "كفالة سنتين – تبديل الشمعات مجاناً كل 3 شهور",
    features_en: [
      "2 year service coverage",
      "Free cartridge replacement every 3 months",
      "High filtration efficiency",
      "Removes dissolved salts and impurities",
      "Compatible with most RO systems",
    ],
    features_ar: [
      "خدمة لمدة سنتين",
      "تبديل الشمعات مجاناً كل 3 شهور",
      "كفاءة ترشيح عالية",
      "إزالة الأملاح الذائبة والشوائب",
      "متوافق مع معظم أنظمة RO",
    ],
    specs_en: [],
    specs_ar: [],
    category: "filter",
    badge_en: "2 Year Package",
    badge_ar: "باقة سنتين",
  },
  {
    id: "filter-limescale",
    image: "/calsi.webp",
    title_en: "Limescale Filter",
    title_ar: "فلتر الكلس",
    subtitle_en: "Anti-Scale Protection",
    subtitle_ar: "حماية من الكلس",
    short_description_en:
      "Compact anti-scale filter designed to prevent limescale buildup in water heaters, pipes, and household water systems.",
    short_description_ar:
      "فلتر مضاد للكلس مصمم لمنع تراكم الترسبات الكلسية في السخانات والأنابيب وأنظمة المياه المنزلية.",
    full_description_en:
      "A compact anti-scale filter designed to prevent limescale buildup in water heaters, pipes, and household water systems. Helps extend the life of plumbing equipment and improves system efficiency.",
    full_description_ar:
      "فلتر مضاد للكلس مصمم لمنع تراكم الترسبات الكلسية في السخانات والأنابيب وأنظمة المياه المنزلية مما يساعد على إطالة عمر المعدات وتحسين كفاءة النظام.",
    warranty_en: "Manufacturer warranty",
    warranty_ar: "ضمان المصنع",
    features_en: [
      "Prevents limescale buildup",
      "Protects water heaters and pipes",
      "Improves water system efficiency",
      "Durable housing",
      "Easy inline installation",
    ],
    features_ar: [
      "يمنع تراكم الكلس",
      "يحمي السخانات والأنابيب",
      "يحسن كفاءة نظام المياه",
      "هيكل معدني متين",
      "سهل التركيب على خط المياه",
    ],
    specs_en: [],
    specs_ar: [],
    category: "filter",
    badge_en: "Anti-scale",
    badge_ar: "حماية من الكلس",
  },
  {
    id: "filter-triple-jumbo",
    image: "/triplejumbog.webp",
    title_en: "Triple Jumbo Filter",
    title_ar: "فلتر تريبل جامبو",
    subtitle_en: "Heavy-Duty Triple Filtration",
    subtitle_ar: "نظام فلترة ثلاثي الجامبو",
    short_description_en:
      "Heavy-duty triple jumbo water filtration system designed to remove sediments, chlorine, and impurities from household water supplies.",
    short_description_ar:
      "نظام فلترة مياه ثلاثي الجامبو مصمم لتنقية المياه من الرواسب والكلور والشوائب مع الحفاظ على تدفق مياه قوي.",
    full_description_en:
      "A heavy-duty triple jumbo water filtration system designed to remove sediments, chlorine, and impurities from household water supplies while maintaining strong water flow. Suitable for homes and commercial use.",
    full_description_ar:
      "نظام فلترة مياه ثلاثي الجامبو مصمم لتنقية المياه من الرواسب والكلور والشوائب مع الحفاظ على تدفق مياه قوي للمنازل. مناسب للمنازل والاستخدام التجاري.",
    warranty_en: "Manufacturer warranty",
    warranty_ar: "ضمان المصنع",
    features_en: [
      "Triple jumbo filtration system",
      "High capacity water filtration",
      "Sediment and carbon filtration",
      "Pressure gauge monitoring",
      "Durable industrial filter housings",
      "Suitable for household and commercial use",
    ],
    features_ar: [
      "نظام فلترة ثلاثي الجامبو",
      "قدرة عالية لتنقية المياه",
      "إزالة الرواسب والكلور",
      "مقياس ضغط لمراقبة الأداء",
      "هياكل فلاتر قوية ومتينة",
      "مناسب للمنازل والاستخدام التجاري",
    ],
    specs_en: [],
    specs_ar: [],
    category: "filter",
    badge_en: "Triple jumbo",
    badge_ar: "فلترة ثلاثية الجامبو",
  },
  {
    id: "filter-triple-jumbo-3yr",
    image: "/triplejumboo.webp",
    title_en: "Triple Jumbo Filter – 3 Year Package",
    title_ar: "فلتر تريبل جامبو كفالة 3 سنوات",
    subtitle_en: "Free Cartridge Replacement Every 6 Months",
    subtitle_ar: "تبديل الشمعات كل 6 شهور مجاناً",
    short_description_en:
      "High-capacity triple jumbo water filter with 3-year service package and cartridge replacement every 6 months.",
    short_description_ar:
      "نظام فلترة مياه ثلاثي الجامبو عالي السعة مع باقة خدمة 3 سنوات وتبديل الشمعات كل 6 أشهر.",
    full_description_en:
      "A high-capacity triple jumbo water filtration system designed for household water purification. Includes a 3-year service package with filter cartridge replacement every 6 months.",
    full_description_ar:
      "نظام فلترة مياه ثلاثي الجامبو عالي السعة مصمم لتنقية مياه المنازل ويشمل باقة خدمة لمدة 3 سنوات مع تبديل الشمعات كل 6 أشهر.",
    warranty_en: "3 Year Warranty – Free Cartridges Every 6 Months",
    warranty_ar: "كفالة 3 سنوات – تبديل الشمعات كل 6 شهور مجاناً",
    features_en: [
      "Triple jumbo filtration system",
      "High water flow capacity",
      "Sediment and carbon filtration",
      "Pressure gauge monitoring",
      "Durable industrial filter housings",
      "Includes cartridge replacement every 6 months",
    ],
    features_ar: [
      "نظام فلترة ثلاثي الجامبو",
      "تدفق مياه عالي",
      "إزالة الرواسب والكلور",
      "مقياس ضغط لمراقبة الأداء",
      "هياكل فلاتر متينة",
      "تبديل الشمعات كل 6 أشهر",
    ],
    specs_en: [],
    specs_ar: [],
    category: "filter",
    badge_en: "3 Year Package",
    badge_ar: "باقة 3 سنوات",
  },
  {
    id: "filter-double-jumbo",
    image: "/doublejombo.webp",
    title_en: "Double Jumbo Filter – 3 Year Package",
    title_ar: "فلتر دبل جامبو كفالة 3 سنوات",
    subtitle_en: "Free Cartridge Replacement Every 7 Months",
    subtitle_ar: "تبديل الشمعات كل 7 شهور مجاناً",
    short_description_en:
      "Double jumbo water filter with 3-year warranty and free cartridge replacement every 7 months.",
    short_description_ar:
      "فلتر دبل جامبو مع كفالة 3 سنوات وتبديل الشمعات مجاناً كل 7 شهور.",
    full_description_en:
      "Double jumbo water filtration system with 3-year warranty. Includes free cartridge replacement every 7 months to maintain optimal filtration performance.",
    full_description_ar:
      "نظام فلترة دبل جامبو مع كفالة 3 سنوات. يشمل تبديل الشمعات مجاناً كل 7 شهور للحفاظ على أفضل أداء الفلترة.",
    warranty_en: "3 Year Warranty – Free Cartridges Every 7 Months",
    warranty_ar: "كفالة 3 سنوات – تبديل الشمعات كل 7 شهور مجاناً",
    features_en: [
      "Double jumbo filtration",
      "3 year service coverage",
      "Free cartridge replacement every 7 months",
      "High capacity filtration",
      "Suitable for household use",
    ],
    features_ar: [
      "فلترة دبل جامبو",
      "خدمة لمدة 3 سنوات",
      "تبديل الشمعات مجاناً كل 7 شهور",
      "قدرة فلترة عالية",
      "مناسب للاستخدام المنزلي",
    ],
    specs_en: [],
    specs_ar: [],
    category: "filter",
    badge_en: "3 Year Package",
    badge_ar: "باقة 3 سنوات",
  },
  // Heater systems (اوتوماتيك، سيستم امريكي، سيستم ايطالي)
  {
    id: "american-system",
    image: "/waterheater.webp",
    title_en: "American Heater System",
    title_ar: "سيستم أمريكي",
    subtitle_en: "American Central Heating System",
    subtitle_ar: "نظام تسخين مركزي أمريكي",
    short_description_en:
      "American-designed central water heating system for reliable hot water in villas and buildings.",
    short_description_ar:
      "نظام تسخين مياه مركزي بتصميم أمريكي لتوفير مياه ساخنة موثوقة للفلل والمباني.",
    full_description_en:
      "American-designed central water heating system engineered for reliable hot water supply in villas and residential buildings. Integrates with filtration and pump systems.",
    full_description_ar:
      "نظام تسخين مياه مركزي بتصميم أمريكي مصمم لتوفير مياه ساخنة موثوقة في الفلل والمباني السكنية. يتكامل مع أنظمة الفلترة والمضخات.",
    warranty_en: "Manufacturer warranty",
    warranty_ar: "ضمان المصنع",
    features_en: [
      "American design quality",
      "Central heating system",
      "Filtration compatible",
      "Suitable for villas and buildings",
    ],
    features_ar: [
      "جودة التصميم الأمريكي",
      "نظام تسخين مركزي",
      "متوافق مع الفلترة",
      "مناسب للفلل والمباني",
    ],
    specs_en: [],
    specs_ar: [],
    category: "heater-system",
    badge_en: "American system",
    badge_ar: "سيستم أمريكي",
  },
  {
    id: "american-system-mexico",
    image: "/waterheater.webp",
    title_en: "American Heater System (Mexican Assembly)",
    title_ar: "سيستم أمريكي تجميع مكسيكي",
    subtitle_en: "American System – Mexican Assembly",
    subtitle_ar: "نظام أمريكي بتجميع مكسيكي",
    short_description_en:
      "American-designed central heating system with Mexican assembly for quality and value.",
    short_description_ar:
      "نظام تسخين مركزي بتصميم أمريكي وتجميع مكسيكي للجودة والقيمة.",
    full_description_en:
      "American-designed central water heating system with Mexican assembly. Combines American design standards with cost-effective manufacturing for reliable hot water supply.",
    full_description_ar:
      "نظام تسخين مياه مركزي بتصميم أمريكي وتجميع مكسيكي. يجمع معايير التصميم الأمريكي مع التصنيع الفعال من حيث التكلفة لتوفير مياه ساخنة موثوقة.",
    warranty_en: "Manufacturer warranty",
    warranty_ar: "ضمان المصنع",
    features_en: [
      "American design, Mexican assembly",
      "Central heating system",
      "Cost-effective quality",
      "Suitable for residential and commercial",
    ],
    features_ar: [
      "تصميم أمريكي، تجميع مكسيكي",
      "نظام تسخين مركزي",
      "جودة فعالة من حيث التكلفة",
      "مناسب للسكني والتجاري",
    ],
    specs_en: [],
    specs_ar: [],
    category: "heater-system",
    badge_en: "Mexican assembly",
    badge_ar: "تجميع مكسيكي",
  },
  {
    id: "italian-system",
    image: "/waterheater.webp",
    title_en: "Italian Heater System",
    title_ar: "سيستم إيطالي",
    subtitle_en: "Italian Central Heating System",
    subtitle_ar: "نظام تسخين مركزي إيطالي",
    short_description_en:
      "Italian-designed central water heating system for reliable, continuous hot water in central systems.",
    short_description_ar:
      "نظام تسخين مياه مركزي بتصميم إيطالي لتوفير مياه ساخنة موثوقة ومتواصلة.",
    full_description_en:
      "Italian-designed central water heating system engineered for reliable, continuous hot water in central systems. Known for quality construction and stable performance.",
    full_description_ar:
      "نظام تسخين مياه مركزي بتصميم إيطالي مصمم لتوفير مياه ساخنة موثوقة ومتواصلة في الأنظمة المركزية. معروف بجودة البناء وأداء مستقر.",
    warranty_en: "Manufacturer warranty",
    warranty_ar: "ضمان المصنع",
    features_en: [
      "Italian design quality",
      "Central heating system",
      "Stable performance",
      "Suitable for central systems",
    ],
    features_ar: [
      "جودة التصميم الإيطالي",
      "نظام تسخين مركزي",
      "أداء مستقر",
      "مناسب للأنظمة المركزية",
    ],
    specs_en: [],
    specs_ar: [],
    category: "heater-system",
    badge_en: "Italian system",
    badge_ar: "سيستم إيطالي",
  },
  // Base network & pipes (from PlumbingAccessories)
  {
    id: "base-network-pipes",
    image: "/stand.webp",
    title_en: "Base Network & Pipes – 10 Year Warranty",
    title_ar: "شبكة القاعدة والبايبات كفالة 10 سنوات",
    subtitle_en: "Plumbing Base and Pipe Network",
    subtitle_ar: "شبكة قاعدة وأنابيب للسباكة",
    short_description_en:
      "High-quality base network and pipes for plumbing and heater systems with 10-year warranty.",
    short_description_ar:
      "شبكة قاعدة وأنابيب عالية الجودة لأنظمة السباكة والسخانات مع كفالة 10 سنوات.",
    full_description_en:
      "Durable base network and pipe system for plumbing and water heater installations. 10-year warranty ensures long-term reliability and quality for residential and commercial applications.",
    full_description_ar:
      "شبكة قاعدة وأنابيب متينة لتركيبات السباكة والسخانات. كفالة 10 سنوات تضمن الاعتمادية والجودة على المدى الطويل للتطبيقات السكنية والتجارية.",
    warranty_en: "10 Year Warranty",
    warranty_ar: "كفالة 10 سنوات",
    features_en: [
      "10 year warranty",
      "Durable base and pipe network",
      "Suitable for plumbing and heater systems",
      "High quality construction",
    ],
    features_ar: [
      "كفالة 10 سنوات",
      "شبكة قاعدة وأنابيب متينة",
      "مناسب لأنظمة السباكة والسخانات",
      "جودة بناء عالية",
    ],
    specs_en: [],
    specs_ar: [],
    category: "accessory",
    badge_en: "10 Year Warranty",
    badge_ar: "كفالة 10 سنوات",
  },
];

