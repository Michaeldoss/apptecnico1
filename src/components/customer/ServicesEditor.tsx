import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Save, X, Settings, Wrench } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServicesEditorProps {
  services: string[];
  onSave: (services: string[]) => void;
  onCancel: () => void;
}

const ServicesEditor: React.FC<ServicesEditorProps> = ({ services, onSave, onCancel }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(services || []);
  const [customService, setCustomService] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const availableServices = [
    'Manutenção Preventiva',
    'Manutenção Corretiva',
    'Instalação de Equipamentos',
    'Treinamento de Operadores',
    'Suporte Técnico 24h',
    'Consultoria Técnica',
    'Upgrade de Software',
    'Limpeza e Calibração',
    'Substituição de Peças',
    'Análise de Performance',
    'Backup de Configurações',
    'Monitoramento Remoto',
    'Atendimento On-site',
    'Atendimento Remoto',
    'Contrato de Manutenção'
  ];

  const handleServiceToggle = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices(prev => [...prev, service]);
    } else {
      setSelectedServices(prev => prev.filter(s => s !== service));
    }
  };

  const addCustomService = () => {
    if (customService.trim() && !selectedServices.includes(customService.trim())) {
      setSelectedServices(prev => [...prev, customService.trim()]);
      setCustomService('');
    }
  };

  const removeService = (service: string) => {
    setSelectedServices(prev => prev.filter(s => s !== service));
  };

  const handleSave = async () => {
    setLoading(true);
    
    if (selectedServices.length === 0) {
      toast({
        title: "Selecione ao menos um serviço",
        description: "É necessário selecionar pelo menos um serviço de interesse.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(selectedServices);
      toast({
        title: "Serviços salvos!",
        description: "Seus serviços de interesse foram atualizados com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar os serviços. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Editar Serviços de Interesse</h3>
      </div>

      {/* Serviços Disponíveis */}
      <Card className="border border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wrench className="h-4 w-4" />
            Serviços Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableServices.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  checked={selectedServices.includes(service)}
                  onCheckedChange={(checked) => handleServiceToggle(service, checked as boolean)}
                />
                <Label
                  htmlFor={service}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {service}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adicionar Serviço Personalizado */}
      <Card className="border border-green-200">
        <CardHeader>
          <CardTitle className="text-base text-green-700">Adicionar Serviço Personalizado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              placeholder="Digite um serviço personalizado..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addCustomService();
                }
              }}
            />
            <Button onClick={addCustomService} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Serviços Selecionados */}
      {selectedServices.length > 0 && (
        <Card className="border border-blue-200">
          <CardHeader>
            <CardTitle className="text-base">Serviços Selecionados ({selectedServices.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200"
                >
                  <span>{service}</span>
                  <button
                    onClick={() => removeService(service)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4 justify-end pt-4 border-t">
        <Button onClick={onCancel} variant="outline">
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Salvando...' : 'Salvar Serviços'}
        </Button>
      </div>
    </div>
  );
};

export default ServicesEditor;