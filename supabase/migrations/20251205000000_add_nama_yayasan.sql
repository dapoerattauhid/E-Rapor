-- Add nama_yayasan column to school_settings table
ALTER TABLE public.school_settings 
ADD COLUMN IF NOT EXISTS nama_yayasan text;
