
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Printer, Settings, AlertTriangle, CheckCircle, MapPin, Calendar, BarChart3, Eye, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import EquipmentDetailsModal from './EquipmentDetailsModal';

interface ServiceOrder {
  id: string;
  number: string;
  date: string;
  technician: string;
  status: 'aberta' | 'em_andamento' | 'concluida' | 'cancelada';
  problem: string;
  solution?: string;
  parts: string[];
  cost: number;
}

interface Equipment {
  id: number;
  type: string;
  brand: string;
  model: string;
  status: 'active' | 'maintenance' | 'inactive';
  location: string;
  lastMaintenance: string;
  totalCost: number;
  partsUsed: number;
  laborHours: number;
  mostUsedPart: string;
  image?: string;
  serialNumber: string;
  purchaseDate: string;
  serviceOrders: ServiceOrder[];
}

interface CustomerEquipmentOverviewProps {
  equipment: Equipment[];
}

const CustomerEquipmentOverview = ({ equipment }: CustomerEquipmentOverviewProps) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (equipmentItem: Equipment) => {
    setSelectedEquipment(equipmentItem);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Operacional</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200"><Settings className="h-3 w-3 mr-1" />Em Manutenção</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-700 border-red-200"><AlertTriangle className="h-3 w-3 mr-1" />Inativo</Badge>;
      default:
        return <Badge>Status Indefinido</Badge>;
    }
  };

  const statusCounts = {
    active: equipment.filter(eq => eq.status === 'active').length,
    maintenance: equipment.filter(eq => eq.status === 'maintenance').length,
    inactive: equipment.filter(eq => eq.status === 'inactive').length
  };

  const equipmentTypeData = equipment.reduce((acc, eq) => {
    const existing = acc.find(item => item.type === eq.type);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ type: eq.type, count: 1 });
    }
    return acc;
  }, [] as { type: string; count: number }[]);

  const chartConfig = {
    count: {
      label: "Quantidade"
    }
  };

  return (
    <div className="space-y-6">
      {/* Resumo de Status */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Printer className="h-6 w-6 text-blue-600" />
            </div>
            Status dos Equipamentos
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Panorama geral da situação dos seus equipamentos
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border-2 border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Operacionais</div>
                  <div className="text-xs text-gray-500">Funcionando normalmente</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">{statusCounts.active}</div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50 border-2 border-orange-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <Settings className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Em Manutenção</div>
                  <div className="text-xs text-gray-500">Recebendo atendimento</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-600">{statusCounts.maintenance}</div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border-2 border-red-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Inativos</div>
                  <div className="text-xs text-gray-500">Fora de operação</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-red-600">{statusCounts.inactive}</div>
            </div>
          </div>

          {/* Gráfico de Tipos de Equipamentos */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Distribuição por Tipo
            </h4>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={equipmentTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="type" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`${value} unidades`, 'Quantidade']}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                    name="Equipamentos"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Lista Detalhada de Equipamentos com Fotos */}
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Printer className="h-6 w-6 text-green-600" />
            </div>
            Inventário Detalhado
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Lista completa com informações técnicas, localização e histórico de serviços
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equipment.map((item) => (
              <div
                key={item.id}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white"
              >
                {/* Imagem do Equipamento */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={`${item.brand} ${item.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Printer className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Informações do Equipamento */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {item.brand} {item.model}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">{item.type}</p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{item.lastMaintenance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{item.serviceOrders.length} O.S.</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Settings className="h-3 w-3" />
                      <span>{item.partsUsed} peças</span>
                    </div>
                  </div>

                  {/* Custos e Estatísticas */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-600">Custo Total</div>
                        <div className="font-bold text-blue-600">
                          R$ {item.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Horas M.O.</div>
                        <div className="font-bold text-green-600">{item.laborHours}h</div>
                      </div>
                    </div>
                  </div>

                  {/* Botão Ver Detalhes */}
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleViewDetails(item)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes e O.S.
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <EquipmentDetailsModal 
        equipment={selectedEquipment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CustomerEquipmentOverview;
