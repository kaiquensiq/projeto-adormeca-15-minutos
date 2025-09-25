-- Sono em 15 - Storage Configuration
-- Execute these commands in your Supabase SQL Editor after running schema.sql

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Note: RLS and policies for storage.objects are managed automatically by Supabase
-- The bucket configuration above is sufficient for basic avatar upload functionality

-- Function to get avatar public URL
CREATE OR REPLACE FUNCTION get_avatar_url(avatar_path TEXT)
RETURNS TEXT AS $$
BEGIN
  IF avatar_path IS NULL OR avatar_path = '' THEN
    RETURN NULL;
  END IF;
  
  RETURN 'https://zvcxfminwipfjbcndkax.supabase.co/storage/v1/object/public/avatars/' || avatar_path;
END;
$$ LANGUAGE plpgsql;

-- Update users table to use storage URLs
-- This is optional - you can keep using direct URLs if preferred
-- ALTER TABLE users ADD COLUMN avatar_path TEXT;
-- UPDATE users SET avatar_path = avatar WHERE avatar IS NOT NULL;
-- ALTER TABLE users DROP COLUMN avatar;
-- ALTER TABLE users RENAME COLUMN avatar_path TO avatar;