-- Verificar e corrigir políticas RLS para tabelas de perfil

-- Política para clientes lerem seus próprios dados
DROP POLICY IF EXISTS "Clientes podem ver e editar próprios dados" ON clientes;
CREATE POLICY "Clientes podem ver e editar próprios dados" 
ON clientes 
FOR ALL 
USING (auth.uid()::text = id::text);

-- Política para técnicos lerem seus próprios dados  
DROP POLICY IF EXISTS "Técnicos podem ver e editar próprios dados" ON tecnicos;
CREATE POLICY "Técnicos podem ver e editar próprios dados" 
ON tecnicos 
FOR ALL 
USING (auth.uid()::text = id::text);

-- Política para lojas lerem seus próprios dados
DROP POLICY IF EXISTS "Lojas podem ver e editar próprios dados" ON lojas;
CREATE POLICY "Lojas podem ver e editar próprios dados" 
ON lojas 
FOR ALL 
USING (auth.uid()::text = id::text);

-- Permitir que usuários autenticados vejam clientes (para técnicos)
CREATE POLICY "Técnicos podem ver clientes ativos" 
ON clientes 
FOR SELECT 
USING (ativo = true AND EXISTS (
  SELECT 1 FROM tecnicos WHERE tecnicos.id = auth.uid()
));

-- Permitir que clientes vejam técnicos ativos
CREATE POLICY "Clientes podem ver técnicos ativos" 
ON tecnicos 
FOR SELECT 
USING (ativo = true);

-- Permitir que todos vejam lojas ativas  
CREATE POLICY "Todos podem ver lojas ativas" 
ON lojas 
FOR SELECT 
USING (ativo = true);