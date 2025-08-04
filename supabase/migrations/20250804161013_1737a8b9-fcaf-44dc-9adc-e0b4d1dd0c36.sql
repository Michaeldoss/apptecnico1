-- Testar se o hash da senha está correto
-- Vou recriar o usuário técnico com um hash bcrypt válido para a senha '123456'

DELETE FROM auth.users WHERE email = 'tecnico@exemplo.com.br';

-- Usando o método correto para gerar hash bcrypt
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
    (SELECT id FROM usuarios WHERE email = 'tecnico@exemplo.com.br'),
    'authenticated',
    'authenticated',
    'tecnico@exemplo.com.br',
    crypt('123456', gen_salt('bf')), -- Gerar hash correto
    now(),
    now(),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Técnico Teste", "user_type": "tecnico"}',
    '',
    '',
    '',
    ''
);

-- Verificar se o usuário foi criado
SELECT email, LENGTH(encrypted_password) as password_length FROM auth.users WHERE email = 'tecnico@exemplo.com.br';