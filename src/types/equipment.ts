
export type EquipmentType = 
  | 'eco-solvent'
  | 'uv-flexible'
  | 'solvent'
  | 'sublimation'
  | 'dtf-textile'
  | 'dtf-uv'
  | 'uv-flatbed'
  | 'cutting'
  | 'cylindrical-uv'
  | 'sublimation-calander'
  | 'thermal-press'
  | 'silk-carousel'
  | 'dtf-carousel'
  | 'mixed-carousel'
  | 'sewing-machine'
  | 'offset'
  | 'cnc-co2'
  | 'cnc-router'
  | 'laser-engraver'
  | 'other';

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
  'eco-solvent': 'Plotter eco solvente',
  'uv-flexible': 'Plotter UV flexível',
  'solvent': 'Plotter solvente',
  'sublimation': 'Plotter sublimática',
  'dtf-textile': 'Plotter DTF Têxtil',
  'dtf-uv': 'Plotter DTF UV',
  'uv-flatbed': 'Plotter Flatbed UV',
  'cutting': 'Plotter de recorte',
  'cylindrical-uv': 'Plotter UV cilíndrica',
  'sublimation-calander': 'Calandra para sublimação',
  'thermal-press': 'Prensa térmica para sublimação',
  'silk-carousel': 'Carrossel para silk',
  'dtf-carousel': 'Carrossel para DTF',
  'mixed-carousel': 'Carrossel misto',
  'sewing-machine': 'Máquina de costura',
  'offset': 'OFF-SET',
  'cnc-co2': 'CNC CO²',
  'cnc-router': 'CNC Router',
  'laser-engraver': 'Gravadora laser (Fiber)',
  'other': 'Outro'
};

export const equipmentCategories = [
  { 
    id: 'printers', 
    label: 'Plotters', 
    types: ['eco-solvent', 'uv-flexible', 'solvent', 'sublimation', 'dtf-textile', 'dtf-uv', 'uv-flatbed', 'cutting', 'cylindrical-uv'] 
  },
  { 
    id: 'finishing', 
    label: 'Acabamento', 
    types: ['sublimation-calander', 'thermal-press', 'silk-carousel', 'dtf-carousel', 'mixed-carousel', 'sewing-machine'] 
  },
  { 
    id: 'cnc', 
    label: 'Máquinas CNC', 
    types: ['cnc-co2', 'cnc-router', 'laser-engraver', 'offset'] 
  },
];

export const getAllEquipmentTypes = () => {
  return Object.entries(equipmentTypeLabels).map(([value, label]) => ({
    value,
    label
  }));
};
