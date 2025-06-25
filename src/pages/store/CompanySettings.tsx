
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { 
  Settings, 
  ArrowLeft, 
  Save,
  Bell,
  Eye,
  CreditCard,
  Users,
  Shield,
  Palette,
  Globe
} from 'lucide-react';

const CompanySettings = () => {
  const { isAuthenticated, userType, user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Redirect to login if not authenticated or not a company
  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/store/company-register" replace />;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram atualizadas com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Settings className="h-10 w-10 text-tech-primary mr-4" />
              <div>
                <h1 className="text-3xl font-bold text-tech-primary font-inter">
                  Configurações
                </h1>
                <p className="text-gray-secondary font-inter">
                  Gerencie as configurações da sua loja
                </p>
              </div>
            </div>
            <Link to="/store/company-dashboard">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>
          
          <Tabs defaultValue="general">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="privacy">Privacidade</TabsTrigger>
              <TabsTrigger value="billing">Faturamento</TabsTrigger>
              <TabsTrigger value="team">Equipe</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <form onSubmit={handleSave}>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="h-5 w-5 mr-2" /> 
                        Configurações Gerais
                      </CardTitle>
                      <CardDescription>
                        Configurações básicas da sua loja
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="timezone">Fuso Horário</Label>
                        <Select defaultValue="america/sao_paulo">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="america/sao_paulo">América/São Paulo (BRT)</SelectItem>
                            <SelectItem value="america/rio_branco">América/Rio Branco (ACT)</SelectItem>
                            <SelectItem value="america/manaus">América/Manaus (AMT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="currency">Moeda</Label>
                        <Select defaultValue="brl">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
                            <SelectItem value="usd">Dólar Americano (US$)</SelectItem>
                            <SelectItem value="eur">Euro (€)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="language">Idioma</Label>
                        <Select defaultValue="pt-br">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Palette className="h-5 w-5 mr-2" /> 
                        Aparência da Loja
                      </CardTitle>
                      <CardDescription>
                        Personalize como sua loja aparece para os clientes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="storeName">Nome de exibição da loja</Label>
                        <Input 
                          id="storeName" 
                          defaultValue={user?.name || "Doss Group"} 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="storeSlogan">Slogan</Label>
                        <Input 
                          id="storeSlogan" 
                          placeholder="Ex: Soluções em impressão industrial"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="storeColors">Cor principal</Label>
                        <div className="flex gap-2 mt-2">
                          <div className="w-8 h-8 bg-blue-600 rounded border-2 border-gray-300 cursor-pointer"></div>
                          <div className="w-8 h-8 bg-green-600 rounded border cursor-pointer"></div>
                          <div className="w-8 h-8 bg-purple-600 rounded border cursor-pointer"></div>
                          <div className="w-8 h-8 bg-red-600 rounded border cursor-pointer"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Salvando..." : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Configurações
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" /> 
                    Configurações de Notificação
                  </CardTitle>
                  <CardDescription>
                    Gerencie como e quando você recebe notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Novos pedidos</h4>
                        <p className="text-sm text-muted-foreground">Receber notificação quando um novo pedido for feito</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Estoque baixo</h4>
                        <p className="text-sm text-muted-foreground">Alertas quando produtos estão com estoque baixo</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Mensagens de clientes</h4>
                        <p className="text-sm text-muted-foreground">Notificações de novas mensagens</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Relatórios semanais</h4>
                        <p className="text-sm text-muted-foreground">Resumo semanal de vendas e atividades</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Label htmlFor="emailFrequency">Frequência de e-mails</Label>
                    <Select defaultValue="immediate">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Imediato</SelectItem>
                        <SelectItem value="hourly">A cada hora</SelectItem>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" /> 
                    Privacidade e Segurança
                  </CardTitle>
                  <CardDescription>
                    Controle quem pode ver suas informações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Perfil público</h4>
                        <p className="text-sm text-muted-foreground">Permitir que sua loja seja encontrada em buscas</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Mostrar avaliações</h4>
                        <p className="text-sm text-muted-foreground">Exibir avaliações de clientes no seu perfil</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Dados de contato visíveis</h4>
                        <p className="text-sm text-muted-foreground">Permitir que clientes vejam telefone e endereço</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      <Shield className="mr-2 h-4 w-4" />
                      Alterar Senha
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" /> 
                    Faturamento
                  </CardTitle>
                  <CardDescription>
                    Gerencie informações de pagamento e faturamento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Plano Atual: Básico</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Até 100 produtos • Suporte por email
                    </p>
                    <Button size="sm">Fazer Upgrade</Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">Método de Pagamento</h4>
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">**** **** **** 1234</p>
                          <p className="text-sm text-muted-foreground">Expira em 12/2026</p>
                        </div>
                        <Button variant="outline" size="sm">Alterar</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">Histórico de Faturas</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Março 2025</span>
                        <span>R$ 29,90</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>Fevereiro 2025</span>
                        <span>R$ 29,90</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span>Janeiro 2025</span>
                        <span>R$ 29,90</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" /> 
                    Gerenciar Equipe
                  </CardTitle>
                  <CardDescription>
                    Adicione e gerencie membros da sua equipe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Membros da Equipe</h4>
                    <Button size="sm">Convidar Membro</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">{user?.contactName || "João Silva"}</p>
                        <p className="text-sm text-muted-foreground">Administrador</p>
                      </div>
                      <span className="text-sm text-green-600">Ativo</span>
                    </div>
                    
                    <div className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Convide membros para ajudar a gerenciar sua loja
                      </p>
                      <Button variant="outline" size="sm">
                        Enviar Convite
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanySettings;
