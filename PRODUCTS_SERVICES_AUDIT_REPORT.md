# Products & Services Audit Report

**Date:** March 15, 2025  
**Scope:** Full comparison of website content vs reference list (from user-provided items)  
**Status:** Audit only — no changes implemented

---

## 1. Current Website Products List

### From `src/content/products.ts` (catalogProducts) — used by Products page & Admin

| ID | Arabic Title | English Title | Category |
|----|--------------|---------------|----------|
| therapy-shower-filter | فلتر شاور تيرابي | Therapy Shower Filter | accessory |
| water-booster-pump | مضخة تقوية المياه | Water Booster Pump | pump |
| smart-return-pump | مضخة الراجع الذكية | Smart Return Pump | pump |
| water-pressure-pump | مضخة دفع المياه | Water Pressure Pump | pump |
| water-circulation-pump | مضخة الراجع | Water Circulation Pump | pump |
| submersible-pump-control | مضخة غاطسة مع جهاز الكنترول | Submersible Pump with Control | pump |
| submersible-pump-alarm | مضخة غاطسة مع جهاز إنذار | Submersible Pump with Alarm | pump |
| brass-check-valve | رداد نحاسي | Brass Check Valve | check-valve |
| safety-valve | سيفتي بلف | Safety Valve | valve |
| water-heater-thermostat | ترموستات سخان | Water Heater Thermostat | thermostat |
| tank-1000 | تانكي مياه 1000 جالون | 1000 Gallon Water Tank | tank |
| tank-1200 | تانكي مياه 1200 جالون | 1200 Gallon Water Tank | tank |
| american-80-mexico | سخان 80 جالون أمريكي تجميع مكسيكي | American 80 Gallon (Mexican Assembly) | heater |
| american-80 | سخان 80 جالون أمريكي | American 80 Gallon Water Heater | heater |
| italian-80 | سخان 80 جالون إيطالي | Italian 80 Gallon Water Heater | heater |
| water-cooling-device | جهاز تبريد المائي | Water Cooling Unit | cooling |
| dynamo-cooling-system | جهاز تبريد نظام دينمو المائي | Dynamo Water Cooling System | cooling |
| saudi-dynamo-cooling-system | جهاز تبريد نظام دينمو سعودي | Saudi Dynamo Cooling System | cooling |
| float-switch | عوامة كهربائية | Electrical Float Switch | accessory |
| heater-element | شمعة سخان | Heater Element | heater-parts |

### From dedicated section components (NOT in catalogProducts — not on Products page)

| Section Component | Arabic Title | Notes |
|-------------------|--------------|-------|
| RoFilters | شمعة فلتر RO | RO filter cartridges — component only |
| RoSevenStageSystem | فلتر مياه 7 مراحل | 7-stage RO system — component only |
| TripleJumboFilter | فلتر تريبل جاليو | Different spelling: جاليو vs جامبو |
| TripleJumbo3Year | فلتر تريبل جاليو – 3 سنوات | Same spelling issue |
| LimescaleFilter | فلتر الكلس | Limescale filter — component only |
| WaterPumps | مضخة الدفع ذاتية كفالة سنتين | Single hardcoded pump card |
| PlumbingAccessories | قاعدة كفاله 4 سنوات، قاعدة كفاله 10 سنوات، كنترول مضخة، وصلة تطويل | 4 items — component only |

**Note:** The homepage (`page.tsx`) does **not** render WaterPumps, WaterTankCooling, RoFilters, RoSevenStageSystem, TripleJumboFilter, TripleJumbo3Year, WaterHeaterParts, LimescaleFilter, PlumbingAccessories, or WaterTankAccessories. These components are imported but not used in the main content. Only WaterTanks and WaterHeaterSystems are rendered.

---

## 2. Current Website Services List

### From `src/content/services.ts` (servicesCatalog)

| ID | Arabic Title | English Title | Category |
|----|--------------|---------------|----------|
| installation-maintenance | التركيب والصيانة | Installation & Maintenance | installation |
| integrated-solutions | الحلول المتكاملة | Integrated Water System Solutions | water-system |
| central-heaters-service | خدمات السخانات المركزية | Central Heater Services | heater |
| pumps-tanks-service | خدمات المضخات والخزانات | Pumps & Tanks Services | pump |
| water-filters-service | خدمات فلاتر المياه | Water Filter Services | water-system |
| after-sales | خدمة ما بعد البيع | After-Sales Support | maintenance |
| water-heater-repair | تصليح سخان | Water Heater Repair | repair |
| maintenance-services | خدمات الصيانة | Maintenance Services | maintenance |

