
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { WhatsAppConfig } from '@/components/technician/WhatsAppConfig';
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
  Globe,
  MessageCircle
} from 'lucide-react';

const CompanySettings = () => {
  const { isAuthenticated, userType } = useAuth();
  
  // Redirect to login if not authenticated or not a company
  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/store/company-register" replace />;
  }

  return (
    <StoreLayout 
      title="Configurações" 
      subtitle="Gerencie as configurações da sua loja"
    >
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted border border-border">
          <TabsTrigger 
            value="whatsapp" 
            className="font-semibold text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp Business
          </TabsTrigger>
          <TabsTrigger 
            value="app"
            className="font-semibold text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurações Gerais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="mt-6">
          <WhatsAppConfig />
        </TabsContent>

        <TabsContent value="app" className="mt-6">
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
                  <Bell className="h-5 w-5 mr-2" /> 
                  Notificações
                </CardTitle>
                <CardDescription>
                  Gerencie como e quando você recebe notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" /> 
                  Privacidade
                </CardTitle>
                <CardDescription>
                  Controle quem pode ver suas informações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </StoreLayout>
  );
};

export default CompanySettings;
