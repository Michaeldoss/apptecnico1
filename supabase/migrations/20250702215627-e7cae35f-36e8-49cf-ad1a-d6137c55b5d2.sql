-- Criar tabela de usuários para o sistema admin
CREATE TABLE public.usuarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('admin', 'tecnico', 'cliente', 'company')),
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança - apenas admins podem gerenciar usuários
CREATE POLICY "Admins podem ver todos os usuários"
ON public.usuarios 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id::text = auth.uid()::text AND tipo_usuario = 'admin'
  )
);

CREATE POLICY "Admins podem inserir usuários"
ON public.usuarios 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id::text = auth.uid()::text AND tipo_usuario = 'admin'
  )
);

CREATE POLICY "Admins podem atualizar usuários"
ON public.usuarios 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id::text = auth.uid()::text AND tipo_usuario = 'admin'
  )
);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_usuarios_updated_at
BEFORE UPDATE ON public.usuarios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir um usuário admin de exemplo (você pode editar depois)
INSERT INTO public.usuarios (id, nome, email, tipo_usuario, ativo) 
VALUES (
  gen_random_uuid(),
  'Admin Master',
  'admin@apptecnico.com.br',
  'admin',
  true
);