---

## 3. Extracted Reference List from Images (User-Provided)

### A) Cooling / Water Cooling
| Arabic | Suggested English |
|--------|-------------------|
| جهاز تبريد المائي | Water Cooling Unit |
| جهاز تبريد نظام دينمو المائي | Dynamo Water Cooling System |
| جهاز تبريد نظام دينمو سعودي | Saudi Dynamo Cooling System |

### B) 80 Gallon Heaters
| Arabic | Suggested English |
|--------|-------------------|
| سخان 80 جالون امريكي تجميع مكسيكي كفالة 6 سنوات شامل | American 80 Gallon (Mexican Assembly) 6yr warranty |
| سخان 80 جالون امريكي كفالة 6 سنوات شامل | American 80 Gallon 6yr warranty |
| سخان 80 جالون ايطالي كفالة 6 سنوات شامل | Italian 80 Gallon 6yr warranty |

### C) Systems / Automatic / Heater Systems
| Arabic | Suggested English |
|--------|-------------------|
| اوتوماتيك | Automatic System |
| سيستم امريكي | American System |
| سيستم امريكي تجميع مكسيكي | American System (Mexican Assembly) |
| سيستم ايطالي | Italian System |

### D) Filters
| Arabic | Suggested English |
|--------|-------------------|
| فلتر 7 مراحل | 7-Stage Filter |
| فلتر RO كفالة سنتين كل 3 شهور تبديل الشمعات مجانا | RO Filter 2yr warranty, free cartridges every 3 months |
| فلتر الكلس | Limescale Filter |
| فلتر تريبل جامبو | Triple Jumbo Filter |
| فلتر تريبل جامبو كفالة 3 سنوات تبديل الشمعات كل 6 شهور مجانا | Triple Jumbo 3yr warranty, free cartridges every 6 months |
| فلتر دبل جامبو كفالة 3 سنوات كل 7 شهور تبديل الشمعات مجانا | Double Jumbo 3yr warranty, free cartridges every 7 months |
| فلتر نحاسي كفالة سنتين | Copper Filter 2yr warranty |

### E) Pressure / Pumps
| Arabic | Suggested English |
|--------|-------------------|
| مخفض ضغط | Pressure Reducer |
| مضخة الدفع ذكية كفالة سنتين على التبديل | Smart Booster Pump 2yr warranty |
| مضخة الدفع كفالة سنتين على التبديل | Booster Pump 2yr warranty |
| مضخة الراجع ذكية كفالة سنتين على التبديل | Smart Return Pump 2yr warranty |
| مضخة الراجع كفالة سنتين على التبديل | Return Pump 2yr warranty |
| مضخة جورة كفالة سنتين على التبديل + جهاز الكنترول | Submersible Pump 2yr + Control Device |
| مضخة جورة كفالة سنتين على التبديل + جهاز انذار | Submersible Pump 2yr + Alarm Device |
| مضخة دفع اسباني | Spanish Booster Pump |

### F) Services / Spare Parts / Maintenance
| Arabic | Suggested English |
|--------|-------------------|
| ترمستات | Thermostat |
| تصليح سخان | Water Heater Repair |
| ردادات | Check Valves |
| سيفتي بلف | Safety Valve |
| شاور نكهات | Shower Filter |
| شبكة القاعدة و البايبات كفالة 10 سنوات | Base Network & Pipes 10yr warranty |

---

## 4. Comparison Table

