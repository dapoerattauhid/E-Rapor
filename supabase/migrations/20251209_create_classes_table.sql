-- Create classes table to manage class list centrally
CREATE TABLE IF NOT EXISTS public.classes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nama text NOT NULL UNIQUE,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Simple index
CREATE INDEX IF NOT EXISTS idx_classes_nama ON public.classes USING btree (nama);
