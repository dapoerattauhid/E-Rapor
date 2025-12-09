# Arsitektur & Struktur Kode

Dokumen ini menjelaskan struktur tinggi aplikasi dan lokasi komponen penting.

## Ringkasan
- Frontend: React + Vite + TypeScript
- Styling: Tailwind CSS + komponen UI `components/ui`
- State / data fetching: `@tanstack/react-query`
- Database & auth: Supabase (client di `src/integrations/supabase`)

## Struktur folder utama
- `src/`
  - `pages/` — Halaman aplikasi (masing-masing route berada di sini)
  - `components/` — Komponen UI, layout, dan komponen kecil yang dapat digunakan ulang
  - `hooks/` — Hooks kustom, termasuk `useSupabaseData.tsx` yang berisi query/mutation untuk tabel DB
  - `integrations/supabase/` — `client.ts` (inisialisasi Supabase) dan `types.ts` (type-safe DB types)
  - `lib/` — utilitas umum

## Flow data (contoh)
1. Halaman (mis. `pages/Subjects.tsx`) memanggil hook kustom dari `hooks/useSupabaseData.tsx`.
2. Hook menggunakan `supabase` client untuk melakukan query/mutation.
3. `react-query` meng-cache hasil dan menangani invalidasi setelah mutation.

## Hal-hal penting yang perlu diperhatikan
- `useSupabaseData.tsx` menyatukan akses data (mudah untuk dicari dan diperluas).
- Tipe DB dihasilkan di `src/integrations/supabase/types.ts` — ini membantu TypeScript untuk validasi.
- File migrasi SQL berada di `supabase/migrations/` — jalankan migration pada DB Anda.

## Tambahan: fitur yang baru ditambahkan
- `nama_yayasan` ditambahkan di `school_settings` untuk menampilkan nama yayasan pada kop rapor.
- `urutan` ditambahkan di `subjects` sehingga admin dapat mengatur urutan mata pelajaran secara manual.
