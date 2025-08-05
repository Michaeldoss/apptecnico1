-- Inserir o usuário existente nas tabelas corretas para corrigir o problema atual
-- Primeiro, inserir na tabela usuarios
INSERT INTO usuarios (id, nome, email, tipo_usuario)
VALUES ('35c5e498-166d-4ccc-99ef-9b0eb4e8ec09', 'Usuario Comercial', 'comercial@dossgroup.com.br', 'cliente')
ON CONFLICT (id) DO NOTHING;

-- Depois, inserir na tabela clientes
INSERT INTO clientes (id, nome, email)
VALUES ('35c5e498-166d-4ccc-99ef-9b0eb4e8ec09', 'Usuario Comercial', 'comercial@dossgroup.com.br')
ON CONFLICT (id) DO NOTHING;