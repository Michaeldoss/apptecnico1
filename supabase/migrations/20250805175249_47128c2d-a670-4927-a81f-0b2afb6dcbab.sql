-- Limpar todos os dados inconsistentes para o email comercial@dossgroup.com.br
DELETE FROM clientes WHERE email = 'comercial@dossgroup.com.br';
DELETE FROM usuarios WHERE email = 'comercial@dossgroup.com.br';

-- Inserir com o ID correto do auth.users (35c5e498-166d-4ccc-99ef-9b0eb4e8ec09)
INSERT INTO usuarios (id, nome, email, tipo_usuario)
VALUES ('35c5e498-166d-4ccc-99ef-9b0eb4e8ec09', 'Comercial Doss Group', 'comercial@dossgroup.com.br', 'cliente');

INSERT INTO clientes (id, nome, email)
VALUES ('35c5e498-166d-4ccc-99ef-9b0eb4e8ec09', 'Comercial Doss Group', 'comercial@dossgroup.com.br');