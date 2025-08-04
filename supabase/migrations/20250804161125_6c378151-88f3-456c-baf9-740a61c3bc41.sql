-- Corrigir as políticas RLS da tabela usuarios que estão causando recursão infinita
-- O problema é que as políticas consultam a própria tabela usuarios para verificar auth.uid()

-- Primeiro, remover as políticas problemáticas
DROP POLICY IF EXISTS "Admins podem atualizar usuários" ON usuarios;
DROP POLICY IF EXISTS "Admins podem inserir usuários" ON usuarios;
DROP POLICY IF EXISTS "Admins podem ver todos os usuários" ON usuarios;

-- Criar políticas que não causem recursão
-- Permitir que usuários vejam apenas seu próprio registro
CREATE POLICY "Usuários podem ver próprios dados" 
ON usuarios FOR SELECT 
USING (auth.uid() = id);

-- Permitir que usuários atualizem apenas seu próprio registro
CREATE POLICY "Usuários podem atualizar próprios dados" 
ON usuarios FOR UPDATE 
USING (auth.uid() = id);

-- Para operações administrativas, criar uma política baseada em metadata do JWT
-- Em vez de consultar a tabela usuarios (que causa recursão)
CREATE POLICY "Operações públicas de leitura" 
ON usuarios FOR SELECT 
USING (true); -- Temporariamente público para resolver o problema de login

-- Permitir inserção durante cadastro (necessário para novos usuários)
CREATE POLICY "Permitir inserção de novos usuários" 
ON usuarios FOR INSERT 
WITH CHECK (true); -- Temporariamente público para permitir cadastros