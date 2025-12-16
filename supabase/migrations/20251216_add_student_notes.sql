-- Create student_notes table for teacher notes and parent responses
CREATE TABLE public.student_notes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    semester text NOT NULL,
    tahun_pelajaran text NOT NULL,
    catatan_wali_kelas text,
    tanggapan_orang_tua text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE,
    UNIQUE (student_id, semester, tahun_pelajaran)
);

-- Enable Row Level Security
ALTER TABLE public.student_notes ENABLE ROW LEVEL SECURITY;

-- Create update trigger for student_notes
CREATE TRIGGER update_student_notes_updated_at 
BEFORE UPDATE ON public.student_notes 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add RLS Policies for student_notes
-- Admins can manage all student notes
CREATE POLICY "Admins can manage all student notes" 
ON public.student_notes 
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Users can manage student notes for students in their assigned classes
CREATE POLICY "Users can manage student notes for students in their assigned classes" 
ON public.student_notes 
USING ((EXISTS (
    SELECT 1 FROM public.students s 
    WHERE ((s.id = student_notes.student_id) AND public.has_class_access(auth.uid(), s.kelas))
)));
