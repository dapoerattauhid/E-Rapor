-- Seed Data untuk E-Rapor
-- Jalankan di SQL Editor Supabase

-- 1. School Settings
INSERT INTO public.school_settings (nama_sekolah, npsn, alamat, semester, tahun_pelajaran, nama_kepala_sekolah, nip_kepala_sekolah, telepon, email, website)
VALUES (
  'SMP Negeri 1 Jakarta',
  '20100001',
  'Jl. Pendidikan No. 1, Menteng, Jakarta Pusat',
  '1',
  '2024/2025',
  'Dr. Ahmad Sudirman, M.Pd',
  '196501011990031001',
  '(021) 3456789',
  'smpn1jakarta@email.sch.id',
  'www.smpn1jakarta.sch.id'
);

-- 2. Subjects (Mata Pelajaran)
INSERT INTO public.subjects (id, nama, kode) VALUES
  ('11111111-1111-1111-1111-111111111101', 'Pendidikan Agama dan Budi Pekerti', 'PAI'),
  ('11111111-1111-1111-1111-111111111102', 'Pendidikan Pancasila dan Kewarganegaraan', 'PPKN'),
  ('11111111-1111-1111-1111-111111111103', 'Bahasa Indonesia', 'BIN'),
  ('11111111-1111-1111-1111-111111111104', 'Matematika', 'MTK'),
  ('11111111-1111-1111-1111-111111111105', 'Ilmu Pengetahuan Alam', 'IPA'),
  ('11111111-1111-1111-1111-111111111106', 'Ilmu Pengetahuan Sosial', 'IPS'),
  ('11111111-1111-1111-1111-111111111107', 'Bahasa Inggris', 'BIG'),
  ('11111111-1111-1111-1111-111111111108', 'Seni Budaya', 'SBD'),
  ('11111111-1111-1111-1111-111111111109', 'Pendidikan Jasmani', 'PJK'),
  ('11111111-1111-1111-1111-111111111110', 'Prakarya', 'PKY'),
  ('11111111-1111-1111-1111-111111111111', 'Bahasa Jawa', 'BJW'),
  ('11111111-1111-1111-1111-111111111112', 'Informatika', 'INF');

-- 3. Students (Siswa) - Kelas 7A
INSERT INTO public.students (id, nis, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, kelas, nama_wali_kelas) VALUES
  ('22222222-2222-2222-2222-222222222201', '2024001', 'Ahmad Rizki Pratama', 'Jakarta', '2011-03-15', 'L', '7A', 'Dra. Siti Aminah, M.Pd'),
  ('22222222-2222-2222-2222-222222222202', '2024002', 'Siti Nurhaliza', 'Bandung', '2011-05-22', 'P', '7A', 'Dra. Siti Aminah, M.Pd'),
  ('22222222-2222-2222-2222-222222222203', '2024003', 'Muhammad Fajar', 'Surabaya', '2011-01-10', 'L', '7A', 'Dra. Siti Aminah, M.Pd'),
  ('22222222-2222-2222-2222-222222222204', '2024004', 'Dewi Kartika Sari', 'Semarang', '2011-07-18', 'P', '7A', 'Dra. Siti Aminah, M.Pd'),
  ('22222222-2222-2222-2222-222222222205', '2024005', 'Budi Santoso', 'Yogyakarta', '2011-09-25', 'L', '7A', 'Dra. Siti Aminah, M.Pd'),
  ('22222222-2222-2222-2222-222222222206', '2024006', 'Anisa Putri Rahma', 'Jakarta', '2011-04-30', 'P', '7A', 'Dra. Siti Aminah, M.Pd'),
  ('22222222-2222-2222-2222-222222222207', '2024007', 'Rafi Ahmad Hidayat', 'Bogor', '2011-11-12', 'L', '7A', 'Dra. Siti Aminah, M.Pd'),
  ('22222222-2222-2222-2222-222222222208', '2024008', 'Zahra Aulia', 'Depok', '2011-02-28', 'P', '7A', 'Dra. Siti Aminah, M.Pd');

