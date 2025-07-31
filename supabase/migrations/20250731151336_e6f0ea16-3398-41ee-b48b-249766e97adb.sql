-- Criar usuários de teste no sistema de autenticação
-- Função para criar usuários de teste (apenas para desenvolvimento)

-- Inserir usuários diretamente na tabela auth.users
INSERT INTO auth.users (
    id, 
    instance_id, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    created_at, 
    updated_at, 
    confirmation_token, 
    email_change_token_new, 
    recovery_token
) VALUES 
-- Cliente Teste (senha: 123456)
(
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'cliente@exemplo.com',
    '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQHoN/IUZE4UGOtrJj7DG', -- senha: 123456
    now(),
    now(),
    now(),
    '',
    '',
    ''
),
-- Técnico Teste (senha: 123456)
(
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'tecnico@exemplo.com',
    '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQHoN/IUZE4UGOtrJj7DG', -- senha: 123456
    now(),
    now(),
    now(),
    '',
    '',
    ''
),
-- Loja Teste (senha: 123456)
(
    '33333333-3333-3333-3333-333333333333',
    '00000000-0000-0000-0000-000000000000',
    'loja@exemplo.com',
    '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQHoN/IUZE4UGOtrJj7DG', -- senha: 123456
    now(),
    now(),
    now(),
    '',
    '',
    ''
);