
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

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

interface SubscriptionData {
  planType: 'free' | 'basic' | 'professional' | 'premium';
  planName: string;
  expiresAt?: string;
  daysRemaining?: number;
  limits: PlanLimits;
  commissions: CommissionData;
}

const defaultLimits = {
  free: {
    clients: { max: 1 },
    serviceCalls: { max: 5 },
    equipment: { max: 1 }
  },
  basic: {
    clients: { max: 10 },
    serviceCalls: { max: 30 },
    equipment: { max: 10 }
  },
  professional: {
    clients: { max: 20 },
    serviceCalls: { max: 40 },
    equipment: { max: 10 }
  },
  premium: {
    clients: { max: -1 }, // ilimitado
    serviceCalls: { max: -1 },
    equipment: { max: -1 }
  }
};

const commissionRates = {
  free: 0.10, // 10%
  basic: 0.08, // 8%
  professional: 0.08, // 8%
  premium: 0.05 // 5%
};

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscriptionData = async () => {
      try {
        // Simular dados de assinatura - em produção, buscar do backend
        const mockSubscription: SubscriptionData = {
          planType: 'free',
          planName: 'Gratuito / Teste',
          expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias
          daysRemaining: 3,
          limits: {
            clients: { current: 1, max: defaultLimits.free.clients.max },
            serviceCalls: { current: 3, max: defaultLimits.free.serviceCalls.max },
            equipment: { current: 1, max: defaultLimits.free.equipment.max }
          },
          commissions: {
            servicesCompleted: 4500,
            appCommission: 450,
            availableBalance: 4050,
            commissionRate: commissionRates.free
          }
        };

        setSubscription(mockSubscription);
      } catch (error) {
        console.error('Erro ao carregar dados de assinatura:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadSubscriptionData();
    }
  }, [user]);

  const checkPermission = (feature: string): boolean => {
    if (!subscription) return false;

    const { planType, limits } = subscription;

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

  const upgradePlan = (newPlanType: 'basic' | 'professional' | 'premium') => {
    if (!subscription) return;

    const planNames = {
      basic: 'Básico',
      professional: 'Profissional',
      premium: 'Premium'
    };

    const newLimits = defaultLimits[newPlanType];
    const newCommissionRate = commissionRates[newPlanType];
    
    setSubscription({
      ...subscription,
      planType: newPlanType,
      planName: planNames[newPlanType],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
      daysRemaining: 30,
      limits: {
        clients: { current: subscription.limits.clients.current, max: newLimits.clients.max },
        serviceCalls: { current: subscription.limits.serviceCalls.current, max: newLimits.serviceCalls.max },
        equipment: { current: subscription.limits.equipment.current, max: newLimits.equipment.max }
      },
      commissions: {
        ...subscription.commissions,
        commissionRate: newCommissionRate
      }
    });
  };

  return {
    subscription,
    loading,
    checkPermission,
    checkLimit,
    getRequiredPlan,
    upgradePlan
  };
};
