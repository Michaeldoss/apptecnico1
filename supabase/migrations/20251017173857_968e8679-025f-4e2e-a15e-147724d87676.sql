-- Criar usuários de teste para técnico e loja
-- IMPORTANTE: Os usuários serão criados no Supabase Auth manualmente

DO $$
DECLARE
  v_tecnico_id uuid := '00000000-0000-0000-0000-000000000002';
  v_loja_id uuid := '00000000-0000-0000-0000-000000000003';
  v_email_tecnico text := 'michael2@dossgroup.com.br';
  v_email_loja text := 'michael3@dossgroup.com.br';
BEGIN
  -- Criar usuário técnico
  IF NOT EXISTS (SELECT 1 FROM usuarios WHERE email = v_email_tecnico) THEN
    -- Inserir na tabela usuarios
    INSERT INTO usuarios (id, email, nome, tipo_usuario, ativo)
    VALUES (v_tecnico_id, v_email_tecnico, 'Michael Técnico (Teste)', 'tecnico', true)
    ON CONFLICT (id) DO NOTHING;
    
    -- Inserir na tabela tecnicos
    INSERT INTO tecnicos (
      id, 
      email, 
      nome, 
      ativo, 
      perfil_completo,
      verificado,
      experiencia_anos
    )
    VALUES (
      v_tecnico_id, 
      v_email_tecnico, 
      'Michael Técnico (Teste)', 
      true, 
      true,
      true,
      5
    )
    ON CONFLICT (id) DO NOTHING;
    
    RAISE NOTICE 'Usuário técnico de teste criado: %', v_email_tecnico;
  ELSE
    RAISE NOTICE 'Usuário técnico de teste já existe: %', v_email_tecnico;
  END IF;

  -- Criar usuário loja (usando 'company' em vez de 'loja')
  IF NOT EXISTS (SELECT 1 FROM usuarios WHERE email = v_email_loja) THEN
    -- Inserir na tabela usuarios
    INSERT INTO usuarios (id, email, nome, tipo_usuario, ativo)
    VALUES (v_loja_id, v_email_loja, 'Michael Loja (Teste)', 'company', true)
    ON CONFLICT (id) DO NOTHING;
    
    -- Inserir na tabela lojas
    INSERT INTO lojas (
      id, 
      email, 
      nome_empresa,
      nome_contato,
      ativo, 
      perfil_completo,
      verificado
    )
    VALUES (
      v_loja_id, 
      v_email_loja, 
      'Loja Teste Doss Group',
      'Michael Loja (Teste)',
      true, 
      true,
      true
    )
    ON CONFLICT (id) DO NOTHING;
    
    RAISE NOTICE 'Usuário loja de teste criado: %', v_email_loja;
  ELSE
    RAISE NOTICE 'Usuário loja de teste já existe: %', v_email_loja;
  END IF;
END $$;

-- Comentário: Os usuários devem ser criados no Supabase Auth com:
-- michael2@dossgroup.com.br - UUID: 00000000-0000-0000-0000-000000000002 - senha: 123456
-- michael3@dossgroup.com.br - UUID: 00000000-0000-0000-0000-000000000003 - senha: 123456