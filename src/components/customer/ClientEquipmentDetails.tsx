
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
                <Label className="text-yellow-700">Largura</Label>
                <Input value={equipment.width} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Cabeças</Label>
                <Input value={equipment.heads} readOnly className="border-yellow-200" />
              </div>
            </div>
            <Separator className="bg-yellow-200" />
            <div>
              <Label className="text-yellow-700 font-medium">Dados do Forno</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <Label className="text-sm text-yellow-600">Modelo</Label>
                  <Input value={equipment.oven?.model} readOnly className="border-yellow-200" />
                </div>
                <div>
                  <Label className="text-sm text-yellow-600">Temperatura Máx.</Label>
                  <Input value={equipment.oven?.temperature} readOnly className="border-yellow-200" />
                </div>
                <div>
                  <Label className="text-sm text-yellow-600">Esteira</Label>
                  <Input value={equipment.oven?.belt} readOnly className="border-yellow-200" />
                </div>
                <div>
                  <Label className="text-sm text-yellow-600">Alimentação</Label>
                  <Input value={equipment.oven?.power} readOnly className="border-yellow-200" />
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
                <Label className="text-yellow-700">Área Útil</Label>
                <Input value={equipment.area} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Tipo de Motor</Label>
                <Input value={equipment.motorType} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Controle</Label>
                <Input value={equipment.control} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Software</Label>
                <Input value={equipment.software} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Lubrificação</Label>
                <Input value={equipment.lubrication} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Frequência de Uso</Label>
                <Badge className="bg-yellow-100 text-yellow-800">{equipment.usage}</Badge>
              </div>
            </div>
          </div>
        );
      case 'Prensa Térmica':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-yellow-700">Tipo de Acionamento</Label>
                <Input value={equipment.activation} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Tensão</Label>
                <Input value={equipment.voltage} readOnly className="border-yellow-200" />
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
