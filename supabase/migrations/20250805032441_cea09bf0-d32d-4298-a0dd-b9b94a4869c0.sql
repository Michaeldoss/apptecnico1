-- Corrigir mapeamento do usuário comercial@dossgroup.com.br
-- Primeiro, remover o registro incorreto na tabela usuarios
DELETE FROM usuarios WHERE email = 'comercial@dossgroup.com.br';

-- Inserir o usuário correto na tabela usuarios com o ID do Auth
INSERT INTO usuarios (id, nome, email, tipo_usuario) 
VALUES ('e00ff817-c987-4f68-942d-4d44b09f3c2f', 'Comercial Doss Group', 'comercial@dossgroup.com.br', 'company');

-- Inserir o usuário na tabela lojas
INSERT INTO lojas (id, nome_empresa, nome_contato, email) 
VALUES ('e00ff817-c987-4f68-942d-4d44b09f3c2f', 'Doss Group', 'Comercial Doss Group', 'comercial@dossgroup.com.br');