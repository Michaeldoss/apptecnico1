-- Remover a função problemática que está causando erro
DROP FUNCTION IF EXISTS public.sync_auth_user();

-- Inserir manualmente o usuário na tabela usuarios para corrigir o caso atual
INSERT INTO usuarios (id, nome, email, tipo_usuario)
VALUES (
  'ee1b90f5-0cb4-41e5-bc89-fc6d9eaff449',
  'Michael Giehl de Freitas',
  'dossgroupequipa@gmail.com',
  'cliente'
) ON CONFLICT (id) DO NOTHING;

-- Verificar se o usuário foi inserido na tabela clientes também
INSERT INTO clientes (id, nome, email)
VALUES (
  'ee1b90f5-0cb4-41e5-bc89-fc6d9eaff449',
  'Michael Giehl de Freitas',
  'dossgroupequipa@gmail.com'
) ON CONFLICT (id) DO NOTHING;