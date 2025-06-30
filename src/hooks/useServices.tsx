
import { useState, useEffect } from 'react';
import { Service, ServiceRequest } from '@/types/service';
import { toast } from '@/hooks/use-toast';

// Mock data com informações de pagamento para demonstração
const mockServices: Service[] = [
  {
    id: 1,
    client: 'Cliente Demo',
    type: 'Manutenção de Impressora',
    description: 'Manutenção preventiva da impressora HP LaserJet',
    status: 'concluído',
    date: '2024-01-15',
    address: 'Rua das Flores, 123 - Centro',
    price: 'R$ 150,00',
    equipmentType: 'Impressora',
    clientId: 1,
    payment: {
      status: 'aguardando',
      method: 'PIX',
      date: '2024-01-15'
    },
    tracking: {
      checkedIn: true,
      checkedOut: true,
      checkinTime: '09:00',
      checkoutTime: '11:30',
      location: 'Rua das Flores, 123'
    }
  },
  {
    id: 2,
    client: 'Cliente Demo',
    type: 'Instalação de Plotter',
    description: 'Instalação e configuração de plotter de recorte',
    status: 'em andamento',
    date: '2024-01-20',
    address: 'Av. Principal, 456 - Bairro Novo',
    price: 'R$ 300,00',
    equipmentType: 'Plotter',
    clientId: 1,
    tracking: {
      checkedIn: true,
      checkedOut: false,
      checkinTime: '14:00',
      location: 'Av. Principal, 456'
    }
  },
  {
    id: 3,
    client: 'Cliente Demo',
    type: 'Reparo de Scanner',
    description: 'Reparo do sistema de alimentação de papel',
    status: 'concluído',
    date: '2024-01-10',
    address: 'Rua do Comércio, 789 - Centro',
    price: 'R$ 200,00',
    equipmentType: 'Scanner',
    clientId: 1,
    payment: {
      status: 'pago',
      method: 'Cartão de Crédito',
      date: '2024-01-12'
    },
    tracking: {
      checkedIn: true,
      checkedOut: true,
      checkinTime: '08:30',
      checkoutTime: '10:45',
      location: 'Rua do Comércio, 789'
    }
  },
  {
    id: 4,
    client: 'Cliente Demo',
    type: 'Orçamento de CNC',
    description: 'Orçamento para reparo de CNC Router',
    status: 'concluído',
    date: '2024-01-18',
    address: 'Industrial Park, 321 - Zona Industrial',
    price: 'R$ 450,00',
    equipmentType: 'CNC',
    clientId: 1,
    payment: {
      status: 'parcial',
      method: 'Transferência',
      date: '2024-01-19'
    }
  }
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addService = (serviceRequest: ServiceRequest) => {
    const newService: Service = {
      id: services.length + 1,
      client: 'Cliente Demo',
      type: serviceRequest.type,
      description: serviceRequest.description,
      status: 'pendente',
      date: serviceRequest.date,
      address: serviceRequest.address,
      price: 'A definir',
      equipmentType: 'Não especificado',
      clientId: 1
    };

    setServices(prev => [...prev, newService]);

    toast({
      title: "Solicitação enviada com sucesso!",
      description: "Entraremos em contato em breve para agendar o serviço.",
    });
  };

  const processPayment = (serviceId: number, method: string) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { 
              ...service, 
              payment: { 
                status: 'pago',
                method,
                date: new Date().toISOString().split('T')[0]
              }
            }
          : service
      )
    );

    toast({
      title: "Pagamento processado!",
      description: "Obrigado pelo pagamento. Seu serviço foi finalizado.",
    });
  };

  const rateTechnician = (serviceId: number, rating: number) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, technicianRating: rating }
          : service
      )
    );

    toast({
      title: "Avaliação enviada!",
      description: "Obrigado pela sua avaliação. Ela nos ajuda a melhorar nossos serviços.",
    });
  };

  return {
    services,
    data: services,
    isLoading,
    error,
    addService,
    requestService: addService, // Alias para addService
    processPayment,
    rateTechnician
  };
};