| Arabic (Reference) | Suggested EN | Type | Exists on Website? | In catalogProducts? | Current Section | Suggested Section | Notes |
|--------------------|---------------|------|--------------------|---------------------|-----------------|-------------------|-------|
| جهاز تبريد المائي | Water Cooling Unit | Product | Yes | Yes | cooling | أنظمة التبريد | OK |
| جهاز تبريد نظام دينمو المائي | Dynamo Water Cooling | Product | Yes | Yes | cooling | أنظمة التبريد | OK |
| جهاز تبريد نظام دينمو سعودي | Saudi Dynamo Cooling | Product | Yes | Yes | cooling | أنظمة التبريد | OK |
| سخان 80 جالون امريكي تجميع مكسيكي | American 80 (Mexican) | Product | Yes | Yes | heater | سخانات المياه | OK |
| سخان 80 جالون امريكي | American 80 Gallon | Product | Yes | Yes | heater | سخانات المياه | OK |
| سخان 80 جالون ايطالي | Italian 80 Gallon | Product | Yes | Yes | heater | سخانات المياه | OK |
| اوتوماتيك | Automatic System | System | **No** | No | — | أنظمة أوتوماتيك | **Missing** |
| سيستم امريكي | American System | System | **No** | No | — | أنظمة سخانات | **Missing** |
| سيستم امريكي تجميع مكسيكي | American System (Mexican) | System | **No** | No | — | أنظمة سخانات | **Missing** |
| سيستم ايطالي | Italian System | System | **No** | No | — | أنظمة سخانات | **Missing** |
| فلتر 7 مراحل | 7-Stage Filter | Product | Partial | No | Section only | الفلاتر | In RoSevenStageSystem, not in catalog |
| فلتر RO (كفالة سنتين...) | RO Filter | Product | Partial | No | RoFilters (cartridges) | الفلاتر | Only cartridges; full RO system not in catalog |
| فلتر الكلس | Limescale Filter | Product | Partial | No | Section only | الفلاتر | In LimescaleFilter, not in catalog |
| فلتر تريبل جامبو | Triple Jumbo Filter | Product | Partial | No | Section only | الفلاتر | Wrong spelling: جاليو vs جامبو |
| فلتر تريبل جامبو 3 سنوات | Triple Jumbo 3yr | Product | Partial | No | Section only | الفلاتر | Same spelling issue |
| فلتر دبل جامبو | Double Jumbo Filter | Product | **No** | No | — | الفلاتر | **Missing** — only maintenance contract exists |
| فلتر نحاسي كفالة سنتين | Copper Filter 2yr | Product | **No** | No | — | الفلاتر | **Missing** |
| مخفض ضغط | Pressure Reducer | Product | **No** | No | — | المضخات وملحقات الضغط | **Missing** |
| مضخة الدفع ذكية | Smart Booster Pump | Product | Partial | Yes | pump | المضخات | water-pressure-pump may match; verify naming |
| مضخة الدفع | Booster Pump | Product | Yes | Yes | pump | المضخات | water-booster-pump |
| مضخة الراجع ذكية | Smart Return Pump | Product | Yes | Yes | pump | المضخات | OK |
| مضخة الراجع | Return Pump | Product | Yes | Yes | pump | المضخات | water-circulation-pump |
| مضخة جورة + كنترول | Submersible + Control | Product | Yes | Yes | pump | المضخات | OK |
| مضخة جورة + انذار | Submersible + Alarm | Product | Yes | Yes | pump | المضخات | OK |
| مضخة دفع اسباني | Spanish Booster Pump | Product | **No** | No | — | المضخات | **Missing** |
| ترمستات | Thermostat | Accessory | Yes | Yes | thermostat | قطع الغيار | OK |
| تصليح سخان | Heater Repair | Service | Yes | Yes | repair | خدمات الصيانة | OK |
| ردادات | Check Valves | Product | Partial | Yes | check-valve | قطع الغيار | Only brass; "ردادات" is plural/generic |
| سيفتي بلف | Safety Valve | Product | Yes | Yes | valve | قطع الغيار | OK |
| شاور نكهات | Shower Filter | Product | Yes | Yes | accessory | قطع الغيار | therapy-shower-filter subtitle |
| شبكة القاعدة والبايبات 10 سنوات | Base Network & Pipes | Product | Partial | No | PlumbingAccessories | قطع الغيار | "قاعدة كفاله 10 سنوات" — partial; "شبكة" not explicit |
| تانكي 1000/1200 جالون | Water Tanks | Product | Yes | Yes | tank | خزانات المياه | OK — not in reference but on site |

---

## 5. Missing Items List

### Products (not on website at all)
1. **اوتوماتيك** — Automatic system
2. **سيستم امريكي** — American heater system
3. **سيستم امريكي تجميع مكسيكي** — American system (Mexican assembly)
4. **سيستم ايطالي** — Italian heater system
5. **فلتر دبل جامبو** — Double Jumbo filter (3yr warranty, cartridges every 7 months)
6. **فلتر نحاسي** — Copper filter (2yr warranty)
7. **مخفض ضغط** — Pressure reducer
8. **مضخة دفع اسباني** — Spanish booster pump

