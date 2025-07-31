-- Corrigir senhas dos usuários de teste para acesso imediato
-- Atualizar com hash correto para senha "123456"

UPDATE auth.users 
SET encrypted_password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email IN ('cliente@exemplo.com', 'tecnico@exemplo.com', 'loja@exemplo.com');

-- Garantir que os emails estão confirmados
UPDATE auth.users 
SET email_confirmed_at = now(),
    confirmed_at = now(),
    last_sign_in_at = null,
    updated_at = now()
WHERE email IN ('cliente@exemplo.com', 'tecnico@exemplo.com', 'loja@exemplo.com');

-- Atualizar também os registros de identidades se existirem
INSERT INTO auth.identities (
    id,
    user_id, 
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
) VALUES 
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111', '{"sub":"11111111-1111-1111-1111-111111111111","email":"cliente@exemplo.com"}', 'email', now(), now(), now()),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222', '{"sub":"22222222-2222-2222-2222-222222222222","email":"tecnico@exemplo.com"}', 'email', now(), now(), now()),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333', '{"sub":"33333333-3333-3333-3333-333333333333","email":"loja@exemplo.com"}', 'email', now(), now(), now())
ON CONFLICT (provider, id) DO NOTHING;