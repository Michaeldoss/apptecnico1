-- Criar tabelas necessárias para o sistema completo

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS public.clientes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  cep TEXT,
  endereco TEXT,
  numero TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  cpf_cnpj TEXT,
  documentos_url JSONB DEFAULT '[]'::jsonb,
  foto_perfil_url TEXT,
  dados_bancarios JSONB,
  nota_perfil INTEGER DEFAULT 0,
  perfil_completo BOOLEAN DEFAULT false,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de técnicos
CREATE TABLE IF NOT EXISTS public.tecnicos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  cep TEXT,
  endereco TEXT,
  numero TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  cpf_cnpj TEXT,
  especialidades TEXT[],
  experiencia_anos INTEGER,
  documentos_url JSONB DEFAULT '[]'::jsonb,
  foto_perfil_url TEXT,
  dados_bancarios JSONB,
  nota_perfil INTEGER DEFAULT 0,
  perfil_completo BOOLEAN DEFAULT false,
  verificado BOOLEAN DEFAULT false,
  ativo BOOLEAN DEFAULT true,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de lojas/empresas
CREATE TABLE IF NOT EXISTS public.lojas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_empresa TEXT NOT NULL,
  nome_contato TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  cnpj TEXT,
  cep TEXT,
  endereco TEXT,
  numero TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  descricao TEXT,
  documentos_url JSONB DEFAULT '[]'::jsonb,
  logo_url TEXT,
  dados_bancarios JSONB,
  nota_perfil INTEGER DEFAULT 0,
  perfil_completo BOOLEAN DEFAULT false,
  verificado BOOLEAN DEFAULT false,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS public.produtos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  loja_id UUID REFERENCES public.lojas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  categoria TEXT,
  marca TEXT,
  modelo TEXT,
  imagens_url JSONB DEFAULT '[]'::jsonb,
  estoque INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de peças
CREATE TABLE IF NOT EXISTS public.pecas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tecnico_id UUID REFERENCES public.tecnicos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  categoria TEXT,
  marca TEXT,
  modelo TEXT,
  compatibilidade TEXT[],
  estoque INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de ordens de serviço
