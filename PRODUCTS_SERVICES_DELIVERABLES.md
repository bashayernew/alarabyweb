# Products & Services System — Deliverables

## شركة الرائد العربي — Admin-Managed Products & Services

---

## 1. Files Changed / Created

### Database & Schema
- **`prisma/schema.prisma`** — Existing schema already includes:
  - `Product` (price, isActive, sortOrder)
  - `Service` (image, isActive, sortOrder)
  - `ProductOrder` (email optional, area, status)
  - `ServiceRequest` (email optional, area, status)

### API Routes
- **`src/app/api/products/route.ts`** — Public products list (isActive, sortOrder)
- **`src/app/api/services/route.ts`** — Public services list (isActive, sortOrder)
- **`src/app/api/orders/route.ts`** — Create product order (email optional, area)
- **`src/app/api/requests/route.ts`** — Create service request (email optional, area)
- **`src/app/api/admin/upload/route.ts`** — Image upload for products/services
- **`src/app/api/admin/products/route.ts`** — Admin products CRUD
- **`src/app/api/admin/products/[id]/route.ts`** — Admin product by ID
- **`src/app/api/admin/services/route.ts`** — Admin services CRUD
- **`src/app/api/admin/services/[id]/route.ts`** — Admin service by ID
- **`src/app/api/admin/orders/route.ts`** — Admin list orders
- **`src/app/api/admin/orders/[id]/route.ts`** — Admin update order status
- **`src/app/api/admin/requests/route.ts`** — Admin list requests
- **`src/app/api/admin/requests/[id]/route.ts`** — Admin update request status
- **`src/app/api/admin/export/route.ts`** — Export orders/requests (JSON/CSV)

### Admin UI
- **`src/app/admin/(dashboard)/layout.tsx`** — Nav links for Products, Services
- **`src/app/admin/(dashboard)/page.tsx`** — Dashboard with orders/requests
- **`src/app/admin/(dashboard)/products/page.tsx`** — Products management page
- **`src/app/admin/(dashboard)/services/page.tsx`** — Services management page
- **`src/components/admin/ProductsManager.tsx`** — Products CRUD table
- **`src/components/admin/ServicesManager.tsx`** — Services CRUD table
- **`src/components/admin/AdminDashboard.tsx`** — Orders & requests tables, filters, search

### Public UI
- **`src/components/OrderRequestModal.tsx`** — Order/request form modal with success messages
- **`src/components/sections/Products.tsx`** — Products section, fetches from API, opens modal
- **`src/components/sections/ServicesCatalog.tsx`** — Services section, fetches from API, opens modal

### Helpers
- **`src/lib/api-helpers.ts`** — productToJson, serviceToJson

---

## 2. Database Tables / Migrations

No new migrations needed — the schema already has the required fields.

### Tables Used

| Table         | Key Fields                                                                 |
|---------------|-----------------------------------------------------------------------------|
| **Product**   | id, slug, image, price, isActive, sortOrder, titleEn/Ar, shortDescriptionEn/Ar, fullDescriptionEn/Ar, category, ... |
| **Service**   | id, slug, image, isActive, sortOrder, titleEn/Ar, descriptionEn/Ar, category, ... |
| **ProductOrder** | id, productId, customerName, email, phone, area, message, status, language |
| **ServiceRequest** | id, serviceId, customerName, email, phone, area, message, status, language |

### Apply Schema
```bash
npx prisma db push
# or
npx prisma migrate dev --name init
```

---

## 3. Admin Flow

1. **Login** — Go to `/admin/login`, sign in with admin credentials.
2. **Products** — `/admin/products`:
   - Add: Click "إضافة منتج", fill form, upload image, save.
   - Edit: Click edit icon, modify fields, optionally replace image.
   - Delete: Click delete icon, confirm.
   - Table shows: image, name, price, category, active, sort order.
3. **Services** — `/admin/services`:
   - Same CRUD flow as products (no price field).
4. **Orders / Requests** — `/admin` (Dashboard):
   - View product orders and service requests in tables.
   - Filter by status (new, contacted, in progress, completed, cancelled).
   - Search by customer name, phone, email, area.
   - Change status via dropdown.
   - Export JSON or CSV.

---

## 4. Customer Request Flow

1. **Products page** — Visitor sees product cards from DB (active only).
2. **"اطلب الآن" / "اطلب المنتج"** — Opens order modal.
3. **Services page** — Visitor sees service cards from DB (active only).
4. **"اطلب الخدمة"** — Opens request modal.
5. **Form** — Customer enters: name, phone, email (optional), area (optional), notes.
6. **Submit** — Request sent to API.
7. **Success message**:
   - Product: "تم استلام طلب المنتج بنجاح. سيقوم فريق المبيعات بالتواصل معك قريباً."
   - Service: "تم استلام طلب الخدمة بنجاح. سيقوم فريق الخدمات بالتواصل معك قريباً."
8. **Admin** — Order/request appears in dashboard.

---

## 5. Setup Steps

### 1. Environment
Ensure `.env` has:
```
DATABASE_URL="file:./dev.db"
```

### 2. Database
```bash
npx prisma db push
npx prisma generate
```

If `prisma generate` fails with EPERM on Windows:
- Stop the dev server (Ctrl+C).
- Run `npx prisma generate`.
- Start the dev server again.

### 3. Seed (optional)
```bash
npx prisma db seed
```

### 4. Upload Directories
The upload API creates these if missing:
- `public/uploads/products`
- `public/uploads/services`

### 5. Run
```bash
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin
- Default admin: `admin@aquasystems.com` / `admin123` (or from `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

---

## Summary of Fixes Applied

1. **Requests API** — Added missing `area` to destructuring in `/api/requests/route.ts`.
2. **Success messages** — Separate messages for product vs service in `OrderRequestModal.tsx`.
3. **Item lookup** — Products and ServicesCatalog now pass `product.id` / `service.id` (slug) for correct API lookup instead of `dbId`.
