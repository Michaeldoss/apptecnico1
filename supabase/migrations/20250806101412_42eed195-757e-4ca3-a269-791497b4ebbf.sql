-- Inserir dados do técnico teste na tabela tecnicos
INSERT INTO public.tecnicos (
  id,
  email,
  nome,
  created_at,
  updated_at
) VALUES (
  'a1d1f087-95ac-429b-a134-23eff34b9ed6',
  'tecnico@exemplo.com.br',
  'Técnico Teste',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Inserir também na tabela usuarios para controle central
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
) ON CONFLICT (id) DO NOTHING;