stall# E-Rapor

> Aplikasi rapor sekolah berbasis React + Vite + Supabase.

Ringkasan singkat:
- Frontend: Vite + React + TypeScript
- Styling: Tailwind CSS
- Auth & DB: Supabase
- State fetching: @tanstack/react-query

Jika Anda ingin menjalankan aplikasi ini secara lokal, ikuti panduan berikut.

## Prasyarat
- Node.js (v18+ direkomendasikan)
- npm atau pnpm
- Akun Supabase (untuk database dan auth)

## Instalasi
1. Clone repository:

```bash
git clone https://github.com/dapoerattauhid/E-Rapor.git
cd E-Rapor
```

2. Install dependensi:

```bash
npm install
```

3. Siapkan environment variables di file `.env` (root project) atau di hosting:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-or-publishable-key
```

4. Jalankan development server:

```bash
npm run dev
```

5. Buka `http://localhost:5173` (atau port yang ditampilkan oleh Vite).

## Skrip yang tersedia
- `npm run dev` — menjalankan dev server (Vite)
- `npm run build` — membangun aplikasi untuk produksi
- `npm run preview` — preview hasil build
- `npm run lint` — jalankan ESLint

## Database & Migrasi
Folder migrasi SQL ada di `supabase/migrations/`.

- Untuk menerapkan migrasi secara manual Anda bisa menggunakan `psql` atau Supabase CLI. Contoh dengan `psql`:

```bash
# jika Anda punya DATABASE_URL
psql "$DATABASE_URL" -f supabase/migrations/20251205000000_add_nama_yayasan.sql
psql "$DATABASE_URL" -f supabase/migrations/20251205000001_add_urutan_subjects.sql
```

- Atau gunakan Supabase CLI (`supabase db push` atau `supabase db reset` tergantung alur Anda).

Catatan: migrasi yang ditambahkan:
- `20251205000000_add_nama_yayasan.sql` — menambahkan kolom `nama_yayasan` pada `school_settings`.
- `20251205000001_add_urutan_subjects.sql` — menambahkan kolom `urutan` pada `subjects` untuk urutan manual.

## Fitur penting
- Kop rapor sekarang memiliki field `nama_yayasan` yang dapat dikonfigurasi pada halaman **Pengaturan Sekolah**.
- Daftar mata pelajaran (`Subjects`) mendukung urutan manual (`urutan`) yang dapat diubah oleh admin melalui tombol naik/turun.

## Struktur proyek (singkat)
- `src/` — semua kode sumber frontend
	- `pages/` — halaman aplikasi (Dashboard, Students, Subjects, SchoolSettings, dll.)
	- `hooks/` — hooks kustom (termasuk `useSupabaseData.tsx` untuk query/mutation)
	- `integrations/supabase/` — client dan tipe database yang dihasilkan
	- `components/` — komponen UI dan layout

## Cara Menjalankan Migrasi dan Pengaturan Awal
1. Pastikan Supabase project sudah tersedia dan URL + public key di-set di `.env`.
2. Jalankan SQL migration di atas pada database Anda.
3. Buka aplikasi, masuk sebagai admin, lalu buka `Pengaturan Sekolah` untuk melengkapi data (termasuk `Nama Yayasan`).

## Kontribusi
Lihat `docs/CONTRIBUTING.md` untuk panduan kontribusi.

---
Jika Anda mau, saya bisa:
- Menambahkan file dokumentasi tambahan (`ARCHITECTURE.md`, `DEPLOY.md`).
- Membuat ringkasan API/hook yang lebih lengkap.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f1197ba4-c548-44ce-8fe2-58790a12127f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f1197ba4-c548-44ce-8fe2-58790a12127f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f1197ba4-c548-44ce-8fe2-58790a12127f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
