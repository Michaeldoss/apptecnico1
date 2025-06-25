
import { useState } from 'react';
import { Equipment } from '@/types/equipment';
import { toast } from '@/hooks/use-toast';

export const useEquipmentOperations = (
  equipment: Equipment[], 
  setEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Add new equipment
  const addEquipment = (newEquipment: Omit<Equipment, 'id'>) => {
    try {
      setIsLoading(true);
      // Generate a new ID
      const newId = Math.max(...equipment.map(e => e.id)) + 1;
      
      const equipmentToAdd: Equipment = {
        ...newEquipment,
        id: newId
      };
      
      setEquipment([...equipment, equipmentToAdd]);
      
      toast({
        title: "Equipamento adicionado",
        description: "O equipamento foi adicionado com sucesso!",
      });
      
      return equipmentToAdd;
    } catch (err) {
      const error = err as Error;
      setError(error);
      
      toast({
        title: "Erro ao adicionar equipamento",
        description: error.message,
        variant: "destructive"
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update existing equipment
  const updateEquipment = (id: number, updatedData: Partial<Equipment>) => {
    try {
      setIsLoading(true);
      
      const updatedEquipment = equipment.map(item => 
        item.id === id ? { ...item, ...updatedData } : item
      );
      
      setEquipment(updatedEquipment);
      
      toast({
        title: "Equipamento atualizado",
        description: "As informações foram atualizadas com sucesso!",
      });
      
      return updatedEquipment.find(item => item.id === id) || null;
    } catch (err) {
      const error = err as Error;
      setError(error);
      
      toast({
        title: "Erro ao atualizar equipamento",
        description: error.message,
        variant: "destructive"
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete equipment
  const deleteEquipment = (id: number) => {
    try {
      setIsLoading(true);
      
      const updatedEquipment = equipment.filter(item => item.id !== id);
      setEquipment(updatedEquipment);
      
      toast({
        title: "Equipamento removido",
        description: "O equipamento foi removido com sucesso!",
      });
      
      return true;
    } catch (err) {
      const error = err as Error;
      setError(error);
      
      toast({
        title: "Erro ao remover equipamento",
        description: error.message,
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    addEquipment,
    updateEquipment,
    deleteEquipment
  };
};
