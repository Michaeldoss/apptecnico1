-- Criar tabela para configuração de despesas do técnico
CREATE TABLE IF NOT EXISTS public.tecnico_despesas_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tecnico_id UUID NOT NULL REFERENCES public.tecnicos(id) ON DELETE CASCADE,
  
  -- Deslocamento
  valor_km_veiculo NUMERIC(10, 2) DEFAULT 0,
  valor_pedagio NUMERIC(10, 2) DEFAULT 0,
  valor_estacionamento NUMERIC(10, 2) DEFAULT 0,
  valor_passagem_onibus NUMERIC(10, 2) DEFAULT 0,
  valor_passagem_aviao NUMERIC(10, 2) DEFAULT 0,
  
  -- Hospedagem e alimentação
  valor_diaria_hospedagem NUMERIC(10, 2) DEFAULT 0,
  valor_refeicao NUMERIC(10, 2) DEFAULT 0,
  
  -- Outros custos
  despesas_extras JSONB DEFAULT '[]'::jsonb,
  
  -- Configurações
  raio_atendimento_km INTEGER DEFAULT 50,
  cobra_deslocamento_acima_km INTEGER DEFAULT 10,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  CONSTRAINT unique_tecnico_despesas UNIQUE(tecnico_id)
);

-- Habilitar RLS
ALTER TABLE public.tecnico_despesas_config ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Técnicos podem gerenciar suas próprias despesas"
  ON public.tecnico_despesas_config
  FOR ALL
  USING (auth.uid() = tecnico_id);

CREATE POLICY "Público pode ver despesas de técnicos ativos"
  ON public.tecnico_despesas_config
  FOR SELECT
  USING (
    tecnico_id IN (
      SELECT id FROM public.tecnicos WHERE ativo = true
    )
  );

-- Trigger para atualizar updated_at
CREATE TRIGGER update_tecnico_despesas_config_updated_at
  BEFORE UPDATE ON public.tecnico_despesas_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Criar tabela para orçamentos detalhados
CREATE TABLE IF NOT EXISTS public.orcamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tecnico_id UUID NOT NULL REFERENCES public.tecnicos(id) ON DELETE CASCADE,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE SET NULL,
  ordem_servico_id UUID REFERENCES public.ordens_servico(id) ON DELETE SET NULL,
  
  -- Dados do orçamento
  titulo TEXT NOT NULL,
  descricao TEXT,
  
  -- Valores de serviço
  valor_visita NUMERIC(10, 2) DEFAULT 0,
  horas_mao_obra NUMERIC(10, 2) DEFAULT 0,
  valor_hora_mao_obra NUMERIC(10, 2) DEFAULT 0,
  valor_total_mao_obra NUMERIC(10, 2) DEFAULT 0,
  
  -- Peças
  itens_pecas JSONB DEFAULT '[]'::jsonb,
  valor_total_pecas NUMERIC(10, 2) DEFAULT 0,
  
  -- Deslocamento e despesas
  distancia_km NUMERIC(10, 2) DEFAULT 0,
  valor_deslocamento NUMERIC(10, 2) DEFAULT 0,
  dias_trabalho INTEGER DEFAULT 1,
  valor_hospedagem NUMERIC(10, 2) DEFAULT 0,
  valor_alimentacao NUMERIC(10, 2) DEFAULT 0,
  despesas_extras JSONB DEFAULT '[]'::jsonb,
  valor_total_despesas NUMERIC(10, 2) DEFAULT 0,
  
  -- Totais
  valor_subtotal NUMERIC(10, 2) DEFAULT 0,
  desconto_percentual NUMERIC(5, 2) DEFAULT 0,
  desconto_valor NUMERIC(10, 2) DEFAULT 0,
  valor_total NUMERIC(10, 2) DEFAULT 0,
  
  -- Status e datas
  status TEXT DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'enviado', 'aprovado', 'rejeitado', 'expirado')),
  data_validade TIMESTAMP WITH TIME ZONE,
  data_aprovacao TIMESTAMP WITH TIME ZONE,
  observacoes TEXT,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.orcamentos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para orçamentos
CREATE POLICY "Técnicos podem gerenciar seus orçamentos"
  ON public.orcamentos
  FOR ALL
  USING (auth.uid() = tecnico_id);

CREATE POLICY "Clientes podem ver orçamentos recebidos"
  ON public.orcamentos
  FOR SELECT
  USING (auth.uid() = cliente_id AND status IN ('enviado', 'aprovado', 'rejeitado'));

CREATE POLICY "Clientes podem aprovar/rejeitar orçamentos"
  ON public.orcamentos
  FOR UPDATE
  USING (auth.uid() = cliente_id AND status = 'enviado')
  WITH CHECK (auth.uid() = cliente_id AND status IN ('aprovado', 'rejeitado'));

-- Trigger para atualizar updated_at
CREATE TRIGGER update_orcamentos_updated_at
  BEFORE UPDATE ON public.orcamentos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para melhor performance
CREATE INDEX idx_tecnico_despesas_tecnico_id ON public.tecnico_despesas_config(tecnico_id);
CREATE INDEX idx_orcamentos_tecnico_id ON public.orcamentos(tecnico_id);
CREATE INDEX idx_orcamentos_cliente_id ON public.orcamentos(cliente_id);
CREATE INDEX idx_orcamentos_status ON public.orcamentos(status);
CREATE INDEX idx_orcamentos_data_validade ON public.orcamentos(data_validade);

-- Comentários
COMMENT ON TABLE public.tecnico_despesas_config IS 'Configuração de despesas e cobranças personalizadas do técnico';
COMMENT ON TABLE public.orcamentos IS 'Orçamentos detalhados com despesas discriminadas';
COMMENT ON COLUMN public.tecnico_despesas_config.despesas_extras IS 'Array de objetos JSON com despesas personalizadas: [{nome, valor, unidade}]';
COMMENT ON COLUMN public.orcamentos.itens_pecas IS 'Array de objetos JSON com peças: [{nome, quantidade, valor_unitario, valor_total}]';
COMMENT ON COLUMN public.orcamentos.despesas_extras IS 'Array de objetos JSON com despesas extras: [{descricao, valor}]';