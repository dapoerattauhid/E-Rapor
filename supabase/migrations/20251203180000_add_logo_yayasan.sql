-- Add logo_yayasan_url column to school_settings table
ALTER TABLE public.school_settings 
ADD COLUMN IF NOT EXISTS logo_yayasan_url text;
