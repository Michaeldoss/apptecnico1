-- Limpar dados inconsistentes e recriar com o ID correto do auth
DELETE FROM usuarios WHERE email = 'comercial@dossgroup.com.br';

-- Inserir com o ID correto do auth.users
INSERT INTO usuarios (id, nome, email, tipo_usuario)
VALUES ('35c5e498-166d-4ccc-99ef-9b0eb4e8ec09', 'Comercial Doss Group', 'comercial@dossgroup.com.br', 'cliente');

-- Inserir na tabela clientes
INSERT INTO clientes (id, nome, email)
VALUES ('35c5e498-166d-4ccc-99ef-9b0eb4e8ec09', 'Comercial Doss Group', 'comercial@dossgroup.com.br');