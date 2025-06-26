
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-blue-800 font-semibold">Largura</Label>
                <Input 
                  value={equipment.width} 
                  readOnly 
                  className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-800 font-semibold">Cabeças</Label>
                <Input 
                  value={equipment.heads} 
                  readOnly 
                  className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                />
              </div>
            </div>
            <Separator className="bg-blue-300 h-0.5" />
            <div>
              <Label className="text-blue-800 font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Dados do Forno
              </Label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <Label className="text-sm text-blue-700">Modelo</Label>
                  <Input 
                    value={equipment.oven?.model} 
                    readOnly 
                    className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-blue-700 flex items-center gap-1">
                    <Thermometer className="h-4 w-4" />
                    Temperatura Máx.
                  </Label>
                  <Input 
                    value={equipment.oven?.temperature} 
                    readOnly 
                    className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-blue-700">Esteira</Label>
                  <Input 
                    value={equipment.oven?.belt} 
                    readOnly 
                    className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-blue-700 flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Alimentação
                  </Label>
                  <Input 
                    value={equipment.oven?.power} 
                    readOnly 
                    className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'CNC Router':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-blue-800 font-semibold">Área Útil</Label>
                <Input 
                  value={equipment.area} 
                  readOnly 
                  className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-800 font-semibold">Tipo de Motor</Label>
                <Input 
                  value={equipment.motorType} 
                  readOnly 
                  className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-800 font-semibold">Controle</Label>
                <Input 
                  value={equipment.control} 
                  readOnly 
                  className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-800 font-semibold">Software</Label>
                <Input 
                  value={equipment.software} 
                  readOnly 
                  className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-800 font-semibold">Lubrificação</Label>
                <Input 
                  value={equipment.lubrication} 
                  readOnly 
                  className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-800 font-semibold flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Frequência de Uso
                </Label>
                <div className="mt-1">
                  <Badge className="bg-blue-100 text-blue-800 border-2 border-blue-300">{equipment.usage}</Badge>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Prensa Térmica':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-blue-800 font-semibold">Tipo de Acionamento</Label>
                <Input 
                  value={equipment.activation} 
                  readOnly 
                  className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-800 font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Tensão
                </Label>
                <Input 
                  value={equipment.voltage} 
                  readOnly 
                  className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
                />
              </div>
            </div>
          </div>
        );
      default:
        return <p className="text-blue-700">Detalhes específicos não disponíveis</p>;
    }
  };

  return renderEquipmentDetails(equipment);
};

export default ClientEquipmentDetails;
