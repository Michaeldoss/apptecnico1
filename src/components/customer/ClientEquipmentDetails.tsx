
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, Thermometer, Zap, Gauge } from 'lucide-react';

interface ClientEquipmentDetailsProps {
  equipment: any;
}

const ClientEquipmentDetails = ({ equipment }: ClientEquipmentDetailsProps) => {
  const renderEquipmentDetails = (equipment: any) => {
    switch (equipment.type) {
      case 'DTF':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-blue-700 font-semibold">Largura</Label>
                <Input 
                  value={equipment.width} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold">Cabeças</Label>
                <Input 
                  value={equipment.heads} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
            </div>
            <Separator className="bg-blue-300 h-px" />
            <div>
              <Label className="text-blue-700 font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Dados do Forno
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <Label className="text-sm text-blue-600">Modelo</Label>
                  <Input 
                    value={equipment.oven?.model} 
                    className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-blue-600 flex items-center gap-1">
                    <Thermometer className="h-4 w-4" />
                    Temperatura Máx.
                  </Label>
                  <Input 
                    value={equipment.oven?.temperature} 
                    className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-blue-600">Esteira</Label>
                  <Input 
                    value={equipment.oven?.belt} 
                    className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-blue-600 flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Alimentação
                  </Label>
                  <Input 
                    value={equipment.oven?.power} 
                    className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'CNC Router':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-blue-700 font-semibold">Área Útil</Label>
                <Input 
                  value={equipment.area} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold">Tipo de Motor</Label>
                <Input 
                  value={equipment.motorType} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold">Controle</Label>
                <Input 
                  value={equipment.control} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold">Software</Label>
                <Input 
                  value={equipment.software} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold">Lubrificação</Label>
                <Input 
                  value={equipment.lubrication} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Frequência de Uso
                </Label>
                <div className="mt-1">
                  <Badge className="bg-blue-100 text-blue-800 border border-blue-300">{equipment.usage}</Badge>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Prensa Térmica':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-blue-700 font-semibold">Tipo de Acionamento</Label>
                <Input 
                  value={equipment.activation} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Tensão
                </Label>
                <Input 
                  value={equipment.voltage} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
            </div>
          </div>
        );
      default:
        return <p className="text-blue-600">Detalhes específicos não disponíveis</p>;
    }
  };

  return renderEquipmentDetails(equipment);
};

export default ClientEquipmentDetails;