-- 4. Students (Siswa) - Kelas 7B
INSERT INTO public.students (id, nis, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, kelas, nama_wali_kelas) VALUES
  ('22222222-2222-2222-2222-222222222209', '2024009', 'Dimas Arya Putra', 'Jakarta', '2011-06-05', 'L', '7B', 'Ir. Bambang Sutrisno, M.T'),
  ('22222222-2222-2222-2222-222222222210', '2024010', 'Nabila Azzahra', 'Tangerang', '2011-08-14', 'P', '7B', 'Ir. Bambang Sutrisno, M.T'),
  ('22222222-2222-2222-2222-222222222211', '2024011', 'Galih Pratama', 'Bekasi', '2011-10-21', 'L', '7B', 'Ir. Bambang Sutrisno, M.T'),
  ('22222222-2222-2222-2222-222222222212', '2024012', 'Aisyah Rahmawati', 'Cirebon', '2011-12-03', 'P', '7B', 'Ir. Bambang Sutrisno, M.T'),
  ('22222222-2222-2222-2222-222222222213', '2024013', 'Farhan Maulana', 'Jakarta', '2011-01-27', 'L', '7B', 'Ir. Bambang Sutrisno, M.T'),
  ('22222222-2222-2222-2222-222222222214', '2024014', 'Putri Ayu Lestari', 'Malang', '2011-03-09', 'P', '7B', 'Ir. Bambang Sutrisno, M.T'),
  ('22222222-2222-2222-2222-222222222215', '2024015', 'Rizky Ramadhan', 'Surabaya', '2011-05-16', 'L', '7B', 'Ir. Bambang Sutrisno, M.T'),
  ('22222222-2222-2222-2222-222222222216', '2024016', 'Maya Indah Permata', 'Jakarta', '2011-07-23', 'P', '7B', 'Ir. Bambang Sutrisno, M.T');

-- 5. Grades (Nilai) untuk siswa kelas 7A
INSERT INTO public.grades (student_id, subject_id, nilai_akhir, capaian_kompetensi, semester, tahun_pelajaran) VALUES
  -- Ahmad Rizki Pratama
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111101', 85, 'Menunjukkan pemahaman yang baik tentang nilai-nilai agama dan penerapannya dalam kehidupan sehari-hari.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111102', 82, 'Memahami dan mampu menerapkan nilai-nilai Pancasila dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111103', 88, 'Memiliki kemampuan berbahasa Indonesia yang sangat baik dalam lisan maupun tulisan.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111104', 90, 'Menguasai konsep matematika dengan sangat baik dan mampu menyelesaikan soal-soal kompleks.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111105', 87, 'Memahami konsep IPA dan mampu melakukan eksperimen dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111106', 83, 'Memahami materi IPS dan mampu menganalisis fenomena sosial.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111107', 86, 'Memiliki kemampuan bahasa Inggris yang baik dalam speaking dan writing.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111108', 80, 'Menunjukkan apresiasi yang baik terhadap seni dan budaya.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111109', 85, 'Aktif dalam kegiatan olahraga dan menunjukkan sportivitas.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111110', 82, 'Kreatif dalam menghasilkan karya prakarya.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111111', 78, 'Memahami bahasa Jawa dengan cukup baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111112', 92, 'Menguasai konsep informatika dengan sangat baik dan mampu membuat program sederhana.', '1', '2024/2025'),
  
  -- Siti Nurhaliza
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111101', 90, 'Menunjukkan pemahaman yang sangat baik tentang nilai-nilai agama.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111102', 88, 'Memahami dan mampu menerapkan nilai-nilai Pancasila dengan sangat baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111103', 92, 'Memiliki kemampuan berbahasa Indonesia yang sangat baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111104', 85, 'Menguasai konsep matematika dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111105', 88, 'Memahami konsep IPA dengan sangat baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111106', 90, 'Memahami materi IPS dengan sangat baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111107', 89, 'Memiliki kemampuan bahasa Inggris yang sangat baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111108', 95, 'Menunjukkan bakat luar biasa dalam seni dan budaya.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111109', 82, 'Aktif dalam kegiatan olahraga.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111110', 88, 'Sangat kreatif dalam menghasilkan karya prakarya.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111111', 85, 'Memahami bahasa Jawa dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111112', 86, 'Menguasai konsep informatika dengan baik.', '1', '2024/2025'),

  -- Muhammad Fajar
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111101', 82, 'Memahami nilai-nilai agama dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111102', 80, 'Memahami nilai-nilai Pancasila dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111103', 78, 'Memiliki kemampuan berbahasa Indonesia yang cukup baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111104', 92, 'Menguasai konsep matematika dengan sangat baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111105', 90, 'Memahami konsep IPA dengan sangat baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111106', 75, 'Memahami materi IPS dengan cukup baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111107', 80, 'Memiliki kemampuan bahasa Inggris yang baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111108', 75, 'Menunjukkan apresiasi yang cukup terhadap seni.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111109', 88, 'Sangat aktif dalam kegiatan olahraga.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111110', 78, 'Cukup kreatif dalam prakarya.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111111', 76, 'Memahami bahasa Jawa dengan cukup baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111112', 95, 'Menguasai konsep informatika dengan sangat baik.', '1', '2024/2025'),

  -- Dewi Kartika Sari
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111101', 88, 'Memahami nilai-nilai agama dengan sangat baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111102', 85, 'Memahami nilai-nilai Pancasila dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111103', 90, 'Memiliki kemampuan berbahasa Indonesia yang sangat baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111104', 82, 'Menguasai konsep matematika dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111105', 85, 'Memahami konsep IPA dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111106', 88, 'Memahami materi IPS dengan sangat baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111107', 87, 'Memiliki kemampuan bahasa Inggris yang baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111108', 92, 'Menunjukkan bakat dalam seni dan budaya.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111109', 80, 'Aktif dalam kegiatan olahraga.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111110', 85, 'Kreatif dalam menghasilkan karya prakarya.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111111', 82, 'Memahami bahasa Jawa dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111112', 84, 'Menguasai konsep informatika dengan baik.', '1', '2024/2025'),

  -- Budi Santoso
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111101', 80, 'Memahami nilai-nilai agama dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111102', 78, 'Memahami nilai-nilai Pancasila dengan cukup baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111103', 82, 'Memiliki kemampuan berbahasa Indonesia yang baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111104', 78, 'Memahami konsep matematika dengan cukup baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111105', 80, 'Memahami konsep IPA dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111106', 82, 'Memahami materi IPS dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111107', 76, 'Memiliki kemampuan bahasa Inggris yang cukup.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111108', 78, 'Menunjukkan apresiasi terhadap seni.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111109', 90, 'Sangat aktif dan berprestasi dalam olahraga.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111110', 80, 'Cukup kreatif dalam prakarya.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111111', 80, 'Memahami bahasa Jawa dengan baik.', '1', '2024/2025'),
  ('22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111112', 82, 'Menguasai konsep informatika dengan baik.', '1', '2024/2025');

