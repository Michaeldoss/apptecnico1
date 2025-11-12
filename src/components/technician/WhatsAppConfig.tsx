import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WhatsAppConfig {
  id?: string;
  phone_number_id: string;
  access_token: string;
  verify_token: string;
  business_account_id?: string;
  phone_number?: string;
  is_active: boolean;
}

export const WhatsAppConfig: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [config, setConfig] = useState<WhatsAppConfig>({
    phone_number_id: '',
    access_token: '',
    verify_token: '',
    business_account_id: '',
    phone_number: '',
    is_active: false,
  });
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'unknown'>('unknown');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('whatsapp_config')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setConfig(data);
        setConnectionStatus(data.is_active ? 'connected' : 'disconnected');
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as configurações',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const configData = {
        user_id: user.id,
        ...config,
      };

      const { error } = config.id
        ? await supabase.from('whatsapp_config').update(configData).eq('id', config.id)
        : await supabase.from('whatsapp_config').insert([configData]);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Configurações salvas com sucesso',
      });

      await loadConfig();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as configurações',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    try {
      // Testar conexão com a API do WhatsApp
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${config.phone_number_id}`,
        {
          headers: {
            'Authorization': `Bearer ${config.access_token}`,
          },
        }
      );

      if (response.ok) {
        setConnectionStatus('connected');
        toast({
          title: 'Conexão estabelecida',
          description: 'WhatsApp Business conectado com sucesso',
        });
      } else {
        setConnectionStatus('disconnected');
        toast({
          title: 'Falha na conexão',
          description: 'Verifique suas credenciais',
          variant: 'destructive',
        });
      }
    } catch (error) {
      setConnectionStatus('disconnected');
      toast({
        title: 'Erro',
        description: 'Não foi possível testar a conexão',
        variant: 'destructive',
      });
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            <CardTitle>Configuração WhatsApp Business</CardTitle>
          </div>
          {connectionStatus === 'connected' && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Conectado</span>
            </div>
          )}
          {connectionStatus === 'disconnected' && (
            <div className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Desconectado</span>
            </div>
          )}
        </div>
        <CardDescription>
          Configure sua conta do WhatsApp Business API para receber mensagens de clientes
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Alert>
          <AlertDescription>
            Para obter suas credenciais, acesse o{' '}
            <a
              href="https://developers.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Facebook Developers
            </a>{' '}
            e configure o WhatsApp Business API.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone_number_id">Phone Number ID *</Label>
            <Input
              id="phone_number_id"
              value={config.phone_number_id}
              onChange={(e) => setConfig({ ...config, phone_number_id: e.target.value })}
              placeholder="Digite o Phone Number ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="access_token">Access Token *</Label>
            <Input
              id="access_token"
              type="password"
              value={config.access_token}
              onChange={(e) => setConfig({ ...config, access_token: e.target.value })}
              placeholder="Digite o Access Token"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="verify_token">Verify Token *</Label>
            <Input
              id="verify_token"
              value={config.verify_token}
              onChange={(e) => setConfig({ ...config, verify_token: e.target.value })}
              placeholder="Digite o Verify Token"
            />
            <p className="text-sm text-muted-foreground">
              Use este token ao configurar o webhook no Facebook
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_account_id">Business Account ID (Opcional)</Label>
            <Input
              id="business_account_id"
              value={config.business_account_id || ''}
              onChange={(e) => setConfig({ ...config, business_account_id: e.target.value })}
              placeholder="Digite o Business Account ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number">Número de Telefone (Opcional)</Label>
            <Input
              id="phone_number"
              value={config.phone_number || ''}
              onChange={(e) => setConfig({ ...config, phone_number: e.target.value })}
              placeholder="+55 11 99999-9999"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="is_active">Ativar WhatsApp</Label>
              <p className="text-sm text-muted-foreground">
                Ative para receber mensagens dos clientes
              </p>
            </div>
            <Switch
              id="is_active"
              checked={config.is_active}
              onCheckedChange={(checked) => setConfig({ ...config, is_active: checked })}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={saving || !config.phone_number_id || !config.access_token || !config.verify_token}
            className="flex-1"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </>
            )}
          </Button>

          <Button
            onClick={handleTestConnection}
            disabled={testing || !config.phone_number_id || !config.access_token}
            variant="outline"
          >
            {testing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testando...
              </>
            ) : (
              'Testar Conexão'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
