# ✂️ Salon Manager

A modern salon management web app built with **Next.js 16**, **Neon PostgreSQL**, **Drizzle ORM**, and **Tailwind CSS**. Deployable to **Vercel** in one click.

## Features

- **Client booking** – Clients pick a service, choose a date & time slot, and book an appointment.
- **Admin dashboard** – Staff can book appointments on behalf of clients, add new services, and manage all appointments.
- **Real-time slot availability** – Time slots that are already booked are disabled so double-bookings cannot happen.
- **Server Actions** – All data mutations use Next.js Server Actions (no separate API routes needed).

## Tech Stack

| Layer | Technology |
| -------- | --------------------------------- |
| Frontend | Next.js 16 App Router, React 19 |
| Styling | Tailwind CSS 4 |
| Database | Neon (serverless PostgreSQL) |
| ORM | Drizzle ORM |
| Hosting | Vercel |

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/abuzariftikhar/saloon-site.git
cd saloon-site
npm install
```

### 2. Set up Neon database

1. Create a free project at [neon.tech](https://neon.tech).
2. Copy the connection string.
3. Create a `.env.local` file (see `.env.example`):

```
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
```

### 3. Push the database schema

```bash
npx drizzle-kit push
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add `DATABASE_URL` as an environment variable.
4. Deploy — Vercel will build and host it automatically.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout with nav
│   ├── book/
│   │   ├── page.tsx                # Client booking page
│   │   └── BookingForm.tsx         # Booking form component
│   └── admin/
│       ├── page.tsx                # Admin dashboard
│       ├── AddServiceForm.tsx      # Add-service form
│       └── appointments/
│           ├── page.tsx            # Appointments list
│           └── CancelButton.tsx    # Cancel button component
├── db/
│   ├── schema.ts                   # Drizzle schema
│   └── index.ts                    # Database client
└── lib/
    ├── actions.ts                  # Server Actions
    └── utils.ts                    # Helpers
```