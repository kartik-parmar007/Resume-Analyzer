/*
  # Add verification status to profiles table

  1. Changes
    - Add is_verified column to profiles table
    - Set default value to false
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add is_verified column if it doesn't exist
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;

-- Create or update profile trigger to handle verification status
CREATE OR REPLACE FUNCTION handle_auth_user_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, is_verified)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.id::text),
    FALSE
  )
  ON CONFLICT (id) DO UPDATE
  SET username = EXCLUDED.username;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger to automatically create profile on user creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_auth_user_created();

-- Create RLS policy for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can read their own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Allow service role to create profiles (for the trigger)
CREATE POLICY "Service role can create profiles" 
ON profiles FOR INSERT 
TO service_role
WITH CHECK (true);
