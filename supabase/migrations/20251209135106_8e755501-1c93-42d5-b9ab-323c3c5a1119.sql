
-- Clear remaining data tables

-- Clear WhatsApp messages
DELETE FROM whatsapp_messages;

-- Clear WhatsApp config
DELETE FROM whatsapp_config;

-- Clear technician payment config
DELETE FROM tecnico_pagamento_config;

-- Clear technician expenses config
DELETE FROM tecnico_despesas_config;

-- Clear affiliate withdrawals
DELETE FROM affiliate_withdrawals;

-- Clear affiliate profiles
DELETE FROM affiliate_profiles;

-- Clear contracted plans
DELETE FROM planos_contratados;

-- Clear security audit logs
DELETE FROM security_audit_log;

-- Clear security logs
DELETE FROM security_logs;

-- Clear rate limits
DELETE FROM rate_limits;
