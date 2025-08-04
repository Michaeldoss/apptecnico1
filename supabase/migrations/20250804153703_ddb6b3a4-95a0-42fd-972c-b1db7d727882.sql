-- Limpar todos os usuários existentes
DELETE FROM auth.users;

-- Resetar as tabelas relacionadas (se houver dados)
DELETE FROM usuarios;
DELETE FROM tecnicos;
DELETE FROM clientes;
DELETE FROM lojas;

-- Variáveis para armazenar os IDs
DO $$
DECLARE
    tecnico_id uuid;
    cliente_id uuid;
    loja_id uuid;
BEGIN
    -- Gerar IDs únicos
    tecnico_id := gen_random_uuid();
    cliente_id := gen_random_uuid();
    loja_id := gen_random_uuid();

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
        tecnico_id,
        '00000000-0000-0000-0000-000000000000',
        'tecnico@exemplo.com.br',
        crypt('123456', gen_salt('bf')),
        now(),
        now(),
        now(),
        'authenticated',
        'authenticated'
    );

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
        cliente_id,
        '00000000-0000-0000-0000-000000000000',
        'cliente@exemplo.com.br',
        crypt('123456', gen_salt('bf')),
        now(),
        now(),
        now(),
        'authenticated',
        'authenticated'
    );

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
        loja_id,
        '00000000-0000-0000-0000-000000000000',
        'loja@exemplo.com.br',
        crypt('123456', gen_salt('bf')),
        now(),
        now(),
        now(),
        'authenticated',
        'authenticated'
    );

    -- Inserir na tabela usuarios
    INSERT INTO usuarios (id, nome, email, tipo_usuario) VALUES
        (tecnico_id, 'Técnico Teste', 'tecnico@exemplo.com.br', 'tecnico'),
        (cliente_id, 'Cliente Teste', 'cliente@exemplo.com.br', 'cliente'),
        (loja_id, 'Loja Teste', 'loja@exemplo.com.br', 'company');

    -- Inserir na tabela tecnicos
    INSERT INTO tecnicos (id, nome, email) VALUES
        (tecnico_id, 'Técnico Teste', 'tecnico@exemplo.com.br');

    -- Inserir na tabela clientes
    INSERT INTO clientes (id, nome, email) VALUES
        (cliente_id, 'Cliente Teste', 'cliente@exemplo.com.br');

    -- Inserir na tabela lojas
    INSERT INTO lojas (id, nome_empresa, nome_contato, email) VALUES
        (loja_id, 'Loja Teste', 'Loja Teste', 'loja@exemplo.com.br');

END $$;