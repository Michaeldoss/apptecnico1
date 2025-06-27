
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import CurrentPlanStatus from '@/components/subscription/CurrentPlanStatus';
import CommissionSummary from '@/components/subscription/CommissionSummary';
import PlansComparison from '@/components/subscription/PlansComparison';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';

const TechnicianSubscription = () => {
  const { subscription, loading, upgradePlan, checkLimit } = useSubscription();
  const { toast } = useToast();

  const handleUpgrade = (planId: string) => {
    console.log('Upgrade para plano:', planId);
    
    if (planId === 'basic' || planId === 'professional' || planId === 'premium') {
      upgradePlan(planId);
      
      toast({
        title: "Plano atualizado!",
        description: `Você agora está no plano ${planId}. Aproveite as novas funcionalidades!`,
      });
    }
  };

  // Verificar se deve mostrar alerta de limite
  const shouldShowServiceCallAlert = () => {
    if (!subscription) return false;
    return subscription.planType === 'free' && !checkLimit('serviceCalls');
  };

  if (loading) {
    return (
      <TechnicianLayout title="Planos">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tech-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando informações do plano...</p>
          </div>
        </div>
      </TechnicianLayout>
    );
  }

  return (
    <TechnicianLayout title="Gerenciar Planos">
      <div className="space-y-6">
        {/* Alerta de limite atingido */}
        {shouldShowServiceCallAlert() && (
          <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-yellow-700 text-lg">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-black">
                  Você atingiu o limite de chamados do seu plano. Faça upgrade para continuar usando todos os recursos.
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-light border border-gray-border">
            <TabsTrigger 
              value="current"
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Plano Atual
            </TabsTrigger>
            <TabsTrigger 
              value="comparison"
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              🪙 Todos os Planos
            </TabsTrigger>
            <TabsTrigger 
              value="plans"
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Upgrade
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-6 space-y-6">
            {subscription && (
              <>
                <CurrentPlanStatus
                  planName={subscription.planName}
                  planType={subscription.planType}
                  expiresAt={subscription.expiresAt}
                  daysRemaining={subscription.daysRemaining}
                  limits={subscription.limits}
                  onUpgrade={() => {
                    // Trocar para aba de upgrade
                    const upgradeTab = document.querySelector('[value="plans"]') as HTMLButtonElement;
                    upgradeTab?.click();
                  }}
                />
                
                <CommissionSummary commissions={subscription.commissions} />
              </>
            )}
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <PlansComparison
              currentPlan={subscription?.planType}
              onUpgrade={handleUpgrade}
            />
          </TabsContent>

          <TabsContent value="plans" className="mt-6">
            <SubscriptionPlans
              currentPlan={subscription?.planType}
              onUpgrade={handleUpgrade}
            />
          </TabsContent>
        </Tabs>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianSubscription;
