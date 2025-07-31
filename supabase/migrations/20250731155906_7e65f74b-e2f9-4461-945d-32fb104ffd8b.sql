-- Corrigir emails de teste para .br e garantir acesso (sem confirmed_at)
UPDATE auth.users 
SET email = CASE 
  WHEN email = 'cliente@exemplo.com' THEN 'cliente@exemplo.com.br'
  WHEN email = 'tecnico@exemplo.com' THEN 'tecnico@exemplo.com.br'  
  WHEN email = 'loja@exemplo.com' THEN 'loja@exemplo.com.br'
  ELSE email
END,
encrypted_password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
email_confirmed_at = now(),
updated_at = now()
WHERE email IN ('cliente@exemplo.com', 'tecnico@exemplo.com', 'loja@exemplo.com');