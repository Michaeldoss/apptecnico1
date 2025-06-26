
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
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-yellow-700 font-medium">Largura</Label>
                <Input value={equipment.width} readOnly className="border-yellow-300 bg-yellow-50/50" />
              </div>
              <div>
                <Label className="text-yellow-700 font-medium">Cabeças</Label>
                <Input value={equipment.heads} readOnly className="border-yellow-300 bg-yellow-50/50" />
              </div>
            </div>
            <Separator className="bg-yellow-300" />
            <div>
              <Label className="text-yellow-700 font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Dados do Forno
              </Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <Label className="text-sm text-yellow-600">Modelo</Label>
                  <Input value={equipment.oven?.model} readOnly className="border-yellow-300 bg-yellow-50/50" />
                </div>
                <div>
                  <Label className="text-sm text-yellow-600 flex items-center gap-1">
                    <Thermometer className="h-3 w-3" />
                    Temperatura Máx.
                  </Label>
                  <Input value={equipment.oven?.temperature} readOnly className="border-yellow-300 bg-yellow-50/50" />
                </div>
                <div>
                  <Label className="text-sm text-yellow-600">Esteira</Label>
                  <Input value={equipment.oven?.belt} readOnly className="border-yellow-300 bg-yellow-50/50" />
                </div>
                <div>
                  <Label className="text-sm text-yellow-600 flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Alimentação
                  </Label>
                  <Input value={equipment.oven?.power} readOnly className="border-yellow-300 bg-yellow-50/50" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'CNC Router':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-yellow-700 font-medium">Área Útil</Label>
                <Input value={equipment.area} readOnly className="border-yellow-300 bg-yellow-50/50" />
              </div>
              <div>
                <Label className="text-yellow-700 font-medium">Tipo de Motor</Label>
                <Input value={equipment.motorType} readOnly className="border-yellow-300 bg-yellow-50/50" />
              </div>
              <div>
                <Label className="text-yellow-700 font-medium">Controle</Label>
                <Input value={equipment.control} readOnly className="border-yellow-300 bg-yellow-50/50" />
              </div>
              <div>
                <Label className="text-yellow-700 font-medium">Software</Label>
                <Input value={equipment.software} readOnly className="border-yellow-300 bg-yellow-50/50" />
              </div>
              <div>
                <Label className="text-yellow-700 font-medium">Lubrificação</Label>
                <Input value={equipment.lubrication} readOnly className="border-yellow-300 bg-yellow-50/50" />
              </div>
              <div>
                <Label className="text-yellow-700 font-medium flex items-center gap-1">
                  <Gauge className="h-4 w-4" />
                  Frequência de Uso
                </Label>
                <Badge className="bg-yellow-200 text-yellow-800 border border-yellow-300">{equipment.usage}</Badge>
              </div>
            </div>
          </div>
        );
      case 'Prensa Térmica':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-yellow-700 font-medium">Tipo de Acionamento</Label>
                <Input value={equipment.activation} readOnly className="border-yellow-300 bg-yellow-50/50" />
              </div>
              <div>
                <Label className="text-yellow-700 font-medium flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Tensão
                </Label>
                <Input value={equipment.voltage} readOnly className="border-yellow-300 bg-yellow-50/50" />
              </div>
            </div>
          </div>
        );
      default:
        return <p className="text-yellow-600">Detalhes específicos não disponíveis</p>;
    }
  };

  return renderEquipmentDetails(equipment);
};

export default ClientEquipmentDetails;
