-- Remover política conflitante e manter apenas a política pública para leitura
DROP POLICY IF EXISTS "Usuários podem ver próprios dados" ON usuarios;

-- Garantir que a política pública de leitura permite acesso total
DROP POLICY IF EXISTS "Operações públicas de leitura" ON usuarios;

CREATE POLICY "Leitura pública completa" 
ON usuarios 
FOR SELECT 
USING (true);

-- Criar política para que usuários vejam seus próprios dados (redundante mas específica)
CREATE POLICY "Usuários podem ver próprios dados específicos" 
ON usuarios 
FOR SELECT 
USING (auth.uid() = id);