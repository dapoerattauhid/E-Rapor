import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  useStudents, 
  useSubjects, 
  useGrades, 
  useSchoolSettings, 
  useLockedReports,
  useUpsertGrade 
} from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Save, BookOpen, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { getGradeDescription } from "@/types/rapor";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function GradeInput() {
  const { data: students = [] } = useStudents();
  const { data: subjects = [] } = useSubjects();
  const { data: grades = [] } = useGrades();
  const { data: schoolSettings } = useSchoolSettings();
  const { data: lockedReports = [] } = useLockedReports();
  const upsertGrade = useUpsertGrade();

  const [selectedKelas, setSelectedKelas] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [gradesData, setGradesData] = useState<
    Record<string, { nilai_akhir: string; capaian_kompetensi: string }>
  >({});
  const [savingStudentId, setSavingStudentId] = useState<string | null>(null);

  const kelasList = [...new Set(students.map((s) => s.kelas))];
  const filteredStudents = students.filter((s) => s.kelas === selectedKelas);
  const filteredSubjects = selectedKelas 
    ? subjects.filter((s) => s.kelas && s.kelas.includes(selectedKelas))
    : [];
  const currentSubject = subjects.find((s) => s.id === selectedSubject);

  const isReportLocked = (studentId: string) => {
    if (!schoolSettings) return false;
    return lockedReports.some(
      (r) =>
        r.student_id === studentId &&
        r.semester === schoolSettings.semester &&
        r.tahun_pelajaran === schoolSettings.tahun_pelajaran
    );
  };

  // Load existing grades when kelas and subject are selected
  useEffect(() => {
    if (selectedKelas && selectedSubject && schoolSettings) {
      const newGradesData: Record<
        string,
        { nilai_akhir: string; capaian_kompetensi: string }
      > = {};

      filteredStudents.forEach((student) => {
        const existingGrade = grades.find(
          (g) =>
            g.student_id === student.id &&
            g.subject_id === selectedSubject &&
            g.semester === schoolSettings.semester &&
            g.tahun_pelajaran === schoolSettings.tahun_pelajaran
        );

        newGradesData[student.id] = {
          nilai_akhir: existingGrade?.nilai_akhir?.toString() || "",
          capaian_kompetensi: existingGrade?.capaian_kompetensi || "",
        };
      });

      setGradesData(newGradesData);
    }
  }, [selectedKelas, selectedSubject, schoolSettings]);

  const handleNilaiChange = (studentId: string, value: string) => {
    // Validasi: hanya biarkan angka 0-100
    let finalValue = value;
    if (value !== "") {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        if (numValue > 100) {
          finalValue = "100";
        } else if (numValue < 0) {
          finalValue = "0";
        } else {
          finalValue = numValue.toString();
        }
      }
    }

    setGradesData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        nilai_akhir: finalValue,
      },
    }));

    const numValue = parseInt(finalValue);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100 && currentSubject) {
      const description = getGradeDescription(numValue, currentSubject.nama);
      setGradesData((prev) => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          capaian_kompetensi: description,
        },
      }));
    }
  };

  const handleGenerateDescription = (studentId: string) => {
    const nilaiAkhir = gradesData[studentId]?.nilai_akhir || "";
    const numValue = parseInt(nilaiAkhir);
    if (!isNaN(numValue) && currentSubject) {
      const description = getGradeDescription(numValue, currentSubject.nama);
      setGradesData((prev) => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          capaian_kompetensi: description,
        },
      }));
    }
  };

  const handleSaveStudent = async (studentId: string) => {
    if (!schoolSettings) {
      toast({
        title: "Error",
        description: "Harap lengkapi pengaturan sekolah terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    if (isReportLocked(studentId)) {
      toast({
        title: "Rapor Terkunci",
        description: "Tidak dapat mengubah nilai karena rapor sudah dikunci.",
        variant: "destructive",
      });
      return;
    }

    const studentGrades = gradesData[studentId];
    if (!studentGrades.nilai_akhir || !studentGrades.capaian_kompetensi) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Harap isi nilai dan capaian kompetensi terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    const nilaiAkhirNum = parseInt(studentGrades.nilai_akhir);
    if (isNaN(nilaiAkhirNum) || nilaiAkhirNum < 0 || nilaiAkhirNum > 100) {
      toast({
        title: "Nilai Tidak Valid",
        description: "Nilai harus berada dalam rentang 0-100.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSavingStudentId(studentId);
      await upsertGrade.mutateAsync({
        student_id: studentId,
        subject_id: selectedSubject,
        nilai_akhir: nilaiAkhirNum,
        capaian_kompetensi: studentGrades.capaian_kompetensi,
        semester: schoolSettings.semester,
        tahun_pelajaran: schoolSettings.tahun_pelajaran,
      });

      const student = students.find((s) => s.id === studentId);
      toast({
        title: "Nilai Disimpan",
        description: `Nilai ${currentSubject?.nama} untuk ${student?.nama_lengkap} berhasil disimpan.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSavingStudentId(null);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl animate-slide-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold lg:text-3xl">Input Nilai</h1>
          <p className="mt-1 text-muted-foreground">
            Input nilai akhir dan capaian kompetensi siswa per kelas
          </p>
        </div>

        {/* Selection Card */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Pilih Kelas & Mata Pelajaran</h2>
              <p className="text-sm text-muted-foreground">
                Pilih kelas dan mata pelajaran untuk menginput nilai semua siswa dalam kelas tersebut
              </p>
            </div>
          </div>

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
              <Label>Mata Pelajaran</Label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
                disabled={!selectedKelas}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih mapel" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.nama}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground text-center">
                      Tidak ada mata pelajaran untuk kelas ini
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Grade Input Table */}
        {selectedKelas && selectedSubject && filteredStudents.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Input Nilai - {currentSubject?.nama}</h2>
              <p className="text-sm text-muted-foreground">
                Kelas {selectedKelas} • {filteredStudents.length} siswa
              </p>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">No</TableHead>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead className="w-32">Nilai (0-100)</TableHead>
                    <TableHead className="flex-1">Capaian Kompetensi</TableHead>
                    <TableHead className="w-20">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => {
                    const isLocked = isReportLocked(student.id);
                    const studentGrades = gradesData[student.id] || {
                      nilai_akhir: "",
                      capaian_kompetensi: "",
                    };
                    const isSaving = savingStudentId === student.id;

                    return (
                      <TableRow key={student.id} className={isLocked ? "opacity-60" : ""}>
                        <TableCell className="font-medium text-muted-foreground">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.nama_lengkap}</p>
                            {isLocked && (
                              <p className="text-xs text-warning">🔒 Rapor dikunci</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={studentGrades.nilai_akhir}
                            onChange={(e) =>
                              handleNilaiChange(student.id, e.target.value)
                            }
                            placeholder="0"
                            disabled={isLocked}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Textarea
                              value={studentGrades.capaian_kompetensi}
                              onChange={(e) =>
                                setGradesData((prev) => ({
                                  ...prev,
                                  [student.id]: {
                                    ...prev[student.id],
                                    capaian_kompetensi: e.target.value,
                                  },
                                }))
                              }
                              placeholder="Deskripsi..."
                              rows={1}
                              disabled={isLocked}
                              className="resize-none"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleGenerateDescription(student.id)}
                              disabled={
                                !studentGrades.nilai_akhir || isLocked
                              }
                              title="Generate otomatis"
                            >
                              <Sparkles className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleSaveStudent(student.id)}
                            disabled={
                              !studentGrades.nilai_akhir ||
                              !studentGrades.capaian_kompetensi ||
                              isLocked ||
                              isSaving
                            }
                            title="Simpan nilai siswa ini"
                          >
                            {isSaving ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {selectedKelas && selectedSubject && filteredStudents.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground">Tidak ada siswa di kelas ini</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
