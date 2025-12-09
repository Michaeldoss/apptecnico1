
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PlanLimits {
  clients: { current: number; max: number };
  serviceCalls: { current: number; max: number };
  equipment: { current: number; max: number };
}

interface CommissionData {
  servicesCompleted: number;
  appCommission: number;
  availableBalance: number;
  commissionRate: number;
}

interface Plan {
  id: string;
  nome: string;
  descricao: string;
  preco_mensal: number;
  preco_anual: number | null;
  limite_servicos: number | null;
  limite_usuarios: number | null;
  caracteristicas: string[];
}

interface SubscriptionData {
  planType: 'free' | 'basic' | 'professional' | 'premium';
  planName: string;
  planId: string | null;
  expiresAt?: string;
  daysRemaining?: number;
  limits: PlanLimits;
  commissions: CommissionData;
}

const planTypeMapping: Record<string, 'free' | 'basic' | 'professional' | 'premium'> = {
  'Gratuito': 'free',
  'Básico': 'basic',
  'Profissional': 'professional',
  'Corporativo': 'premium'
};

const commissionRates = {
  free: 0.10,
  basic: 0.08,
  professional: 0.08,
  premium: 0.05
};

export const useSubscription = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    const { data, error } = await supabase
      .from('planos')
      .select('*')
      .eq('ativo', true)
      .order('preco_mensal');

    if (error) {
      console.error('Erro ao buscar planos:', error);
      return [];
    }

    return data.map(plan => ({
      ...plan,
      caracteristicas: Array.isArray(plan.caracteristicas) ? plan.caracteristicas : []
    })) as Plan[];
  };

  const fetchUserSubscription = async (userId: string) => {
    const { data, error } = await supabase
      .from('planos_contratados')
      .select(`
        *,
        planos:plano_id (*)
      `)
      .eq('usuario_id', userId)
      .eq('status', 'ativo')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Erro ao buscar assinatura:', error);
      return null;
    }

    return data;
  };

  const fetchUserStats = async (userId: string) => {
    // Buscar contagem de clientes (ordens de serviço únicas)
    const { count: clientsCount } = await supabase
      .from('ordens_servico')
      .select('cliente_id', { count: 'exact', head: true })
      .eq('tecnico_id', userId);

    // Buscar contagem de chamados do mês
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: serviceCallsCount } = await supabase
      .from('ordens_servico')
      .select('*', { count: 'exact', head: true })
      .eq('tecnico_id', userId)
      .gte('created_at', startOfMonth.toISOString());

    // Buscar contagem de peças/equipamentos
    const { count: equipmentCount } = await supabase
      .from('pecas')
      .select('*', { count: 'exact', head: true })
      .eq('tecnico_id', userId);

    return {
      clients: clientsCount || 0,
      serviceCalls: serviceCallsCount || 0,
      equipment: equipmentCount || 0
    };
  };

  useEffect(() => {
    const loadSubscriptionData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const [plansData, userSub, stats] = await Promise.all([
          fetchPlans(),
          fetchUserSubscription(user.id),
          fetchUserStats(user.id)
        ]);

        setPlans(plansData);

        let planType: 'free' | 'basic' | 'professional' | 'premium' = 'free';
        let planName = 'Gratuito / Teste';
        let planId: string | null = null;
        let expiresAt: string | undefined;
        let daysRemaining: number | undefined;
        let limiteServicos = 5;
        let limiteClientes = 1;

        if (userSub && userSub.planos) {
          const planData = userSub.planos as Plan;
          planType = planTypeMapping[planData.nome] || 'free';
          planName = planData.nome;
          planId = planData.id;
          limiteServicos = planData.limite_servicos || -1;
          limiteClientes = planData.limite_usuarios || 1;

          if (userSub.data_fim) {
            expiresAt = userSub.data_fim;
            const endDate = new Date(userSub.data_fim);
            const today = new Date();
            daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          }
        } else {
          // Plano gratuito padrão (7 dias de teste)
          const trialEnd = new Date();
          trialEnd.setDate(trialEnd.getDate() + 7);
          expiresAt = trialEnd.toISOString();
          daysRemaining = 7;
        }

        const subscriptionData: SubscriptionData = {
          planType,
          planName,
          planId,
          expiresAt,
          daysRemaining,
          limits: {
            clients: { current: stats.clients, max: limiteClientes === -1 ? -1 : limiteClientes * 10 },
            serviceCalls: { current: stats.serviceCalls, max: limiteServicos },
            equipment: { current: stats.equipment, max: limiteServicos === -1 ? -1 : 10 }
          },
          commissions: {
            servicesCompleted: 0,
            appCommission: 0,
            availableBalance: 0,
            commissionRate: commissionRates[planType]
          }
        };

        setSubscription(subscriptionData);
      } catch (error) {
        console.error('Erro ao carregar dados de assinatura:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptionData();
  }, [user]);

  const checkPermission = (feature: string): boolean => {
    if (!subscription) return false;

    const { planType } = subscription;

    switch (feature) {
      case 'pdf_export':
        return planType !== 'free';
      case 'full_history':
        return planType === 'professional' || planType === 'premium';
      case 'parts_control':
        return planType !== 'free';
      case 'advanced_parts':
        return planType === 'professional' || planType === 'premium';
      case 'digital_signature':
        return planType === 'professional' || planType === 'premium';
      case 'advanced_reports':
        return planType === 'professional' || planType === 'premium';
      case 'team_access':
        return planType === 'premium';
      case 'multi_company':
        return planType === 'premium';
      case 'priority_support':
        return planType !== 'free';
      case 'parts_store':
        return planType !== 'free';
      case 'analytics':
        return planType === 'premium';
      default:
        return true;
    }
  };

  const checkLimit = (type: 'clients' | 'serviceCalls' | 'equipment'): boolean => {
    if (!subscription) return false;

    const limit = subscription.limits[type];
    return limit.max === -1 || limit.current < limit.max;
  };

  const getRequiredPlan = (feature: string): 'basic' | 'professional' | 'premium' => {
    switch (feature) {
      case 'pdf_export':
      case 'parts_control':
      case 'parts_store':
        return 'basic';
      case 'full_history':
      case 'advanced_parts':
      case 'digital_signature':
      case 'advanced_reports':
        return 'professional';
      case 'team_access':
      case 'multi_company':
      case 'analytics':
        return 'premium';
      default:
        return 'basic';
    }
  };

  const upgradePlan = async (planName: string, paymentMethod: string = 'pix') => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Você precisa estar logado para fazer upgrade.'
      });
      return false;
    }

    try {
      // Buscar o plano pelo nome mapeado
      const planNameMap: Record<string, string> = {
        'basic': 'Básico',
        'professional': 'Profissional',
        'premium': 'Corporativo'
      };

      const targetPlanName = planNameMap[planName] || planName;

      const { data: planData, error: planError } = await supabase
        .from('planos')
        .select('*')
        .eq('nome', targetPlanName)
        .eq('ativo', true)
        .single();

      if (planError || !planData) {
        throw new Error('Plano não encontrado');
      }

      // Calcular data de fim (30 dias)
      const dataInicio = new Date();
      const dataFim = new Date();
      dataFim.setDate(dataFim.getDate() + 30);

      // Buscar tipo de usuário
      const { data: userData } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('id', user.id)
        .single();

      // Desativar plano anterior se existir
      await supabase
        .from('planos_contratados')
        .update({ status: 'cancelado' })
        .eq('usuario_id', user.id)
        .eq('status', 'ativo');

      // Criar novo plano contratado
      const { error: insertError } = await supabase
        .from('planos_contratados')
        .insert({
          plano_id: planData.id,
          usuario_id: user.id,
          usuario_tipo: userData?.tipo_usuario || 'tecnico',
          data_inicio: dataInicio.toISOString(),
          data_fim: dataFim.toISOString(),
          valor_pago: planData.preco_mensal,
          forma_pagamento: paymentMethod,
          status: 'ativo'
        });

      if (insertError) {
        throw insertError;
      }

      // Atualizar estado local
      const planType = planTypeMapping[planData.nome] || 'free';
      
      setSubscription(prev => prev ? {
        ...prev,
        planType,
        planName: planData.nome,
        planId: planData.id,
        expiresAt: dataFim.toISOString(),
        daysRemaining: 30,
        limits: {
          ...prev.limits,
          serviceCalls: { ...prev.limits.serviceCalls, max: planData.limite_servicos || -1 },
          clients: { ...prev.limits.clients, max: (planData.limite_usuarios || 1) * 10 }
        },
        commissions: {
          ...prev.commissions,
          commissionRate: commissionRates[planType]
        }
      } : null);

      toast({
        title: 'Upgrade realizado!',
        description: `Você agora está no plano ${planData.nome}.`
      });

      return true;
    } catch (error) {
      console.error('Erro ao fazer upgrade:', error);
      toast({
        variant: 'destructive',
        title: 'Erro no upgrade',
        description: 'Não foi possível processar o upgrade. Tente novamente.'
      });
      return false;
    }
  };

  return {
    subscription,
    plans,
    loading,
    checkPermission,
    checkLimit,
    getRequiredPlan,
    upgradePlan
  };
};
