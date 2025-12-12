-- Create a public storage bucket for 3D models
INSERT INTO storage.buckets (id, name, public)
VALUES ('models', 'models', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to models bucket
CREATE POLICY "Public read access for models"
ON storage.objects FOR SELECT
USING (bucket_id = 'models');

-- Allow authenticated users to upload models (for admin purposes)
CREATE POLICY "Authenticated users can upload models"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'models');