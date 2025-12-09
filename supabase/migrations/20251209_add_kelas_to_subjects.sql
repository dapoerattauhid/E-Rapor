-- Add kelas column to subjects table
-- This allows subjects to be assigned to specific classes
ALTER TABLE public.subjects ADD COLUMN kelas TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Create index for better query performance
CREATE INDEX idx_subjects_kelas ON public.subjects USING GIN(kelas);
