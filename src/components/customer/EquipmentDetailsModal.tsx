
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  MapPin,
  Settings,
  DollarSign,
  Clock,
  User,
  FileText,
  Wrench,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

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

interface EquipmentDetailsModalProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
}

const EquipmentDetailsModal = ({ equipment, isOpen, onClose }: EquipmentDetailsModalProps) => {
  if (!equipment) return null;

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

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'concluida':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Concluída</Badge>;
      case 'em_andamento':
        return <Badge className="bg-blue-100 text-blue-700"><Settings className="h-3 w-3 mr-1" />Em Andamento</Badge>;
      case 'aberta':
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Aberta</Badge>;
      case 'cancelada':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Cancelada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalServiceCost = equipment.serviceOrders.reduce((sum, order) => sum + order.cost, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Detalhes do Equipamento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Principais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Informações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Imagem do Equipamento */}
                <div className="md:w-1/3">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {equipment.image ? (
                      <img 
                        src={equipment.image} 
                        alt={`${equipment.brand} ${equipment.model}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Settings className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Dados do Equipamento */}
                <div className="md:w-2/3 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{equipment.brand} {equipment.model}</h3>
                    <p className="text-gray-600">{equipment.type}</p>
                    {getStatusBadge(equipment.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Série:</span>
                      <span className="font-medium">{equipment.serialNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Compra:</span>
                      <span className="font-medium">{equipment.purchaseDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Local:</span>
                      <span className="font-medium">{equipment.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Wrench className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Última Manutenção:</span>
                      <span className="font-medium">{equipment.lastMaintenance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumo Financeiro */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Resumo Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Custo Total</div>
                  <div className="text-xl font-bold text-blue-600">
                    R$ {equipment.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Total em Serviços</div>
                  <div className="text-xl font-bold text-green-600">
                    R$ {totalServiceCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Peças Utilizadas</div>
                  <div className="text-xl font-bold text-orange-600">{equipment.partsUsed}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Horas de Mão de Obra</div>
                  <div className="text-xl font-bold text-purple-600">{equipment.laborHours}h</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Ordens de Serviço */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Histórico de Ordens de Serviço ({equipment.serviceOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {equipment.serviceOrders.length > 0 ? (
                <div className="space-y-4">
                  {equipment.serviceOrders.map((order, index) => (
                    <div key={order.id}>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-lg">OS {order.number}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              {order.date}
                              <User className="h-4 w-4 ml-2" />
                              {order.technician}
                            </div>
                          </div>
                          <div className="text-right">
                            {getOrderStatusBadge(order.status)}
                            <div className="text-lg font-bold text-green-600 mt-1">
                              R$ {order.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-red-600">Problema:</span>
                            <p className="text-gray-700">{order.problem}</p>
                          </div>
                          {order.solution && (
                            <div>
                              <span className="font-medium text-green-600">Solução:</span>
                              <p className="text-gray-700">{order.solution}</p>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-blue-600">Peças Utilizadas:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {order.parts.map((part, partIndex) => (
                                <Badge key={partIndex} variant="outline" className="text-xs">
                                  {part}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < equipment.serviceOrders.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma ordem de serviço registrada para este equipamento</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EquipmentDetailsModal;
