
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Service, ServiceStatus, PaymentStatus } from '@/types/service';

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
    },
    clientRating: null,
    technicianRating: null
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
    },
    clientRating: null,
    technicianRating: null
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
    },
    payment: {
      status: 'pago',
      method: 'cartão de crédito',
      date: '20/07/2023'
    },
    clientRating: 4.5,
    technicianRating: 5
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
    },
    payment: {
      status: 'pago',
      method: 'transferência bancária',
      date: '18/07/2023'
    },
    clientRating: 5,
    technicianRating: 4
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
    },
    clientRating: null,
    technicianRating: null
  },
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
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

  // Function to rate a technician
  const rateTechnician = (serviceId: number, rating: number) => {
    const updatedServices = services.map(s => {
      if (s.id === serviceId) {
        return {
          ...s,
          technicianRating: rating
        };
      }
      return s;
    });
    
    setServices(updatedServices);
    
    toast({
      title: "Avaliação enviada!",
      description: `Você avaliou o técnico com ${rating} estrelas.`,
    });
  };

  // Function to rate a client
  const rateClient = (serviceId: number, rating: number) => {
    const updatedServices = services.map(s => {
      if (s.id === serviceId) {
        return {
          ...s,
          clientRating: rating
        };
      }
      return s;
    });
    
    setServices(updatedServices);
    
    toast({
      title: "Avaliação enviada!",
      description: `Você avaliou o cliente com ${rating} estrelas.`,
    });
  };

  // Function to request a new service
  const requestService = (serviceData: Partial<Service>) => {
    // Generate a new ID by getting the max ID and adding 1
    const newId = Math.max(...services.map(s => s.id)) + 1;
    
    const newService: Service = {
      id: newId,
      client: serviceData.client || 'Cliente',
      type: serviceData.type || 'Serviço não especificado',
      description: serviceData.description || '',
      status: 'pendente',
      date: serviceData.date || new Date().toLocaleDateString('pt-BR'),
      address: serviceData.address || '',
      price: serviceData.price || 'A definir',
      tracking: {
        checkedIn: false,
        checkedOut: false
      },
      clientRating: null,
      technicianRating: null
    };
    
    setServices([...services, newService]);
    
    toast({
      title: "Serviço solicitado!",
      description: "Sua solicitação de serviço foi enviada com sucesso.",
    });
    
    return newService;
  };

  // Function to process a payment
  const processPayment = (serviceId: number, method: string) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR');
    
    const updatedServices = services.map(s => {
      if (s.id === serviceId) {
        return {
          ...s,
          payment: {
            status: 'pago' as PaymentStatus,
            method,
            date: formattedDate
          }
        };
      }
      return s;
    });
    
    setServices(updatedServices);
    
    toast({
      title: "Pagamento realizado!",
      description: `Pagamento de ${method} processado com sucesso.`,
    });
  };
  
  return {
    services: filteredServices,
    data: filteredServices,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    handleTrackingAction,
    rateTechnician,
    rateClient,
    requestService,
    processPayment
  };
};
