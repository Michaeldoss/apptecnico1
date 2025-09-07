-- Fix security vulnerability: Secure the usuarios table
-- The usuarios table currently has public read access which exposes user emails and names

-- First, ensure RLS is enabled on the usuarios table
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Drop any existing public read policies that might exist
DROP POLICY IF EXISTS "Enable read access for all users" ON public.usuarios;
DROP POLICY IF EXISTS "Public read access" ON public.usuarios;
DROP POLICY IF EXISTS "Leitura pública completa" ON public.usuarios;

-- Create secure RLS policies for the usuarios table

-- 1. Users can only read their own record
CREATE POLICY "Users can view their own record" 
ON public.usuarios 
FOR SELECT 
USING (auth.uid() = id);

-- 2. Allow authenticated users to insert their own record (for registration)
CREATE POLICY "Users can insert their own record" 
ON public.usuarios 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- 3. Users can update their own record
CREATE POLICY "Users can update their own record" 
ON public.usuarios 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 4. Create a security definer function to safely check user types for admin access
CREATE OR REPLACE FUNCTION public.get_current_user_type()
RETURNS TEXT AS $$
  SELECT tipo_usuario FROM public.usuarios WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- 5. Allow admins to view all records (but only if they are authenticated admins)
CREATE POLICY "Admins can view all records" 
ON public.usuarios 
FOR SELECT 
USING (public.get_current_user_type() = 'admin');

-- 6. Allow admins to update any record
CREATE POLICY "Admins can update all records" 
ON public.usuarios 
FOR UPDATE 
USING (public.get_current_user_type() = 'admin');

-- 7. Allow admins to delete records
CREATE POLICY "Admins can delete records" 
ON public.usuarios 
FOR DELETE 
USING (public.get_current_user_type() = 'admin');

-- Log this security fix
INSERT INTO public.security_logs (event_type, details, created_at) 
VALUES (
  'security_fix_applied', 
  '{"table": "usuarios", "fix": "Removed public read access and implemented proper RLS policies", "vulnerability": "Public access to user emails and names"}',
  now()
) ON CONFLICT DO NOTHING;

-- Create security_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  details jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on security_logs table
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can read security logs
CREATE POLICY "Only admins can view security logs" 
ON public.security_logs 
FOR SELECT 
USING (public.get_current_user_type() = 'admin');