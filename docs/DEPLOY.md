# Deployment & Environment

Panduan singkat untuk deployment aplikasi `E-Rapor`.

## Environment Variables
Pastikan di environment production Anda men-set minimal:

- `VITE_SUPABASE_URL` — URL project Supabase (contoh: `https://xxx.supabase.co`)
- `VITE_SUPABASE_PUBLISHABLE_KEY` — public anon key (publishable)

Jika Anda menggunakan hosting seperti Vercel/Netlify/GitHub Pages, tambahkan environment variables tersebut di dashboard proyek.

## Rekomendasi platform
- Vercel: cocok untuk aplikasi Vite + React. Tambahkan env vars di dashboard Vercel.
- Netlify: juga mendukung build Vite. Tambahkan env vars di Site settings.

## Build & Preview
Build production:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

## Database migrations
Jangan lupa menerapkan migrasi pada database production. Gunakan Supabase CLI atau jalankan SQL migrations yang ada di `supabase/migrations/`.

Contoh (psql):

```bash
psql "$DATABASE_URL" -f supabase/migrations/20251205000000_add_nama_yayasan.sql
psql "$DATABASE_URL" -f supabase/migrations/20251205000001_add_urutan_subjects.sql
```

Catatan keamanan: jangan commit `SERVICE_ROLE` secret ke repositori. Gunakan secrets/vars pada platform hosting.
