# Wireless Intelligence & Innovation Lab (WIIL) — Full-Stack Website

A complete, dynamic Next.js 14 website for WIIL, IIIT Guwahati. Lab members and the Supervisor can log in to a role-based dashboard to manage all content. Deployable on Vercel.

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth.js v5 (JWT, Credentials) |
| ORM | Prisma 6 |
| Dev DB | SQLite (`file:./dev.db`) |
| Prod DB | PostgreSQL (Vercel Postgres / Neon / Supabase) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
wiil/
├── src/
│   ├── app/
│   │   ├── (public)/         # Public-facing website
│   │   │   ├── page.tsx         Home (hero + news ticker + about + map)
│   │   │   ├── director/        Lab Director full profile + projects
│   │   │   ├── research/        9 research areas
│   │   │   ├── facility/        Lab hardware & facility
│   │   │   ├── members/         Dynamic lab members
│   │   │   ├── alumni/          Dynamic alumni
│   │   │   ├── gallery/         Photo gallery
│   │   │   └── contact/         Contact form (saves to DB)
│   │   ├── login/            Login page
│   │   ├── dashboard/
│   │   │   ├── supervisor/   Supervisor dashboard
│   │   │   │   ├── page.tsx     Overview stats
│   │   │   │   ├── members/     CRUD lab members
│   │   │   │   ├── publications/ CRUD publications
│   │   │   │   ├── projects/    CRUD projects
│   │   │   │   ├── news/        Manage news ticker
│   │   │   │   ├── gallery/     Manage gallery
│   │   │   │   ├── alumni/      CRUD alumni
│   │   │   │   └── contacts/    View contact submissions
│   │   │   └── member/       Member dashboard
│   │   │       ├── profile/     Edit own profile
│   │   │       └── publications/ Own publications
│   │   └── api/              REST API (30+ routes)
│   ├── auth.ts               NextAuth config
│   ├── middleware.ts          Dashboard route protection
│   └── lib/prisma.ts         Prisma client singleton
├── prisma/
│   ├── schema.prisma         DB models
│   └── seed.ts               Seed with WIIL data
├── public/                   Images (LabMembers/, Labspace/, Will-home-img/, gallery/)
├── vercel.json               Vercel config
└── .env.example              Environment template
```

---

## ⚙️ Local Development

### 1. Install
```bash
git clone https://github.com/Bit2-beyond/wiil.git
cd wiil
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env`:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Setup database
```bash
npx prisma db push        # Create SQLite DB from schema
npm run db:seed           # Seed with WIIL data
```

### 4. Run
```bash
npm run dev
```
Visit http://localhost:3000

---

## 🔐 Default Credentials (after seeding)

| Role | Email | Password |
|---|---|---|
| Supervisor | `sudip.biswas@iiitg.ac.in` | `wiil-admin-2024` |
| Member | `aiswarya.t@iiitg.ac.in` | `wiil-member-2024` |

> ⚠️ Change passwords immediately in production!

---

## ☁️ Vercel Deployment

### 1. Add PostgreSQL
Use Vercel Postgres, Neon, or Supabase. Get connection string.

### 2. Update schema for PostgreSQL
In `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3. Set Vercel env vars
| Variable | Value |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |

### 4. Deploy
Vercel auto-runs: `npm install` → `prisma generate` → `next build`

After first deploy, run the seed: `npx prisma db seed`

---

## 📊 Dashboard Features

### Supervisor
- Stats overview (members, publications, projects, unread contacts)
- **Members**: add/edit/delete lab members
- **Publications**: CRUD (journal/conference/preprint/book chapter)
- **Projects**: CRUD with status (ongoing/completed/upcoming)
- **News**: manage news ticker items
- **Gallery**: add/remove images
- **Alumni**: CRUD alumni records
- **Contacts**: read/delete contact submissions

### Member
- **Profile**: edit bio, photo URL, LinkedIn, Google Scholar
- **Publications**: manage own publications

---

## 🛠️ Commands
```bash
npm run dev           # Dev server
npm run build         # Production build
npm run db:seed       # Seed database
npx prisma studio     # DB GUI
npx prisma db push    # Push schema changes (dev)
npx prisma migrate deploy  # Apply migrations (prod)
```

---

© WIIL and Team, IIIT Guwahati. All rights reserved.
