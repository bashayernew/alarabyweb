# Production Schema Fix: completedById Columns

## Root Cause

The Prisma schema defines `completedById`, `completedByName`, and `completedAt` on:
- `ProductOrder`
- `ServiceRequest`
- `MaintenanceOrder`
- `OfferRequest`

These columns are used by the admin dashboard when marking orders/requests as completed. They are **optional** (nullable) and are **not** sent during public order creation.

**The production database was created with an older schema** and does not have these columns. Vercel's build runs `prisma generate` but **not** `prisma db push`, so the DB was never synced.

When Prisma inserts a new row, it expects all schema columns to exist. The INSERT fails because the DB lacks `completedById`, etc.

## Fix: Sync Production Database

### Option A: prisma db push (recommended)

Run against your production database:

```bash
DATABASE_URL="your-production-postgres-url" npx prisma db push
```

This adds all missing columns. Safe and idempotent.

### Option B: Manual SQL

If you cannot run `prisma db push` (e.g. no direct DB access), run the SQL in `prisma/migrations/add_completed_by_columns.sql` against your production DB via your provider's SQL console (Neon, Supabase, etc.):

```sql
-- ProductOrder
ALTER TABLE "ProductOrder" ADD COLUMN IF NOT EXISTS "completedById" TEXT;
ALTER TABLE "ProductOrder" ADD COLUMN IF NOT EXISTS "completedByName" TEXT;
ALTER TABLE "ProductOrder" ADD COLUMN IF NOT EXISTS "completedAt" TIMESTAMP(3);

-- ServiceRequest
ALTER TABLE "ServiceRequest" ADD COLUMN IF NOT EXISTS "completedById" TEXT;
ALTER TABLE "ServiceRequest" ADD COLUMN IF NOT EXISTS "completedByName" TEXT;
ALTER TABLE "ServiceRequest" ADD COLUMN IF NOT EXISTS "completedAt" TIMESTAMP(3);

-- OfferRequest
ALTER TABLE "OfferRequest" ADD COLUMN IF NOT EXISTS "completedById" TEXT;
ALTER TABLE "OfferRequest" ADD COLUMN IF NOT EXISTS "completedByName" TEXT;
ALTER TABLE "OfferRequest" ADD COLUMN IF NOT EXISTS "completedAt" TIMESTAMP(3);

-- MaintenanceOrder
ALTER TABLE "MaintenanceOrder" ADD COLUMN IF NOT EXISTS "completedById" TEXT;
ALTER TABLE "MaintenanceOrder" ADD COLUMN IF NOT EXISTS "completedByName" TEXT;
ALTER TABLE "MaintenanceOrder" ADD COLUMN IF NOT EXISTS "completedAt" TIMESTAMP(3);
```

## After Running the Fix

- No code changes needed
- No redeploy needed (schema fix is DB-only)
- Product orders, service requests, maintenance orders, and offer requests will work immediately

## Verification

1. Run the fix
2. Submit a product order from the public site
3. It should succeed
