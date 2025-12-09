-- Criar tabela de carteira do cliente
CREATE TABLE public.carteira_cliente (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id UUID NOT NULL,
  saldo NUMERIC NOT NULL DEFAULT 0,
  saldo_bloqueado NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de movimentações da carteira
CREATE TABLE public.carteira_movimentacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  carteira_id UUID NOT NULL REFERENCES public.carteira_cliente(id),
  tipo TEXT NOT NULL CHECK (tipo IN ('deposito', 'saque', 'pagamento_servico', 'pagamento_peca', 'pagamento_assinatura', 'reembolso', 'bonus')),
  valor NUMERIC NOT NULL,
  saldo_anterior NUMERIC NOT NULL,
  saldo_posterior NUMERIC NOT NULL,
  descricao TEXT,
  referencia_id UUID,
  referencia_tipo TEXT,
  mercadopago_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado', 'cancelado')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de pagamentos de assinatura
CREATE TABLE public.pagamentos_assinatura (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plano_contratado_id UUID REFERENCES public.planos_contratados(id),
  usuario_id UUID NOT NULL,
  valor NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado', 'cancelado', 'reembolsado')),
  meio_pagamento TEXT NOT NULL,
  mercadopago_preference_id TEXT,
  mercadopago_payment_id TEXT,
  data_pagamento TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.carteira_cliente ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carteira_movimentacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagamentos_assinatura ENABLE ROW LEVEL SECURITY;

-- Políticas para carteira_cliente
CREATE POLICY "Usuários podem ver própria carteira"
ON public.carteira_cliente FOR SELECT
USING (auth.uid() = cliente_id);

CREATE POLICY "Sistema pode criar carteira"
ON public.carteira_cliente FOR INSERT
WITH CHECK (true);

CREATE POLICY "Sistema pode atualizar carteira"
ON public.carteira_cliente FOR UPDATE
USING (true);

-- Políticas para carteira_movimentacoes
CREATE POLICY "Usuários podem ver próprias movimentações"
ON public.carteira_movimentacoes FOR SELECT
USING (carteira_id IN (SELECT id FROM public.carteira_cliente WHERE cliente_id = auth.uid()));

CREATE POLICY "Sistema pode criar movimentações"
ON public.carteira_movimentacoes FOR INSERT
WITH CHECK (true);

CREATE POLICY "Sistema pode atualizar movimentações"
ON public.carteira_movimentacoes FOR UPDATE
USING (true);

-- Políticas para pagamentos_assinatura
CREATE POLICY "Usuários podem ver próprios pagamentos"
ON public.pagamentos_assinatura FOR SELECT
USING (auth.uid() = usuario_id);

CREATE POLICY "Sistema pode criar pagamentos"
ON public.pagamentos_assinatura FOR INSERT
WITH CHECK (true);

CREATE POLICY "Sistema pode atualizar pagamentos"
ON public.pagamentos_assinatura FOR UPDATE
USING (true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_carteira_cliente_updated_at
BEFORE UPDATE ON public.carteira_cliente
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pagamentos_assinatura_updated_at
BEFORE UPDATE ON public.pagamentos_assinatura
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();