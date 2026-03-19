# Live Sync Fix: Admin Dashboard ↔ Public Website

## Problem
When editing Products, Services, Maintenance Services, or Offers in the admin dashboard, changes saved correctly but the public website did not update—it showed stale/cached data.

## Root Causes Identified

### 1. **Static fallback content (WaterHeaterSystems, WaterTanks, WaterTankCooling)**
- These sections used **hardcoded slug arrays** (`HEATER_SLUGS`, `TANK_SLUGS`, `COOLING_SLUGS`) and **fallback to `translations.ts`** when API data didn't match
- Result: Even when DB was updated, sections could show static translation content instead of API data
- Products were filtered by fixed slugs, not by category—new products in admin never appeared

### 2. **generateStaticParams on product detail page**
- `/products/[slug]` used `generateStaticParams` to pre-render product pages at build time
- New products added in admin had no pre-built page; edits to existing products could show cached static HTML
- Removed to ensure all product pages render dynamically on demand

### 3. **Caching layers**
- Public APIs needed explicit `Cache-Control: no-store` and `dynamic = "force-dynamic"`
- Client fetches needed `cache: "no-store"` to avoid browser cache
- Product detail API `/api/products/[id]` lacked Cache-Control (now added)

## Files Changed

### Pages & routing
| File | Change |
|------|--------|
| `src/app/products/[slug]/page.tsx` | Removed `generateStaticParams` so product pages are always dynamic |
| `src/app/page.tsx` | Already had `dynamic`, `revalidate = 0` ✓ |
| `src/app/products/page.tsx` | Already had `dynamic`, `revalidate = 0` ✓ |
| `src/app/services/page.tsx` | Already had `dynamic`, `revalidate = 0` ✓ |
| `src/app/maintenance/page.tsx` | Already had `dynamic`, `revalidate = 0` ✓ |
| `src/app/offers/page.tsx` | Already had `dynamic`, `revalidate = 0` ✓ |

### Public APIs
| File | Change |
|------|--------|
| `src/app/api/products/route.ts` | Already had `dynamic`, `revalidate = 0`, `Cache-Control` ✓ |
| `src/app/api/products/[id]/route.ts` | Added `dynamic`, `revalidate = 0`, `Cache-Control` |
| `src/app/api/services/route.ts` | Already had `dynamic`, `revalidate = 0`, `Cache-Control` ✓ |
| `src/app/api/maintenance-services/route.ts` | Already had `dynamic`, `revalidate = 0`, `Cache-Control` ✓ |
| `src/app/api/offers/route.ts` | Already had `dynamic`, `revalidate = 0`, `Cache-Control` ✓ |

### Components – removed static fallback, use API only
| File | Change |
|------|--------|
| `src/components/sections/WaterHeaterSystems.tsx` | Filter by category `heater`/`heater-system` from API; removed `translations.heaterSystems.products` fallback |
| `src/components/sections/WaterTanks.tsx` | Filter by category `tank` from API; removed `translations.tanks.items` fallback |
| `src/components/sections/WaterTankCooling.tsx` | Filter by category `cooling` from API; removed `translations.coolingSystems.products` fallback |

### Client fetches – cache busting
All public data fetches use `cache: "no-store"` **and** `?t=${Date.now()}` to force fresh data on every page load:
- Hero, HomeProductsPreview, Products, WaterHeaterSystems, WaterTanks, WaterTankCooling
- HomeServicesPreview, ServicesCatalog
- MaintenancePage
- Offers, OffersCatalog

The `?t=${Date.now()}` query param ensures each page load gets a unique URL, bypassing any CDN or browser cache.

### Admin APIs – revalidation (already in place)
All admin create/update/delete routes call `revalidatePath`:
- **Products:** `revalidatePath("/")`, `revalidatePath("/products")`, `revalidatePath("/products/[slug]")`
- **Services:** `revalidatePath("/")`, `revalidatePath("/services")`
- **Maintenance Services:** `revalidatePath("/")`, `revalidatePath("/maintenance")`
- **Offers:** `revalidatePath("/")`, `revalidatePath("/offers")`

## Data Flow (After Fix)

```
Admin edit → API mutation → revalidatePath(...) → Next.js cache invalidated
                                    ↓
User visits public page → dynamic render → client fetch (cache: "no-store")
                                    ↓
                    API (Cache-Control: no-store) → fresh DB query → fresh data
```

## Verification Checklist

- [x] Edit product in admin → public site shows updated product (homepage, /products, /products/[slug])
- [x] Edit service in admin → public site shows updated service (/services, homepage preview)
- [x] Edit maintenance service in admin → public site shows updated item (/maintenance)
- [x] Edit offer in admin → public site shows updated offer (/offers, homepage)
- [x] Delete items → public site removes them
- [x] Create items → public site shows them
- [x] WaterHeaterSystems, WaterTanks, WaterTankCooling show DB products by category (no static fallback)

## Maintenance Page Empty in Production

If the Maintenance page shows "No maintenance services available" in production:

1. **Production DB has no MaintenanceService rows** — Vercel build does not run `prisma db seed`.
2. **Fix:** Call the init-seed endpoint with `maintenance=1`:
   ```
   GET /api/admin/init-seed?secret=YOUR_INIT_SECRET&maintenance=1
   ```
   This seeds 6 default maintenance services only when the table is empty.

## Redeploy

**Yes, a redeploy is required** after these code changes. Once deployed:

- No further redeploys needed for content edits
- Admin edits appear on the public site after a normal refresh (F5 or navigate away and back)
- On Vercel, a hard refresh (Ctrl+Shift+R) may help the first time after deploy
- If Maintenance is empty: run init-seed with `&maintenance=1` once

## Category Mapping (Products)

| Section | Categories |
|---------|------------|
| WaterHeaterSystems | `heater`, `heater-system` |
| WaterTanks | `tank` |
| WaterTankCooling | `cooling` |

Ensure products in admin use these categories so they appear in the correct homepage sections.
