-- Criar usuários do sistema de autenticação para os que existem apenas na tabela usuarios
-- Primeiro, vamos inserir os usuários na tabela auth.users (isso precisa ser feito manualmente no dashboard)
-- Por enquanto, vamos garantir que o sistema funcione corretamente

-- 1. Confirmar o email do usuário existente
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmed_at = NOW() 
WHERE email = 'dossgroupequipa@gmail.com';

-- 2. Criar usuários de teste no auth.users para permitir login
-- Isso será feito via função SQL que permite inserção no auth.users

-- 3. Inserir dados na tabela usuarios para o usuário confirmado
INSERT INTO usuarios (id, nome, email, tipo_usuario)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'dossgroupequipa@gmail.com'),
  'DossGroup User',
  'dossgroupequipa@gmail.com',
  'admin'
) ON CONFLICT (id) DO NOTHING;

-- 4. Criar um usuário admin para testes diretos
-- Vamos usar uma função para inserir no auth.users (precisa ser feito no dashboard)

-- 5. Atualizar as RLS policies para permitir melhor acesso durante desenvolvimento
-- Permitir que admins possam ver e gerenciar mais dados

-- 6. Adicionar logs para debug
CREATE OR REPLACE FUNCTION public.debug_auth_state()
RETURNS TABLE (
    auth_user_email text,
    auth_user_id uuid,
    usuarios_count bigint,
    clientes_count bigint,
    tecnicos_count bigint,
    lojas_count bigint
) 
LANGUAGE SQL SECURITY DEFINER
AS $$
    SELECT 
        au.email::text,
        au.id,
        (SELECT COUNT(*) FROM usuarios)::bigint,
        (SELECT COUNT(*) FROM clientes)::bigint,
        (SELECT COUNT(*) FROM tecnicos)::bigint,
        (SELECT COUNT(*) FROM lojas)::bigint
    FROM auth.users au
    WHERE au.email = 'dossgroupequipa@gmail.com';
$$;