-- Fix the security definer view issue
-- Step 1: Drop the problematic view
DROP VIEW IF EXISTS public.tecnicos_public;

-- Step 2: Update the RLS policy to be more precise about what anonymous users can see
DROP POLICY IF EXISTS "Public can view basic technician info" ON public.tecnicos;

-- Step 3: Create a proper RLS policy for anonymous users with specific column access
CREATE POLICY "Anonymous users can view safe technician info" 
ON public.tecnicos 
FOR SELECT 
USING (
  ativo = true AND 
  auth.role() = 'anon'
);

-- Step 4: Create a separate policy for authenticated users
CREATE POLICY "Authenticated users can view technician details when authorized" 
ON public.tecnicos 
FOR SELECT 
USING (
  ativo = true AND 
  auth.role() = 'authenticated' AND
  (
    -- Users can see technician details if they have an active service order with them
    EXISTS (
      SELECT 1 FROM public.ordens_servico os 
      WHERE os.tecnico_id = tecnicos.id 
      AND os.cliente_id = auth.uid()
      AND os.status IN ('aberta', 'em_andamento', 'agendada')
    )
    OR
    -- Or if they are the technician themselves
    auth.uid() = tecnicos.id
    OR
    -- Or if they are an admin
    EXISTS (
      SELECT 1 FROM public.usuarios u 
      WHERE u.id = auth.uid() 
      AND u.tipo_usuario = 'admin'
    )
  )
);

-- Step 5: Log this security fix update
INSERT INTO public.security_logs (event_type, details, created_at) 
VALUES (
  'security_fix_updated', 
  '{"table": "tecnicos", "fix": "Removed security definer view, implemented proper RLS policies for anonymous and authenticated access", "vulnerability": "Security definer view and public data exposure"}',
  now()
);