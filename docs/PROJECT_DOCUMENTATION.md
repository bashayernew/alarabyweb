# Website Project Documentation
## شركة الرائد العربي | Al Raed Al Arabi

**Version:** 1.0  
**Last Updated:** [ADD DATE]  
**Document Type:** Technical & Business Overview

---

# 1. Project Overview

## Project Name
- **Arabic:** شركة الرائد العربي (Al Raed Al Arabi)  
- **Technical:** heaterweb

## Purpose of the Website
- Present the company’s products and services in water systems and central heating
- Attract leads and service requests from homeowners and businesses
- Provide information in Arabic and English for Kuwait and the Gulf region
- Support online product orders, service requests, and maintenance bookings

## Target Audience
- Homeowners looking for water heaters, filters, pumps, and maintenance
- Businesses needing installation and maintenance of central heating and water systems
- Arabic- and English-speaking customers
- [ADD DETAILS: Geographic focus, specific segments]

## Business Goals
- Increase visibility and credibility
- Generate product orders and service requests
- Collect customer data (name, phone, email, address)
- Reduce phone-only dependency for inquiries
- Enable admin to update content without developers

---

# 2. Website Structure (Pages)

## Homepage
**Purpose:** First impression, key messaging, quick access to main sections

**Key Elements:**
- Hero section with image/video
- Company name and branding
- Navigation to About, Services, Products, Maintenance, Contact
- Featured products/services (if configured)
- Call-to-action buttons (Contact, WhatsApp)

**User Actions:**
- Navigate to other pages
- Open contact or WhatsApp
- Browse featured content

---

## About Us
**Purpose:** Explain the company and why customers should choose it

**Key Elements:**
- Company description
- Experience and expertise
- “Why choose us” points
- Contact/CTA section

**User Actions:**
- Read company information
- Go to contact or services

---

## Services
**Purpose:** Show installation and service offerings

**Key Elements:**
- Service categories (installation, repair, maintenance, etc.)
- Service cards with images, titles, descriptions
- “Request Service” buttons

**User Actions:**
- Browse services
- Submit service requests
- Contact via WhatsApp

---

## Products
**Purpose:** Display water heaters, filters, pumps, and related products

**Key Elements:**
- Product grid/list with images
- Product details (price, description, features, specs)
- “Order” or “Contact” actions
- Categories and sorting

**User Actions:**
- View product details
- Submit product orders with contact information
- Navigate between products

---

## Maintenance
**Purpose:** Promote maintenance services and collect maintenance requests

**Key Elements:**
- Hero section for maintenance services
- Maintenance service cards (e.g. central heating, filters, pumps, tanks, sewage, pressure)
- “Request Service” on each card
- Why choose us
- CTA for WhatsApp and contact

**User Actions:**
- Browse maintenance services
- Submit maintenance requests with preferred date/time
- Open WhatsApp or contact form

---

## Contact
**Purpose:** Provide contact options and capture inquiries

**Key Elements:**
- Contact form (name, email, phone, message)
- Phone numbers
- WhatsApp link
- [ADD DETAILS: Address, map, opening hours if used]

**User Actions:**
- Send a message via the form
- Call or message on WhatsApp
- View contact details

---

## Booking / Request Page
**Purpose:** Handle product orders, service requests, and maintenance requests

**Flow:**
- User selects product/service or maintenance type
- Fills in name, phone, email, address, area, notes
- Submits the request
- Request appears in the admin dashboard

**User Actions:**
- Submit product orders
- Submit service requests
- Submit maintenance requests with preferred date/time

---

# 3. Features & Functionalities

## Core Features

### Bilingual System (Arabic / English)
- Full Arabic and English support
- Language switcher in header
- RTL layout for Arabic
- Content stored in both languages

### Responsive Design (Mobile + Desktop)
- Responsive layout for phones, tablets, desktops
- Touch-friendly controls
- Optimized navigation for small screens

### Modern UI/UX
- Professional visual style
- Simple animations (e.g. Framer Motion)
- Clear typography and spacing
- Consistent color palette (primary blue)

### Performance
- Fast loading via Next.js
- Static and dynamic rendering where appropriate
- Minimal third-party scripts

---

## Business Features

### Product Listing System
- Products managed in admin
- Bilingual titles and descriptions
- Images, prices, categories, badges
- Display order and featured products

### Service Listing System
- Services managed in admin
- Categories, descriptions, images
- Display order

