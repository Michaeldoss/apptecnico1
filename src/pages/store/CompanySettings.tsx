import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { WhatsAppConfig } from '@/components/technician/WhatsAppConfig';
import {
  Bell,
  CreditCard,
  Eye,
  Globe,
  Lock,
  MessageCircle,
  Palette,
  Save,
  Settings,
  Shield,
  Store,
  Users,
} from 'lucide-react';

const CompanySettings = () => {
  const { isAuthenticated, userType } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/login" replace />;
  }

  const handleSave = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Configurações salvas',
        description: 'As preferências da loja foram atualizadas com sucesso.',
      });
    }, 800);
  };

  return (
    <StoreLayout
      title="Configurações"
      subtitle="Gerencie preferências da loja, notificações, privacidade, WhatsApp, pagamentos e aparência da conta."
      action={
        <Button className="bg-white text-violet-950 hover:bg-violet-100" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Salvar alterações
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-5 rounded-2xl bg-violet-50 p-3 text-violet-700 w-fit">
                <Store className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-slate-500">Loja</p>
              <p className="mt-2 text-2xl font-black text-slate-950">Ativa</p>
              <p className="mt-2 text-sm text-slate-500">Perfil operacional habilitado.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-5 rounded-2xl bg-violet-50 p-3 text-violet-700 w-fit">
                <MessageCircle className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-slate-500">WhatsApp</p>
              <p className="mt-2 text-2xl font-black text-slate-950">Pendente</p>
              <p className="mt-2 text-sm text-slate-500">Configure o atendimento comercial.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-5 rounded-2xl bg-violet-50 p-3 text-violet-700 w-fit">
                <Bell className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-slate-500">Notificações</p>
              <p className="mt-2 text-2xl font-black text-slate-950">Ligadas</p>
              <p className="mt-2 text-sm text-slate-500">Alertas de pedidos e estoque.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-5 rounded-2xl bg-violet-50 p-3 text-violet-700 w-fit">
                <Shield className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-slate-500">Segurança</p>
              <p className="mt-2 text-2xl font-black text-slate-950">Normal</p>
              <p className="mt-2 text-sm text-slate-500">Conta protegida e autenticada.</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="whatsapp" className="space-y-5">
          <TabsList className="grid h-auto w-full grid-cols-5 rounded-2xl bg-slate-100 p-1">
            <TabsTrigger
              value="whatsapp"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              WhatsApp
            </TabsTrigger>

            <TabsTrigger
              value="general"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Geral
            </TabsTrigger>

            <TabsTrigger
              value="notifications"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Alertas
            </TabsTrigger>

            <TabsTrigger
              value="payments"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Pagamentos
            </TabsTrigger>

            <TabsTrigger
              value="privacy"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Privacidade
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-950">
                  <MessageCircle className="h-5 w-5 text-violet-700" />
                  WhatsApp Business
                </CardTitle>
                <CardDescription>
                  Configure a comunicação da loja para atendimento, pedidos, suporte e relacionamento.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <WhatsAppConfig />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-950">
                  <Settings className="h-5 w-5 text-violet-700" />
                  Configurações gerais
                </CardTitle>
                <CardDescription>
                  Defina preferências operacionais e apresentação da loja.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Nome público da loja</Label>
                    <Input className="h-11 border-slate-200" placeholder="Nome exibido no marketplace" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Categoria principal</Label>
                    <Select defaultValue="impressao">
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="impressao">Impressão digital</SelectItem>
                        <SelectItem value="pecas">Peças e componentes</SelectItem>
                        <SelectItem value="tintas">Tintas e suprimentos</SelectItem>
                        <SelectItem value="servicos">Serviços técnicos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Fuso horário</Label>
                    <Select defaultValue="america-sao-paulo">
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Selecione o fuso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-sao-paulo">America/Sao_Paulo</SelectItem>
                        <SelectItem value="america-manaus">America/Manaus</SelectItem>
                        <SelectItem value="america-cuiaba">America/Cuiaba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Idioma</Label>
                    <Select defaultValue="pt-br">
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Selecione o idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-br">Português Brasil</SelectItem>
                        <SelectItem value="en">Inglês</SelectItem>
                        <SelectItem value="es">Espanhol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Mensagem institucional</Label>
                  <Textarea
                    className="min-h-[110px] border-slate-200"
                    placeholder="Mensagem que resume o posicionamento comercial da loja..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    disabled={loading}
                    onClick={handleSave}
                    className="bg-violet-700 text-white hover:bg-violet-800"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? 'Salvando...' : 'Salvar configurações'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-950">
                  <Bell className="h-5 w-5 text-violet-700" />
                  Notificações e alertas
                </CardTitle>
                <CardDescription>
                  Controle quais eventos devem gerar avisos para sua equipe.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {[
                  {
                    title: 'Novo pedido recebido',
                    description: 'Receber alerta sempre que um cliente fizer uma compra.',
                    enabled: true,
                  },
                  {
                    title: 'Estoque baixo',
                    description: 'Avisar quando um produto ficar abaixo do estoque mínimo.',
                    enabled: true,
                  },
                  {
                    title: 'Nova avaliação',
                    description: 'Avisar quando um cliente avaliar produto ou atendimento.',
                    enabled: true,
                  },
                  {
                    title: 'Pagamento liberado',
                    description: 'Avisar quando um repasse financeiro estiver disponível.',
                    enabled: false,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-black text-slate-950">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>

                    <Switch defaultChecked={item.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-950">
                  <CreditCard className="h-5 w-5 text-violet-700" />
                  Pagamentos e repasses
                </CardTitle>
                <CardDescription>
                  Configure dados financeiros, métodos aceitos e regras de recebimento.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Banco</Label>
                    <Input className="h-11 border-slate-200" placeholder="Nome do banco" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Chave Pix</Label>
                    <Input className="h-11 border-slate-200" placeholder="CPF, CNPJ, email, telefone ou aleatória" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Agência</Label>
                    <Input className="h-11 border-slate-200" placeholder="0000" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Conta</Label>
                    <Input className="h-11 border-slate-200" placeholder="00000-0" />
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="font-black text-emerald-950">Repasses protegidos</p>
                  <p className="mt-1 text-sm text-emerald-800">
                    Os dados financeiros serão usados para repasses conforme regras da plataforma.
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-violet-700 text-white hover:bg-violet-800">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar pagamentos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-950">
                  <Lock className="h-5 w-5 text-violet-700" />
                  Privacidade e segurança
                </CardTitle>
                <CardDescription>
                  Controle visibilidade, permissões e proteção dos dados da loja.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {[
                  {
                    icon: Eye,
                    title: 'Exibir loja no marketplace',
                    description: 'Permite que clientes encontrem seus produtos e perfil público.',
                    enabled: true,
                  },
                  {
                    icon: Globe,
                    title: 'Mostrar localização pública',
                    description: 'Exibe cidade e estado no perfil da loja.',
                    enabled: true,
                  },
                  {
                    icon: Users,
                    title: 'Permitir contato direto',
                    description: 'Clientes podem chamar a loja pelos canais configurados.',
                    enabled: true,
                  },
                  {
                    icon: Palette,
                    title: 'Usar identidade visual própria',
                    description: 'Permite personalizar cores e elementos públicos da loja.',
                    enabled: false,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex gap-3">
                        <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-black text-slate-950">{item.title}</p>
                          <p className="text-sm text-slate-500">{item.description}</p>
                        </div>
                      </div>

                      <Switch defaultChecked={item.enabled} />
                    </div>
                  );
                })}

                <div className="flex justify-end">
                  <Button className="bg-violet-700 text-white hover:bg-violet-800">
                    <Shield className="mr-2 h-4 w-4" />
                    Salvar segurança
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StoreLayout>
  );
};

export default CompanySettings;
