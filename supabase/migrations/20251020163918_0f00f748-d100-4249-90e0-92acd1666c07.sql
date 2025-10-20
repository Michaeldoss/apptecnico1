-- Migration: Fix michael3@dossgroup.com.br as store user
-- Context: Configure store profile for michael3@dossgroup.com.br using tipo_usuario = 'company'

DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Get the auth.users ID for michael3@dossgroup.com.br
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'michael3@dossgroup.com.br'
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'User michael3@dossgroup.com.br not found in auth.users. Please create the account first.';
    RETURN;
  END IF;

  RAISE NOTICE 'Found user ID: %', v_user_id;

  -- Delete any old usuarios records with different IDs
  DELETE FROM public.usuarios
  WHERE email = 'michael3@dossgroup.com.br'
    AND id != v_user_id;

  -- Delete any old lojas records with different IDs
  DELETE FROM public.lojas
  WHERE email = 'michael3@dossgroup.com.br'
    AND id != v_user_id;

  -- Delete any old tecnicos records with different IDs
  DELETE FROM public.tecnicos
  WHERE email = 'michael3@dossgroup.com.br'
    AND id != v_user_id;

  -- Delete any old clientes records with different IDs
  DELETE FROM public.clientes
  WHERE email = 'michael3@dossgroup.com.br'
    AND id != v_user_id;

  -- Delete any conflicting tecnicos profile for this user ID
  DELETE FROM public.tecnicos WHERE id = v_user_id;

  -- Delete any conflicting clientes profile for this user ID
  DELETE FROM public.clientes WHERE id = v_user_id;

  -- Upsert into usuarios with tipo_usuario = 'company'
  INSERT INTO public.usuarios (id, email, nome, tipo_usuario, ativo)
  VALUES (
    v_user_id,
    'michael3@dossgroup.com.br',
    'Loja Teste',
    'company',
    true
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    nome = EXCLUDED.nome,
    tipo_usuario = EXCLUDED.tipo_usuario,
    ativo = EXCLUDED.ativo,
    updated_at = now();

  -- Upsert into lojas
  INSERT INTO public.lojas (
    id,
    email,
    nome_empresa,
    nome_contato,
    telefone,
    cnpj,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    estado,
    ativo,
    verificado,
    perfil_completo
  )
  VALUES (
    v_user_id,
    'michael3@dossgroup.com.br',
    'Loja Teste Ltda',
    'Loja Teste',
    '(11) 98888-8888',
    '12.345.678/0001-90',
    '01310-100',
    'Av. Paulista',
    '1000',
    'Bela Vista',
    'São Paulo',
    'SP',
    true,
    true,
    true
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    nome_empresa = EXCLUDED.nome_empresa,
    nome_contato = EXCLUDED.nome_contato,
    updated_at = now();

  RAISE NOTICE 'Successfully configured michael3@dossgroup.com.br as store user';
END $$;