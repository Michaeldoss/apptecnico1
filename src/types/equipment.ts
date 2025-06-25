
export type EquipmentType = 
  | 'eco-solvent'
  | 'uv-flexible'
  | 'cutting'
  | 'dtf-textile'
  | 'sublimation'
  | 'laser'
  | 'cnc'
  | 'industrial'
  | 'finishing';

export type Equipment = {
  id: number;
  name: string;
  type: EquipmentType;
  model: string;
  brand: string;
  serialNumber: string;
  purchaseDate: string;
  lastMaintenanceDate?: string;
  status: 'operational' | 'maintenance' | 'broken' | 'inactive';
  notes?: string;
  image?: string;
};

export const equipmentTypeLabels: Record<EquipmentType, string> = {
  'eco-solvent': 'Eco Solvente',
  'uv-flexible': 'UV Flexível',
  'cutting': 'Recorte',
  'dtf-textile': 'DTF Têxtil',
  'sublimation': 'Sublimação',
  'laser': 'Laser',
  'cnc': 'CNC',
  'industrial': 'Industrial',
  'finishing': 'Acabamento'
};

export const equipmentCategories = [
  { 
    id: 'printers', 
    label: 'Plotters', 
    types: ['eco-solvent', 'uv-flexible', 'sublimation', 'dtf-textile', 'cutting'] 
  },
  { 
    id: 'finishing', 
    label: 'Acabamento', 
    types: ['finishing'] 
  },
  { 
    id: 'cnc', 
    label: 'Máquinas CNC', 
    types: ['cnc', 'laser', 'industrial'] 
  },
];

export const getAllEquipmentTypes = () => {
  return Object.entries(equipmentTypeLabels).map(([value, label]) => ({
    value,
    label
  }));
};
