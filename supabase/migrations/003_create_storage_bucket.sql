-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('kevin-industries-images', 'kevin-industries-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for public read access
CREATE POLICY "Public read access for images" ON storage.objects
FOR SELECT USING (bucket_id = 'kevin-industries-images');

-- Create storage policies for authenticated users to upload
CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'kevin-industries-images' 
  AND auth.role() = 'authenticated'
);

-- Create storage policies for authenticated users to update
CREATE POLICY "Authenticated users can update images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'kevin-industries-images' 
  AND auth.role() = 'authenticated'
);

-- Create storage policies for authenticated users to delete
CREATE POLICY "Authenticated users can delete images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'kevin-industries-images' 
  AND auth.role() = 'authenticated'
);
