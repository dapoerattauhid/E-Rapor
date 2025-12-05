PROJECT MASTER PROMPT — E-Rapor

Purpose
- This file is a single-source master prompt to bootstrap future assistant sessions working on the `E-Rapor` repository. It contains repository summary, important files, development commands, database/migration rules, coding conventions, and explicit instructions for the assistant so future sessions can continue work consistently and safely.

1) Project summary
- Name: E-Rapor
- Stack: Vite + React + TypeScript (frontend), Tailwind CSS, Supabase (DB + Auth).
- State management / data fetching: @tanstack/react-query.
- UI: custom components in `src/components` (shadcn-like components).

2) How to run (local developer quickstart)
- Install:
  - `npm install`
- Dev server:
  - `npm run dev` (open http://localhost:5173)
- Build / preview:
  - `npm run build`
  - `npm run preview`
- Linting:
  - `npm run lint`

3) Environment variables
- Required for local run (set in `.env` or project host):
  - `VITE_SUPABASE_URL` — Supabase project URL
  - `VITE_SUPABASE_PUBLISHABLE_KEY` — public/publishable anon key

4) Database & migrations
- Migrations live in `supabase/migrations/` and are plain SQL files. Add a migration file for every schema change.
- When adding a DB column/table:
  1. Add SQL migration file to `supabase/migrations/` (timestamped filename).
  2. Update TypeScript DB types at `src/integrations/supabase/types.ts` if not auto-generated, or regenerate types if using a generator.
  3. Update hooks in `src/hooks/useSupabaseData.tsx` to reflect new columns/ordering.
  4. Update pages/components that display or write the new field.

Recent migrations (examples present in repo):
- `20251205000000_add_nama_yayasan.sql` — adds `nama_yayasan` to `school_settings`.
- `20251205000001_add_urutan_subjects.sql` — adds `urutan` to `subjects` (manual ordering).

5) Important files & notable locations
- `package.json` — scripts and dependencies.
- `README.md` and `docs/` — project docs.
- `src/integrations/supabase/client.ts` — Supabase client initializer.
- `src/integrations/supabase/types.ts` — DB types (auto-generated or hand-updated).
- `src/hooks/useSupabaseData.tsx` — central place for all Supabase queries and mutations. Update here for DB changes.
- `src/pages/SchoolSettings.tsx` — school settings UI (logo, kepala sekolah, nama_yayasan input added here).
- `src/pages/ReportPreview.tsx` — report preview + print logic; kop rapor displays `nama_yayasan` when available.
- `src/pages/Subjects.tsx` — subject CRUD and manual reordering UI.

6) Coding & commit conventions (for the assistant)
- When editing files programmatically use the repository's editing workflow:
  - Use `apply_patch` (the project assistant tool) to change files.
  - Keep changes minimal and focused to the task.
  - Follow existing code style, spacing, and TypeScript types.
- When changes include DB migrations:
  - Add migration SQL file under `supabase/migrations/` with a timestamped filename.
  - Update types in `src/integrations/supabase/types.ts` and `src/hooks/useSupabaseData.tsx` as needed.
- Testing & verification:
  - Run `npm run dev` for manual verification.
  - Run `npm run lint` and fix any new lint issues introduced.
- Git workflow (assistant should follow):
  - Stage changes, create clear commit messages, and push to `origin/main` unless user requests a feature branch.
  - If the user asks to open a PR, create a branch and push the branch, or provide instructions.

7) Assistant instructions (how I should behave in next sessions)
- Always start by reading `README.md` and `docs/` then recent commits to see context.
- Use the todo tool to plan multi-step tasks (one item in-progress at a time). Update the todo list as you proceed.
- Before any file edits, send a one-line preamble describing the immediate change(s) about to be made.
- Use `apply_patch` for edits and include a short explanation for the patch tool call.
- After edits, run local checks where possible (lint, build, or small runtime checks) and commit changes with a clear message.
- If migrations are added, remind the user to run them in their Supabase DB and provide exact SQL commands or Supabase CLI commands.
- If uncertain about user intent (branch vs direct push, DB migration on prod, etc.), ask a single clarifying question.

8) Common tasks & examples
- Add a DB column: create migration, update `types.ts`, update `useSupabaseData.tsx`, update form/page, add commit and push.
- Add a page: create file in `src/pages/`, add route in router (check `App.tsx` or `main.tsx`), write CSS/classes via Tailwind.
- Fix TypeScript errors: read compile output, fix types at source (prefer small, local fixes), run `npm run dev` to verify.

9) Troubleshooting notes
- If a compile error referencing `types.ts` occurs after DB migration, ensure `src/integrations/supabase/types.ts` matches the new schema.
- When images fail to load in settings previews, the UI often hides broken images via `onError` handlers — check the `img` elements.

10) Finish-up checklist for assistant changes
- Update code ✔
- Add migration file (if schema change) ✔
- Update types/hooks ✔
- Run quick lint/build checks locally (if possible) ✔
- Commit with descriptive message and push ✔

11) Where to find me (assistant) capabilities in this workspace
- I have tools to edit files (`apply_patch`), search, run terminal commands, and update a managed todo list. Use them as part of a clear plan.

12) Contact points for user decisions
- Branch policy: default push is to `main` unless the user requests a feature branch or PR.
- Database migration deploy: ask user whether to apply migrations to production; do not run DB migrations without explicit permission.

---
How to use this MASTER_PROMPT.md
- Copy/paste this file into the top of a new assistant session or refer the assistant to this file. The assistant should obey the sections above as authoritative repository-specific instructions.
