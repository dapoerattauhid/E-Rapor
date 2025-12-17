-- Add tanggal_rapor column to school_settings table
ALTER TABLE public.school_settings 
ADD COLUMN tanggal_rapor date;