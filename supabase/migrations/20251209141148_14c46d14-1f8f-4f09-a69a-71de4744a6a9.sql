-- Inserir planos disponíveis
INSERT INTO planos (nome, descricao, preco_mensal, preco_anual, limite_servicos, limite_usuarios, caracteristicas, ativo)
VALUES 
  ('Gratuito', 'Plano de teste gratuito por 7 dias', 0, 0, 5, 1, 
   '["5 chamados", "1 cliente", "1 equipamento", "Agenda limitada"]'::jsonb, true),
  
  ('Básico', 'Para técnicos iniciantes', 29, 290, 30, 1,
   '["30 chamados/mês", "10 clientes", "10 equipamentos", "PDF de OS", "Histórico 30 dias", "Controle de peças simples", "Agenda completa", "Suporte por e-mail"]'::jsonb, true),
  
  ('Profissional', 'Para técnicos experientes', 59, 590, -1, 1,
   '["Chamados ilimitados", "Clientes ilimitados", "Equipamentos ilimitados", "Histórico completo", "Controle de peças avançado", "Assinatura digital", "Relatórios Excel/PDF", "Dashboards avançados", "Suporte WhatsApp"]'::jsonb, true),
  
  ('Corporativo', 'Para empresas e equipes', 99, 990, -1, 5,
   '["Todas funcionalidades Profissional", "Até 5 usuários", "Acesso multiempresa", "Dashboard unificado", "Integração NF/CRM", "Suporte prioritário", "Personalização de marca"]'::jsonb, true);