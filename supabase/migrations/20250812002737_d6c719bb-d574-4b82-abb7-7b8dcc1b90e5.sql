-- Ensure technician test user exists and is active
INSERT INTO public.tecnicos (
  id,
  email,
  nome,
  ativo,
  created_at,
  updated_at
) VALUES (
  'a1d1f087-95ac-429b-a134-23eff34b9ed6',
  'tecnico@exemplo.com.br',
  'Técnico Teste',
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  nome = EXCLUDED.nome,
  ativo = true,
  updated_at = NOW();

-- Ensure central usuarios record exists for visibility/roles
INSERT INTO public.usuarios (
  id,
  nome,
  email,
  tipo_usuario,
  created_at,
  updated_at
) VALUES (
  'a1d1f087-95ac-429b-a134-23eff34b9ed6',
  'Técnico Teste',
  'tecnico@exemplo.com.br',
  'technician',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  email = EXCLUDED.email,
  tipo_usuario = EXCLUDED.tipo_usuario,
  updated_at = NOW();