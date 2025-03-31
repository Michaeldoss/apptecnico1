
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { useEquipment } from '@/hooks/useEquipment';
import EquipmentCard from '@/components/equipment/EquipmentCard';
import EquipmentForm from '@/components/equipment/EquipmentForm';
import { Equipment } from '@/types/equipment';
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

const CustomerEquipment = () => {
  const {
    equipment,
    searchQuery,
    setSearchQuery,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    isLoading
  } = useEquipment();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | undefined>(undefined);
  const [equipmentToDelete, setEquipmentToDelete] = useState<number | null>(null);
  
  const handleAddButtonClick = () => {
    setSelectedEquipment(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsFormOpen(true);
  };
  
  const handleSaveEquipment = (data: Omit<Equipment, 'id'> | Partial<Equipment> & { id: number }) => {
    if ('id' in data) {
      updateEquipment(data.id, data);
    } else {
      addEquipment(data);
    }
  };
  
  const handleDeleteConfirm = (id: number) => {
    setEquipmentToDelete(id);
  };
  
  const confirmDelete = () => {
    if (equipmentToDelete !== null) {
      deleteEquipment(equipmentToDelete);
      setEquipmentToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setEquipmentToDelete(null);
  };
  
  return (
    <CustomerLayout title="Meus Equipamentos">
      <div className="space-y-6">
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
          <Button onClick={handleAddButtonClick}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Equipamento
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-6 h-48 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-2/3"></div>
              </div>
            ))}
          </div>
        ) : equipment.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipment.map((item) => (
              <EquipmentCard
                key={item.id}
                equipment={item}
                onEdit={handleEditEquipment}
                onDelete={handleDeleteConfirm}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="font-medium text-lg">Nenhum equipamento encontrado</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery ? 'Tente uma busca diferente ou' : 'Comece a'} adicionar seus equipamentos.
            </p>
            <Button onClick={handleAddButtonClick} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Equipamento
            </Button>
          </div>
        )}
      </div>
      
      <EquipmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveEquipment}
        equipment={selectedEquipment}
      />
      
      <AlertDialog open={equipmentToDelete !== null} onOpenChange={cancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Equipamento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CustomerLayout>
  );
};

export default CustomerEquipment;
