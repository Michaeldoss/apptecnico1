
export type EquipmentType = 
  | 'eco-solvent'
  | 'uv-flexible'
  | 'sublimation'
  | 'sublimation-calander'
  | 'thermal-press'
  | 'dtf-textile'
  | 'dtf-uv'
  | 'dtf-carousel'
  | 'mixed-carousel'
  | 'cnc-co2'
  | 'cnc-router'
  | 'laser-engraver'
  | 'cutting'
  | 'uv-flatbed'
  | 'offset'
  | 'sewing-machine'
  | 'cylindrical-uv'
  | 'solvent'
  | 'silk-carousel';

export type EquipmentStatus = 'operational' | 'maintenance' | 'broken' | 'inactive';

export interface Equipment {
  id: number;
  name: string;
  type: EquipmentType;
  model: string;
  brand: string;
  serialNumber: string;
  purchaseDate: string;
  lastMaintenanceDate?: string;
  status: EquipmentStatus;
  notes?: string;
}

export const equipmentTypeLabels: Record<EquipmentType, string> = {
  'eco-solvent': 'Plotter Eco Solvente',
  'uv-flexible': 'Plotter UV Flexível',
  'sublimation': 'Plotter Sublimática',
  'sublimation-calander': 'Calandra para Sublimação',
  'thermal-press': 'Prensa Térmica para Sublimação',
  'dtf-textile': 'Plotter DTF Têxtil',
  'dtf-uv': 'Plotter DTF UV',
  'dtf-carousel': 'Carrossel para DTF',
  'mixed-carousel': 'Carrossel Misto',
  'cnc-co2': 'CNC CO²',
  'cnc-router': 'CNC Router',
  'laser-engraver': 'Gravadora Laser (Fiber)',
  'cutting': 'Plotter de Recorte',
  'uv-flatbed': 'Plotter Flatbed UV',
  'offset': 'OFF-SET',
  'sewing-machine': 'Máquina de Costura',
  'cylindrical-uv': 'Plotter UV Cilíndrica',
  'solvent': 'Plotter Solvente',
  'silk-carousel': 'Carrossel para Silk'
};

export const equipmentCategories = [
  {
    id: 'printers',
    label: 'Impressoras',
    types: ['eco-solvent', 'uv-flexible', 'sublimation', 'dtf-textile', 'dtf-uv', 'uv-flatbed', 'cylindrical-uv', 'solvent', 'offset'] as EquipmentType[]
  },
  {
    id: 'finishing',
    label: 'Acabamento',
    types: ['sublimation-calander', 'thermal-press', 'dtf-carousel', 'mixed-carousel', 'silk-carousel', 'cutting'] as EquipmentType[]
  },
  {
    id: 'cnc',
    label: 'CNC e Laser',
    types: ['cnc-co2', 'cnc-router', 'laser-engraver'] as EquipmentType[]
  },
  {
    id: 'others',
    label: 'Outros',
    types: ['sewing-machine'] as EquipmentType[]
  }
];

export const getAllEquipmentTypes = () => {
  return Object.entries(equipmentTypeLabels).map(([value, label]) => ({
    value: value as EquipmentType,
    label
  }));
};
