import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useStudents, useGrades, useAttendance, useSubjects, useSchoolSettings, useEkstrakurikuler, usePrestasi } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Printer, Loader2 } from "lucide-react";

export default function ReportPreview() {
  const { data: students = [], isLoading } = useStudents();
  const { data: grades = [] } = useGrades();
  const { data: attendance = [] } = useAttendance();
  const { data: subjects = [] } = useSubjects();
  const { data: schoolSettings } = useSchoolSettings();
  const { data: ekstrakurikuler = [] } = useEkstrakurikuler();
  const { data: prestasi = [] } = usePrestasi();

  const [selectedKelas, setSelectedKelas] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const reportRef = useRef<HTMLDivElement>(null);

  // Only HTML print is supported in this preview (PDF generation removed)

  // Fungsi baru: buka report sebagai HTML vektor untuk cetak (teks tetap teks)
  const handlePrintHTML = () => {
    if (!reportRef.current) return;

    const reportHTML = reportRef.current.innerHTML;

    // Minimal inline style khusus untuk window print supaya layout konsisten
    const printStyles = `
      body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; margin: 0; color: #000; }
      .print-report { padding: 0; background: #fff; color: #000; }
      .print-report h1, .print-report h2, .print-report h3, .print-report h4 { color: #000; }
      .kop-rapor { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom: 8px; padding: 6px 0; border-bottom: 3px double #000; }
      .kop-logos { display:flex; align-items:center; gap:8px; }
      .kop-logos img { display:block; height:80px; width:auto; max-width:100%; object-fit:contain; }
      table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 10pt; }
      col.no-col { width:5%; }
      col.subject-col { width:45%; }
      col.grade-col { width:15%; }
      col.competency-col { width:35%; }
      th, td { border: 1px solid #000; padding: 6px 6px; vertical-align: top; word-break: break-word; }
      th { background: #f0f0f0; text-align: center; font-weight: 600; }
      td[style*="text-align: center"], td[style*="text-align:center"] { text-align: center !important; }
      .student-info { display: block; margin-bottom: 8px; }
      .student-info .row { display:flex; justify-content:space-between; }
      .attendance_tbl td:first-child { width: 35%; font-weight: 600; }
      @page { size: A4; margin: 20mm 20mm 20mm 30mm; }
      @media print { button { display: none; } }
    `;

    const newWindow = window.open('', '_blank');
    if (!newWindow) return;

    newWindow.document.write(`
      <html>
        <head>
          <title>Preview Rapor - Print</title>
          <style>${printStyles}</style>
        </head>
        <body>
          <div class="print-report">${reportHTML}</div>
          <script>window.onload = function(){ setTimeout(()=>window.print(), 200); };</script>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const kelasList = [...new Set(students.map((s) => s.kelas))];
  const filteredStudents = students.filter((s) => s.kelas === selectedKelas);
  const currentStudent = students.find((s) => s.id === selectedStudent);
  const filteredSubjects = selectedKelas
    ? subjects.filter((s) => s.kelas && s.kelas.includes(selectedKelas))
    : [];

  const studentGrades = grades.filter(
    (g) =>
      g.student_id === selectedStudent &&
      g.semester === schoolSettings?.semester &&
      g.tahun_pelajaran === schoolSettings?.tahun_pelajaran
  );

  const studentAttendance = attendance.find(
    (a) =>
      a.student_id === selectedStudent &&
      a.semester === schoolSettings?.semester &&
      a.tahun_pelajaran === schoolSettings?.tahun_pelajaran
  );

  const studentEkstrakurikuler = ekstrakurikuler.filter(
    (e) =>
      e.student_id === selectedStudent &&
      e.semester === schoolSettings?.semester &&
      e.tahun_pelajaran === schoolSettings?.tahun_pelajaran
  );

  const studentPrestasi = prestasi.filter(
    (p) =>
      p.student_id === selectedStudent &&
      p.semester === schoolSettings?.semester &&
      p.tahun_pelajaran === schoolSettings?.tahun_pelajaran
  );

  // Debug logs removed for production

  const handlePrint = async () => {
    // Pastikan konten rapor benar-benar dirender sebelum cetak
    await new Promise(resolve => setTimeout(resolve, 100));

    // Tambahkan event listener untuk memastikan konten siap
    const printReportElement = reportRef.current;
    if (printReportElement) {
      // Force browser untuk merender ulang elemen sebelum cetak
      printReportElement.style.visibility = 'visible';
      printReportElement.style.display = 'block';
    }

    window.print();
  };

  // PDF generation removed; use HTML print instead

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="animate-slide-in">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between no-print">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">Preview Rapor</h1>
            <p className="mt-1 text-muted-foreground">
              Lihat preview rapor siswa sebelum dicetak
            </p>
          </div>
          {selectedStudent && (
            <Button onClick={handlePrintHTML} className="mr-2">
              <Printer className="mr-2 h-4 w-4" />
              Cetak (HTML)
            </Button>
          )}
        </div>

        {/* Selection */}
        <div className="mb-6 rounded-xl border border-border bg-card p-6 no-print">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Kelas</Label>
              <Select value={selectedKelas} onValueChange={setSelectedKelas}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {kelasList.map((kelas) => (
                    <SelectItem key={kelas} value={kelas}>
                      {kelas}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Siswa</Label>
              <Select
                value={selectedStudent}
                onValueChange={setSelectedStudent}
                disabled={!selectedKelas}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih siswa" />
                </SelectTrigger>
                <SelectContent>
                  {filteredStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.nama_lengkap}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Debug Section removed for production */}

        {/* Report Preview */}
        {selectedStudent && currentStudent ? (

              <div
                ref={reportRef}
                className="print-report rounded-xl border border-border bg-white p-6 animate-fade-in"
                style={{ color: '#1a1a1a', backgroundColor: '#ffffff' }}
              >
                {/* Kop Rapor */}
                <div className="kop-rapor mb-6" style={{display: 'flex', alignItems: 'center', paddingBottom: '10px', borderBottom: '3px double black'}}>
                  <div className="kop-logos" style={{width: '15%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    {schoolSettings?.logo_url ? (
                      <img src={schoolSettings.logo_url} alt="Logo Sekolah" style={{height: '80px', width: 'auto', maxWidth: '100%', objectFit: 'contain'}} />
                    ) : null}
                  </div>

                  <div style={{width: '70%', textAlign: 'center', padding: '0 10px'}}>
                    {(schoolSettings as any)?.nama_yayasan && (
                      <p className="text-xs font-semibold uppercase" style={{margin: '0 0 4px 0'}}>
                        {(schoolSettings as any).nama_yayasan}
                      </p>
                    )}
                    <h2 className="text-lg font-bold uppercase" style={{margin: '0 0 4px 0'}}>
                      {schoolSettings?.nama_sekolah}
                    </h2>
                    <p className="text-xs" style={{margin: '0 0 2px 0'}}>{schoolSettings?.alamat}</p>
                    <p className="text-xs" style={{margin: '0 0 2px 0'}}>
                      {schoolSettings?.telepon && `Telp: ${schoolSettings.telepon}`}
                      {schoolSettings?.email && ` | Email: ${schoolSettings.email}`}
                    </p>
                    {schoolSettings?.website && (
                      <p className="text-xs" style={{margin: '0'}}>{schoolSettings.website}</p>
                    )}
                  </div>

                  <div className="kop-logos" style={{width: '15%', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                    {(schoolSettings as any)?.logo_yayasan_url ? (
                      <img src={(schoolSettings as any).logo_yayasan_url} alt="Logo Yayasan/Dinas" style={{height: '80px', width: 'auto', maxWidth: '100%', objectFit: 'contain'}} />
                    ) : null}
                  </div>
                </div>

                {/* Title */}
                <div style={{textAlign: 'center', marginBottom: '24px', margin: '0 auto 24px auto'}}>
                  <h3 style={{fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 8px 0'}}>
                    SUMATIF KOMPETENSI PESERTA DIDIK
                  </h3>
                  <p style={{fontSize: '14px', margin: '0'}}>
                    PENILAIAN AKHIR SEMESTER
                  </p>
                </div>

                {/* Student Info - two column layout */}
                <table className="borderless-table w-full mb-4" style={{border: 'none', borderCollapse: 'collapse'}}>
                  <tbody>
                    <tr>
                      <td style={{width: '18%', border: 'none', padding: '4px 0'}}>Nama Lengkap</td>
                      <td style={{width: '2%', border: 'none', padding: '4px 0', textAlign: 'center'}}>:</td>
                      <td style={{width: '30%', border: 'none', padding: '4px 0'}}>{currentStudent.nama_lengkap}</td>
                      <td style={{width: '15%', border: 'none', padding: '4px 0'}}>Kelas / Fase</td>
                      <td style={{width: '2%', border: 'none', padding: '4px 0', textAlign: 'center'}}>:</td>
                      <td style={{width: '33%', border: 'none', padding: '4px 0'}}>{currentStudent.kelas}</td>
                    </tr>
                    <tr>
                      <td style={{width: '18%', border: 'none', padding: '4px 0'}}>NISN</td>
                      <td style={{width: '2%', border: 'none', padding: '4px 0', textAlign: 'center'}}>:</td>
                      <td style={{width: '30%', border: 'none', padding: '4px 0'}}>{currentStudent.nis}</td>
                      <td style={{width: '15%', border: 'none', padding: '4px 0'}}>Semester</td>
                      <td style={{width: '2%', border: 'none', padding: '4px 0', textAlign: 'center'}}>:</td>
                      <td style={{width: '33%', border: 'none', padding: '4px 0'}}>{schoolSettings?.semester === "1" ? "Ganjil" : "Genap"}</td>
                    </tr>
                    <tr>
                      <td style={{width: '18%', border: 'none', padding: '4px 0'}}>NPSN</td>
                      <td style={{width: '2%', border: 'none', padding: '4px 0', textAlign: 'center'}}>:</td>
                      <td style={{width: '30%', border: 'none', padding: '4px 0'}}>{schoolSettings?.npsn}</td>
                      <td style={{width: '15%', border: 'none', padding: '4px 0'}}>Tahun Ajaran</td>
                      <td style={{width: '2%', border: 'none', padding: '4px 0', textAlign: 'center'}}>:</td>
                      <td style={{width: '33%', border: 'none', padding: '4px 0'}}>{schoolSettings?.tahun_pelajaran}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Grades Header */}
                <h4 className="font-semibold mb-2" style={{margin: '16px 0 8px 0'}}>A. Nilai Akademik</h4>

                {/* Grades Table */}
                <table className="grades_tbl w-full border border-gray-300 border-collapse mb-4">
                  <colgroup>
                    <col className="no-col" />
                    <col className="subject-col" />
                    <col className="grade-col" />
                    <col className="competency-col" />
                  </colgroup>
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 no-col" style={{textAlign: 'center'}}>No</th>
                      <th className="border border-gray-300 p-2 subject-col">Mata Pelajaran</th>
                      <th className="border border-gray-300 p-2 grade-col" style={{textAlign: 'center'}}>Nilai</th>
                      <th className="border border-gray-300 p-2 competency-col">Capaian Kompetensi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.map((subject, index) => {
                      const grade = studentGrades.find((g) => g.subject_id === subject.id);
                      return (
                        <tr key={subject.id}>
                          <td className="border border-gray-300 p-2 no-col" style={{textAlign: 'center'}}>{index + 1}</td>
                          <td className="border border-gray-300 p-2 subject-col">{subject.nama}</td>
                          <td className="border border-gray-300 p-2 font-medium grade-col" style={{textAlign: 'center'}}>
                            {grade?.nilai_akhir || "-"}
                          </td>
                          <td className="border border-gray-300 p-2 competency-col">
                            {grade?.capaian_kompetensi || "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Attendance (vertical layout) */}
                <h4 className="font-semibold mb-2" style={{margin: '16px 0 8px 0'}}>B. Ketidakhadiran</h4>
                <table className="attendance_tbl w-full border border-gray-300 border-collapse mb-8">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2" style={{width: '85%'}}>Sakit</td>
                      <td className="border border-gray-300 p-2" style={{width: '15%', textAlign: 'center'}}>{studentAttendance?.sakit || 0} hari</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Izin</td>
                      <td className="border border-gray-300 p-2" style={{textAlign: 'center'}}>{studentAttendance?.izin || 0} hari</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Tanpa Keterangan</td>
                      <td className="border border-gray-300 p-2" style={{textAlign: 'center'}}>{studentAttendance?.tanpa_keterangan || 0} hari</td>
                    </tr>
                  </tbody>
                </table>

                {/* C. Ekstrakurikuler */}
                <h4 className="font-semibold mb-2" style={{margin: '16px 0 8px 0'}}>C. Ekstrakurikuler</h4>
                <table className="w-full border border-gray-300 border-collapse mb-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2" style={{width: '5%', textAlign: 'center'}}>No</th>
                      <th className="border border-gray-300 p-2" style={{width: '45%'}}>Kegiatan Ekstrakurikuler</th>
                      <th className="border border-gray-300 p-2" style={{width: '15%', textAlign: 'center'}}>Predikat</th>
                      <th className="border border-gray-300 p-2" style={{width: '35%'}}>Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentEkstrakurikuler.length > 0 ? (
                      studentEkstrakurikuler.map((e, index) => (
                        <tr key={e.id}>
                          <td className="border border-gray-300 p-2" style={{textAlign: 'center'}}>{index + 1}</td>
                          <td className="border border-gray-300 p-2">{e.nama_kegiatan}</td>
                          <td className="border border-gray-300 p-2" style={{textAlign: 'center'}}>{e.predikat || '-'}</td>
                          <td className="border border-gray-300 p-2">{e.keterangan || '-'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="border border-gray-300 p-2 text-center" colSpan={4} style={{height: '40px'}}>-</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* D. Prestasi */}
                <h4 className="font-semibold mb-2" style={{margin: '16px 0 8px 0'}}>D. Prestasi</h4>
                <table className="w-full border border-gray-300 border-collapse mb-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2" style={{width: '5%', textAlign: 'center'}}>No</th>
                      <th className="border border-gray-300 p-2" style={{width: '45%'}}>Jenis Prestasi</th>
                      <th className="border border-gray-300 p-2" style={{width: '15%', textAlign: 'center'}}>Tingkat</th>
                      <th className="border border-gray-300 p-2" style={{width: '35%'}}>Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentPrestasi.length > 0 ? (
                      studentPrestasi.map((p, index) => (
                        <tr key={p.id}>
                          <td className="border border-gray-300 p-2" style={{textAlign: 'center'}}>{index + 1}</td>
                          <td className="border border-gray-300 p-2">{p.jenis_prestasi}</td>
                          <td className="border border-gray-300 p-2" style={{textAlign: 'center'}}>{p.tingkat || '-'}</td>
                          <td className="border border-gray-300 p-2">{p.keterangan || '-'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="border border-gray-300 p-2 text-center" colSpan={4} style={{height: '40px'}}>-</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* E. Catatan Wali Kelas */}
                <h4 className="font-semibold mb-2" style={{margin: '16px 0 8px 0'}}>E. Catatan Wali Kelas</h4>
                <div style={{border: '1px solid #333', padding: '12px', minHeight: '80px', marginBottom: '16px'}}>
                  {/* Space untuk catatan */}
                </div>

                {/* F. Tanggapan Orang Tua/Wali */}
                <h4 className="font-semibold mb-2" style={{margin: '16px 0 8px 0'}}>F. Tanggapan Orang Tua/Wali</h4>
                <div style={{border: '1px solid #333', padding: '12px', minHeight: '80px', marginBottom: '24px'}}>
                  {/* Space untuk tanggapan */}
                </div>

                {/* Signatures - Wali Murid (kiri) & Wali Kelas (kanan) */}
                <div style={{marginTop: '40px'}}></div>
                <table className="borderless-table w-full" style={{fontSize: '11pt'}}>
                  <tbody>
                    <tr>
                      <td style={{width: '50%', textAlign: 'center', border: 'none', padding: '0 30px 0 0', verticalAlign: 'top'}}>
                        <div style={{marginBottom: '8px'}}>Mengetahui,</div>
                        <div style={{marginBottom: '8px'}}>Orang Tua/Wali</div>
                        <div style={{marginTop: '60px'}}></div>
                        <div style={{borderBottom: '1px solid #000', width: '70mm', margin: '0 auto'}}></div>
                      </td>
                      <td style={{width: '50%', textAlign: 'center', border: 'none', padding: '0 0 0 30px', verticalAlign: 'top'}}>
                        <div style={{marginBottom: '8px'}}>Wali Kelas</div>
                        <div style={{marginBottom: '8px'}}>&nbsp;</div>
                        <div style={{marginTop: '60px'}}></div>
                        <div style={{borderBottom: '1px solid #000', width: '70mm', margin: '0 auto'}}></div>
                        <div style={{marginTop: '4px'}}>{currentStudent?.nama_wali_kelas || '.........................'}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Kepala Sekolah - tengah bawah dengan tanggal */}
                <div style={{marginTop: '30px'}}></div>
                <table className="borderless-table w-full" style={{fontSize: '11pt'}}>
                  <tbody>
                    <tr>
                      <td style={{textAlign: 'center', border: 'none', padding: '0'}}>
                        <div style={{marginBottom: '8px'}}>Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        <div style={{marginBottom: '8px'}}>Mengetahui,</div>
                        <div style={{marginBottom: '8px'}}>Kepala Sekolah</div>
                        <div style={{marginTop: '60px'}}></div>
                        <div style={{borderBottom: '1px solid #000', width: '70mm', margin: '0 auto'}}></div>
                        <div style={{marginTop: '4px'}}>{schoolSettings?.nama_kepala_sekolah || '.........................'}</div>
                        <div style={{fontSize: '10pt'}}>{(schoolSettings as any)?.niy_kepala_sekolah ? `NIY. ${(schoolSettings as any).niy_kepala_sekolah}` : ''}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 py-16 no-print">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              Pilih kelas dan siswa untuk melihat preview rapor
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
