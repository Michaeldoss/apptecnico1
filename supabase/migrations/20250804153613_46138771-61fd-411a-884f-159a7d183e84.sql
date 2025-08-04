-- Limpar todos os usuários existentes
DELETE FROM auth.users;

-- Resetar as tabelas relacionadas (se houver dados)
DELETE FROM usuarios;
DELETE FROM tecnicos;
DELETE FROM clientes;
DELETE FROM lojas;

-- Criar usuário técnico
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    aud,
    role
) VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'tecnico@exemplo.com.br',
    crypt('123456', gen_salt('bf')),
    now(),
    now(),
    now(),
    'authenticated',
    'authenticated'
) ON CONFLICT (email) DO UPDATE SET
    encrypted_password = crypt('123456', gen_salt('bf')),
    email_confirmed_at = now(),
    updated_at = now();

-- Criar usuário cliente
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    aud,
    role
) VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'cliente@exemplo.com.br',
    crypt('123456', gen_salt('bf')),
    now(),
    now(),
    now(),
    'authenticated',
    'authenticated'
) ON CONFLICT (email) DO UPDATE SET
    encrypted_password = crypt('123456', gen_salt('bf')),
    email_confirmed_at = now(),
    updated_at = now();

-- Criar usuário loja
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    aud,
    role
) VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'loja@exemplo.com.br',
    crypt('123456', gen_salt('bf')),
    now(),
    now(),
    now(),
    'authenticated',
    'authenticated'
) ON CONFLICT (email) DO UPDATE SET
    encrypted_password = crypt('123456', gen_salt('bf')),
    email_confirmed_at = now(),
    updated_at = now();

-- Inserir na tabela usuarios usando os IDs gerados pelo auth.users
INSERT INTO usuarios (id, nome, email, tipo_usuario)
SELECT 
    au.id,
    'Técnico Teste',
    au.email,
    'tecnico'
FROM auth.users au 
WHERE au.email = 'tecnico@exemplo.com.br'
ON CONFLICT (id) DO UPDATE SET
    nome = 'Técnico Teste',
    email = EXCLUDED.email,
    tipo_usuario = 'tecnico';

INSERT INTO usuarios (id, nome, email, tipo_usuario)
SELECT 
    au.id,
    'Cliente Teste',
    au.email,
    'cliente'
FROM auth.users au 
WHERE au.email = 'cliente@exemplo.com.br'
ON CONFLICT (id) DO UPDATE SET
    nome = 'Cliente Teste',
    email = EXCLUDED.email,
    tipo_usuario = 'cliente';

INSERT INTO usuarios (id, nome, email, tipo_usuario)
SELECT 
    au.id,
    'Loja Teste',
    au.email,
    'company'
FROM auth.users au 
WHERE au.email = 'loja@exemplo.com.br'
ON CONFLICT (id) DO UPDATE SET
    nome = 'Loja Teste',
    email = EXCLUDED.email,
    tipo_usuario = 'company';

-- Inserir na tabela tecnicos
INSERT INTO tecnicos (id, nome, email)
SELECT 
    au.id,
    'Técnico Teste',
    au.email
FROM auth.users au 
WHERE au.email = 'tecnico@exemplo.com.br'
ON CONFLICT (id) DO UPDATE SET
    nome = 'Técnico Teste',
    email = EXCLUDED.email;

-- Inserir na tabela clientes
INSERT INTO clientes (id, nome, email)
SELECT 
    au.id,
    'Cliente Teste',
    au.email
FROM auth.users au 
WHERE au.email = 'cliente@exemplo.com.br'
ON CONFLICT (id) DO UPDATE SET
    nome = 'Cliente Teste',
    email = EXCLUDED.email;

-- Inserir na tabela lojas
INSERT INTO lojas (id, nome_empresa, nome_contato, email)
SELECT 
    au.id,
    'Loja Teste',
    'Loja Teste',
    au.email
FROM auth.users au 
WHERE au.email = 'loja@exemplo.com.br'
ON CONFLICT (id) DO UPDATE SET
    nome_empresa = 'Loja Teste',
    nome_contato = 'Loja Teste',
    email = EXCLUDED.email;