-- 6. Attendance (Ketidakhadiran)
INSERT INTO public.attendance (student_id, semester, tahun_pelajaran, sakit, izin, tanpa_keterangan) VALUES
  ('22222222-2222-2222-2222-222222222201', '1', '2024/2025', 2, 1, 0),
  ('22222222-2222-2222-2222-222222222202', '1', '2024/2025', 1, 0, 0),
  ('22222222-2222-2222-2222-222222222203', '1', '2024/2025', 3, 2, 1),
  ('22222222-2222-2222-2222-222222222204', '1', '2024/2025', 0, 1, 0),
  ('22222222-2222-2222-2222-222222222205', '1', '2024/2025', 2, 0, 0),
  ('22222222-2222-2222-2222-222222222206', '1', '2024/2025', 1, 1, 0),
  ('22222222-2222-2222-2222-222222222207', '1', '2024/2025', 0, 0, 0),
  ('22222222-2222-2222-2222-222222222208', '1', '2024/2025', 1, 2, 0),
  ('22222222-2222-2222-2222-222222222209', '1', '2024/2025', 2, 1, 1),
  ('22222222-2222-2222-2222-222222222210', '1', '2024/2025', 0, 1, 0),
  ('22222222-2222-2222-2222-222222222211', '1', '2024/2025', 3, 0, 0),
  ('22222222-2222-2222-2222-222222222212', '1', '2024/2025', 1, 0, 0),
  ('22222222-2222-2222-2222-222222222213', '1', '2024/2025', 0, 2, 0),
  ('22222222-2222-2222-2222-222222222214', '1', '2024/2025', 2, 1, 0),
  ('22222222-2222-2222-2222-222222222215', '1', '2024/2025', 1, 0, 1),
  ('22222222-2222-2222-2222-222222222216', '1', '2024/2025', 0, 0, 0);

