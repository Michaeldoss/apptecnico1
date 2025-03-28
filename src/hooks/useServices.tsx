
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Service, ServiceStatus } from '@/types/service';

// Mock data - in a real app, this would come from an API
const mockServices: Service[] = [
  {
    id: 1,
    client: 'João Silva',
    type: 'Reparo de Computador',
    description: 'PC não liga, possível problema na fonte',
    status: 'pendente',
    date: '24/07/2023',
    address: 'Rua Augusta, 1500, São Paulo - SP',
    price: 'R$ 150,00',
    tracking: {
      checkedIn: false,
      checkedOut: false
    }
  },
  {
    id: 2,
    client: 'Maria Oliveira',
    type: 'Instalação de Rede',
    description: 'Instalação de rede Wi-Fi e configuração',
    status: 'em andamento',
    date: '22/07/2023',
    address: 'Av. Paulista, 900, São Paulo - SP',
    price: 'R$ 200,00',
    tracking: {
      checkedIn: true,
      checkedOut: false,
      checkinTime: '22/07/2023 14:30'
    }
  },
  {
    id: 3,
    client: 'Pedro Santos',
    type: 'Manutenção de Impressora',
    description: 'Impressora com problema de papel preso',
    status: 'concluído',
    date: '20/07/2023',
    address: 'Rua Consolação, 250, São Paulo - SP',
    price: 'R$ 100,00',
    tracking: {
      checkedIn: true,
      checkedOut: true,
      checkinTime: '20/07/2023 09:15',
      checkoutTime: '20/07/2023 10:45'
    }
  },
  {
    id: 4,
    client: 'Ana Costa',
    type: 'Formatação de Notebook',
    description: 'Formatação completa e instalação de softwares',
    status: 'concluído',
    date: '18/07/2023',
    address: 'Av. Brigadeiro Faria Lima, 1200, São Paulo - SP',
    price: 'R$ 180,00',
    tracking: {
      checkedIn: true,
      checkedOut: true,
      checkinTime: '18/07/2023 13:00',
      checkoutTime: '18/07/2023 16:30'
    }
  },
  {
    id: 5,
    client: 'Carlos Mendes',
    type: 'Reparo de Smartphone',
    description: 'Troca de tela quebrada',
    status: 'cancelado',
    date: '15/07/2023',
    address: 'Rua Oscar Freire, 500, São Paulo - SP',
    price: 'R$ 250,00',
    tracking: {
      checkedIn: false,
      checkedOut: false
    }
  },
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter services based on search query
  const filteredServices = services.filter(service => 
    service.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle check-in/check-out actions
  const handleTrackingAction = (service: Service, action: 'checkin' | 'checkout') => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR') + ' ' + 
                         now.getHours().toString().padStart(2, '0') + ':' + 
                         now.getMinutes().toString().padStart(2, '0');
    
    const updatedServices = services.map(s => {
      if (s.id === service.id) {
        if (action === 'checkin') {
          return {
            ...s,
            status: 'em andamento' as ServiceStatus,
            tracking: {
              ...s.tracking,
              checkedIn: true,
              checkinTime: formattedDate
            }
          };
        } else if (action === 'checkout') {
          return {
            ...s,
            status: 'concluído' as ServiceStatus,
            tracking: {
              ...s.tracking,
              checkedOut: true,
              checkoutTime: formattedDate
            }
          };
        }
      }
      return s;
    });
    
    setServices(updatedServices);
    
    // Show toast notification
    toast({
      title: action === 'checkin' ? "Check-in realizado!" : "Check-out realizado!",
      description: action === 'checkin' 
        ? `Você iniciou o serviço para ${service.client} às ${formattedDate}.`
        : `Você finalizou o serviço para ${service.client} às ${formattedDate}.`,
    });

    return formattedDate;
  };
  
  return {
    services: filteredServices,
    searchQuery,
    setSearchQuery,
    handleTrackingAction
  };
};
