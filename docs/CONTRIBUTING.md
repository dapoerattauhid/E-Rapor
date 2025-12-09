# Panduan Kontribusi

Terima kasih ingin berkontribusi! Berikut adalah panduan singkat untuk membantu Anda memulai.

1. Fork repository ini
2. Buat branch fitur: `git checkout -b feat/deskripsi-singkat`
3. Jalankan aplikasi secara lokal dan pastikan perubahan Anda bekerja
4. Bikin PR ke branch `main` dengan deskripsi perubahan

Standar kode:
- Gunakan TypeScript
- Ikuti aturan ESLint yang ada (`npm run lint`)

Testing & QA:
- Proyek saat ini tidak memiliki test suite otomatis — pastikan melakukan sanity check manual pada fitur baru.

Database migrations:
- Jika perubahan memerlukan skema DB baru, tambahkan file SQL ke `supabase/migrations/` dan jelaskan langkah migrasi di PR.

Pertanyaan / bantuan: buka issue di repository.
