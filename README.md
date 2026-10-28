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
