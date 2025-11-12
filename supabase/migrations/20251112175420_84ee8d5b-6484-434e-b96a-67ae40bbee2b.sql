-- Tabela para armazenar configurações do WhatsApp por usuário
CREATE TABLE public.whatsapp_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  verify_token TEXT NOT NULL,
  business_account_id TEXT,
  phone_number TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.whatsapp_config ENABLE ROW LEVEL SECURITY;

-- Policy: Usuários podem ver apenas suas próprias configurações
CREATE POLICY "Users can view own whatsapp config"
  ON public.whatsapp_config
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Usuários podem inserir suas próprias configurações
CREATE POLICY "Users can insert own whatsapp config"
  ON public.whatsapp_config
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Usuários podem atualizar suas próprias configurações
CREATE POLICY "Users can update own whatsapp config"
  ON public.whatsapp_config
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Usuários podem deletar suas próprias configurações
CREATE POLICY "Users can delete own whatsapp config"
  ON public.whatsapp_config
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_whatsapp_config_updated_at
  BEFORE UPDATE ON public.whatsapp_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Tabela para histórico de mensagens do WhatsApp
CREATE TABLE public.whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_phone TEXT NOT NULL,
  customer_name TEXT,
  message_type TEXT NOT NULL CHECK (message_type IN ('text', 'image', 'document', 'template')),
  message_content TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  whatsapp_message_id TEXT,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Usuários podem ver apenas suas próprias mensagens
CREATE POLICY "Users can view own whatsapp messages"
  ON public.whatsapp_messages
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Usuários podem inserir suas próprias mensagens
CREATE POLICY "Users can insert own whatsapp messages"
  ON public.whatsapp_messages
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Índices para melhor performance
CREATE INDEX idx_whatsapp_messages_user_id ON public.whatsapp_messages(user_id);
CREATE INDEX idx_whatsapp_messages_customer_phone ON public.whatsapp_messages(customer_phone);
CREATE INDEX idx_whatsapp_messages_created_at ON public.whatsapp_messages(created_at DESC);