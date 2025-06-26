
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  Wrench,
  Package,
  FileText
} from 'lucide-react';

const CustomerPreventiveMaintenance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const maintenanceSchedule = [
    {
      id: 1,
      equipment: 'DTF Epson F570',
      type: 'Limpeza Completa',
      nextDate: '2024-12-28',
      status: 'scheduled',
      priority: 'high',
      estimatedHours: 3,
      cost: 280
    },
    {
      id: 2,
      equipment: 'Sublimática Roland',
      type: 'Troca de Dampers',
      nextDate: '2024-12-30',
      status: 'pending',
      priority: 'medium',
      estimatedHours: 2,
      cost: 450
    },
    {
      id: 3,
      equipment: 'CNC Router',
      type: 'Calibração e Lubrificação',
      nextDate: '2025-01-05',
      status: 'scheduled',
      priority: 'low',
      estimatedHours: 1.5,
      cost: 180
    },
    {
      id: 4,
      equipment: 'Prensa Térmica',
      type: 'Verificação de Resistências',
      nextDate: '2025-01-08',
      status: 'completed',
      priority: 'medium',
      estimatedHours: 1,
      cost: 120
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-700">Agendada</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">Pendente</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Concluída</Badge>;
      default:
        return <Badge>Indefinido</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const totalCosts = maintenanceSchedule.reduce((sum, item) => sum + item.cost, 0);
  const pendingItems = maintenanceSchedule.filter(item => item.status === 'pending').length;
  const scheduledItems = maintenanceSchedule.filter(item => item.status === 'scheduled').length;

  return (
    <div className="min-h-screen bg-blue-600">
      <CustomerLayout title="Manutenção Preventiva">
        <div className="space-y-6">
          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/95">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Agendadas</p>
                    <p className="text-2xl font-bold text-blue-600">{scheduledItems}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Pendentes</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingItems}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Custo Total</p>
                    <p className="text-2xl font-bold text-green-600">R$ {totalCosts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Economia</p>
                    <p className="text-2xl font-bold text-purple-600">35%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cronograma */}
            <div className="lg:col-span-2">
              <Card className="bg-white/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Cronograma de Manutenções
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {maintenanceSchedule.map((item) => (
                    <div key={item.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(item.priority)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{item.equipment}</h4>
                        {getStatusBadge(item.status)}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">{item.type}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {item.nextDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.estimatedHours}h
                          </span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          R$ {item.cost}
                        </span>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          Reagendar
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Calendário */}
            <div>
              <Card className="bg-white/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Calendário
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  
                  <div className="mt-4 space-y-2">
                    <h4 className="font-semibold text-sm">Próximas Datas:</h4>
                    <div className="space-y-1 text-xs">
                      <div className="p-2 bg-blue-50 rounded text-blue-700">
                        28/12: DTF Limpeza
                      </div>
                      <div className="p-2 bg-yellow-50 rounded text-yellow-700">
                        30/12: Sublimática Dampers
                      </div>
                      <div className="p-2 bg-green-50 rounded text-green-700">
                        05/01: CNC Calibração
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dicas */}
              <Card className="bg-white/95 mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">💡 Dicas de Economia</CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-2">
                  <p>• Manutenções preventivas reduzem custos em até 60%</p>
                  <p>• Agendamento mensal evita paradas emergenciais</p>
                  <p>• Histórico completo aumenta vida útil dos equipamentos</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Ações */}
          <Card className="bg-white/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Agendar Nova Manutenção
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Relatório Preventivas
                </Button>
                <Button variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Solicitar Orçamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CustomerLayout>
    </div>
  );
};

export default CustomerPreventiveMaintenance;
