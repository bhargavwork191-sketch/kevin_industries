-- Add order_index column to images table
ALTER TABLE images ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Create index for faster queries on order_index
CREATE INDEX IF NOT EXISTS idx_images_type_order ON images(type, order_index);

-- Update existing records to have proper order_index values
UPDATE images SET order_index = EXTRACT(EPOCH FROM created_at)::INTEGER WHERE order_index = 0;
