
import { useState } from 'react';
import { Equipment, EquipmentType } from '@/types/equipment';
import { toast } from '@/hooks/use-toast';

// Mock data for equipment list
const mockEquipment: Equipment[] = [
  {
    id: 1,
    name: 'Plotter HP Eco Solvente',
    type: 'eco-solvent',
    model: 'DesignJet Z6200',
    brand: 'HP',
    serialNumber: 'SN12345678',
    purchaseDate: '10/05/2021',
    lastMaintenanceDate: '15/03/2023',
    status: 'operational',
    notes: 'Localizado no setor de impressão digital'
  },
  {
    id: 2,
    name: 'CNC Router',
    type: 'cnc-router',
    model: 'Pro 4848',
    brand: 'ShopBot',
    serialNumber: 'SB789456123',
    purchaseDate: '22/08/2020',
    status: 'maintenance',
    notes: 'Problemas com o eixo Y, agendado manutenção'
  },
  {
    id: 3,
    name: 'Impressora UV Flatbed',
    type: 'uv-flatbed',
    model: 'Acuity LED 1600R',
    brand: 'Fujifilm',
    serialNumber: 'FF20210430',
    purchaseDate: '30/04/2021',
    lastMaintenanceDate: '10/01/2023',
    status: 'operational'
  },
  {
    id: 4, 
    name: 'Máquina de Corte a Laser',
    type: 'laser-engraver',
    model: 'Speedy 400',
    brand: 'Trotec',
    serialNumber: 'TL56789012',
    purchaseDate: '15/11/2019',
    lastMaintenanceDate: '05/07/2022',
    status: 'broken',
    notes: 'Tubo de laser com problema, aguardando peça de reposição'
  },
  {
    id: 5,
    name: 'Prensa Térmica para Sublimação',
    type: 'thermal-press',
    model: 'STM-24',
    brand: 'Metalnox',
    serialNumber: 'MT12309876',
    purchaseDate: '03/02/2022',
    status: 'operational'
  }
];

export const useEquipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Filter equipment based on search query
  const filteredEquipment = equipment.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
