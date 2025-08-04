-- Primeiro, vamos verificar se há usuários na tabela auth.users
-- Se não houver, precisamos criá-los

-- Inserir usuários na tabela auth.users baseado na tabela usuarios
-- Isso vai sincronizar os usuários existentes

-- Para cada usuário na tabela usuarios, vamos criar uma entrada na auth.users
DO $$
DECLARE
    user_record RECORD;
BEGIN
    -- Buscar todos os usuários da tabela usuarios
    FOR user_record IN 
        SELECT id, email, nome, tipo_usuario 
        FROM usuarios 
        WHERE ativo = true
    LOOP
        -- Tentar inserir na auth.users (isso pode falhar se já existir)
        BEGIN
            INSERT INTO auth.users (
                id,
                email,
                encrypted_password,
                email_confirmed_at,
                created_at,
                updated_at,
                raw_app_meta_data,
                raw_user_meta_data,
                is_super_admin,
                role,
                aud,
                confirmation_token,
                email_change_token_new,
                recovery_token
            ) VALUES (
                user_record.id,
                user_record.email,
                crypt('123456', gen_salt('bf')), -- senha padrão: 123456
                now(),
                now(),
                now(),
                '{"provider": "email", "providers": ["email"]}',
                jsonb_build_object('name', user_record.nome, 'user_type', user_record.tipo_usuario),
                false,
                'authenticated',
                'authenticated',
                '',
                '',
                ''
            );
            
            RAISE NOTICE 'Usuário criado na auth.users: %', user_record.email;
        EXCEPTION WHEN unique_violation THEN
            RAISE NOTICE 'Usuário já existe na auth.users: %', user_record.email;
        END;
    END LOOP;
END $$;

-- Criar uma função para manter sincronizado
CREATE OR REPLACE FUNCTION sync_auth_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Quando um usuário é inserido na tabela usuarios, criar na auth.users
    IF TG_OP = 'INSERT' THEN
        INSERT INTO auth.users (
            id,
            email,
            encrypted_password,
            email_confirmed_at,
            created_at,
            updated_at,
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin,
            role,
            aud
        ) VALUES (
            NEW.id,
            NEW.email,
            crypt('123456', gen_salt('bf')),
            now(),
            now(),
            now(),
            '{"provider": "email", "providers": ["email"]}',
            jsonb_build_object('name', NEW.nome, 'user_type', NEW.tipo_usuario),
            false,
            'authenticated',
            'authenticated'
        );
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger para sincronizar automaticamente
DROP TRIGGER IF EXISTS sync_auth_user_trigger ON usuarios;
CREATE TRIGGER sync_auth_user_trigger
    AFTER INSERT ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION sync_auth_user();