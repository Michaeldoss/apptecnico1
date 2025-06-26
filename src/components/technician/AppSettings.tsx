
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  Shield, 
  MessageSquare, 
  Download,
  Calendar,
  Globe,
  Key
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AppSettings = () => {
  const [responseTime, setResponseTime] = useState('2');
  const [notificationDelay, setNotificationDelay] = useState('30');
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('pt-BR');
  const [vacationMode, setVacationMode] = useState(false);
  const [vacationMessage, setVacationMessage] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso."
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Seus dados estão sendo preparados. Você receberá um e-mail em breve."
    });
  };

  return (
    <div className="space-y-6">
      {/* Comportamento e Tempo de Resposta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Comportamento e Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="response-time">Tempo de resposta estimado (horas)</Label>
            <Select value={responseTime} onValueChange={setResponseTime}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Selecione o tempo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">30 minutos</SelectItem>
                <SelectItem value="1">1 hora</SelectItem>
                <SelectItem value="2">2 horas</SelectItem>
                <SelectItem value="4">4 horas</SelectItem>
                <SelectItem value="24">24 horas</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Será exibido como: "Respondo em até {responseTime}h úteis"
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="whatsapp-notifications">Notificações no WhatsApp</Label>
                <p className="text-sm text-muted-foreground">
                  Receber alertas quando não responder mensagens
                </p>
              </div>
              <Switch
                id="whatsapp-notifications"
                checked={whatsappNotifications}
                onCheckedChange={setWhatsappNotifications}
              />
            </div>

            {whatsappNotifications && (
              <div className="ml-4 space-y-2">
                <Label>Tempo para alerta (minutos)</Label>
                <Select value={notificationDelay} onValueChange={setNotificationDelay}>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="240">4 horas</SelectItem>
                    <SelectItem value="1440">24 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modo Ausência */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Modo Ausência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="vacation-mode">Ativar modo férias/indisponível</Label>
              <p className="text-sm text-muted-foreground">
                Seus clientes verão uma mensagem automática
              </p>
            </div>
            <Switch
              id="vacation-mode"
              checked={vacationMode}
              onCheckedChange={setVacationMode}
            />
          </div>

          {vacationMode && (
            <div className="space-y-2">
              <Label htmlFor="vacation-message">Mensagem de ausência</Label>
              <Textarea
                id="vacation-message"
                placeholder="Ex: Estou em férias até 15/02. Retorno às atividades normais após essa data."
                value={vacationMessage}
                onChange={(e) => setVacationMessage(e.target.value)}
                maxLength={200}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {vacationMessage.length}/200 caracteres
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configurações do App */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações do Aplicativo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Idioma</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Tema escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Interface com cores escuras
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Autenticação em duas etapas</Label>
              <p className="text-sm text-muted-foreground">
                Maior segurança para sua conta
              </p>
            </div>
            <div className="flex items-center gap-2">
              {twoFactorAuth && <Badge variant="default">Ativo</Badge>}
              <Switch
                id="two-factor"
                checked={twoFactorAuth}
                onCheckedChange={setTwoFactorAuth}
              />
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Key className="h-4 w-4 mr-2" />
            Alterar Senha
          </Button>
        </CardContent>
      </Card>

      {/* Integração WhatsApp */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Integração WhatsApp Business
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <p className="font-medium text-green-800">WhatsApp Conectado</p>
              <p className="text-sm text-green-600">+55 (11) 98765-4321</p>
            </div>
            <Badge variant="default" className="bg-green-600">Ativo</Badge>
          </div>
          
          <Button variant="outline" className="w-full">
            Reconectar WhatsApp Business
          </Button>
        </CardContent>
      </Card>

      {/* Exportar Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exportar Dados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Baixe um relatório completo com histórico de chamados, pagamentos e estatísticas.
          </p>
          <Button onClick={handleExportData} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório Completo (PDF)
          </Button>
        </CardContent>
      </Card>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} size="lg">
          Salvar Todas as Configurações
        </Button>
      </div>
    </div>
  );
};

export default AppSettings;
