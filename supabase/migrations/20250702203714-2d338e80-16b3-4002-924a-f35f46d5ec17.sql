-- Criar tabela de transações
CREATE TABLE public.transacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id UUID NOT NULL,
  tecnico_id UUID NOT NULL,
  servico_id UUID NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'retido', 'liberado', 'cancelado', 'falhado')),
  meio_pagamento TEXT NOT NULL CHECK (meio_pagamento IN ('pix', 'boleto', 'cartao_credito', 'cartao_debito')),
  data_pagamento TIMESTAMP WITH TIME ZONE,
  data_liberacao TIMESTAMP WITH TIME ZONE,
  comprovante_url TEXT,
  mercadopago_payment_id TEXT,
  mercadopago_preference_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.transacoes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Técnicos podem ver suas transações" 
ON public.transacoes 
FOR SELECT 
USING (auth.uid()::text = tecnico_id::text);

CREATE POLICY "Clientes podem ver suas transações" 
ON public.transacoes 
FOR SELECT 
USING (auth.uid()::text = cliente_id::text);

CREATE POLICY "Sistema pode inserir transações" 
ON public.transacoes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Sistema pode atualizar transações" 
ON public.transacoes 
FOR UPDATE 
USING (true);

-- Criar tabela de configurações de pagamento do técnico
CREATE TABLE public.tecnico_pagamento_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tecnico_id UUID NOT NULL UNIQUE,
  mercadopago_access_token TEXT,
  mercadopago_user_id TEXT,
  conta_verificada BOOLEAN DEFAULT false,
  taxa_plataforma DECIMAL(5,2) DEFAULT 5.00, -- Taxa da plataforma em %
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.tecnico_pagamento_config ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Técnicos podem ver sua config" 
ON public.tecnico_pagamento_config 
FOR SELECT 
USING (auth.uid()::text = tecnico_id::text);

CREATE POLICY "Técnicos podem atualizar sua config" 
ON public.tecnico_pagamento_config 
FOR UPDATE 
USING (auth.uid()::text = tecnico_id::text);

CREATE POLICY "Sistema pode inserir config" 
ON public.tecnico_pagamento_config 
FOR INSERT 
WITH CHECK (true);

-- Criar função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamps
CREATE TRIGGER update_transacoes_updated_at
BEFORE UPDATE ON public.transacoes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tecnico_pagamento_config_updated_at
BEFORE UPDATE ON public.tecnico_pagamento_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Criar índices para performance
CREATE INDEX idx_transacoes_tecnico_id ON public.transacoes(tecnico_id);
CREATE INDEX idx_transacoes_cliente_id ON public.transacoes(cliente_id);
CREATE INDEX idx_transacoes_status ON public.transacoes(status);
CREATE INDEX idx_transacoes_data_pagamento ON public.transacoes(data_pagamento);
CREATE INDEX idx_transacoes_mercadopago_payment_id ON public.transacoes(mercadopago_payment_id);