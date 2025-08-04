-- Habilitar extensão pgcrypto se não estiver habilitada
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Limpar a função anterior
DROP FUNCTION IF EXISTS create_test_users();

-- Função mais simples para criar usuários de teste
CREATE OR REPLACE FUNCTION setup_test_users()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    user_data RECORD;
BEGIN
    -- Para cada usuário na tabela usuarios
    FOR user_data IN 
        SELECT id, email, nome, tipo_usuario 
        FROM public.usuarios 
        WHERE ativo = true
    LOOP
        -- Inserir na auth.users com campos obrigatórios
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            created_at,
            updated_at,
            raw_app_meta_data,
            raw_user_meta_data
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            user_data.id,
            'authenticated',
            'authenticated',
            user_data.email,
            crypt('123456', gen_salt('bf')),
            now(),
            now(),
            now(),
            '{"provider": "email", "providers": ["email"]}',
            jsonb_build_object('name', user_data.nome, 'user_type', user_data.tipo_usuario)
        ) ON CONFLICT (id) DO UPDATE SET
            email = EXCLUDED.email,
            encrypted_password = EXCLUDED.encrypted_password,
            email_confirmed_at = EXCLUDED.email_confirmed_at;
        
        RAISE NOTICE 'Usuário criado: %', user_data.email;
    END LOOP;
END;
$$;

-- Executar a função
SELECT setup_test_users();