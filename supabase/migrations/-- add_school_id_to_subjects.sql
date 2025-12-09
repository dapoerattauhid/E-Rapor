-- add_school_id_to_subjects.sql
ALTER TABLE public.subjects
ADD COLUMN IF NOT EXISTS school_id uuid;

ALTER TABLE public.subjects
ADD CONSTRAINT subjects_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(id);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- add_school_id_to_students.sql
ALTER TABLE public.students
ADD COLUMN IF NOT EXISTS school_id uuid;

-- add_school_id_to_user_roles.sql
ALTER TABLE public.user_roles
ADD COLUMN IF NOT EXISTS school_id uuid;

CREATE POLICY "Subjects: select only same school" ON public.subjects
FOR SELECT USING (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.school_id = school_id
  )
);

CREATE POLICY "Subjects: insert for admin" ON public.subjects
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles r
    WHERE r.user_id = auth.uid()
      AND r.role = 'admin'
      AND r.school_id = school_id
  )
);

CREATE POLICY "Subjects: update/delete for admin" ON public.subjects
FOR UPDATE, DELETE USING (
  EXISTS (
    SELECT 1 FROM public.user_roles r
    WHERE r.user_id = auth.uid()
      AND r.role = 'admin'
      AND r.school_id = school_id
  )
);

from('subjects').select('*').eq('school_id', schoolId).order('urutan', {ascending: true})