-- Fix schema drift: add completedById, completedByName, completedAt to order/request tables
-- Run this against production if prisma db push is not an option.
-- PostgreSQL 9.6+ supports IF NOT EXISTS for ADD COLUMN.

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
