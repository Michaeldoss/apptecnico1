
export type EquipmentType = 
  | 'eco-solvent'
  | 'uv-flexible'
  | 'cutting'
  | 'dtf-textile'
  | 'sublimation'
  | 'laser'
  | 'cnc'
  | 'industrial'
  | 'finishing'
  | 'cnc-router'
  | 'uv-flatbed'
  | 'laser-engraver'
  | 'thermal-press'
  | 'silk-carousel';

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
  'finishing': 'Acabamento',
  'cnc-router': 'CNC Router',
  'uv-flatbed': 'UV Flatbed',
  'laser-engraver': 'Laser Engraver',
  'thermal-press': 'Prensa Térmica',
  'silk-carousel': 'Carrossel Seda'
};

export const equipmentCategories = [
  { 
    id: 'printers', 
    label: 'Plotters', 
    types: ['eco-solvent', 'uv-flexible', 'sublimation', 'dtf-textile', 'cutting', 'uv-flatbed'] 
  },
  { 
    id: 'finishing', 
    label: 'Acabamento', 
    types: ['finishing', 'thermal-press', 'silk-carousel'] 
  },
  { 
    id: 'cnc', 
    label: 'Máquinas CNC', 
    types: ['cnc', 'laser', 'industrial', 'cnc-router', 'laser-engraver'] 
  },
];

export const getAllEquipmentTypes = () => {
  return Object.entries(equipmentTypeLabels).map(([value, label]) => ({
    value,
    label
  }));
};
