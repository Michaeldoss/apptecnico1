-- Limpar usuários criados incorretamente na auth.users
DELETE FROM auth.users WHERE email IN ('tecnico@exemplo.com.br', 'cliente@exemplo.com.br', 'loja@exemplo.com.br');

-- Criar usuários usando o método adequado através de uma função admin
-- Esta função será executada com privilégios de service_role

CREATE OR REPLACE FUNCTION create_test_users()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    user_data RECORD;
    new_user_id uuid;
BEGIN
    -- Para cada usuário na tabela usuarios, criar usando auth.admin_create_user
    FOR user_data IN 
        SELECT id, email, nome, tipo_usuario 
        FROM public.usuarios 
        WHERE ativo = true
    LOOP
        -- Criar usuário via função do Supabase (simulando signup)
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            confirmation_sent_at,
            recovery_sent_at,
            email_change_sent_at,
            created_at,
            updated_at,
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            user_data.id,
            'authenticated',
            'authenticated',
            user_data.email,
            crypt('123456', gen_salt('bf')), -- senha: 123456
            now(),
            now(),
            now(),
            now(),
            now(),
            now(),
            '{"provider": "email", "providers": ["email"]}',
            jsonb_build_object('name', user_data.nome, 'user_type', user_data.tipo_usuario),
            false,
            '',
            '',
            '',
            ''
        ) ON CONFLICT (id) DO UPDATE SET
            email = EXCLUDED.email,
            encrypted_password = EXCLUDED.encrypted_password,
            email_confirmed_at = EXCLUDED.email_confirmed_at,
            raw_user_meta_data = EXCLUDED.raw_user_meta_data;
        
        RAISE NOTICE 'Usuário configurado: %', user_data.email;
    END LOOP;
END;
$$;

-- Executar a função
SELECT create_test_users();