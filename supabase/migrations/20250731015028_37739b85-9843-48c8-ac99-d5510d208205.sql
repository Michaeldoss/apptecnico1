-- Create admin table to match the existing user tables structure
CREATE TABLE IF NOT EXISTS public.admins (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nome text NOT NULL,
    email text NOT NULL UNIQUE,
    telefone text,
    foto_perfil_url text,
    perfil_completo boolean DEFAULT false,
    ativo boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Admins can view and edit their own data
CREATE POLICY "Admins podem ver e editar próprios dados"
ON public.admins
FOR ALL
USING (auth.uid()::text = id::text);

-- Only existing admins can view all admin records
CREATE POLICY "Admins podem ver outros admins"
ON public.admins
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM usuarios 
        WHERE usuarios.id::text = auth.uid()::text 
        AND usuarios.tipo_usuario = 'admin'
    )
);

-- Only existing admins can create new admin records
CREATE POLICY "Admins podem criar outros admins"
ON public.admins
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM usuarios 
        WHERE usuarios.id::text = auth.uid()::text 
        AND usuarios.tipo_usuario = 'admin'
    )
);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_admins_updated_at
    BEFORE UPDATE ON public.admins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Fix remaining function search paths
CREATE OR REPLACE FUNCTION public.update_atualizado_na_coluna()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;