### Maintenance Service System
- Maintenance services managed in admin
- Create, edit, delete, reorder
- Icon per service

### Maintenance Request System
- Customers submit maintenance requests
- Fields: name, phone, email, address, area, preferred date/time, notes
- Requests stored in database and viewable in admin

### Product Order System
- Customers submit product orders
- Product selection plus contact details
- Orders stored in database

### Client Data Collection
- Customer name, phone, email, address, area
- Notes and preferred date/time for maintenance
- All data visible in admin and exportable

---

## Admin Dashboard Features

### Products
- Add, edit, delete products
- Upload product images
- Set prices, descriptions, features, specs
- Reorder products
- Mark featured/hero product
- Activate/deactivate

### Services
- Add, edit, delete services
- Upload images
- Set categories, descriptions, options
- Reorder and activate/deactivate

### Maintenance Services
- Add, edit, delete maintenance services
- Set icon, title, description (AR/EN)
- Reorder and activate/deactivate
- Bootstrap default services when empty

### Orders & Requests
- View product orders
- View service requests
- View maintenance orders
- Update status (new, contacted, in progress, completed, cancelled)
- Assign completion

### Offers
- Manage promotional offers
- Set title, description, dates, images
- View offer requests

### Users & Security
- User management (super_admin, editor, viewer)
- Activity logs for admin actions
- Session-based authentication

### Export
- Export orders and requests to Excel
- Export combined data

---

## User Features

- Browse products and services
- View product and service details
- Submit product orders
- Submit service requests
- Submit maintenance requests
- Contact via form
- Switch language (Arabic / English)
- Open WhatsApp for quick contact

---

# 4. Technical Overview

## Frontend
- **Framework:** Next.js 15  
- **UI Library:** React 19  
- **Styling:** Tailwind CSS  
- **Icons:** Lucide React  
- **Animations:** Framer Motion  

## Backend
- **Runtime:** Node.js  
- **API:** Next.js API Routes  
- **Authentication:** NextAuth.js  

## Database
- **ORM:** Prisma  
- **Database:** PostgreSQL  
- **Hosting:** [ADD DETAILS: e.g. Vercel Postgres, Neon, Supabase]

## File Storage
- **Provider:** Vercel Blob  
- Used for product, service, and offer images  

## Hosting & Deployment
- **Platform:** Vercel  
- **Build:** Automatic on push to main branch  
- **Domain:** [ADD DETAILS: Production domain]

## APIs
- REST-style API routes under `/api/`
- Public: products, services, maintenance services, contact
- Admin: CRUD for products, services, offers, maintenance services, orders, requests, users

---

# 5. UI/UX Design Strategy

- **Tone:** Professional, trustworthy  
- **Layout:** Clean, clear hierarchy  
- **Hero:** Strong hero section on key pages  
- **Products:** Image-focused cards with clear CTAs  
- **White space:** Intentional spacing for readability  
- **Consistency:** Shared patterns for cards, buttons, and navigation  

---

# 6. Mobile Optimization

- Responsive breakpoints for all main pages  
- Hero section scales for small screens  
- Video/image hero works on mobile  
- Touch-friendly buttons and forms  
- Mobile-friendly navigation (e.g. hamburger menu)  

---

# 7. SEO & Performance

- Semantic HTML structure  
- Fast page loads via Next.js  
- [ADD DETAILS: Meta tags, Open Graph, sitemap]  
- [ADD DETAILS: Analytics integration]  

---

# 8. Future Improvements

- [ ] Payment integration (e.g. K-Net, credit card)  
- [ ] User accounts and order history  
- [ ] Advanced analytics and dashboards  
- [ ] Email/SMS notifications for new orders and requests  
- [ ] [ADD DETAILS: AI features, chatbot, etc.]  

---

# 9. Conclusion

## Summary
The website gives شركة الرائد العربي a modern, bilingual presence with product and service catalogues, maintenance booking, and contact forms. The admin dashboard lets staff manage products, services, and requests without developer involvement.

## Business Impact
- Centralized source of truth for products and services  
- More structured lead and order capture  
- Better credibility and user experience  
- Reduced manual data entry and follow-up

## Scalability
- Database-driven content for growth  
- Role-based admin access for new staff  
- Modular architecture for new features and integrations  

---

*[ADD DETAILS HERE: Contact information, revision history, or other notes]*
