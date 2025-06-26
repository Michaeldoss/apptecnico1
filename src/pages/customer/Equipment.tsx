
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<number | null>(null);
  
  const filteredEquipment = equipment.filter(item =>
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleViewDetails = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const handleViewServiceOrders = (equipment: Equipment) => {
    console.log('Viewing service orders for:', equipment.type);
    // Navigate to service orders filtered by equipment
    window.location.href = `/cliente/servicos?equipment=${equipment.id}`;
  };

  const handleViewParts = (equipment: Equipment) => {
    console.log('Viewing parts for:', equipment.type);
    // This would show parts used for this specific equipment
    alert(`Peças utilizadas no ${equipment.type}: ${equipment.mostUsedPart} e outras ${equipment.partsUsed - 1} peças`);
  };

  const handleRequestService = (equipment: Equipment) => {
    console.log('Requesting service for:', equipment.type);
    // Navigate to service request with equipment pre-filled
    window.location.href = `/cliente/solicitar?equipment=${equipment.id}`;
  };

  const handleDeleteEquipment = (equipmentId: number) => {
    setEquipmentToDelete(equipmentId);
  };

  const confirmDelete = () => {
    if (equipmentToDelete !== null) {
      console.log('Deleting equipment:', equipmentToDelete);
      // Here you would implement the delete functionality
      alert('Equipamento excluído com sucesso!');
      setEquipmentToDelete(null);
    }
  };

  return (
    <CustomerLayout title="Meus Equipamentos">
      <div className="space-y-6">
        {/* Header com busca e adicionar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar equipamentos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Equipamento
          </Button>
        </div>

        {/* Grid de Equipamentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="pb-4">
                {/* Imagem do Equipamento */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden mb-4">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={`${item.brand} ${item.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Settings className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Informações Principais */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {item.brand} {item.model}
                      </CardTitle>
                      <p className="text-sm text-gray-600 font-medium">{item.type}</p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  {/* Informações Técnicas */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-3">
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
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Resumo Financeiro */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600 text-xs">Custo Total</div>
                      <div className="font-bold text-blue-600">
                        R$ {item.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-xs">Horas M.O.</div>
                      <div className="font-bold text-green-600">{item.laborHours}h</div>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(item)}
                      className="text-xs"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Ver Detalhes
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewServiceOrders(item)}
                      className="text-xs"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Ver O.S.
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewParts(item)}
                      className="text-xs"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      Peças Usadas
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleRequestService(item)}
                      className="text-xs bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Solicitar Serviço
                    </Button>
                  </div>

                  {/* Menu de Ações Extras */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <Edit className="h-3 w-3 mr-1" />
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

        {/* Estado vazio */}
        {filteredEquipment.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Settings className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="font-medium text-lg">Nenhum equipamento encontrado</h3>
              <p className="text-gray-600 mt-1">
                {searchQuery ? 'Tente uma busca diferente ou' : 'Comece a'} adicionar seus equipamentos.
              </p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Equipamento
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Modal de Detalhes */}
      <EquipmentDetailsModal 
        equipment={selectedEquipment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={equipmentToDelete !== null} onOpenChange={() => setEquipmentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Equipamento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita e removerá todo o histórico de serviços associado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CustomerLayout>
  );
};

export default CustomerEquipment;
