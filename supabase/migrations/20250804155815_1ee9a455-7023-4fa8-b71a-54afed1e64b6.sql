-- Corrigir a função sync_auth_user para ter search_path seguro
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';