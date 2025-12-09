import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useClasses, useAddClass, useUpdateClass, useDeleteClass } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

export default function Classes() {
  const { data: classes = [], isLoading } = useClasses();
  const addClass = useAddClass();
  const updateClass = useUpdateClass();
  const deleteClass = useDeleteClass();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");

  const reset = () => {
    setEditing(null);
    setName("");
  };

  const openDialog = (cls?: { id: string; nama: string }) => {
    if (cls) {
      setEditing(cls.id);
      setName(cls.nama);
    } else {
      reset();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast({ title: "Error", description: "Nama kelas harus diisi", variant: "destructive" });
    try {
      if (editing) {
        await updateClass.mutateAsync({ id: editing, nama: name.trim() });
        toast({ title: "Berhasil", description: "Kelas berhasil diperbarui" });
      } else {
        await addClass.mutateAsync({ nama: name.trim() });
        toast({ title: "Berhasil", description: "Kelas berhasil ditambahkan" });
      }
      setIsDialogOpen(false);
      reset();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Gagal menyimpan kelas", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteClass.mutateAsync(id);
      toast({ title: "Berhasil", description: "Kelas berhasil dihapus" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Gagal menghapus kelas", variant: "destructive" });
    }
  };

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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Kelola Kelas</h1>
            <p className="mt-1 text-muted-foreground">Tambahkan atau ubah daftar kelas</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="mr-2 h-4 w-4" /> Tambah Kelas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Kelas" : "Tambah Kelas"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nama Kelas</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: 7A" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                  <Button type="submit">Simpan</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16 text-center">No</TableHead>
                <TableHead>Nama Kelas</TableHead>
                <TableHead className="w-40 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-muted-foreground">Belum ada kelas</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                classes.map((cls, idx) => (
                  <TableRow key={cls.id}>
                    <TableCell className="text-center">{idx + 1}</TableCell>
                    <TableCell>{cls.nama}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog(cls)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Kelas?</AlertDialogTitle>
                              <p>Semua data yang merujuk ke kelas ini tidak otomatis diubah.</p>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(cls.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
