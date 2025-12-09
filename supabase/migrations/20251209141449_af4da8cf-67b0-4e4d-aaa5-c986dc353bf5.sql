-- Adicionar políticas RLS para permitir contratação de planos
CREATE POLICY "Usuários podem contratar planos"
ON planos_contratados
FOR INSERT
WITH CHECK (auth.uid()::text = usuario_id::text);

CREATE POLICY "Usuários podem atualizar seus planos"
ON planos_contratados
FOR UPDATE
USING (auth.uid()::text = usuario_id::text);