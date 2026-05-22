# StanchTech

STANCHTECH is a dependable marine and industrial maintenance solutions provider, built on a foundation of honesty, open-mindedness, and exceptional service delivery. We play a pivotal role in extending Cummins' expertise and technological advancements to the market we serve, along with a comprehensive array of related technologies.

🌐 **Live Site:** [https://stanchtech.vercel.app](https://stanchtech.vercel.app)

---

## 🛠️ Tech Stack

### Core Framework & Runtime

| Technology | Version | Role |
|---|---|---|
| **Next.js** | `16.2.1` | Full-stack React framework (App Router) |
| **React** | `19.2.4` | UI rendering library |
| **TypeScript** | `^6.0.2` | Strongly-typed JavaScript |
| **Node.js** | runtime | Server-side execution |

> Uses the **Next.js App Router** (`src/app/`) with React Server Components, nested layouts, and streaming.

### Styling

| Technology | Version | Role |
|---|---|---|
| **TailwindCSS** | `^4` | Utility-first CSS framework |
| **Vanilla CSS** | — | Global styles (`globals.css`) |
| **tailwind-merge** | `^3.5.0` | Merge conflicting Tailwind classes |
| **clsx** | `^2.1.1` | Conditional className utility |
| **class-variance-authority** | `^0.7.1` | Variant-based component styling |

### Authentication

| Technology | Version | Role |
|---|---|---|
| **Clerk** | `@clerk/nextjs ^7.2.3` | Login, signup & session management |

### Database & Storage

| Technology | Version | Role |
|---|---|---|
| **Supabase** | `@supabase/supabase-js ^2.105.1` | PostgreSQL database + image storage |

Supabase manages: product catalog, order records, image uploads, and product feature flags (`is_featured`, `is_hidden`).

### UI & Animation

| Technology | Version | Role |
|---|---|---|
| **Framer Motion** | `^12.38.0` | Page transitions & micro-animations |
| **Lucide React** | `^0.577.0` | SVG icon library |
| **@radix-ui/react-slot** | `^1.2.4` | Composable UI primitives |
| **React Hook Form** | `^7.72.1` | Performant form state management |

### Deployment

| Platform | Details |
|---|---|
| **Vercel** | CI/CD & hosting |

---

## 📊 Codebase Size

| Metric | Count |
|---|---|
| **Total lines of code** | **~35,097** |
| Pages / Routes | 14 |
| Shared components | 4 |
| File types | `.ts`, `.tsx`, `.css`, `.js`, `.json` |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router (14 routes)
│   ├── page.tsx            # Landing / Home page
│   ├── layout.tsx          # Root layout + Clerk provider
│   ├── globals.css         # Global styles
│   ├── about/
│   ├── admin/              # Admin dashboard (product & order mgmt)
│   ├── checkout/           # Shopping cart checkout
│   ├── contact/
│   ├── login/[[...rest]]   # Clerk-managed login
│   ├── orders/             # User order history
│   ├── profile/
│   ├── projects/           # Portfolio + [id] detail view
│   ├── services/
│   ├── shop/               # Product listing + [id] detail
│   └── signup/[[...rest]]  # Clerk-managed signup
├── components/             # Shared UI components
│   ├── navbar.tsx
│   ├── shopping-cart.tsx
│   ├── footer.tsx
│   └── product-card.tsx
├── context/                # React Context (cart state)
├── data/                   # Static product seed data
├── lib/
│   └── supabase.ts         # Supabase client
└── proxy.ts
```

---

## 🗺️ Pages & Routes

| Route | Description |
|---|---|
| `/` | Home / Landing page |
| `/about` | About StanchTech |
| `/shop` | Product listing (storefront) |
| `/shop/[id]` | Individual product detail |
| `/checkout` | Shopping cart checkout |
| `/orders` | User order history |
| `/profile` | User profile |
| `/projects` | Portfolio of completed projects |
| `/projects/[id]` | Individual project detail |
| `/services` | Services offered |
| `/contact` | Contact form |
| `/admin` | Admin dashboard |
| `/login` | Clerk-powered login |
| `/signup` | Clerk-powered signup |

---

## ✨ Features

- 🛒 **Full e-commerce storefront** — browse, filter, and purchase spare parts
- 🔐 **Authentication** — secure login/signup via Clerk
- 📦 **Order tracking** — users can view their full order history
- 🛠️ **Admin dashboard** — add, edit, hide/feature products; manage inventory
- 🖼️ **Image management** — product images stored via Supabase Storage
- 💫 **Animations** — smooth Framer Motion transitions throughout
- 📱 **Responsive design** — mobile-first, works across all screen sizes

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18`
- A [Supabase](https://supabase.com) project
- A [Clerk](https://clerk.com) application

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm run start
```

---

## 📄 License

Private project — © StanchTech. All rights reserved.
