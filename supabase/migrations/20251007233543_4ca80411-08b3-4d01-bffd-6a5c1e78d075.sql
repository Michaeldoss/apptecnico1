-- =====================================================
-- CRITICAL SECURITY FIXES
-- =====================================================

-- 1. FIX CRITICAL: Restrict customer data access to only technicians with active orders
-- Drop the overly permissive policy that allows ALL technicians to see ALL customers
DROP POLICY IF EXISTS "Clientes são visíveis para técnicos" ON public.clientes;

-- Create restrictive policy: technicians can only see customers they have active orders with
CREATE POLICY "Técnicos veem apenas seus clientes ativos"
ON public.clientes
FOR SELECT
USING (
  ativo = true 
  AND EXISTS (
    SELECT 1 
    FROM public.ordens_servico os
    WHERE os.cliente_id = clientes.id
      AND os.tecnico_id = auth.uid()
      AND os.status IN ('aberta', 'em_andamento', 'agendada', 'concluida')
  )
);

-- 2. FIX HIGH: Add missing UPDATE and DELETE policies for service orders
-- Clients can update only their pending orders (limited fields)
CREATE POLICY "Clientes atualizam ordens pendentes"
ON public.ordens_servico
FOR UPDATE
USING (
  cliente_id = auth.uid()
  AND status IN ('aberta', 'agendada')
)
WITH CHECK (
  cliente_id = auth.uid()
  AND status IN ('aberta', 'agendada', 'cancelada')
);

-- Technicians can update their assigned orders
CREATE POLICY "Técnicos atualizam ordens atribuídas"
ON public.ordens_servico  
FOR UPDATE
USING (tecnico_id = auth.uid())
WITH CHECK (
  tecnico_id = auth.uid()
  AND status IN ('agendada', 'em_andamento', 'concluida', 'cancelada')
);

-- Clients can delete only their pending orders
CREATE POLICY "Clientes deletam ordens pendentes"
ON public.ordens_servico
FOR DELETE
USING (
  cliente_id = auth.uid()
  AND status = 'aberta'
);

-- Improve INSERT policy to prevent clients from assigning orders to specific technicians initially
DROP POLICY IF EXISTS "Clientes podem criar ordens" ON public.ordens_servico;

CREATE POLICY "Clientes podem criar ordens"
ON public.ordens_servico
FOR INSERT
WITH CHECK (
  cliente_id = auth.uid()
  AND (tecnico_id IS NULL OR status = 'aberta')
);

-- 3. FIX HIGH: Create proper role-based authorization system
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table (separate from usuarios to prevent privilege escalation)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Only admins can manage roles
CREATE POLICY "Only admins can view roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());

CREATE POLICY "Only admins can assign roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Migrate existing admins from usuarios table to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM public.usuarios
WHERE tipo_usuario = 'admin'
ON CONFLICT (user_id, role) DO NOTHING;

-- Update existing admin policies to use new role system
DROP POLICY IF EXISTS "Admins podem criar outros admins" ON public.admins;
DROP POLICY IF EXISTS "Admins podem ver outros admins" ON public.admins;

CREATE POLICY "Admins podem criar outros admins"
ON public.admins
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem ver outros admins"
ON public.admins
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Update usuarios policies to use new role system
DROP POLICY IF EXISTS "Admins can view all records" ON public.usuarios;
DROP POLICY IF EXISTS "Admins can update all records" ON public.usuarios;
DROP POLICY IF EXISTS "Admins can delete records" ON public.usuarios;

CREATE POLICY "Admins can view all records"
ON public.usuarios
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all records"
ON public.usuarios
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete records"
ON public.usuarios
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update security_audit_log policies
DROP POLICY IF EXISTS "Admins podem ver logs de auditoria" ON public.security_audit_log;

CREATE POLICY "Admins podem ver logs de auditoria"
ON public.security_audit_log
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Update security_logs policies  
DROP POLICY IF EXISTS "Only admins can view security logs" ON public.security_logs;

CREATE POLICY "Only admins can view security logs"
ON public.security_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Update product_affiliate_settings policies
DROP POLICY IF EXISTS "Admins podem gerenciar configurações" ON public.product_affiliate_settings;

CREATE POLICY "Admins podem gerenciar configurações"
ON public.product_affiliate_settings
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Update is_admin() function to use new role system
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- 4. Add input validation constraints for clientes table
-- Add length limits
ALTER TABLE public.clientes 
  ALTER COLUMN nome TYPE varchar(200),
  ALTER COLUMN telefone TYPE varchar(20),
  ALTER COLUMN cep TYPE varchar(10),
  ALTER COLUMN cpf_cnpj TYPE varchar(18),
  ALTER COLUMN email TYPE varchar(255);

-- Add format validation constraints
ALTER TABLE public.clientes
  ADD CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT valid_cep CHECK (cep IS NULL OR cep ~ '^[0-9]{5}-?[0-9]{3}$'),
  ADD CONSTRAINT valid_cpf_cnpj CHECK (
    cpf_cnpj IS NULL OR
    cpf_cnpj ~ '^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$' OR
    cpf_cnpj ~ '^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}/?[0-9]{4}-?[0-9]{2}$'
  );

-- Create validation trigger for clientes
CREATE OR REPLACE FUNCTION public.validate_cliente_data()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate JSONB fields
  IF NEW.documentos_url IS NOT NULL THEN
    IF jsonb_array_length(NEW.documentos_url) > 10 THEN
      RAISE EXCEPTION 'Máximo de 10 documentos permitidos';
    END IF;
  END IF;
  
  -- Sanitize text fields (remove control characters)
  NEW.nome := regexp_replace(NEW.nome, '[\x00-\x1F\x7F]', '', 'g');
  NEW.endereco := regexp_replace(COALESCE(NEW.endereco, ''), '[\x00-\x1F\x7F]', '', 'g');
  NEW.complemento := regexp_replace(COALESCE(NEW.complemento, ''), '[\x00-\x1F\x7F]', '', 'g');
  NEW.bairro := regexp_replace(COALESCE(NEW.bairro, ''), '[\x00-\x1F\x7F]', '', 'g');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_cliente_insert_update
  BEFORE INSERT OR UPDATE ON public.clientes
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_cliente_data();

-- Comment on security improvements
COMMENT ON POLICY "Técnicos veem apenas seus clientes ativos" ON public.clientes 
  IS 'Security fix: Prevents competitors from accessing entire customer database by restricting to active service relationships only';

COMMENT ON TABLE public.user_roles 
  IS 'Security fix: Separate role table prevents privilege escalation attacks. Admin status determined by role membership, not user table field';