CREATE TABLE IF NOT EXISTS public.ordens_servico (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE,
  tecnico_id UUID REFERENCES public.tecnicos(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT,
  prioridade TEXT DEFAULT 'normal',
  status TEXT DEFAULT 'aberta',
  valor_servico DECIMAL(10,2),
  valor_pecas DECIMAL(10,2) DEFAULT 0,
  valor_total DECIMAL(10,2),
  endereco_servico TEXT,
  data_agendada TIMESTAMP WITH TIME ZONE,
  data_conclusao TIMESTAMP WITH TIME ZONE,
  avaliacao INTEGER,
  comentario_avaliacao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de serviços agendados
CREATE TABLE IF NOT EXISTS public.servicos_agendados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ordem_servico_id UUID REFERENCES public.ordens_servico(id) ON DELETE CASCADE,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE,
  tecnico_id UUID REFERENCES public.tecnicos(id) ON DELETE CASCADE,
  data_agendamento TIMESTAMP WITH TIME ZONE NOT NULL,
  data_inicio TIMESTAMP WITH TIME ZONE,
  data_fim TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'agendado',
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de planos
CREATE TABLE IF NOT EXISTS public.planos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco_mensal DECIMAL(10,2) NOT NULL,
  preco_anual DECIMAL(10,2),
  caracteristicas JSONB DEFAULT '[]'::jsonb,
  limite_servicos INTEGER,
  limite_usuarios INTEGER,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de planos contratados
CREATE TABLE IF NOT EXISTS public.planos_contratados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plano_id UUID REFERENCES public.planos(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL,
  usuario_tipo TEXT NOT NULL,
  data_inicio TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data_fim TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'ativo',
  valor_pago DECIMAL(10,2),
  forma_pagamento TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tecnicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lojas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pecas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ordens_servico ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servicos_agendados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planos_contratados ENABLE ROW LEVEL SECURITY;

-- Políticas para clientes
CREATE POLICY "Clientes podem ver e editar próprios dados" ON public.clientes
FOR ALL USING (auth.uid()::text = id::text);

CREATE POLICY "Técnicos podem ver clientes" ON public.clientes
FOR SELECT USING (true);

-- Políticas para técnicos
CREATE POLICY "Técnicos podem ver e editar próprios dados" ON public.tecnicos
FOR ALL USING (auth.uid()::text = id::text);

CREATE POLICY "Clientes podem ver técnicos ativos" ON public.tecnicos
FOR SELECT USING (ativo = true);

-- Políticas para lojas
CREATE POLICY "Lojas podem ver e editar próprios dados" ON public.lojas
FOR ALL USING (auth.uid()::text = id::text);

CREATE POLICY "Todos podem ver lojas ativas" ON public.lojas
FOR SELECT USING (ativo = true);

-- Políticas para produtos
CREATE POLICY "Lojas podem gerenciar próprios produtos" ON public.produtos
FOR ALL USING (loja_id IN (SELECT id FROM public.lojas WHERE auth.uid()::text = id::text));

CREATE POLICY "Todos podem ver produtos ativos" ON public.produtos
FOR SELECT USING (ativo = true);

-- Políticas para peças
CREATE POLICY "Técnicos podem gerenciar próprias peças" ON public.pecas
FOR ALL USING (tecnico_id IN (SELECT id FROM public.tecnicos WHERE auth.uid()::text = id::text));

CREATE POLICY "Todos podem ver peças ativas" ON public.pecas
FOR SELECT USING (ativo = true);

-- Políticas para ordens de serviço
CREATE POLICY "Clientes podem ver próprias ordens" ON public.ordens_servico
FOR SELECT USING (cliente_id IN (SELECT id FROM public.clientes WHERE auth.uid()::text = id::text));

CREATE POLICY "Técnicos podem ver ordens atribuídas" ON public.ordens_servico
FOR SELECT USING (tecnico_id IN (SELECT id FROM public.tecnicos WHERE auth.uid()::text = id::text));

CREATE POLICY "Clientes podem criar ordens" ON public.ordens_servico
FOR INSERT WITH CHECK (cliente_id IN (SELECT id FROM public.clientes WHERE auth.uid()::text = id::text));

-- Políticas para serviços agendados
CREATE POLICY "Clientes podem ver próprios agendamentos" ON public.servicos_agendados
FOR SELECT USING (cliente_id IN (SELECT id FROM public.clientes WHERE auth.uid()::text = id::text));

CREATE POLICY "Técnicos podem ver próprios agendamentos" ON public.servicos_agendados
FOR SELECT USING (tecnico_id IN (SELECT id FROM public.tecnicos WHERE auth.uid()::text = id::text));

-- Políticas para planos
CREATE POLICY "Todos podem ver planos ativos" ON public.planos
FOR SELECT USING (ativo = true);

-- Políticas para planos contratados
CREATE POLICY "Usuários podem ver próprios planos" ON public.planos_contratados
FOR SELECT USING (auth.uid()::text = usuario_id::text);

-- Triggers para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar triggers em todas as tabelas
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON public.clientes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tecnicos_updated_at BEFORE UPDATE ON public.tecnicos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lojas_updated_at BEFORE UPDATE ON public.lojas
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON public.produtos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pecas_updated_at BEFORE UPDATE ON public.pecas
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ordens_servico_updated_at BEFORE UPDATE ON public.ordens_servico
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_servicos_agendados_updated_at BEFORE UPDATE ON public.servicos_agendados
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_planos_updated_at BEFORE UPDATE ON public.planos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_planos_contratados_updated_at BEFORE UPDATE ON public.planos_contratados
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();