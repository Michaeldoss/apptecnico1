
import { Equipment } from '@/types/equipment';

export const mockEquipment: Equipment[] = [
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
  },
  {
    id: 6,
    name: 'Plotter UV Flexível',
    type: 'uv-flexible',
    model: 'UJV100-160',
    brand: 'Mimaki',
    serialNumber: 'MM20220307',
    purchaseDate: '07/03/2022',
    status: 'operational'
  },
  {
    id: 7,
    name: 'Plotter DTF Têxtil',
    type: 'dtf-textile',
    model: 'DTF-330',
    brand: 'IJTP',
    serialNumber: 'IJ202205121',
    purchaseDate: '12/05/2022',
    lastMaintenanceDate: '18/02/2023',
    status: 'operational'
  },
  {
    id: 8,
    name: 'Carrossel para Seda',
    type: 'silk-carousel',
    model: 'SC-6/6',
    brand: 'NS Máquinas',
    serialNumber: 'NS76543210',
    purchaseDate: '25/09/2021',
    status: 'operational'
  }
];
