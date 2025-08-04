-- Primeiro, limpar completamente a tabela auth.users dos usuários criados
DELETE FROM auth.users WHERE email IN ('tecnico@exemplo.com.br', 'cliente@exemplo.com.br', 'loja@exemplo.com.br');

-- Agora criar os usuários corretamente com todos os campos obrigatórios como string vazia, não NULL
DO $$
DECLARE
    user_data RECORD;
BEGIN
    FOR user_data IN 
        SELECT id, email, nome, tipo_usuario 
        FROM public.usuarios 
        WHERE ativo = true
    LOOP
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
            raw_user_meta_data,
            confirmation_token,
            recovery_token,
            email_change_token_new,
            email_change
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            user_data.id,
            'authenticated',
            'authenticated',
            user_data.email,
            '$2a$10$ZQRpCUd.cqoHoOo2TL8z.uZz9EvGhNzaTZhGHbMFdQvHx.sJGZpGm', -- hash fixo para '123456'
            now(),
            now(),
            now(),
            '{"provider": "email", "providers": ["email"]}',
            jsonb_build_object('name', user_data.nome, 'user_type', user_data.tipo_usuario),
            '', -- string vazia, não NULL
            '', -- string vazia, não NULL
            '', -- string vazia, não NULL
            ''  -- string vazia, não NULL
        );
        
        RAISE NOTICE 'Usuário criado corretamente: %', user_data.email;
    END LOOP;
END $$;