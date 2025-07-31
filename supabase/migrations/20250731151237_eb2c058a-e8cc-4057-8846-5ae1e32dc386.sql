-- Criar usuários de teste para diferentes perfis
-- IMPORTANTE: Estes são usuários de teste com senhas simples para desenvolvimento

-- Inserir na tabela usuarios (corrigindo tipo_usuario)
INSERT INTO usuarios (id, nome, email, tipo_usuario, ativo) VALUES
('11111111-1111-1111-1111-111111111111', 'Cliente Teste', 'cliente@exemplo.com', 'cliente', true),
('22222222-2222-2222-2222-222222222222', 'Técnico Teste', 'tecnico@exemplo.com', 'tecnico', true),
('33333333-3333-3333-3333-333333333333', 'Loja Teste', 'loja@exemplo.com', 'company', true);

-- Inserir cliente de teste
INSERT INTO clientes (id, nome, email, telefone, perfil_completo, ativo) VALUES
('11111111-1111-1111-1111-111111111111', 'Cliente Teste', 'cliente@exemplo.com', '(11) 99999-9999', true, true);

-- Inserir técnico de teste
INSERT INTO tecnicos (id, nome, email, telefone, especialidades, experiencia_anos, perfil_completo, verificado, ativo) VALUES
('22222222-2222-2222-2222-222222222222', 'Técnico Teste', 'tecnico@exemplo.com', '(11) 88888-8888', ARRAY['Refrigeração', 'Ar Condicionado'], 5, true, true, true);

-- Inserir loja de teste
INSERT INTO lojas (id, nome_empresa, nome_contato, email, telefone, perfil_completo, verificado, ativo) VALUES
('33333333-3333-3333-3333-333333333333', 'Loja Teste Ltda', 'Contato Loja', 'loja@exemplo.com', '(11) 77777-7777', true, true, true);