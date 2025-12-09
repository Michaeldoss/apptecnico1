
import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { DashboardStats, WeeklySchedule, ServiceMetrics, StockItem, KPIMetrics, WeeklyEarnings, Alert } from '@/types/dashboard';

export const useDashboard = () => {
  const { user } = useAuth();
  const [isNewUser, setIsNewUser] = useState(true);
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState<DashboardStats>({
    monthlyEarnings: 0,
    pendingEarnings: 0,
    weeklyGrowth: 0,
    topClient: { name: 'Nenhum cliente ainda', amount: 0 }
  });

  const [serviceMetrics, setServiceMetrics] = useState<ServiceMetrics>({
    completedToday: 0,
    pending: 0,
    returns: 0,
    cancelled: 0,
    inNegotiation: 0
  });

  const [kpiMetrics, setKpiMetrics] = useState<KPIMetrics>({
    totalServices: 0,
    returnRate: 0,
    averageRating: 0,
    averageTicket: 0,
    ranking: 0
  });

  const [weeklyEarnings, setWeeklyEarnings] = useState<WeeklyEarnings[]>([
    { week: 'Sem 1', earnings: 0 },
    { week: 'Sem 2', earnings: 0 },
    { week: 'Sem 3', earnings: 0 },
    { week: 'Sem 4', earnings: 0 }
  ]);

  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule[]>([
    { day: 'Seg', appointments: 0, conflicts: 0 },
    { day: 'Ter', appointments: 0, conflicts: 0 },
    { day: 'Qua', appointments: 0, conflicts: 0 },
    { day: 'Qui', appointments: 0, conflicts: 0 },
    { day: 'Sex', appointments: 0, conflicts: 0 },
    { day: 'Sáb', appointments: 0, conflicts: 0 },
    { day: 'Dom', appointments: 0, conflicts: 0 }
  ]);

  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Carregar ordens de serviço
      const { data: ordensServico, error: ordensError } = await supabase
        .from('ordens_servico')
        .select('*')
        .eq('tecnico_id', user.id);

      if (!ordensError && ordensServico) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        // Filtrar ordens do mês atual
        const ordensDoMes = ordensServico.filter(o => 
          new Date(o.created_at) >= startOfMonth
        );
        
        // Calcular ganhos mensais
        const ganhosMensais = ordensServico
          .filter(o => o.status === 'concluida' && new Date(o.data_conclusao || o.created_at) >= startOfMonth)
          .reduce((sum, o) => sum + (o.valor_total || 0), 0);

        // Calcular ganhos pendentes
        const ganhosPendentes = ordensServico
          .filter(o => o.status === 'em_andamento' || o.status === 'agendada')
          .reduce((sum, o) => sum + (o.valor_total || 0), 0);

        // Métricas de serviço
        const hoje = new Date().toDateString();
        const completedToday = ordensServico.filter(o => 
          o.status === 'concluida' && 
          new Date(o.data_conclusao || o.created_at).toDateString() === hoje
        ).length;
        const pending = ordensServico.filter(o => o.status === 'aberta' || o.status === 'agendada').length;
        const cancelled = ordensServico.filter(o => o.status === 'cancelada').length;

        // Calcular ticket médio
        const ordensConcluidasComValor = ordensServico.filter(o => o.status === 'concluida' && o.valor_total);
        const ticketMedio = ordensConcluidasComValor.length > 0 
          ? ordensConcluidasComValor.reduce((sum, o) => sum + (o.valor_total || 0), 0) / ordensConcluidasComValor.length 
          : 0;

        // Calcular avaliação média
        const ordensComAvaliacao = ordensServico.filter(o => o.avaliacao);
        const avaliacaoMedia = ordensComAvaliacao.length > 0
          ? ordensComAvaliacao.reduce((sum, o) => sum + (o.avaliacao || 0), 0) / ordensComAvaliacao.length
          : 0;

        setStats({
          monthlyEarnings: ganhosMensais,
          pendingEarnings: ganhosPendentes,
          weeklyGrowth: 0,
          topClient: { name: 'Ver clientes', amount: 0 }
        });

        setServiceMetrics({
          completedToday,
          pending,
          returns: 0,
          cancelled,
          inNegotiation: 0
        });

        setKpiMetrics({
          totalServices: ordensServico.length,
          returnRate: 0,
          averageRating: avaliacaoMedia,
          averageTicket: ticketMedio,
          ranking: 0
        });

        setIsNewUser(ordensServico.length === 0);
      }

      // Carregar peças para estoque
      const { data: pecas, error: pecasError } = await supabase
        .from('pecas')
        .select('*')
        .eq('tecnico_id', user.id);

      if (!pecasError && pecas) {
        const stockItemsFromDb: StockItem[] = pecas.map(p => ({
          id: p.id,
          name: p.nome,
          currentStock: p.estoque || 0,
          minStock: 3,
          unit: 'un',
          urgent: (p.estoque || 0) <= 3
        }));
        setStockItems(stockItemsFromDb);

        // Criar alertas de estoque baixo
        const lowStockAlerts: Alert[] = pecas
          .filter(p => (p.estoque || 0) <= 3)
          .map(p => ({
            id: p.id,
            type: 'stock' as const,
            title: 'Estoque Baixo',
            description: `${p.nome} com estoque baixo (${p.estoque} unidades)`,
            urgent: (p.estoque || 0) === 0,
            time: 'Agora',
            message: `${p.nome} com estoque baixo`
          }));
        setAlerts(lowStockAlerts);
      }

      // Carregar agendamentos
      const { data: agendamentos, error: agendError } = await supabase
        .from('servicos_agendados')
        .select('*')
        .eq('tecnico_id', user.id);

      if (!agendError && agendamentos) {
        // Calcular agenda da semana
        const hoje = new Date();
        const inicioDaSemana = new Date(hoje);
        inicioDaSemana.setDate(hoje.getDate() - hoje.getDay() + 1); // Segunda

        const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
        const scheduleFromDb: WeeklySchedule[] = diasDaSemana.map((day, index) => {
          const data = new Date(inicioDaSemana);
          data.setDate(inicioDaSemana.getDate() + index);
          
          const agendamentosDoDia = agendamentos.filter(a => {
            const dataAgendamento = new Date(a.data_agendamento);
            return dataAgendamento.toDateString() === data.toDateString();
          });

          return {
            day,
            appointments: agendamentosDoDia.length,
            conflicts: 0
          };
        });
        setWeeklySchedule(scheduleFromDb);
      }

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    }

    setLoading(false);
  };

  const urgentStockItems = useMemo(() => {
    return stockItems.filter(item => item.urgent || item.currentStock <= item.minStock);
  }, [stockItems]);

  const totalConflicts = useMemo(() => {
    return weeklySchedule.reduce((total, day) => total + day.conflicts, 0);
  }, [weeklySchedule]);

  const urgentAlerts = useMemo(() => {
    return alerts.filter(alert => alert.urgent);
  }, [alerts]);

  return {
    stats,
    weeklyEarnings,
    weeklySchedule,
    serviceMetrics,
    stockItems,
    urgentStockItems,
    kpiMetrics,
    alerts,
    urgentAlerts,
    totalConflicts,
    isNewUser,
    loading
  };
};
