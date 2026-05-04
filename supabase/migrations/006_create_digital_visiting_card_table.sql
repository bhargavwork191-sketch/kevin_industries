-- Create digital_visiting_card table for storing digital visiting card PDF
CREATE TABLE IF NOT EXISTS digital_visiting_card (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT DEFAULT 'application/pdf',
  title TEXT DEFAULT 'Digital Visiting Card',
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_digital_visiting_card_active ON digital_visiting_card(is_active);
CREATE INDEX IF NOT EXISTS idx_digital_visiting_card_created_at ON digital_visiting_card(created_at DESC);

-- Create updated_at trigger
CREATE TRIGGER update_digital_visiting_card_updated_at 
    BEFORE UPDATE ON digital_visiting_card 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for digital visiting cards if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('digital-visiting-card', 'digital-visiting-card', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for digital_visiting_card table
ALTER TABLE digital_visiting_card ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active digital visiting cards
CREATE POLICY "Public can view active digital visiting cards" ON digital_visiting_card
    FOR SELECT USING (is_active = true);

-- Allow authenticated users to manage digital visiting cards (for admin)
CREATE POLICY "Authenticated users can manage digital visiting cards" ON digital_visiting_card
    FOR ALL USING (auth.role() = 'authenticated');
