-- Corrigir usuários de teste para permitir login imediato
-- Usar hash correto para senha "123456"

UPDATE auth.users 
SET encrypted_password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    email_confirmed_at = now(),
    updated_at = now()
WHERE email IN ('cliente@exemplo.com', 'tecnico@exemplo.com', 'loja@exemplo.com');