
-- Clear all product and service data while keeping user profiles and categories

-- Clear transactions first (has foreign key dependencies)
DELETE FROM transacoes;

-- Clear affiliate sales
DELETE FROM affiliate_sales;

-- Clear scheduled services
DELETE FROM servicos_agendados;

-- Clear budgets
DELETE FROM orcamentos;

-- Clear service orders
DELETE FROM ordens_servico;

-- Clear parts
DELETE FROM pecas;

-- Clear products
DELETE FROM produtos;
