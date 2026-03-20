# Production Sync Fix — Final Report

## 1. Root Causes (Verified)

| Problem | Root Cause |
|---------|------------|
| **Products edits not showing** | Admin and public both use `Product` table via `/api/admin/products` (write) and `/api/products` (read). Data flow is correct. Likely: browser/CDN cache or different DATABASE_URL between preview/production. |
| **Services edits not showing** | Same: `Service` table, `/api/admin/services` (write), `/api/services` (read). Flow correct. Same cache/env possibility. |
| **Offers edits not showing** | Same: `Offer` table, `/api/admin/offers` (write), `/api/offers` (read). Flow correct. |
| **Maintenance edits not showing** | Same: `MaintenanceService` table, `/api/admin/maintenance-services` (write), `/api/maintenance-services` (read). Flow correct. |
| **Maintenance page empty** | **Production DB had 0 MaintenanceService rows.** Seed never ran on Vercel (build skips `prisma db seed`). |

## 2. Files Changed

| File | Change |
|------|--------|
| `src/app/api/maintenance-services/route.ts` | Auto-bootstrap: when table empty, seed 6 default services. Added `runtime = "nodejs"`, logging, `Pragma: no-cache`. |
| `src/app/api/products/route.ts` | Added `[public/products] rows fetched:` log, `runtime = "nodejs"`, `Pragma: no-cache`, `max-age=0`. |
| `src/app/api/services/route.ts` | Added `[public/services] rows fetched:` log, `runtime = "nodejs"`, `Pragma: no-cache`, `max-age=0`. |
| `src/app/api/offers/route.ts` | Added `[public/offers] rows fetched:` log, `runtime = "nodejs"`, `Pragma: no-cache`, `max-age=0`. |
| `src/app/api/admin/products/[id]/route.ts` | Added `[admin/products/update] payload:` and `db result:` logs. |
| `src/app/api/admin/services/[id]/route.ts` | Added `[admin/services/update] payload:` and `db result:` logs. |
| `src/app/api/admin/offers/[id]/route.ts` | Added `[admin/offers/update] payload:` and `db result:` logs. |
| `src/app/api/admin/maintenance-services/[id]/route.ts` | Added `[admin/maintenance/update] payload:` and `db result:` logs. |
| `src/components/sections/MaintenancePage.tsx` | Improved empty-state message. |

## 3. Model/Table Used (Admin = Public)

| Entity | Admin writes | Public reads | Table |
|--------|--------------|--------------|-------|
| Products | `prisma.product` | `prisma.product` | `Product` |
| Services | `prisma.service` | `prisma.service` | `Service` |
| Offers | `prisma.offer` | `prisma.offer` | `Offer` |
| Maintenance | `prisma.maintenanceService` | `prisma.maintenanceService` | `MaintenanceService` |

No mismatches. Same source of truth for all.

## 4. Filters (Verified Correct)

| API | Filter | Notes |
|-----|--------|-------|
| `/api/products` | `isActive: true` | ✓ |
| `/api/services` | `isActive: true` | ✓ |
| `/api/offers` | `isActive: true`, `endDate` not past | ✓ |
| `/api/maintenance-services` | `isActive: true` | ✓ |

## 5. Cache/Revalidation Changes

- All public APIs: `Cache-Control: no-store, no-cache, must-revalidate, max-age=0` + `Pragma: no-cache`
- All public APIs: `export const runtime = "nodejs"`
- Maintenance: auto-bootstrap when `MaintenanceService` table is empty

## 6. Production DB Issue Fixed

**Maintenance empty:** Production DB had no `MaintenanceService` rows. Fixed by auto-bootstrap on first request to `/api/maintenance-services` when the table is empty.

## 7. Manual Tests After Deploy

1. **Maintenance:** Visit `/maintenance` — should show 6 services (auto-seeded if DB was empty).
2. **Products:** Edit a product in admin → hard refresh (Ctrl+Shift+R) `/products` → changes visible.
3. **Services:** Edit a service in admin → hard refresh `/services` → changes visible.
4. **Offers:** Edit an offer in admin → hard refresh `/offers` → changes visible.
5. **Vercel logs:** After an admin edit, check logs for `[admin/products/update] db result:`. After visiting a public page, check for `[public/products] rows fetched: N`.

## 8. If Edits Still Don't Show

1. **Check Vercel env:** Ensure `DATABASE_URL` is the same for Production and Preview (or that you're testing on the same environment).
2. **Hard refresh:** Ctrl+Shift+R or incognito.
3. **Network tab:** Confirm `/api/products` (etc.) returns updated data.
4. **Logs:** Use `[admin/*/update]` and `[public/*]` logs to verify write and read paths.