### Products in sections but NOT in catalog (not on Products page)
- فلتر 7 مراحل
- فلتر RO (full system)
- فلتر الكلس
- فلتر تريبل جامبو / تريبل جامبو 3 سنوات
- قاعدة كفالة 10 سنوات (as "شبكة القاعدة والبايبات")

---

## 6. Wrong Category / Naming Issues

| Issue | Current | Should Be |
|-------|---------|-----------|
| Spelling | فلتر تريبل **جاليو** | فلتر تريبل **جامبو** |
| Filter products not in catalog | Filters only in section components | Add to catalogProducts so they appear on Products page |
| "شبكة القاعدة والبايبات" | PlumbingAccessories has "قاعدة كفاله 10 سنوات" | Rename/expand to match reference "شبكة القاعدة والبايبات كفالة 10 سنوات" |
| Smart vs regular pumps | water-pressure-pump = "مضخة دفع المياه" (ضغط أوتوماتيكية) | Reference distinguishes "مضخة الدفع ذكية" vs "مضخة الدفع" — verify mapping |
| Homepage sections | WaterPumps, RoFilters, etc. imported but NOT rendered | Either add to page or remove dead imports |

---

## 7. Recommended Final Category Structure

Based on the reference list and current content, suggested structure:

| Category (Arabic) | Category (English) | Items to Include |
|------------------|--------------------|------------------|
| سخانات المياه | Water Heaters | 80 gallon American, American (Mexican), Italian |
| أنظمة سخانات المياه | Heater Systems | اوتوماتيك، سيستم امريكي، سيستم امريكي تجميع مكسيكي، سيستم ايطالي |
| أنظمة التبريد | Cooling Systems | جهاز تبريد المائي، جهاز تبريد نظام دينمو المائي، جهاز تبريد نظام دينمو سعودي |
| الفلاتر | Filters | فلتر 7 مراحل، فلتر RO، فلتر الكلس، فلتر تريبل جامبو، فلتر تريبل جامبو 3 سنوات، فلتر دبل جامبو، فلتر نحاسي |
| المضخات وملحقات الضغط | Pumps & Pressure | مضخة الدفع، مضخة الدفع ذكية، مضخة الراجع، مضخة الراجع ذكية، مضخة جورة + كنترول، مضخة جورة + انذار، مضخة دفع اسباني، مخفض ضغط |
| خزانات المياه | Water Tanks | تانكي 1000، تانكي 1200 |
| قطع الغيار والملحقات | Spare Parts & Accessories | ترموستات، ردادات، سيفتي بلف، شاور نكهات، شبكة القاعدة والبايبات، عوامة، شمعة سخان |
| خدمات الصيانة | Maintenance Services | تصليح سخان، التركيب والصيانة، خدمات السخانات، خدمات المضخات، خدمات الفلاتر، ما بعد البيع |

---

## 8. Clear Next-Step Suggestion for Implementation

**Phase 1 — Fix existing content**
1. Rename فلتر تريبل جاليو → فلتر تريبل جامبو in TripleJumboFilter and TripleJumbo3Year.
2. Update PlumbingAccessories "قاعدة كفاله 10 سنوات" to "شبكة القاعدة والبايبات كفالة 10 سنوات" if it matches the product.
3. Fix homepage: either render WaterPumps, RoFilters, RoSevenStageSystem, TripleJumboFilter, TripleJumbo3Year, LimescaleFilter, WaterHeaterParts, PlumbingAccessories, WaterTankCooling, WaterTankAccessories, or remove unused imports.

**Phase 2 — Add missing products to catalog**
1. Add to `catalogProducts`: فلتر 7 مراحل، فلتر RO، فلتر الكلس، فلتر تريبل جامبو، فلتر تريبل جامبو 3 سنوات، فلتر دبل جامبو، فلتر نحاسي.
2. Add: مخفض ضغط، مضخة دفع اسباني.
3. Add systems: اوتوماتيك، سيستم امريكي، سيستم امريكي تجميع مكسيكي، سيستم ايطالي (clarify with business if these are separate products or variants).

**Phase 3 — Structure**
1. Introduce category slugs that match the recommended structure (e.g. `heater`, `heater-system`, `cooling`, `filter`, `pump`, `tank`, `accessory`, `service`).
2. Update Products page filtering/grouping by these categories.
3. Run `npx prisma db seed` after catalog changes to sync admin dashboard.

**Phase 4 — Verification**
1. Compare each catalog product against reference images again.
2. Confirm with business which "سيستم" items are distinct products vs. package names.

---

*End of audit report. No changes have been made to the codebase.*
