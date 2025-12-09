
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import CurrentPlanStatus from '@/components/subscription/CurrentPlanStatus';
import CommissionSummary from '@/components/subscription/CommissionSummary';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';

const TechnicianSubscription = () => {
  const { subscription, loading, upgradePlan, checkLimit } = useSubscription();
  const { toast } = useToast();

  const handleUpgrade = async (planId: string) => {
    console.log('Upgrade para plano:', planId);
    
    if (planId === 'basic' || planId === 'professional' || planId === 'premium') {
      await upgradePlan(planId);
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
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header com gradiente */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary via-primary-dark to-primary p-8 mb-8 shadow-lg">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Escolha o Plano Ideal</h1>
            <p className="text-white/90">Encontre o plano perfeito para expandir seus negócios</p>
          </div>
        </div>

        {/* Alerta de limite atingido */}
        {shouldShowServiceCallAlert() && (
          <div className="p-5 bg-gradient-to-r from-warning/10 via-warning/5 to-transparent border-l-4 border-warning rounded-xl mb-6 shadow-sm animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <span className="text-warning text-xl">⚠️</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  Limite de chamados atingido
                </p>
                <p className="text-sm text-muted-foreground">
                  Você atingiu o limite de chamados do seu plano. Faça upgrade para continuar usando todos os recursos.
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card border border-border p-1 rounded-xl shadow-sm">
            <TabsTrigger 
              value="current"
              className="rounded-lg font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
            >
              Plano Atual
            </TabsTrigger>
            <TabsTrigger 
              value="plans"
              className="rounded-lg font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
            >
              Upgrade
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-8 space-y-6 animate-fade-in">
            {subscription && (
              <>
                <CurrentPlanStatus
                  planName={subscription.planName}
                  planType={subscription.planType}
                  expiresAt={subscription.expiresAt}
                  daysRemaining={subscription.daysRemaining}
                  limits={subscription.limits}
                  onUpgrade={() => {
                    const upgradeTab = document.querySelector('[value="plans"]') as HTMLButtonElement;
                    upgradeTab?.click();
                  }}
                />
                
                <CommissionSummary commissions={subscription.commissions} />
              </>
            )}
          </TabsContent>

          <TabsContent value="plans" className="mt-8 animate-fade-in">
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
