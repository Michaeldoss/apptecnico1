
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Settings, 
  Edit, 
  Trash2,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Wrench
} from 'lucide-react';
import { useEquipment } from '@/hooks/useEquipment';
import EquipmentForm from '@/components/equipment/EquipmentForm';
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

const TechnicianEquipments = () => {
  const { 
    equipment, 
    addEquipment, 
    updateEquipment, 
    deleteEquipment, 
    searchQuery, 
    setSearchQuery 
  } = useEquipment();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<any>(null);
  const [equipmentToDelete, setEquipmentToDelete] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-800 border-green-300 font-medium"><CheckCircle className="h-3 w-3 mr-1" />Operacional</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 font-medium"><Wrench className="h-3 w-3 mr-1" />Em Manutenção</Badge>;
      case 'broken':
        return <Badge className="bg-red-100 text-red-800 border-red-300 font-medium"><AlertTriangle className="h-3 w-3 mr-1" />Avariado</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300 font-medium">Inativo</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Status Indefinido</Badge>;
    }
  };

  const handleAddEquipment = () => {
    setEditingEquipment(null);
    setIsFormOpen(true);
  };

  const handleEditEquipment = (equipment: any) => {
    setEditingEquipment(equipment);
    setIsFormOpen(true);
  };

  const handleSaveEquipment = (equipmentData: any) => {
    if (editingEquipment) {
      updateEquipment(editingEquipment.id, equipmentData);
    } else {
      addEquipment(equipmentData);
    }
    setIsFormOpen(false);
    setEditingEquipment(null);
  };

  const handleDeleteEquipment = (equipmentId: number) => {
    setEquipmentToDelete(equipmentId);
  };

  const confirmDelete = () => {
    if (equipmentToDelete !== null) {
      deleteEquipment(equipmentToDelete);
      setEquipmentToDelete(null);
    }
  };

  return (
    <TechnicianLayout title="Meus Equipamentos">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar equipamentos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Button 
            onClick={handleAddEquipment}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Equipamento
          </Button>
        </div>

        {/* Grid de Equipamentos */}
        {equipment.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-primary">{item.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.brand} {item.model}
                      </p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tipo:</span>
                      <p className="font-medium">{item.type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Série:</span>
                      <p className="font-medium">{item.serialNumber}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Aquisição:</span>
                      <p className="font-medium">{item.purchaseDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Últ. Manutenção:</span>
                      <p className="font-medium">{item.lastMaintenanceDate || 'N/A'}</p>
                    </div>
                  </div>

                  {item.notes && (
                    <div className="bg-muted p-3 rounded-lg">
                      <span className="text-xs text-muted-foreground">Observações:</span>
                      <p className="text-sm mt-1">{item.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditEquipment(item)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleDeleteEquipment(item.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-muted rounded-full p-4">
                  <Settings className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Nenhum equipamento cadastrado</h3>
                  <p className="text-muted-foreground">Comece adicionando seus equipamentos para gerenciá-los</p>
                </div>
                <Button onClick={handleAddEquipment} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Equipamento
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Form de Equipamento */}
      <EquipmentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEquipment(null);
        }}
        onSave={handleSaveEquipment}
        equipment={editingEquipment || undefined}
      />
      
      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={equipmentToDelete !== null} onOpenChange={() => setEquipmentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Equipamento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.
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
    </TechnicianLayout>
  );
};

export default TechnicianEquipments;
