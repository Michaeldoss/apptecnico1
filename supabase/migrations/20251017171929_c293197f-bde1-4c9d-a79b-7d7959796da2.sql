-- Criar usuário de teste padrão michael@dossgroup.com.br
-- IMPORTANTE: Este usuário será criado apenas se não existir

-- Primeiro, inserir na tabela de usuários (se não existir)
DO $$
DECLARE
  v_user_id uuid := '00000000-0000-0000-0000-000000000001'; -- ID fixo para usuário de teste
  v_email text := 'michael@dossgroup.com.br';
BEGIN
  -- Verificar se já existe
  IF NOT EXISTS (SELECT 1 FROM usuarios WHERE email = v_email) THEN
    -- Inserir na tabela usuarios
    INSERT INTO usuarios (id, email, nome, tipo_usuario, ativo)
    VALUES (v_user_id, v_email, 'Michael Doss (Teste)', 'cliente', true)
    ON CONFLICT (id) DO NOTHING;
    
    -- Inserir na tabela clientes
    INSERT INTO clientes (id, email, nome, ativo, perfil_completo)
    VALUES (v_user_id, v_email, 'Michael Doss (Teste)', true, true)
    ON CONFLICT (id) DO NOTHING;
    
    RAISE NOTICE 'Usuário de teste criado: %', v_email;
  ELSE
    RAISE NOTICE 'Usuário de teste já existe: %', v_email;
  END IF;
END $$;

-- Comentário: O usuário real será criado no Supabase Auth separadamente
-- com senha: 123456