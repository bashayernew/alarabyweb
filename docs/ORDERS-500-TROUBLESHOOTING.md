# Form Request 500 Errors – Troubleshooting

If you get **500 Internal Server Error** when submitting:
- Product orders (`/api/orders`)
- Service requests (`/api/requests`)
- Maintenance orders (`/api/maintenance-orders`)
- Offer requests (`/api/offer-requests`)

## What 500 means

The server received your request but crashed while processing it. Common causes:
- **Database connection** – wrong URL, pool exhaustion, or timeout on Vercel
- **Schema mismatch** – tables missing or different in production DB
- **Environment** – missing `DATABASE_URL` or other required vars

## 1. Enable debug mode

Add this env var in Vercel (Project → Settings → Environment Variables):

```
DEBUG_REQUESTS=true
```

**Important:** Set it for **Production**, **Preview**, and **Development** (or at least Production). Redeploy after adding—env vars only apply to new deployments.

When debug works, the API response will include:
- `error`: the real backend error message
- `stack`: the stack trace
- `envDebugRequests`: should be `"true"`—if it's `null`, the env var isn't being read (check scope and redeploy)

## 2. Use a pooled database connection (most common fix)

Vercel serverless functions need a **pooled** connection string to avoid "Too many connections" or timeouts.

- **Neon:** Use the connection string with `-pooler` in the hostname (e.g. `ep-xxx-pooler.us-east-2.aws.neon.tech`), and add `?connection_limit=3`
- **Supabase:** Use port `6543` (pooler) instead of `5432`
- **Vercel Postgres:** Use the pooled URL from the Vercel dashboard

Example for Neon:
```
postgresql://user:pass@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&connection_limit=3
```

## 3. Verify schema

Ensure the database has all tables: `ProductOrder`, `ServiceRequest`, `MaintenanceOrder`, `OfferRequest`. Run locally against your production DB URL:

```bash
DATABASE_URL="your-production-url" npx prisma db push
```

Then redeploy. Vercel’s build runs `prisma generate` but not `db push`, so the schema must already exist in your production DB.

## 4. Turn off debug

After fixing, remove `DEBUG_REQUESTS` from Vercel env vars and redeploy.
