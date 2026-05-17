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
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import {
  Award,
  Building2,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Store,
  UserRound,
  Users,
  Wrench,
} from 'lucide-react';

const CompanyProfile = () => {
  const { isAuthenticated, userType, user } = useAuth();
  const [offersTechnicalService, setOffersTechnicalService] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/loja/register" replace />;
  }

  const storeName =
    user?.user_metadata?.nome_empresa ||
    user?.user_metadata?.company_name ||
    user?.user_metadata?.name ||
    'Loja parceira';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Perfil atualizado',
        description: 'As alterações foram salvas com sucesso.',
      });
    }, 900);
  };

  const handleTechProfileSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Configurações técnicas salvas',
        description: 'Seu perfil de assistência técnica foi atualizado com sucesso.',
      });
    }, 900);
  };

  return (
    <StoreLayout
      title="Perfil da Loja"
      subtitle="Gerencie dados públicos, informações comerciais, contatos, endereço e configurações técnicas da loja."
      action={
        <Button className="bg-white text-violet-950 hover:bg-violet-100" form="company-profile-form">
          <Save className="mr-2 h-4 w-4" />
          Salvar perfil
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="border-slate-200 bg-white shadow-sm lg:col-span-2">
            <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-violet-700 text-white">
                <Store className="h-10 w-10" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-slate-500">Conta da loja</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">{storeName}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {user?.email || 'Email não identificado'}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-black text-emerald-800">
                  <CheckCircle className="h-4 w-4" />
                  Perfil ativo
                </div>
                <p className="mt-1 text-xs text-emerald-700">Conta habilitada para operação</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 rounded-2xl bg-violet-50 p-3 text-violet-700 w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-slate-500">Confiabilidade</p>
              <p className="mt-2 text-3xl font-black text-slate-950">92%</p>
              <p className="mt-2 text-sm text-slate-500">
                Complete os campos obrigatórios para melhorar a exposição da loja.
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="general" className="space-y-5">
          <TabsList className="grid h-auto w-full grid-cols-4 rounded-2xl bg-slate-100 p-1">
            <TabsTrigger
              value="general"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Dados gerais
            </TabsTrigger>

            <TabsTrigger
              value="address"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Endereço
            </TabsTrigger>

            <TabsTrigger
              value="technical"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Assistência
            </TabsTrigger>

            <TabsTrigger
              value="social"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Redes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-950">Informações comerciais</CardTitle>
                <CardDescription>
                  Estes dados ajudam clientes e técnicos a identificar sua loja.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form id="company-profile-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-slate-700">Nome da empresa</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input className="h-11 border-slate-200 pl-10" defaultValue={storeName} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700">Nome do responsável</Label>
                      <div className="relative">
                        <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          className="h-11 border-slate-200 pl-10"
                          defaultValue={user?.user_metadata?.name || ''}
                          placeholder="Responsável comercial"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700">Email comercial</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          className="h-11 border-slate-200 pl-10"
                          defaultValue={user?.email || ''}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700">Telefone / WhatsApp</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          className="h-11 border-slate-200 pl-10"
                          placeholder="(47) 99999-9999"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700">CNPJ</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          className="h-11 border-slate-200 pl-10"
                          placeholder="00.000.000/0001-00"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700">Site</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          className="h-11 border-slate-200 pl-10"
                          placeholder="https://sualoja.com.br"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Descrição da loja</Label>
                    <Textarea
                      className="min-h-[120px] border-slate-200"
                      placeholder="Descreva sua empresa, especialidades, diferenciais e linha de produtos..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-violet-700 text-white hover:bg-violet-800"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {loading ? 'Salvando...' : 'Salvar dados'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-950">Endereço da loja</CardTitle>
                <CardDescription>
                  Informe o endereço para logística, atendimento presencial e localização.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-slate-700">Rua / Avenida</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input className="h-11 border-slate-200 pl-10" placeholder="Endereço" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Número</Label>
                    <Input className="h-11 border-slate-200" placeholder="000" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Bairro</Label>
                    <Input className="h-11 border-slate-200" placeholder="Bairro" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Cidade</Label>
                    <Input className="h-11 border-slate-200" placeholder="Cidade" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Estado</Label>
                    <Input className="h-11 border-slate-200" placeholder="UF" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">CEP</Label>
                    <Input className="h-11 border-slate-200" placeholder="00000-000" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-violet-700 text-white hover:bg-violet-800">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar endereço
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-950">Serviços técnicos</CardTitle>
                <CardDescription>
                  Configure se sua loja também oferece assistência técnica, instalação ou suporte.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleTechProfileSubmit} className="space-y-5">
                  <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex gap-3">
                      <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                        <Wrench className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="font-black text-slate-950">Oferece assistência técnica?</p>
                        <p className="text-sm text-slate-500">
                          Ative para exibir serviços técnicos no perfil da loja.
                        </p>
                      </div>
                    </div>

                    <Switch
                      checked={offersTechnicalService}
                      onCheckedChange={setOffersTechnicalService}
                    />
                  </div>

                  {offersTechnicalService && (
                    <div className="space-y-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-slate-700">Especialidades</Label>
                          <Textarea
                            className="min-h-[110px] border-slate-200"
                            placeholder="DTF, UV, sublimação, eco solvente, manutenção preventiva..."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-slate-700">Regiões atendidas</Label>
                          <Textarea
                            className="min-h-[110px] border-slate-200"
                            placeholder="Joinville, Blumenau, Brusque, Curitiba..."
                          />
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        {[
                          'Instalação de equipamento',
                          'Manutenção preventiva',
                          'Manutenção corretiva',
                          'Treinamento de operador',
                          'Suporte remoto',
                          'Venda de peças',
                        ].map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700"
                          >
                            <Checkbox />
                            {item}
                          </label>
                        ))}
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={loading}
                          className="bg-violet-700 text-white hover:bg-violet-800"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          {loading ? 'Salvando...' : 'Salvar assistência'}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-950">Redes e reputação</CardTitle>
                <CardDescription>
                  Adicione canais de contato e presença digital da loja.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Instagram</Label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input className="h-11 border-slate-200 pl-10" placeholder="@sualoja" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">LinkedIn</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input className="h-11 border-slate-200 pl-10" placeholder="linkedin.com/company/..." />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-5">
                      <Award className="mb-3 h-6 w-6 text-violet-700" />
                      <p className="font-black text-slate-950">Selo de qualidade</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Exiba certificações e diferenciais técnicos.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-5">
                      <Clock className="mb-3 h-6 w-6 text-violet-700" />
                      <p className="font-black text-slate-950">Horário de atendimento</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Informe horários comerciais e plantões.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-5">
                      <Users className="mb-3 h-6 w-6 text-violet-700" />
                      <p className="font-black text-slate-950">Equipe</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Mostre responsáveis comerciais e técnicos.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-violet-700 text-white hover:bg-violet-800">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar redes
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

export default CompanyProfile;
