/*
  # Add username to profiles table

  1. Changes
    - Add username column to profiles table
    - Make username unique
    - Add not null constraint
  
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE profiles
ADD COLUMN username TEXT UNIQUE NOT NULL DEFAULT '';

-- Update the default value for existing rows
UPDATE profiles SET username = id::text WHERE username = '';

-- Remove the default value after updating existing rows
ALTER TABLE profiles ALTER COLUMN username DROP DEFAULT;

-- Disable RLS (not recommended for production)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Enable row security for profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert their own profile
CREATE POLICY "Users can create their own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Allow users to read their own profile
CREATE POLICY "Users can read their own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);