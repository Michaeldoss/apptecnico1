-- Criar os outros usuários com hash correto
DELETE FROM auth.users WHERE email IN ('cliente@exemplo.com.br', 'loja@exemplo.com.br');

-- Cliente
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
    (SELECT id FROM usuarios WHERE email = 'cliente@exemplo.com.br'),
    'authenticated',
    'authenticated',
    'cliente@exemplo.com.br',
    crypt('123456', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Cliente Teste", "user_type": "cliente"}',
    '',
    '',
    '',
    ''
);

-- Loja
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
    (SELECT id FROM usuarios WHERE email = 'loja@exemplo.com.br'),
    'authenticated',
    'authenticated',
    'loja@exemplo.com.br',
    crypt('123456', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Loja Teste", "user_type": "company"}',
    '',
    '',
    '',
    ''
);