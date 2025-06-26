
import { useState, useEffect } from 'react';
import { ServiceOrder, ServiceOrderStatus } from '@/types/service-order';

// Mock data para demonstração
const mockServiceOrders: ServiceOrder[] = [
  {
    id: '1',
    number: 'OS-261532820',
    status: 'aberta',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
    client: {
      name: 'Gráfica Digital Ltda',
      document: '12.345.678/0001-90',
      ie: '123.456.789.012',
      address: {
        street: 'Rua das Impressoras',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      phone: '(11) 98765-4321',
      email: 'contato@graficadigital.com.br'
    },
    equipment: 'Epson SureColor F170',
    serialNumber: 'X7YZ123456',
    reportedProblem: 'Impressora não está puxando papel corretamente',
    technician: 'Ricardo Silva',
    attendant: 'Maria Santos',
    items: [
      {
        id: '1',
        code: 'ROL-001',
        description: 'Rolo de Papel Transfer',
        quantity: 2,
        unitPrice: 45.00,
        discount: 0,
        total: 90.00
      }
    ],
    subtotal: 90.00,
    discount: 0,
    total: 90.00,
    paymentCondition: 'À vista',
    servicesPerformed: 'Limpeza do sistema de alimentação de papel e calibração dos rolos',
    observations: 'Cliente orientado sobre manutenção preventiva',
    attachments: [],
    history: [
      {
        action: 'OS Criada',
        timestamp: '2024-01-15T08:30:00Z',
        user: 'Ricardo Silva'
      }
    ]
  }
];

export const useServiceOrders = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '' as ServiceOrderStatus | '',
    search: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setServiceOrders(mockServiceOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const generateOrderNumber = (): string => {
    const timestamp = Date.now().toString();
    return `OS-${timestamp.slice(-8)}`;
  };

  const createServiceOrder = (orderData: Partial<ServiceOrder>): ServiceOrder => {
    const newOrder: ServiceOrder = {
      id: Date.now().toString(),
      number: generateOrderNumber(),
      status: 'aberta',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      attachments: [],
      history: [{
        action: 'OS Criada',
        timestamp: new Date().toISOString(),
        user: 'Sistema'
      }],
      ...orderData
    } as ServiceOrder;

    setServiceOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateServiceOrder = (id: string, updates: Partial<ServiceOrder>) => {
    setServiceOrders(prev => prev.map(order => 
      order.id === id 
        ? { 
            ...order, 
            ...updates, 
            updatedAt: new Date().toISOString(),
            history: [
              ...order.history,
              {
                action: 'OS Atualizada',
                timestamp: new Date().toISOString(),
                user: 'Sistema',
                details: JSON.stringify(updates)
              }
            ]
          }
        : order
    ));
  };

  const filteredOrders = serviceOrders.filter(order => {
    if (filters.status && order.status !== filters.status) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        order.number.toLowerCase().includes(searchLower) ||
        order.client.name.toLowerCase().includes(searchLower) ||
        order.equipment.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return {
    serviceOrders: filteredOrders,
    loading,
    filters,
    setFilters,
    createServiceOrder,
    updateServiceOrder,
    generateOrderNumber
  };
};
