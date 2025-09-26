-- Company Profile Setup Script
-- Run this script in your Supabase SQL editor to set up the company profile functionality

-- Create company_profile table for storing PDF files
CREATE TABLE IF NOT EXISTS company_profile (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT DEFAULT 'application/pdf',
  title TEXT DEFAULT 'Company Profile',
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_company_profile_active ON company_profile(is_active);
CREATE INDEX IF NOT EXISTS idx_company_profile_created_at ON company_profile(created_at DESC);

-- Create updated_at trigger (if the function doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_company_profile_updated_at 
    BEFORE UPDATE ON company_profile 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for PDFs if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('company-profile', 'company-profile', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for company_profile table
ALTER TABLE company_profile ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active company profiles
CREATE POLICY "Public can view active company profiles" ON company_profile
    FOR SELECT USING (is_active = true);

-- Allow authenticated users to manage company profiles (for admin)
CREATE POLICY "Authenticated users can manage company profiles" ON company_profile
    FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT SELECT ON company_profile TO anon;
GRANT ALL ON company_profile TO authenticated;
GRANT USAGE ON SEQUENCE company_profile_id_seq TO authenticated;
