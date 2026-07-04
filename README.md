# Undercurrent

Undercurrent is a teen-focused self-reflection and therapy-tracking app built with Next.js, Tailwind CSS, Supabase, Zustand, and Framer Motion.

## Setup

1. Install dependencies with `npm install`.
2. Provide these environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` if you later add server-side admin operations
3. Run `npm run dev`.

## Included surfaces

- `/quiz` interactive discovery flow with persisted progress.
- `/dashboard` therapy command center for authenticated users.
- `/api/analyze` secure server-side proxy to the g4f OpenAI-compatible endpoint.
