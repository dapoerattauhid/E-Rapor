-- Add urutan column to subjects table for manual ordering
ALTER TABLE public.subjects 
ADD COLUMN IF NOT EXISTS urutan integer DEFAULT 0;
