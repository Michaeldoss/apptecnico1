
import { useState, useEffect } from 'react';
import { ServiceOrder, ServiceOrderStatus } from '@/types/service-order';

// Dados limpos - array vazio
const mockServiceOrders: ServiceOrder[] = [];

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
