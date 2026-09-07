# Ledger Lane — free finance tools for local businesses

A starter site with:
- Homepage
- Tools: invoice generator, expense tracker, profit & loss calculator, break-even calculator (all work without an account)
- Free account signup/login (Supabase auth)
- Dashboard showing saved invoices and expenses

## 1. Install dependencies

You'll need [Node.js](https://nodejs.org) installed (v18+).

```
npm install
```

## 2. Create a Supabase project

1. Go to https://supabase.com and create a free account + new project.
2. In your project, go to **Settings -> API** and copy the **Project URL** and **anon public key**.
3. Copy `.env.local.example` to `.env.local` and paste in those two values.

## 3. Set up the database

1. In your Supabase project, open the **SQL Editor**.
2. Paste in the contents of `supabase-schema.sql` and run it.
   This creates the `invoices` and `expenses` tables, and locks each one down
   so a user can only ever see their own data (Row Level Security).

## 4. Run it locally

```
npm run dev
```

Visit http://localhost:3000

## 5. Deploy for free

1. Push this project to a GitHub repo.
2. Go to https://vercel.com, sign in with GitHub, and import the repo.
3. Add the same two environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in Vercel's project settings.
4. Deploy. Vercel gives you a free `.vercel.app` URL immediately; you can add a custom domain later.

## Notes on the free tiers

- **Supabase free tier**: fine for starting out, but projects with no activity for
  7 days get paused automatically, and there are no automatic backups. A simple
  fix once you have real users: a free scheduled ping (e.g. a GitHub Action) to
  keep the project active, and a periodic manual export of your data.
- **Vercel free tier**: generous for a site like this at low-to-moderate traffic.

## What to build next

- Email confirmation is on by default for new Supabase accounts — you can turn
  this off in Supabase Auth settings if you want instant access after signup.
- The invoice tool currently uses the browser print dialog for PDF export
  (Save as PDF). A dedicated PDF library (like `jsPDF`) can replace this later
  for a more polished, branded PDF.
- Add a "Learn" page with short guides, and a "Get help" contact form, per your
  original site plan.
