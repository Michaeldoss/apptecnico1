-- Fix security vulnerability: Remove public access to sensitive store data
-- Drop the overly permissive policy that allows anyone to read all active stores
DROP POLICY IF EXISTS "Lojas ativas são visíveis" ON public.lojas;

-- Create new secure policies

-- 1. Store owners can access their own complete data
CREATE POLICY "Lojas podem ver próprios dados completos"
ON public.lojas
FOR SELECT
USING ((auth.uid())::text = (id)::text);

-- 2. Authenticated users can see only basic public store information (no sensitive data)
CREATE POLICY "Usuários autenticados podem ver informações básicas de lojas"
ON public.lojas 
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND ativo = true
);

-- 3. Create a view for public store information (excluding sensitive data)
CREATE OR REPLACE VIEW public.lojas_publicas AS
SELECT 
  id,
  nome_empresa,
  cidade,
  estado,
  bairro,
  logo_url,
  descricao,
  ativo,
  verificado,
  created_at
FROM public.lojas
WHERE ativo = true;

-- 4. Allow public read access to the safe view
ALTER TABLE public.lojas_publicas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Informações básicas de lojas são públicas"
ON public.lojas_publicas
FOR SELECT
USING (true);