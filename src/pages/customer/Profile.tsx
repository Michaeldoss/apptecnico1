
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Wrench, MapPin, CreditCard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const CustomerProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Dados de exemplo do perfil
  const profile = {
    name: user?.name || 'Ana Silva',
    email: user?.email || 'ana.silva@exemplo.com',
    phone: '(11) 98765-4321',
    document: '123.456.789-00',
    address: 'Rua das Flores, 123, São Paulo - SP',
    cep: '01234-567',
    city: 'São Paulo',
    state: 'SP',
  };
  
  // Dados do dashboard
  const activeServices = 2;
  const pendingPayments = 1;
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    }, 1500);
  };
  
  return (
    <CustomerLayout title="Meu Perfil">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt={profile.name} />
                <AvatarFallback className="text-lg">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>
                  <span className="text-muted-foreground">{profile.email}</span>
                </CardDescription>
              </div>
            </div>
            <Button>Alterar Foto</Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mt-2">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">Conta verificada</span>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Serviços Ativos</CardTitle>
              <Wrench className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeServices}</div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
              <Link to="/cliente/servicos" className="inline-block mt-2">
                <Button variant="link" size="sm" className="p-0">
                  Ver serviços
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Técnicos em Campo</CardTitle>
              <MapPin className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Atendimento em andamento</p>
              <Link to="/cliente/rastreamento" className="inline-block mt-2">
                <Button variant="link" size="sm" className="p-0">
                  Rastrear técnico
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pagamentos</CardTitle>
              <CreditCard className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingPayments}</div>
              <p className="text-xs text-muted-foreground">Pendente de pagamento</p>
              <Link to="/cliente/pagamentos" className="inline-block mt-2">
                <Button variant="link" size="sm" className="p-0">
                  Ver pagamentos
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="address">Endereço</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Reparo de Computador</p>
                        <p className="text-sm text-muted-foreground">Agendado para 15/08/2023</p>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Em andamento
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Manutenção de Rede</p>
                        <p className="text-sm text-muted-foreground">Concluído em 10/08/2023</p>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        Concluído
                      </span>
                    </li>
                  </ul>
                  <Link to="/cliente/servicos" className="block mt-4">
                    <Button variant="outline" className="w-full">
                      Ver todos os serviços
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Técnicos Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium">TD</span>
                      </div>
                      <div>
                        <p className="font-medium">Técnico Demo</p>
                        <p className="text-sm text-muted-foreground">Último atendimento: 15/08/2023</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium">JS</span>
                      </div>
                      <div>
                        <p className="font-medium">João Silva</p>
                        <p className="text-sm text-muted-foreground">Último atendimento: 10/08/2023</p>
                      </div>
                    </li>
                  </ul>
                  <Link to="/find-technician" className="block mt-4">
                    <Button variant="outline" className="w-full">
                      Encontrar técnicos
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="personal" className="mt-4">
            <Card>
              <form onSubmit={handleSaveProfile}>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Nome Completo</Label>
                      <Input id="full-name" defaultValue={profile.name} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={profile.email} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" defaultValue={profile.phone} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="document">CPF</Label>
                      <Input id="document" defaultValue={profile.document} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Alterar Senha</Label>
                    <Input id="password" type="password" placeholder="Digite a nova senha" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirme a nova senha" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="address" className="mt-4">
            <Card>
              <form onSubmit={handleSaveProfile}>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                  <CardDescription>
                    Atualize seu endereço para entrega e retirada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Endereço completo</Label>
                      <Input id="address" defaultValue={profile.address} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" defaultValue={profile.cep} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" defaultValue={profile.city} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input id="state" defaultValue={profile.state} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional-info">Complemento</Label>
                    <Textarea 
                      id="additional-info" 
                      placeholder="Informações adicionais para entrega (apartamento, referências, etc.)" 
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Acesse rapidamente as principais funcionalidades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link to="/services">
                      <Button className="w-full" variant="outline">
                        <Wrench className="h-4 w-4 mr-2" />
                        Solicitar Serviço
                      </Button>
                    </Link>
                    <Link to="/find-technician">
                      <Button className="w-full" variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        Encontrar Técnico
                      </Button>
                    </Link>
                    <Link to="/cliente/agenda">
                      <Button className="w-full" variant="outline">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Agendar Visita
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default CustomerProfile;
