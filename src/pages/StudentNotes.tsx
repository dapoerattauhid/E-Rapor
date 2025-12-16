import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
    useStudents,
    useStudentNotes,
    useUpsertStudentNote,
    useSchoolSettings,
    DbStudentNote,
} from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, FileText } from "lucide-react";

export default function StudentNotes() {
    const { data: students = [], isLoading: studentsLoading } = useStudents();
    const { data: notes = [], isLoading: notesLoading } = useStudentNotes();
    const { data: schoolSettings } = useSchoolSettings();
    const upsertNote = useUpsertStudentNote();

    const [selectedKelas, setSelectedKelas] = useState<string>("");
    const [selectedStudent, setSelectedStudent] = useState<string>("");
    const [catatanWaliKelas, setCatatanWaliKelas] = useState<string>("");
    const [tanggapanOrangTua, setTanggapanOrangTua] = useState<string>("");

    const kelasList = useMemo(() => {
        const kelasSet = new Set(students.map((s) => s.kelas));
        return Array.from(kelasSet).sort();
    }, [students]);

    const filteredStudents = useMemo(() => {
        return students.filter((s) => s.kelas === selectedKelas).sort((a, b) =>
            a.nama_lengkap.localeCompare(b.nama_lengkap)
        );
    }, [students, selectedKelas]);

    const currentStudent = useMemo(() => {
        return students.find((s) => s.id === selectedStudent);
    }, [students, selectedStudent]);

    const currentNote = useMemo(() => {
        return notes.find(
            (n) =>
                n.student_id === selectedStudent &&
                n.semester === schoolSettings?.semester &&
                n.tahun_pelajaran === schoolSettings?.tahun_pelajaran
        );
    }, [notes, selectedStudent, schoolSettings]);

    // Update form when student or note changes
    useMemo(() => {
        if (currentNote) {
            setCatatanWaliKelas(currentNote.catatan_wali_kelas || "");
            setTanggapanOrangTua(currentNote.tanggapan_orang_tua || "");
        } else {
            setCatatanWaliKelas("");
            setTanggapanOrangTua("");
        }
    }, [currentNote]);

    const handleSave = async () => {
        if (!selectedStudent || !schoolSettings) {
            toast({
                title: "Error",
                description: "Pilih siswa terlebih dahulu",
                variant: "destructive",
            });
            return;
        }

        try {
            await upsertNote.mutateAsync({
                student_id: selectedStudent,
                semester: schoolSettings.semester,
                tahun_pelajaran: schoolSettings.tahun_pelajaran,
                catatan_wali_kelas: catatanWaliKelas || null,
                tanggapan_orang_tua: tanggapanOrangTua || null,
            });

            toast({
                title: "Berhasil",
                description: "Catatan berhasil disimpan",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    if (studentsLoading || notesLoading) {
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
            <ErrorBoundary>
                <div className="animate-slide-in">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold lg:text-3xl">Catatan Siswa</h1>
                        <p className="mt-1 text-muted-foreground">
                            Kelola catatan wali kelas dan tanggapan orang tua/wali per siswa
                        </p>
                    </div>

                    {/* Selection */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Pilih Siswa</CardTitle>
                            <CardDescription>
                                Pilih kelas dan siswa untuk mengelola catatan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Kelas</Label>
                                    <Select value={selectedKelas} onValueChange={(value) => {
                                        setSelectedKelas(value);
                                        setSelectedStudent("");
                                    }}>
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
                                                    {student.nama_lengkap} - {student.nis}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {currentStudent && (
                                <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
                                    <div className="grid gap-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Nama:</span>
                                            <span className="font-medium">{currentStudent.nama_lengkap}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">NIS:</span>
                                            <span className="font-medium">{currentStudent.nis}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Kelas:</span>
                                            <span className="font-medium">{currentStudent.kelas}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Wali Kelas:</span>
                                            <span className="font-medium">{currentStudent.nama_wali_kelas || "-"}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Notes Form */}
                    {selectedStudent ? (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Catatan Wali Kelas</CardTitle>
                                    <CardDescription>
                                        Catatan dari wali kelas untuk siswa (akan muncul di rapor)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={catatanWaliKelas}
                                        onChange={(e) => setCatatanWaliKelas(e.target.value)}
                                        placeholder="Masukkan catatan wali kelas untuk siswa..."
                                        className="min-h-32"
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Tanggapan Orang Tua/Wali</CardTitle>
                                    <CardDescription>
                                        Tanggapan dari orang tua/wali siswa (akan muncul di rapor)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={tanggapanOrangTua}
                                        onChange={(e) => setTanggapanOrangTua(e.target.value)}
                                        placeholder="Masukkan tanggapan orang tua/wali..."
                                        className="min-h-32"
                                    />
                                </CardContent>
                            </Card>

                            <div className="flex justify-end">
                                <Button onClick={handleSave} disabled={upsertNote.isPending}>
                                    {upsertNote.isPending ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="mr-2 h-4 w-4" />
                                    )}
                                    Simpan Catatan
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 py-16">
                            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                            <p className="text-muted-foreground">
                                Pilih kelas dan siswa untuk mengelola catatan
                            </p>
                        </div>
                    )}
                </div>
            </ErrorBoundary>
        </MainLayout>
    );
}
