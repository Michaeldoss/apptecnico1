
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { Equipment, EquipmentType, getAllEquipmentTypes } from '@/types/equipment';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EquipmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (equipment: Omit<Equipment, 'id'> | Partial<Equipment> & { id: number }) => void;
  equipment?: Equipment;
}

const statusOptions = [
  { value: 'operational', label: 'Operacional' },
  { value: 'maintenance', label: 'Em manutenção' },
  { value: 'broken', label: 'Avariado' },
  { value: 'inactive', label: 'Inativo' }
];

const EquipmentForm: React.FC<EquipmentFormProps> = ({ isOpen, onClose, onSave, equipment }) => {
  const [formData, setFormData] = useState<Partial<Equipment>>({
    name: '',
    type: 'eco-solvent',
    model: '',
    brand: '',
    serialNumber: '',
    purchaseDate: '',
    lastMaintenanceDate: '',
    status: 'operational',
    notes: ''
  });
  
  const isEditing = !!equipment;
  const equipmentTypeOptions = getAllEquipmentTypes();
  
  useEffect(() => {
    if (equipment) {
      setFormData({
        ...equipment
      });
    } else {
      // Reset form when adding new equipment
      setFormData({
        name: '',
        type: 'eco-solvent',
        model: '',
        brand: '',
        serialNumber: '',
        purchaseDate: '',
        lastMaintenanceDate: '',
        status: 'operational',
        notes: ''
      });
    }
  }, [equipment, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && equipment) {
      onSave({
        id: equipment.id,
        ...formData
      });
    } else {
      onSave(formData as Omit<Equipment, 'id'>);
    }
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Equipamento' : 'Adicionar Novo Equipamento'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Equipamento</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange('type', value as EquipmentType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Número de Série</Label>
              <Input
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Data de Aquisição</Label>
                <Input
                  id="purchaseDate"
                  name="purchaseDate"
                  type="text"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  placeholder="DD/MM/AAAA"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastMaintenanceDate">Última Manutenção</Label>
                <Input
                  id="lastMaintenanceDate"
                  name="lastMaintenanceDate"
                  type="text"
                  value={formData.lastMaintenanceDate || ''}
                  onChange={handleChange}
                  placeholder="DD/MM/AAAA"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Salvar Alterações' : 'Adicionar Equipamento'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EquipmentForm;
