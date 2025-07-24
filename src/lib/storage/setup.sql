-- Supabase Storage Bucket Setup
-- Run this in Supabase SQL Editor

-- Create the complaints bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('complaints', 'complaints', true);

-- Set up storage policies for the complaints bucket
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'complaints');

-- Allow users to view their own files
CREATE POLICY "Users can view their own files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'complaints' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'complaints' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access to files (optional - remove if files should be private)
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'complaints');