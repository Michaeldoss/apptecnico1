-- Primeiro, inserir manualmente o usuário atual para corrigir
INSERT INTO usuarios (id, nome, email, tipo_usuario)
VALUES (
  '0db2c3a7-e474-450a-81ce-95662ea62e26',
  'Michael giehl de freitas',
  'comercial@dossgroup.com.br',
  'cliente'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO clientes (id, nome, email)
VALUES (
  '0db2c3a7-e474-450a-81ce-95662ea62e26',
  'Michael giehl de freitas',
  'comercial@dossgroup.com.br'
) ON CONFLICT (id) DO NOTHING;

-- Corrigir políticas RLS para permitir inserção durante signup
-- Política para inserção na tabela clientes
DROP POLICY IF EXISTS "Clientes podem criar próprios dados" ON clientes;
CREATE POLICY "Clientes podem criar próprios dados" 
ON clientes 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Política para inserção na tabela tecnicos
DROP POLICY IF EXISTS "Técnicos podem criar próprios dados" ON tecnicos;
CREATE POLICY "Técnicos podem criar próprios dados" 
ON tecnicos 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Política para inserção na tabela lojas
DROP POLICY IF EXISTS "Lojas podem criar próprios dados" ON lojas;
CREATE POLICY "Lojas podem criar próprios dados" 
ON lojas 
FOR INSERT 
WITH CHECK (auth.uid() = id);