-- Criar usuários de teste com senhas conhecidas
-- Primeiro, remover usuários existentes se houver
DELETE FROM auth.users WHERE email IN ('cliente@exemplo.com.br', 'tecnico@exemplo.com.br', 'loja@exemplo.com.br');

-- Inserir novos usuários com senha "123456"
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES 
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'cliente@exemplo.com.br',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye.JHr/F/BRxKGNUq2/s8gOtc4LNJnJU2', -- senha: 123456
  now(),
  null,
  null,
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'tecnico@exemplo.com.br',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye.JHr/F/BRxKGNUq2/s8gOtc4LNJnJU2', -- senha: 123456
  now(),
  null,
  null,
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'loja@exemplo.com.br',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye.JHr/F/BRxKGNUq2/s8gOtc4LNJnJU2', -- senha: 123456
  now(),
  null,
  null,
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Criar registros nas tabelas de perfil correspondentes
-- Cliente
INSERT INTO clientes (id, nome, email, ativo, perfil_completo)
SELECT id, 'Cliente Teste', 'cliente@exemplo.com.br', true, true
FROM auth.users WHERE email = 'cliente@exemplo.com.br'
ON CONFLICT (id) DO UPDATE SET
  nome = 'Cliente Teste',
  email = 'cliente@exemplo.com.br',
  ativo = true,
  perfil_completo = true;

-- Técnico
INSERT INTO tecnicos (id, nome, email, ativo, perfil_completo)
SELECT id, 'Técnico Teste', 'tecnico@exemplo.com.br', true, true
FROM auth.users WHERE email = 'tecnico@exemplo.com.br'
ON CONFLICT (id) DO UPDATE SET
  nome = 'Técnico Teste',
  email = 'tecnico@exemplo.com.br',
  ativo = true,
  perfil_completo = true;

-- Loja
INSERT INTO lojas (id, nome_empresa, nome_contato, email, ativo, perfil_completo)
SELECT id, 'Loja Teste', 'Contato Loja', 'loja@exemplo.com.br', true, true
FROM auth.users WHERE email = 'loja@exemplo.com.br'
ON CONFLICT (id) DO UPDATE SET
  nome_empresa = 'Loja Teste',
  nome_contato = 'Contato Loja',
  email = 'loja@exemplo.com.br',
  ativo = true,
  perfil_completo = true;

-- Adicionar entradas na tabela usuarios para mapeamento de tipos
INSERT INTO usuarios (id, nome, email, tipo_usuario, ativo)
SELECT u.id, 
       CASE 
         WHEN u.email = 'cliente@exemplo.com.br' THEN 'Cliente Teste'
         WHEN u.email = 'tecnico@exemplo.com.br' THEN 'Técnico Teste'
         WHEN u.email = 'loja@exemplo.com.br' THEN 'Loja Teste'
       END,
       u.email,
       CASE 
         WHEN u.email = 'cliente@exemplo.com.br' THEN 'customer'
         WHEN u.email = 'tecnico@exemplo.com.br' THEN 'technician'
         WHEN u.email = 'loja@exemplo.com.br' THEN 'company'
       END,
       true
FROM auth.users u 
WHERE u.email IN ('cliente@exemplo.com.br', 'tecnico@exemplo.com.br', 'loja@exemplo.com.br')
ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  email = EXCLUDED.email,
  tipo_usuario = EXCLUDED.tipo_usuario,
  ativo = EXCLUDED.ativo;