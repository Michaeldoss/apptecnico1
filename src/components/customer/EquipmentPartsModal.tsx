
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Calendar, DollarSign } from 'lucide-react';

interface PartUsage {
  name: string;
  quantity: number;
  totalCost: number;
  lastUsed: string;
  serviceOrderNumber: string;
}

interface Equipment {
  id: number;
  type: string;
  brand: string;
  model: string;
  mostUsedPart: string;
  partsUsed: number;
  totalCost: number;
}

interface EquipmentPartsModalProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
}

const EquipmentPartsModal = ({ equipment, isOpen, onClose }: EquipmentPartsModalProps) => {
  if (!equipment) return null;

  // Mock data for parts - in real app this would come from API
  const partsUsage: PartUsage[] = [
    {
      name: equipment.mostUsedPart,
      quantity: 3,
      totalCost: 450.00,
      lastUsed: '15/12/2024',
      serviceOrderNumber: 'OS-001'
    },
    {
      name: 'Mangueira de Tinta',
      quantity: 2,
      totalCost: 120.00,
      lastUsed: '10/12/2024',
      serviceOrderNumber: 'OS-002'
    },
    {
      name: 'Rolo Alimentador',
      quantity: 1,
      totalCost: 85.00,
      lastUsed: '05/12/2024',
      serviceOrderNumber: 'OS-003'
    }
  ];

  const totalPartsValue = partsUsage.reduce((sum, part) => sum + part.totalCost, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Peças Utilizadas - {equipment.brand} {equipment.model}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Resumo de Peças
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Total de Peças</div>
                  <div className="text-2xl font-bold text-blue-600">{equipment.partsUsed}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Valor Total</div>
                  <div className="text-2xl font-bold text-green-600">
                    R$ {totalPartsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Peça Mais Usada</div>
                  <div className="text-lg font-bold text-orange-600">{equipment.mostUsedPart}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Peças */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico Detalhado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partsUsage.map((part, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{part.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Settings className="h-4 w-4" />
                            Qtd: {part.quantity}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {part.lastUsed}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{part.serviceOrderNumber}</Badge>
                        <div className="text-lg font-bold text-green-600 mt-1">
                          R$ {part.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EquipmentPartsModal;
