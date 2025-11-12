import { useState, useEffect } from 'react';
import { ServiceOrder, ServiceOrderStatus } from '@/types/service-order';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export const useServiceOrders = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    status: '' as ServiceOrderStatus | '',
    search: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  const fetchServiceOrders = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ordens_servico')
        .select(`
          *,
          clientes:cliente_id (
            nome,
            cpf_cnpj,
            telefone,
            cep,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            email
          )
        `)
        .eq('tecnico_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transformar dados do Supabase para o formato ServiceOrder
      const transformedOrders: ServiceOrder[] = (data || []).map((order: any) => ({
        id: order.id,
        number: `OS-${order.id.slice(0, 8)}`,
        status: order.status || 'aberta',
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        completedAt: order.data_conclusao,
        client: {
          name: order.clientes?.nome || '',
          document: order.clientes?.cpf_cnpj || '',
          phone: order.clientes?.telefone || '',
          email: order.clientes?.email,
          address: {
            street: order.clientes?.endereco || '',
            number: order.clientes?.numero || '',
            complement: order.clientes?.complemento,
            neighborhood: order.clientes?.bairro || '',
            city: order.clientes?.cidade || '',
            state: order.clientes?.estado || '',
            zipCode: order.clientes?.cep || ''
          }
        },
        equipment: order.titulo || '',
        serialNumber: order.descricao || '',
        reportedProblem: order.descricao || '',
        technician: 'Técnico',
        attendant: 'Atendente',
        items: [],
        subtotal: order.valor_servico || 0,
        discount: 0,
        total: order.valor_total || 0,
        paymentCondition: 'À vista',
        servicesPerformed: '',
        observations: '',
        attachments: [],
        history: []
      }));

      setServiceOrders(transformedOrders);
    } catch (error: any) {
      console.error('Erro ao carregar ordens:', error);
      toast.error('Erro ao carregar ordens de serviço');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceOrders();
  }, [user]);

  const generateOrderNumber = (): string => {
    const timestamp = Date.now().toString();
    return `OS-${timestamp.slice(-8)}`;
  };

  const createServiceOrder = async (orderData: Partial<ServiceOrder>) => {
    if (!user) return;

    try {
      // Primeiro, buscar ou criar o cliente
      let clientId = null;
      
      if (orderData.client?.document) {
        const { data: existingClient } = await supabase
          .from('clientes')
          .select('id')
          .eq('cpf_cnpj', orderData.client.document)
          .single();

        if (existingClient) {
          clientId = existingClient.id;
        } else {
          // Criar novo cliente
          const { data: newClient, error: clientError } = await supabase
            .from('clientes')
            .insert({
              nome: orderData.client.name,
              cpf_cnpj: orderData.client.document,
              telefone: orderData.client.phone,
              email: orderData.client.email,
              cep: orderData.client.address?.zipCode,
              endereco: orderData.client.address?.street,
              numero: orderData.client.address?.number,
              complemento: orderData.client.address?.complement,
              bairro: orderData.client.address?.neighborhood,
              cidade: orderData.client.address?.city,
              estado: orderData.client.address?.state
            })
            .select('id')
            .single();

          if (clientError) throw clientError;
          clientId = newClient.id;
        }
      }

      // Criar ordem de serviço
      const { data, error } = await supabase
        .from('ordens_servico')
        .insert({
          tecnico_id: user.id,
          cliente_id: clientId,
          titulo: orderData.equipment,
          descricao: orderData.reportedProblem,
          status: orderData.status || 'aberta',
          valor_servico: orderData.subtotal || 0,
          valor_pecas: 0,
          valor_total: orderData.total || 0,
          endereco_servico: `${orderData.client?.address?.street}, ${orderData.client?.address?.number}`
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Ordem de serviço criada com sucesso!');
      await fetchServiceOrders();
      
      return data;
    } catch (error: any) {
      console.error('Erro ao criar ordem:', error);
      toast.error('Erro ao criar ordem de serviço');
      throw error;
    }
  };

  const updateServiceOrder = async (id: string, updates: Partial<ServiceOrder>) => {
    try {
      const { error } = await supabase
        .from('ordens_servico')
        .update({
          status: updates.status,
          valor_total: updates.total,
          valor_servico: updates.subtotal,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Ordem atualizada com sucesso!');
      await fetchServiceOrders();
    } catch (error: any) {
      console.error('Erro ao atualizar ordem:', error);
      toast.error('Erro ao atualizar ordem de serviço');
    }
  };

  const shareViaWhatsApp = (order: ServiceOrder) => {
    const message = `*Ordem de Serviço ${order.number}*\n\n` +
      `Cliente: ${order.client.name}\n` +
      `Equipamento: ${order.equipment}\n` +
      `Problema: ${order.reportedProblem}\n` +
      `Valor Total: R$ ${order.total.toFixed(2)}\n\n` +
      `Status: ${order.status}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${order.client.phone.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaEmail = (order: ServiceOrder) => {
    const subject = `Ordem de Serviço ${order.number}`;
    const body = `Prezado(a) ${order.client.name},\n\n` +
      `Segue os detalhes da ordem de serviço:\n\n` +
      `Número: ${order.number}\n` +
      `Equipamento: ${order.equipment}\n` +
      `Problema Relatado: ${order.reportedProblem}\n` +
      `Valor Total: R$ ${order.total.toFixed(2)}\n\n` +
      `Atenciosamente,\n` +
      `Equipe Técnica`;
    
    const mailtoUrl = `mailto:${order.client.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
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
    generateOrderNumber,
    shareViaWhatsApp,
    shareViaEmail,
    refreshOrders: fetchServiceOrders
  };
};
