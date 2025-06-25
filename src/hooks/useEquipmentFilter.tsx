
import { useState } from 'react';
import { Equipment } from '@/types/equipment';

export const useEquipmentFilter = (equipment: Equipment[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter equipment based on search query
  const filteredEquipment = equipment.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredEquipment
  };
};
