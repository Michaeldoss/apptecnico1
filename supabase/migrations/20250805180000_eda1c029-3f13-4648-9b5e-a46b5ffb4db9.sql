-- Limpeza completa de dados de teste/fake
-- IMPORTANTE: Manter apenas o usuário autenticado atual (comercial@dossgroup.com.br)

-- Limpar transações e dados relacionados
DELETE FROM transacoes WHERE cliente_id != '35c5e498-166d-4ccc-99ef-9b0eb4e8ec09';
DELETE FROM affiliate_sales;
DELETE FROM affiliate_withdrawals;
DELETE FROM ordens_servico WHERE cliente_id != '35c5e498-166d-4ccc-99ef-9b0eb4e8ec09';
DELETE FROM servicos_agendados WHERE cliente_id != '35c5e498-166d-4ccc-99ef-9b0eb4e8ec09';
DELETE FROM planos_contratados WHERE usuario_id != '35c5e498-166d-4ccc-99ef-9b0eb4e8ec09';

-- Limpar dados de produtos e peças
DELETE FROM produtos;
DELETE FROM pecas;

-- Limpar configurações de afiliados e perfis
DELETE FROM affiliate_profiles;
DELETE FROM product_affiliate_settings;
DELETE FROM tecnico_pagamento_config;

-- Limpar usuários fake, mantendo apenas o usuário atual
DELETE FROM tecnicos WHERE id != '35c5e498-166d-4ccc-99ef-9b0eb4e8ec09';
DELETE FROM lojas WHERE id != '35c5e498-166d-4ccc-99ef-9b0eb4e8ec09';
DELETE FROM clientes WHERE id != '35c5e498-166d-4ccc-99ef-9b0eb4e8ec09';
DELETE FROM admins WHERE id != '35c5e498-166d-4ccc-99ef-9b0eb4e8ec09';
DELETE FROM usuarios WHERE id != '35c5e498-166d-4ccc-99ef-9b0eb4e8ec09';

-- Limpar logs de auditoria antigos (manter apenas dos últimos 7 dias)
DELETE FROM security_audit_log WHERE created_at < NOW() - INTERVAL '7 days';