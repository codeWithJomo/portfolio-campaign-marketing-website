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

## Marketing admin

The discreet footer lock opens the campaign and lead workspace. This Vite project has no private server, so production sign-in uses Supabase Auth and row-level security rather than a client-side PIN; browser code cannot keep a PIN secret or protect records.

1. Run `supabase/schema.sql` if needed, then run `supabase/marketing_admin.sql` in the Supabase SQL editor.
2. Create an admin under Supabase Authentication. Copy its user UUID and run the commented `auth.users` metadata update at the end of `marketing_admin.sql` with that UUID. Only accounts carrying `app_metadata.role = admin` can access CRM records.
3. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Never expose a service-role key in Vite configuration.

Campaigns, leads, campaign associations, outreach interactions, and status history persist in Supabase. Normalized profile URL, email, and phone identifiers have unique indexes; database collisions remain rejected even if an admin overrides a possible-duplicate warning. Admin analytics derives from CRM records. Existing anonymous website events remain separate in `performance_events` and are readable to admins; the current interface does not yet query them. It does not infer conversations, enquiries, visitors, or sales from clicks. Revenue requires recording payment amounts and visitor attribution requires campaign-tagged landing-page events.

Performance tracking records production visits, return visits, clicks on the main conversion actions, and footer reach in `performance_events`. The insert-only public policy does not allow visitors to read these records. In the Supabase SQL Editor, query `public.performance_event_counts` for daily totals by event and CTA label. The visitor ID is a random browser-local identifier; clearing local storage makes the browser appear new. Events do not include form or contact information. Tracking is disabled in local/dev builds and does not depend on the optional Google Analytics consent setting.

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
