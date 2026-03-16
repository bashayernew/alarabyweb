# Vercel Deployment Guide

## ⚠️ Important: Database

**Vercel does not support SQLite.** The serverless environment has a read-only filesystem, so your local `file:./dev.db` will not work.

You must use a **hosted database** before deploying:

### Option A: Neon (PostgreSQL) – Recommended

1. Sign up at [neon.tech](https://neon.tech) (free tier)
2. Create a new project and copy the connection string
3. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. In Vercel → Project → Settings → Environment Variables, add:
   - `DATABASE_URL` = your Neon connection string

### Option B: Vercel Postgres

1. In your Vercel project, go to Storage → Create Database → Postgres
2. Connect it to your project
3. Update `prisma/schema.prisma` as in Option A
4. `DATABASE_URL` is auto-injected by Vercel

### Option C: Turso (SQLite-compatible)

1. Sign up at [turso.tech](https://turso.tech)
2. Create a database and get the libSQL URL
3. Use Prisma’s Turso adapter (see [Prisma + Turso docs](https://prisma.io/docs/orm/overview/databases/turso))

---

## Environment Variables (Vercel)

Add these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | Used By | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | Prisma, all API routes | Neon/Vercel Postgres connection string |
| `NEXTAUTH_URL` | Yes | NextAuth | Production URL, e.g. `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Yes | NextAuth | Random 32+ char string. Run: `openssl rand -base64 32` |
| `NEXT_PUBLIC_BASE_URL` | No | products/[slug] server fetch | Falls back to `VERCEL_URL` if unset |

---

## File Uploads on Vercel

The admin dashboard upload routes (`/api/admin/upload`, `/api/admin/offers/upload`) write to the filesystem. **On Vercel, the filesystem is read-only**, so uploads will return 503 in production. To enable uploads:

1. Add [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
2. Update the upload routes to use `@vercel/blob` instead of `writeFile`

Until then, use pre-committed images in `public/uploads/` (already in the repo).

---

## Deploy Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) → New Project
   - Import your GitHub repo
   - Add environment variables (see above)
   - Deploy

3. **After first deploy (if using PostgreSQL)**
   - Run migrations from your local machine:
     ```bash
     DATABASE_URL="your-neon-url" npx prisma db push
     ```
   - Or use Neon’s SQL editor to run migrations

4. **Seed the database** (optional)
   ```bash
   DATABASE_URL="your-neon-url" npm run db:seed
   ```

---

## Build Verification

To test the build locally (without DB):

```bash
npm run build
```

If you see Prisma/DB errors, ensure `DATABASE_URL` is set and points to a valid database.
