-- Resolve duplicate email and consolidate profile as technician
DO $$
DECLARE
  v_user_id uuid := 'e00a8d4b-1428-44f1-baae-a59c774be645';
  v_email   text := 'michael2@dossgroup.com.br';
  v_nome    text := 'Michael Técnico';
  v_existing_id uuid;
BEGIN
  -- Find an existing usuarios row with same email but different id
  SELECT id INTO v_existing_id
  FROM public.usuarios
  WHERE email = v_email
  LIMIT 1;

  IF v_existing_id IS NOT NULL AND v_existing_id <> v_user_id THEN
    -- Remove related profiles tied to the old id
    DELETE FROM public.tecnicos WHERE id = v_existing_id;
    DELETE FROM public.clientes WHERE id = v_existing_id;
    DELETE FROM public.lojas    WHERE id = v_existing_id;

    -- Remove the conflicting usuarios row
    DELETE FROM public.usuarios WHERE id = v_existing_id;
  END IF;

  -- Clean up any stray profiles by email with different ids
  DELETE FROM public.tecnicos WHERE email = v_email AND id <> v_user_id;
  DELETE FROM public.clientes WHERE email = v_email AND id <> v_user_id;
  DELETE FROM public.lojas    WHERE email = v_email AND id <> v_user_id;

  -- Ensure no conflicting profiles with the correct id but wrong type
  DELETE FROM public.clientes WHERE id = v_user_id;
  DELETE FROM public.lojas    WHERE id = v_user_id;

  -- Upsert usuarios as technician
  INSERT INTO public.usuarios (id, email, nome, tipo_usuario, ativo)
  VALUES (v_user_id, v_email, COALESCE(v_nome, v_email), 'tecnico', true)
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        nome = EXCLUDED.nome,
        tipo_usuario = 'tecnico',
        ativo = true,
        updated_at = now();

  -- Upsert tecnicos
  INSERT INTO public.tecnicos (id, email, nome, ativo, perfil_completo)
  VALUES (v_user_id, v_email, COALESCE(v_nome, v_email), true, false)
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        nome = EXCLUDED.nome,
        ativo = true,
        updated_at = now();
END $$;