# Content Sync: Admin ↔ Public Website (Production)

## Data Flow (Source of Truth: Database)

| Entity | Admin writes to | Public reads from | API |
|--------|-----------------|-------------------|-----|
| Products | `Product` table | `/api/products` | `src/app/api/products/route.ts` |
| Services | `Service` table | `/api/services` | `src/app/api/services/route.ts` |
| Offers | `Offer` table | `/api/offers` | `src/app/api/offers/route.ts` |
| Maintenance | `MaintenanceService` table | `/api/maintenance-services` | `src/app/api/maintenance-services/route.ts` |

All public pages use **client-side fetch** with:
- `cache: "no-store"`
- `?t=${Date.now()}` (cache busting)

All public APIs use:
- `export const dynamic = "force-dynamic"`
- `export const revalidate = 0`
- `Cache-Control: no-store, no-cache, must-revalidate`

## Revalidation (Admin Mutations)

When admin creates/updates/deletes, `revalidatePath` is called:

| Entity | Paths revalidated |
|--------|-------------------|
| Products | `/`, `/products`, `/products/[slug]` |
| Services | `/`, `/services` |
| Offers | `/`, `/offers` |
| Maintenance | `/`, `/maintenance` |

## Why Admin Edits May Not Appear

1. **Browser cache** — Hard refresh (Ctrl+Shift+R) or incognito
2. **CDN cache** — Vercel edge may cache; `?t=Date.now()` bypasses URL cache
3. **Production DB not updated** — Verify admin save succeeds (check Network tab)
4. **Schema mismatch** — Run `prisma db push` against production

## Maintenance Page Empty

**Cause:** Production DB has no `MaintenanceService` rows. Vercel build does not run seed.

**Fix:** Call once after deploy:
```
GET https://your-site.vercel.app/api/admin/init-seed?secret=YOUR_INIT_SECRET&maintenance=1
```

Requires `INIT_SECRET` in Vercel env vars. Seeds 6 default services only when table is empty.

## Vercel Build

- `prisma generate` — generates client
- `prisma db push` — syncs schema to production DB
- `next build` — builds app

**Note:** `prisma db seed` is NOT run during build (would overwrite admin edits). Seed products/services/maintenance/offers manually or via init-seed.
