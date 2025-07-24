-- Remover todas as políticas existentes e recriar corretamente

-- Remover políticas existentes das tabelas de perfil
DROP POLICY IF EXISTS "Clientes podem ver e editar próprios dados" ON clientes;
DROP POLICY IF EXISTS "Técnicos podem ver clientes" ON clientes;
DROP POLICY IF EXISTS "Técnicos podem ver clientes ativos" ON clientes;

DROP POLICY IF EXISTS "Técnicos podem ver e editar próprios dados" ON tecnicos;
DROP POLICY IF EXISTS "Clientes podem ver técnicos ativos" ON tecnicos;

DROP POLICY IF EXISTS "Lojas podem ver e editar próprios dados" ON lojas;
DROP POLICY IF EXISTS "Todos podem ver lojas ativas" ON lojas;

-- Criar políticas principais: usuários podem acessar seus próprios dados
CREATE POLICY "Clientes podem ver e editar próprios dados" 
ON clientes 
FOR ALL 
USING (auth.uid()::text = id::text);

CREATE POLICY "Técnicos podem ver e editar próprios dados" 
ON tecnicos 
FOR ALL 
USING (auth.uid()::text = id::text);

CREATE POLICY "Lojas podem ver e editar próprios dados" 
ON lojas 
FOR ALL 
USING (auth.uid()::text = id::text);

-- Políticas para visualização pública (técnicos ativos visíveis para clientes, etc.)
CREATE POLICY "Técnicos ativos são visíveis" 
ON tecnicos 
FOR SELECT 
USING (ativo = true);

CREATE POLICY "Lojas ativas são visíveis" 
ON lojas 
FOR SELECT 
USING (ativo = true);

CREATE POLICY "Clientes são visíveis para técnicos" 
ON clientes 
FOR SELECT 
USING (ativo = true AND EXISTS (
  SELECT 1 FROM tecnicos WHERE tecnicos.id = auth.uid()
));