-- Criar tabela para perfis de afiliados
CREATE TABLE public.affiliate_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  affiliate_slug TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  affiliate_since TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  total_sales DECIMAL(10,2) DEFAULT 0,
  total_commission DECIMAL(10,2) DEFAULT 0,
  commission_pending DECIMAL(10,2) DEFAULT 0,
  commission_paid DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para vendas de afiliados
CREATE TABLE public.affiliate_sales (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID NOT NULL REFERENCES public.affiliate_profiles(id) ON DELETE CASCADE,
  buyer_id UUID,
  product_id UUID,
  product_name TEXT NOT NULL,
  sale_amount DECIMAL(10,2) NOT NULL,
  commission_percent DECIMAL(5,2) NOT NULL,
  commission_value DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'pago', 'cancelado')),
  origin TEXT NOT NULL DEFAULT 'link' CHECK (origin IN ('link', 'qr', 'app_indicacao')),
  order_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para configurações de produtos
CREATE TABLE public.product_affiliate_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT,
  is_affiliate_enabled BOOLEAN NOT NULL DEFAULT true,
  commission_percent DECIMAL(5,2) NOT NULL DEFAULT 5.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para saques de comissão
CREATE TABLE public.affiliate_withdrawals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID NOT NULL REFERENCES public.affiliate_profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'solicitado' CHECK (status IN ('solicitado', 'processando', 'pago', 'cancelado')),
  payment_method TEXT NOT NULL DEFAULT 'pix',
  payment_details JSONB,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.affiliate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_affiliate_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_withdrawals ENABLE ROW LEVEL SECURITY;

-- Políticas para affiliate_profiles
CREATE POLICY "Usuários podem ver seu próprio perfil de afiliado"
ON public.affiliate_profiles
FOR SELECT
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Usuários podem criar seu próprio perfil de afiliado"
ON public.affiliate_profiles
FOR INSERT
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Usuários podem atualizar seu próprio perfil de afiliado"
ON public.affiliate_profiles
FOR UPDATE
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Perfis públicos são visíveis para todos"
ON public.affiliate_profiles
FOR SELECT
USING (is_active = true);

-- Políticas para affiliate_sales
CREATE POLICY "Afiliados podem ver suas próprias vendas"
ON public.affiliate_sales
FOR SELECT
USING (
  affiliate_id IN (
    SELECT id FROM public.affiliate_profiles 
    WHERE user_id::text = auth.uid()::text
  )
);

CREATE POLICY "Sistema pode inserir vendas"
ON public.affiliate_sales
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Sistema pode atualizar vendas"
ON public.affiliate_sales
FOR UPDATE
USING (true);

-- Políticas para product_affiliate_settings
CREATE POLICY "Configurações são visíveis para todos"
ON public.product_affiliate_settings
FOR SELECT
USING (true);

CREATE POLICY "Admins podem gerenciar configurações"
ON public.product_affiliate_settings
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id::text = auth.uid()::text 
    AND tipo_usuario = 'admin'
  )
);

-- Políticas para affiliate_withdrawals
CREATE POLICY "Afiliados podem ver seus próprios saques"
ON public.affiliate_withdrawals
FOR SELECT
USING (
  affiliate_id IN (
    SELECT id FROM public.affiliate_profiles 
    WHERE user_id::text = auth.uid()::text
  )
);

CREATE POLICY "Afiliados podem solicitar saques"
ON public.affiliate_withdrawals
FOR INSERT
WITH CHECK (
  affiliate_id IN (
    SELECT id FROM public.affiliate_profiles 
    WHERE user_id::text = auth.uid()::text
  )
);

-- Triggers para atualizar updated_at
CREATE TRIGGER update_affiliate_profiles_updated_at
BEFORE UPDATE ON public.affiliate_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_affiliate_sales_updated_at
BEFORE UPDATE ON public.affiliate_sales
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_affiliate_settings_updated_at
BEFORE UPDATE ON public.product_affiliate_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_affiliate_withdrawals_updated_at
BEFORE UPDATE ON public.affiliate_withdrawals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir algumas configurações padrão de produtos
INSERT INTO public.product_affiliate_settings (product_id, product_name, category, commission_percent) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Cabeça de Impressão Roland DX4', 'Cabeças de Impressão', 8.00),
('550e8400-e29b-41d4-a716-446655440002', 'Tinta Sublimática 1 Litro', 'Tintas', 12.00),
('550e8400-e29b-41d4-a716-446655440003', 'Papel Sublimático A4', 'Papéis', 15.00),
('550e8400-e29b-41d4-a716-446655440004', 'Kit Manutenção Epson', 'Componentes de Impressão', 10.00),
('550e8400-e29b-41d4-a716-446655440005', 'Plotter de Recorte 60cm', 'Equipamentos', 5.00);