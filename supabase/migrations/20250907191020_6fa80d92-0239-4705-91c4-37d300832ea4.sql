-- Fix security vulnerability: Secure the usuarios table
-- Step 1: Create security_logs table first
CREATE TABLE IF NOT EXISTS public.security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  details jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Step 2: Enable RLS on security_logs table
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Step 3: Ensure RLS is enabled on the usuarios table
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop any existing public read policies that might exist
DROP POLICY IF EXISTS "Enable read access for all users" ON public.usuarios;
DROP POLICY IF EXISTS "Public read access" ON public.usuarios;
DROP POLICY IF EXISTS "Leitura pública completa" ON public.usuarios;

-- Step 5: Create a security definer function to safely check user types
CREATE OR REPLACE FUNCTION public.get_current_user_type()
RETURNS TEXT AS $$
  SELECT tipo_usuario FROM public.usuarios WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Step 6: Create secure RLS policies for the usuarios table

-- Users can only read their own record
CREATE POLICY "Users can view their own record" 
ON public.usuarios 
FOR SELECT 
USING (auth.uid() = id);

-- Allow authenticated users to insert their own record (for registration)
CREATE POLICY "Users can insert their own record" 
ON public.usuarios 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Users can update their own record
CREATE POLICY "Users can update their own record" 
ON public.usuarios 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow admins to view all records (but only if they are authenticated admins)
CREATE POLICY "Admins can view all records" 
ON public.usuarios 
FOR SELECT 
USING (public.get_current_user_type() = 'admin');

-- Allow admins to update any record
CREATE POLICY "Admins can update all records" 
ON public.usuarios 
FOR UPDATE 
USING (public.get_current_user_type() = 'admin');

-- Allow admins to delete records
CREATE POLICY "Admins can delete records" 
ON public.usuarios 
FOR DELETE 
USING (public.get_current_user_type() = 'admin');

-- Step 7: Secure the security_logs table - only admins can view security logs
CREATE POLICY "Only admins can view security logs" 
ON public.security_logs 
FOR SELECT 
USING (public.get_current_user_type() = 'admin');

-- Step 8: Log this security fix
INSERT INTO public.security_logs (event_type, details, created_at) 
VALUES (
  'security_fix_applied', 
  '{"table": "usuarios", "fix": "Removed public read access and implemented proper RLS policies", "vulnerability": "Public access to user emails and names"}',
  now()
);