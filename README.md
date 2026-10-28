# Portfolio Campaign

A landing page for a personalized portfolio website service. Visitors can review the offer, submit their portfolio requirements through the onboarding form, or join the CV builder waitlist.

## Tech stack

- React 19 and TypeScript
- Vite
- Tailwind CSS
- Motion animations and Lucide icons

## Run locally

**Prerequisite:** Node.js

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the local URL printed by Vite (the development server uses port `3000`).

## Supabase setup

1. In Supabase, open the SQL Editor and run [`supabase/schema.sql`](supabase/schema.sql). This creates the two submission tables and enables row level security. Visitors can insert records; they cannot read portfolio submissions.
2. Add these Vite variables in a local `.env.local` file (copy `.env.example`) and in Vercel's project environment variables:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   ```

   The browser uses the publishable key, which is intended to be public. Keep row level security enabled and never put a Supabase secret or service role key in a `VITE_` variable.
3. Restart the local Vite server after changing environment variables. In Vercel, redeploy after adding or changing them.

The onboarding form inserts into `portfolio_submissions`; the standalone CV form inserts into `cv_builder_waitlist`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 3000. |
| `npm run build` | Build the production app into `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Check TypeScript types with `tsc --noEmit`. |

## Submission flows

- The onboarding form submits portfolio requirements and contact details.
- The CV builder form lets visitors join the waitlist.

Submission handling is implemented in `src/services/submissionService.ts`.
