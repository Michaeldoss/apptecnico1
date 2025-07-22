-- Corrigir problemas de autenticação

-- 1. Confirmar o email do usuário existente (apenas email_confirmed_at)
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'dossgroupequipa@gmail.com';

-- 2. Inserir dados na tabela usuarios para o usuário confirmado
INSERT INTO usuarios (id, nome, email, tipo_usuario)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'dossgroupequipa@gmail.com'),
  'DossGroup Admin',
  'dossgroupequipa@gmail.com',
  'admin'
) ON CONFLICT (id) DO NOTHING;

-- 3. Limpar dados antigos da tabela usuarios que não têm correspondência no auth.users
DELETE FROM usuarios 
WHERE id NOT IN (SELECT id FROM auth.users);

-- 4. Função de debug para verificar estado da autenticação
CREATE OR REPLACE FUNCTION public.debug_auth_state()
RETURNS TABLE (
    auth_user_email text,
    auth_user_id uuid,
    auth_confirmed boolean,
    usuarios_count bigint,
    user_in_usuarios boolean
) 
LANGUAGE SQL SECURITY DEFINER
AS $$
    SELECT 
        au.email::text,
        au.id,
        (au.email_confirmed_at IS NOT NULL) as auth_confirmed,
        (SELECT COUNT(*) FROM usuarios)::bigint,
        EXISTS(SELECT 1 FROM usuarios u WHERE u.id = au.id) as user_in_usuarios
    FROM auth.users au
    WHERE au.email = 'dossgroupequipa@gmail.com';
$$;