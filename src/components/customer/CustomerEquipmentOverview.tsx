
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Printer, Settings, AlertTriangle, CheckCircle } from 'lucide-react';

interface Equipment {
  id: number;
  type: string;
  brand: string;
  model: string;
  status: 'active' | 'maintenance' | 'inactive';
  location: string;
  lastMaintenance: string;
}

interface CustomerEquipmentOverviewProps {
  equipment: Equipment[];
}

const CustomerEquipmentOverview = ({ equipment }: CustomerEquipmentOverviewProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Ativo</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200"><Settings className="h-3 w-3 mr-1" />Manutenção</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-700 border-red-200"><AlertTriangle className="h-3 w-3 mr-1" />Inativo</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const activeCount = equipment.filter(eq => eq.status === 'active').length;
  const maintenanceCount = equipment.filter(eq => eq.status === 'maintenance').length;

  return (
    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
          <Printer className="h-6 w-6 text-blue-600" />
          Resumo de Equipamentos
        </CardTitle>
        <div className="flex gap-4 mt-2">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-green-600">{activeCount}</span> ativos
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-orange-600">{maintenanceCount}</span> em manutenção
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {equipment.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow bg-white"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Printer className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">
                    {item.brand} {item.model}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {item.type} • {item.location}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Última manutenção: {item.lastMaintenance}
                  </div>
                </div>
              </div>
              <div className="ml-3">
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerEquipmentOverview;
