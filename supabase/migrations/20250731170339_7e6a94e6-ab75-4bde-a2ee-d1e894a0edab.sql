-- Verificar e corrigir a senha dos usuários de teste
-- Atualizar senha para "123456" (hash conhecido do Supabase)
UPDATE auth.users 
SET 
  encrypted_password = '$2a$10$N9qo8uLOickgx2ZMRZoMye.JHr/F/BRxKGNUq2/s8gOtc4LNJnJU2',
  email_confirmed_at = COALESCE(email_confirmed_at, now()),
  updated_at = now()
WHERE email IN ('cliente@exemplo.com.br', 'tecnico@exemplo.com.br', 'loja@exemplo.com.br');