-- 7. Ekstrakurikuler
INSERT INTO public.ekstrakurikuler (student_id, semester, tahun_pelajaran, nama_kegiatan, predikat, keterangan) VALUES
  ('22222222-2222-2222-2222-222222222201', '1', '2024/2025', 'Pramuka', 'A', 'Sangat aktif dan menjadi pemimpin regu'),
  ('22222222-2222-2222-2222-222222222201', '1', '2024/2025', 'Basket', 'B', 'Aktif berlatih dan bermain dengan baik'),
  ('22222222-2222-2222-2222-222222222202', '1', '2024/2025', 'Paduan Suara', 'A', 'Memiliki suara yang merdu dan aktif dalam penampilan'),
  ('22222222-2222-2222-2222-222222222202', '1', '2024/2025', 'Pramuka', 'A', 'Sangat aktif dan disiplin'),
  ('22222222-2222-2222-2222-222222222203', '1', '2024/2025', 'Robotik', 'A', 'Sangat berbakat dalam pemrograman robot'),
  ('22222222-2222-2222-2222-222222222203', '1', '2024/2025', 'Futsal', 'B', 'Aktif berlatih'),
  ('22222222-2222-2222-2222-222222222204', '1', '2024/2025', 'Tari Tradisional', 'A', 'Menguasai berbagai tarian tradisional'),
  ('22222222-2222-2222-2222-222222222204', '1', '2024/2025', 'PMR', 'B', 'Aktif dalam kegiatan PMR'),
  ('22222222-2222-2222-2222-222222222205', '1', '2024/2025', 'Sepak Bola', 'A', 'Pemain inti tim sekolah'),
  ('22222222-2222-2222-2222-222222222205', '1', '2024/2025', 'Pramuka', 'B', 'Aktif dalam kegiatan'),
  ('22222222-2222-2222-2222-222222222209', '1', '2024/2025', 'English Club', 'A', 'Aktif dan fasih berbahasa Inggris'),
  ('22222222-2222-2222-2222-222222222210', '1', '2024/2025', 'Karya Ilmiah Remaja', 'A', 'Berhasil membuat penelitian yang baik'),
  ('22222222-2222-2222-2222-222222222211', '1', '2024/2025', 'Basket', 'B', 'Aktif dalam latihan'),
  ('22222222-2222-2222-2222-222222222212', '1', '2024/2025', 'Paduan Suara', 'A', 'Memiliki suara soprano yang bagus');

-- 8. Prestasi
INSERT INTO public.prestasi (student_id, semester, tahun_pelajaran, jenis_prestasi, tingkat, keterangan) VALUES
  ('22222222-2222-2222-2222-222222222201', '1', '2024/2025', 'Juara 1 Olimpiade Matematika', 'Kota', 'Meraih medali emas dalam olimpiade matematika tingkat kota'),
  ('22222222-2222-2222-2222-222222222202', '1', '2024/2025', 'Juara 2 Lomba Baca Puisi', 'Provinsi', 'Meraih juara 2 dalam lomba baca puisi tingkat provinsi'),
  ('22222222-2222-2222-2222-222222222202', '1', '2024/2025', 'Juara 1 Lomba Menyanyi Solo', 'Kota', 'Meraih juara 1 dalam lomba menyanyi solo'),
  ('22222222-2222-2222-2222-222222222203', '1', '2024/2025', 'Juara 1 Kompetisi Robotik', 'Nasional', 'Meraih juara 1 dalam kompetisi robotik tingkat nasional'),
  ('22222222-2222-2222-2222-222222222204', '1', '2024/2025', 'Juara 1 Lomba Tari', 'Provinsi', 'Meraih juara 1 dalam lomba tari tradisional'),
  ('22222222-2222-2222-2222-222222222205', '1', '2024/2025', 'Juara 2 Turnamen Sepak Bola', 'Kota', 'Tim sekolah meraih juara 2 dalam turnamen sepak bola'),
  ('22222222-2222-2222-2222-222222222209', '1', '2024/2025', 'Juara 1 Speech Contest', 'Kota', 'Meraih juara 1 dalam lomba pidato bahasa Inggris'),
  ('22222222-2222-2222-2222-222222222210', '1', '2024/2025', 'Juara 3 Lomba Karya Ilmiah', 'Provinsi', 'Meraih juara 3 dalam lomba karya ilmiah remaja');
