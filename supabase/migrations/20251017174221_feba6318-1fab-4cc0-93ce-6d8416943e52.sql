-- Corrigir RLS policies com recursão infinita
-- Criando funções SECURITY DEFINER para evitar recursão

-- 1. Função para verificar se usuário é técnico
CREATE OR REPLACE FUNCTION public.is_technician(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM tecnicos 
    WHERE id = user_id
  );
$$;

-- 2. Função para verificar se usuário é cliente
CREATE OR REPLACE FUNCTION public.is_customer(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM clientes 
    WHERE id = user_id
  );
$$;

-- 3. Função para verificar se usuário é loja
CREATE OR REPLACE FUNCTION public.is_company(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM lojas 
    WHERE id = user_id
  );
$$;

-- 4. Função para obter ordens do técnico (sem recursão)
CREATE OR REPLACE FUNCTION public.get_technician_service_orders(tech_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM ordens_servico 
  WHERE tecnico_id = tech_id;
$$;

-- 5. Função para obter clientes do técnico (sem recursão)
CREATE OR REPLACE FUNCTION public.get_technician_customers(tech_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT cliente_id 
  FROM ordens_servico 
  WHERE tecnico_id = tech_id 
    AND status IN ('aberta', 'em_andamento', 'agendada', 'concluida');
$$;

-- Agora vamos refazer as policies problemáticas

-- TECNICOS: Remover políticas antigas e criar novas sem recursão
DROP POLICY IF EXISTS "Anonymous users can view safe technician info" ON tecnicos;
DROP POLICY IF EXISTS "Authenticated users can view technician contact info" ON tecnicos;
DROP POLICY IF EXISTS "Authenticated users can view technician details when authorized" ON tecnicos;
DROP POLICY IF EXISTS "Técnicos podem criar próprios dados" ON tecnicos;
DROP POLICY IF EXISTS "Técnicos podem ver e editar próprios dados" ON tecnicos;

-- Nova policy para visualização anônima (info básica)
CREATE POLICY "Public can view active technicians"
ON tecnicos FOR SELECT
USING (ativo = true);

-- Nova policy para técnicos verem/editarem próprios dados
CREATE POLICY "Technicians manage own profile"
ON tecnicos FOR ALL
USING (auth.uid() = id);

-- CLIENTES: Remover políticas antigas e criar novas sem recursão  
DROP POLICY IF EXISTS "Técnicos veem apenas seus clientes ativos" ON clientes;
DROP POLICY IF EXISTS "Clientes podem criar próprios dados" ON clientes;
DROP POLICY IF EXISTS "Clientes podem ver e editar próprios dados" ON clientes;

-- Nova policy para clientes verem/editarem próprios dados
CREATE POLICY "Customers manage own profile"
ON clientes FOR ALL
USING (auth.uid() = id);

-- Nova policy para técnicos verem seus clientes (usando função SECURITY DEFINER)
CREATE POLICY "Technicians view their customers"
ON clientes FOR SELECT
USING (
  public.is_technician(auth.uid()) 
  AND id IN (SELECT public.get_technician_customers(auth.uid()))
);

-- ORDENS_SERVICO: Remover políticas antigas e criar novas sem recursão
DROP POLICY IF EXISTS "Clientes podem criar ordens" ON ordens_servico;
DROP POLICY IF EXISTS "Clientes podem ver próprias ordens" ON ordens_servico;
DROP POLICY IF EXISTS "Clientes atualizam ordens pendentes" ON ordens_servico;
DROP POLICY IF EXISTS "Clientes deletam ordens pendentes" ON ordens_servico;
DROP POLICY IF EXISTS "Técnicos podem ver ordens atribuídas" ON ordens_servico;
DROP POLICY IF EXISTS "Técnicos atualizam ordens atribuídas" ON ordens_servico;

-- Novas policies para ordens de serviço
CREATE POLICY "Customers manage their orders"
ON ordens_servico FOR ALL
USING (cliente_id = auth.uid())
WITH CHECK (cliente_id = auth.uid());

CREATE POLICY "Technicians view assigned orders"
ON ordens_servico FOR SELECT
USING (tecnico_id = auth.uid());

CREATE POLICY "Technicians update assigned orders"
ON ordens_servico FOR UPDATE
USING (tecnico_id = auth.uid())
WITH CHECK (
  tecnico_id = auth.uid() 
  AND status IN ('agendada', 'em_andamento', 'concluida', 'cancelada')
);