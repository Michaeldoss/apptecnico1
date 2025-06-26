
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  FileText, 
  Settings, 
  Phone, 
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Calendar
} from 'lucide-react';
import { useCustomerDashboard } from '@/hooks/useCustomerDashboard';
import EquipmentDetailsModal from '@/components/customer/EquipmentDetailsModal';
import EquipmentPartsModal from '@/components/customer/EquipmentPartsModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  serviceOrders: any[];
}

const CustomerEquipment = () => {
  const { equipment } = useCustomerDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [selectedEquipmentForParts, setSelectedEquipmentForParts] = useState<Equipment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPartsModalOpen, setIsPartsModalOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<number | null>(null);
  
  const filteredEquipment = equipment.filter(item =>
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-300 font-medium"><CheckCircle className="h-3 w-3 mr-1" />Operacional</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 font-medium"><Settings className="h-3 w-3 mr-1" />Em Manutenção</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800 border-red-300 font-medium"><AlertTriangle className="h-3 w-3 mr-1" />Inativo</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Status Indefinido</Badge>;
    }
  };

  const handleViewDetails = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const handleViewServiceOrders = (equipment: Equipment) => {
    console.log('Viewing service orders for:', equipment.type);
    window.location.href = `/cliente/servicos?equipment=${equipment.id}`;
  };

  const handleViewParts = (equipment: Equipment) => {
    setSelectedEquipmentForParts(equipment);
    setIsPartsModalOpen(true);
  };

  const handleRequestService = (equipment: Equipment) => {
    console.log('Requesting service for:', equipment.type);
    window.location.href = `/cliente/solicitar?equipment=${equipment.id}`;
  };

  const handleDeleteEquipment = (equipmentId: number) => {
    setEquipmentToDelete(equipmentId);
  };

  const confirmDelete = () => {
    if (equipmentToDelete !== null) {
      console.log('Deleting equipment:', equipmentToDelete);
      alert('Equipamento excluído com sucesso!');
      setEquipmentToDelete(null);
    }
  };

  return (
    <CustomerLayout title="Meus Equipamentos">
      <div className="space-y-8">
        {/* Header com busca e adicionar - Melhorado */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Buscar Equipamentos
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Digite marca, modelo ou tipo..."
                  className="pl-10 h-11 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-semibold px-6 py-3 h-11 shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Equipamento
              </Button>
            </div>
          </div>
        </div>

        {/* Grid de Equipamentos - Melhorado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="bg-white border-2 border-gray-200 hover:border-yellow-400 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white">
                {/* Imagem do Equipamento */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden mb-4 shadow-inner">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={`${item.brand} ${item.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                      <Settings className="h-16 w-16 text-blue-500" />
                    </div>
                  )}
                </div>

                {/* Informações Principais - Organizadas */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                        {item.brand} {item.model}
                      </CardTitle>
                      <p className="text-sm text-gray-600 font-medium mt-1 bg-gray-100 px-2 py-1 rounded-md inline-block">
                        {item.type}
                      </p>
                    </div>
                    <div className="ml-3">
                      {getStatusBadge(item.status)}
                    </div>
                  </div>

                  {/* Informações Técnicas - Bem Organizadas */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <div>
                          <div className="text-gray-500 text-xs font-medium">Local</div>
                          <div className="text-gray-800 font-semibold">{item.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <div>
                          <div className="text-gray-500 text-xs font-medium">Últ. Manutenção</div>
                          <div className="text-gray-800 font-semibold">{item.lastMaintenance}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <div>
                          <div className="text-gray-500 text-xs font-medium">O.S. Geradas</div>
                          <div className="text-gray-800 font-semibold">{item.serviceOrders.length}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        <div>
                          <div className="text-gray-500 text-xs font-medium">Peças Usadas</div>
                          <div className="text-gray-800 font-semibold">{item.partsUsed}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4 space-y-4">
                {/* Resumo Financeiro - Destacado */}
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-3">Resumo Financeiro</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-yellow-600 text-xs font-medium">Investimento Total</div>
                      <div className="text-lg font-bold text-yellow-800">
                        R$ {item.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-yellow-600 text-xs font-medium">Horas M.O.</div>
                      <div className="text-lg font-bold text-yellow-800">{item.laborHours}h</div>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação - Bem Organizados */}
                <div className="space-y-3">
                  {/* Linha 1 - Botões Principais */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(item)}
                      className="h-10 text-sm font-medium border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewServiceOrders(item)}
                      className="h-10 text-sm font-medium border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Ver O.S.
                    </Button>
                  </div>
                  
                  {/* Linha 2 - Botões Secundários */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewParts(item)}
                      className="h-10 text-sm font-medium border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Peças Usadas
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleRequestService(item)}
                      className="h-10 text-sm font-medium bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Solicitar Serviço
                    </Button>
                  </div>

                  {/* Menu de Ações Extras */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full h-10 text-sm font-medium border-gray-300 hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Mais Ações
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48">
                      <DropdownMenuItem onClick={() => handleViewDetails(item)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Equipamento
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteEquipment(item.id)} 
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir Equipamento
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estado vazio - Melhorado */}
        {filteredEquipment.length === 0 && (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto bg-white shadow-lg border-2 border-gray-200">
              <CardContent className="pt-12 pb-8">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">Nenhum equipamento encontrado</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery ? 'Tente uma busca diferente ou' : 'Comece a'} adicionar seus equipamentos.
                </p>
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Equipamento
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Modal de Detalhes */}
      <EquipmentDetailsModal 
        equipment={selectedEquipment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      {/* Modal de Peças */}
      <EquipmentPartsModal 
        equipment={selectedEquipmentForParts}
        isOpen={isPartsModalOpen}
        onClose={() => setIsPartsModalOpen(false)}
      />
      
      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={equipmentToDelete !== null} onOpenChange={() => setEquipmentToDelete(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-800">Excluir Equipamento</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita e removerá todo o histórico de serviços associado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CustomerLayout>
  );
};

export default CustomerEquipment;
