
import React from 'react';
import { Button } from '@/components/ui/button';
import { Equipment } from '@/types/equipment';
import { 
  Printer, 
  MoreVertical, 
  Edit, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface EquipmentCardProps {
  equipment: Equipment;
  onEdit: (equipment: Equipment) => void;
  onDelete: (id: number) => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onEdit, onDelete }) => {
  // Function to get status icon
  const getStatusIcon = () => {
    switch (equipment.status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'maintenance':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'broken':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'inactive':
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };
  
  // Function to get status text
  const getStatusText = () => {
    switch (equipment.status) {
      case 'operational':
        return <span className="text-green-500">Operacional</span>;
      case 'maintenance':
        return <span className="text-amber-500">Em manutenção</span>;
      case 'broken':
        return <span className="text-red-500">Avariado</span>;
      case 'inactive':
        return <span className="text-gray-500">Inativo</span>;
      default:
        return null;
    }
  };
  
  // Function to get equipment type icon
  const getEquipmentIcon = () => {
    // This could be expanded with more specific icons for different types
    return <Printer className="h-5 w-5" />;
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            {getEquipmentIcon()}
          </div>
          <div>
            <h3 className="font-medium text-lg">{equipment.name}</h3>
            <p className="text-sm text-muted-foreground">{equipment.brand} - {equipment.model}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(equipment)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(equipment.id)} className="text-red-500 focus:text-red-500">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Número de Série:</span>
          <p>{equipment.serialNumber}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Data de Compra:</span>
          <p>{equipment.purchaseDate}</p>
        </div>
        {equipment.lastMaintenanceDate && (
          <div>
            <span className="text-muted-foreground">Última Manutenção:</span>
            <p>{equipment.lastMaintenanceDate}</p>
          </div>
        )}
        <div>
          <span className="text-muted-foreground">Status:</span>
          <p className="flex items-center gap-1">
            {getStatusIcon()}
            {getStatusText()}
          </p>
        </div>
      </div>
      
      {equipment.notes && (
        <div className="mt-3 pt-3 border-t text-sm">
          <span className="text-muted-foreground">Observações:</span>
          <p>{equipment.notes}</p>
        </div>
      )}
      
      {equipment.status !== 'operational' && (
        <div className="mt-3">
          <Link to="/cliente/solicitar">
            <Button variant="outline" size="sm" className="w-full">
              Solicitar Serviço
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EquipmentCard;
