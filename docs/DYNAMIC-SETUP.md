# Dynamic Backend Setup (شركة الرائد العربي)

This document describes the database-backed, admin-ready setup added to the site.

## Overview

- **Products & services** are stored in SQLite and exposed via API. The frontend still works without the DB (falls back to static content in `src/content/`).
- **Admin** can log in at `/admin/login` and view product orders and service requests, and export them as JSON or CSV.
- **Orders** and **service requests** are submitted via `POST /api/orders` and `POST /api/requests`.

## Environment Variables

Copy `.env.example` to `.env` and set:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SQLite file, e.g. `file:./prisma/dev.db` |
| `NEXTAUTH_URL` | App URL, e.g. `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Random secret (run `npx auth secret`) |
| `ADMIN_EMAIL` | Default admin email (used by seed) |
| `ADMIN_PASSWORD` | Default admin password (used by seed) |

## Database

1. **Push schema**: `npm run db:push`
2. **Seed** (admin user + products/services from content): `npm run db:seed`

Seed creates one admin user with the email/password from env and fills `Product` and `Service` from `src/content/products.ts` and `src/content/services.ts`.

## API Routes

| Method | Route | Auth | Description |
|--------|--------|------|-------------|
| GET | `/api/products` | No | List all products |
| GET | `/api/products/[id]` | No | Get product by id or slug |
| GET | `/api/services` | No | List all services |
| GET | `/api/services/[id]` | No | Get service by id or slug |
| POST | `/api/orders` | No | Create product order (body: productId or productSlug, customerName, email, phone, message?, language?) |
| POST | `/api/requests` | No | Create service request (body: serviceId or serviceSlug, customerName, email, phone, message?, language?) |
| GET | `/api/admin/orders` | Yes | List orders (admin) |
| GET | `/api/admin/requests` | Yes | List service requests (admin) |
| GET | `/api/admin/export?format=json\|csv` | Yes | Export orders + requests |

## Admin

- **Login**: `/admin/login` (email + password from DB).
- **Dashboard**: `/admin` — orders, service requests, and export buttons. Access requires an active session.

## Frontend Behavior

- **Products page**: Fetches `GET /api/products` on load; if the response is OK and non-empty, it uses that list. Otherwise it uses `catalogProducts` from `src/content/products.ts`.
- **Services page**: Same pattern with `GET /api/services` and `servicesCatalog` from `src/content/services.ts`.

To collect orders/requests from the site, add forms (e.g. on product or service detail modals) that `POST` to `/api/orders` or `/api/requests` with the validated body shape above.
