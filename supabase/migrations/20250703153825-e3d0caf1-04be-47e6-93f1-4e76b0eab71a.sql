-- Inserir usuário admin específico Michael Giehl
INSERT INTO public.usuarios (id, nome, email, tipo_usuario, ativo)
VALUES (
  gen_random_uuid(),
  'Michael Giehl',
  'admin@dossgroup.com.br',
  'admin',
  true
);