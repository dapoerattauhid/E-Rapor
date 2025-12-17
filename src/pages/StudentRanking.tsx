import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { useStudents, useSchoolSettings } from "@/hooks/useSupabaseData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function StudentRanking() {
  const { data: schoolSettings } = useSchoolSettings();
  const { data: students = [] } = useStudents();
  const [selectedClass, setSelectedClass] = useState<string>("all");

  // Get unique classes from students data
  const uniqueClasses = useMemo(() => {
    return [...new Set(students.map(s => s.kelas))].sort();
  }, [students]);

  const semester = schoolSettings?.semester || "1";
  const tahunPelajaran = schoolSettings?.tahun_pelajaran || "2024/2025";

  // Get grades for current semester
  const { data: grades = [] } = useQuery({
    queryKey: ["grades-for-ranking", semester, tahunPelajaran],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("grades")
        .select("student_id, nilai_akhir")
        .eq("semester", semester)
        .eq("tahun_pelajaran", tahunPelajaran);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Calculate rankings
  const rankings = useMemo(() => {
    // Calculate average for ALL students first (for class ranking)
    const allStudentAverages = students.map(student => {
      const studentGrades = grades.filter(g => g.student_id === student.id);
      const totalNilai = studentGrades.reduce((sum, g) => sum + Number(g.nilai_akhir), 0);
      const average = studentGrades.length > 0 ? totalNilai / studentGrades.length : 0;
      
      return {
        ...student,
        average: Math.round(average * 100) / 100,
        subjectCount: studentGrades.length,
      };
    });

    // Calculate class rankings
    const classRankings: Record<string, number> = {};
    const uniqueClasses = [...new Set(students.map(s => s.kelas))];
    
    uniqueClasses.forEach(kelas => {
      const classStudents = allStudentAverages
        .filter(s => s.kelas === kelas)
        .sort((a, b) => b.average - a.average);
      
      classStudents.forEach((student, index) => {
        classRankings[student.id] = index + 1;
      });
    });

    // Filter students by class if selected
    const filteredStudents = selectedClass === "all" 
      ? allStudentAverages 
      : allStudentAverages.filter(s => s.kelas === selectedClass);

    // Sort by average descending and assign overall/filtered rank
    return filteredStudents
      .sort((a, b) => b.average - a.average)
      .map((student, index) => ({
        ...student,
        rank: index + 1,
        classRank: classRankings[student.id],
      }));
  }, [students, grades, selectedClass]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return null;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500 hover:bg-yellow-600">Juara 1</Badge>;
    if (rank === 2) return <Badge className="bg-gray-400 hover:bg-gray-500">Juara 2</Badge>;
    if (rank === 3) return <Badge className="bg-amber-600 hover:bg-amber-700">Juara 3</Badge>;
    return <Badge variant="outline">{rank}</Badge>;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ranking Siswa</h1>
          <p className="text-muted-foreground">
            Peringkat siswa berdasarkan rata-rata nilai semester {semester === "1" ? "Ganjil" : "Genap"} {tahunPelajaran}
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Daftar Peringkat
              </CardTitle>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kelas</SelectItem>
                  {uniqueClasses.map((kelas) => (
                    <SelectItem key={kelas} value={kelas}>
                      {kelas}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {rankings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Belum ada data nilai untuk ditampilkan
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] text-center">
                        {selectedClass === "all" ? "Ranking Paralel" : "Ranking Kelas"}
                      </TableHead>
                      {selectedClass === "all" && (
                        <TableHead className="w-[100px] text-center">Ranking Kelas</TableHead>
                      )}
                      <TableHead>NIS</TableHead>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead className="text-center">Jumlah Mapel</TableHead>
                      <TableHead className="text-center">Rata-rata</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankings.map((student) => (
                      <TableRow 
                        key={student.id}
                        className={(selectedClass === "all" ? student.rank : student.classRank) <= 3 ? "bg-muted/30" : ""}
                      >
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {getRankIcon(selectedClass === "all" ? student.rank : student.classRank)}
                            {getRankBadge(selectedClass === "all" ? student.rank : student.classRank)}
                          </div>
                        </TableCell>
                        {selectedClass === "all" && (
                          <TableCell className="text-center">
                            <Badge variant="outline" className="font-semibold">
                              {student.classRank}
                            </Badge>
                          </TableCell>
                        )}
                        <TableCell className="font-mono">{student.nis}</TableCell>
                        <TableCell className="font-medium">{student.nama_lengkap}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{student.kelas}</Badge>
                        </TableCell>
                        <TableCell className="text-center">{student.subjectCount}</TableCell>
                        <TableCell className="text-center">
                          <span className={`font-bold ${student.average >= 80 ? "text-green-600" : student.average >= 70 ? "text-yellow-600" : "text-red-600"}`}>
                            {student.average.toFixed(2)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
