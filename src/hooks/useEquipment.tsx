
import { useState } from 'react';
import { Equipment } from '@/types/equipment';
import { mockEquipment } from '@/data/mockEquipment';
import { useEquipmentOperations } from '@/hooks/useEquipmentOperations';
import { useEquipmentFilter } from '@/hooks/useEquipmentFilter';

export const useEquipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  
  const { searchQuery, setSearchQuery, filteredEquipment } = useEquipmentFilter(equipment);
  const { isLoading, error, addEquipment, updateEquipment, deleteEquipment } = useEquipmentOperations(equipment, setEquipment);
  
  return {
    equipment: filteredEquipment,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    addEquipment,
    updateEquipment,
    deleteEquipment
  };
};
