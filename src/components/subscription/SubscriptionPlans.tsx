
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Crown, Zap, Star, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PaymentForm from '@/components/services/PaymentForm';
import { useToast } from '@/hooks/use-toast';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  icon: React.ElementType;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
  buttonVariant: 'default' | 'outline' | 'destructive';
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Gratuito / Teste',
    price: 0,
    period: '7 dias',
    description: 'Ideal para experimentar a plataforma',
    icon: Zap,
    features: [
      { text: 'Cadastrar até 5 chamados', included: true },
      { text: '1 cliente', included: true },
      { text: '1 equipamento', included: true },
      { text: 'Sem acesso ao histórico completo', included: false },
      { text: 'Sem uso de OS em PDF', included: false },
      { text: 'Sem controle de peças ou estoque', included: false },
      { text: 'Acesso limitado à agenda (apenas semana atual)', included: false },
      { text: 'Exibe propaganda da plataforma', included: false },
    ],
    buttonText: 'Plano Atual',
    buttonVariant: 'outline'
  },
  {
    id: 'basic',
    name: 'Básico',
    price: 29,
    period: 'mês',
    description: 'Para técnicos iniciantes',
    icon: CheckCircle,
    features: [
      { text: 'Até 10 clientes', included: true },
      { text: 'Até 30 chamados por mês', included: true },
      { text: 'Cadastro de até 10 equipamentos por cliente', included: true },
      { text: 'Exportação de OS em PDF', included: true },
      { text: 'Histórico de OSs dos últimos 30 dias', included: true },
      { text: 'Controle de peças simples', included: true },
      { text: 'Acesso completo à agenda', included: true },
      { text: 'Suporte por e-mail', included: true },
    ],
    buttonText: 'Fazer Upgrade',
    buttonVariant: 'default'
  },
  {
    id: 'professional',
    name: 'Profissional',
    price: 59,
    period: 'mês',
    description: 'Para técnicos experientes',
    icon: Star,
    popular: true,
    features: [
      { text: 'Clientes e chamados ilimitados', included: true },
      { text: 'Cadastro completo de equipamentos', included: true },
      { text: 'Histórico completo de todos os atendimentos', included: true },
      { text: 'Controle completo de peças (custo, markup, estoque)', included: true },
      { text: 'Criação de OS com assinatura digital', included: true },
      { text: 'Exportação de relatórios em Excel/PDF', included: true },
      { text: 'Dashboards avançados (faturamento, estatísticas)', included: true },
      { text: 'Suporte via WhatsApp', included: true },
    ],
    buttonText: 'Fazer Upgrade',
    buttonVariant: 'default'
  },
  {
    id: 'corporate',
    name: 'Corporativo',
    price: 99,
    period: 'mês',
    description: 'Para empresas e equipes',
    icon: Crown,
    features: [
      { text: 'Todas as funcionalidades do Plano Profissional', included: true },
      { text: 'Equipe de técnicos (até 5 usuários)', included: true },
      { text: 'Acesso multiempresa', included: true },
      { text: 'Dashboard unificado por CNPJ', included: true },
      { text: 'Integração com sistemas de nota fiscal, e-mail, CRM', included: true },
      { text: 'Prioridade no suporte', included: true },
      { text: 'Personalização de logo e marca nas OSs', included: true },
    ],
    buttonText: 'Fazer Upgrade',
    buttonVariant: 'default'
  }
];

interface SubscriptionPlansProps {
  currentPlan?: string;
  onUpgrade?: (planId: string) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  currentPlan = 'free', 
  onUpgrade 
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleUpgrade = (planId: string) => {
    if (planId === 'free' || planId === currentPlan) return;
    
    setSelectedPlan(planId);
    setIsPaymentOpen(true);
  };

  const handlePaymentSubmit = async (method: string) => {
    if (!selectedPlan || !onUpgrade) return;
    
    setIsProcessing(true);
    
    try {
      // Chamar função de upgrade passando o plano e método de pagamento
      await onUpgrade(selectedPlan);
      setIsPaymentOpen(false);
      setSelectedPlan(null);
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast({
        variant: 'destructive',
        title: 'Erro no pagamento',
        description: 'Não foi possível processar o pagamento. Tente novamente.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-tech-primary">Escolha seu Plano</h2>
        <p className="text-gray-secondary">Selecione o plano que melhor atende suas necessidades</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = plan.id === currentPlan;
          
          return (
            <Card 
              key={plan.id} 
              className={`relative border-2 transition-all duration-200 hover:shadow-lg ${
                plan.popular 
                  ? 'border-tech-primary shadow-lg' 
                  : isCurrentPlan 
                    ? 'border-success bg-success-light' 
                    : 'border-gray-border hover:border-tech-primary'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-tech-primary text-white">
                  Mais Popular
                </Badge>
              )}
              
              {isCurrentPlan && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-success text-white">
                  Plano Atual
                </Badge>
              )}

              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className={`p-3 rounded-full ${
                    isCurrentPlan ? 'bg-success' : 'bg-tech-primary'
                  }`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </div>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-tech-primary">
                    {plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}
                  </div>
                  <div className="text-sm text-gray-secondary">
                    {plan.price === 0 ? plan.period : `por ${plan.period}`}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleUpgrade(plan.id)}
                  variant={isCurrentPlan ? 'outline' : plan.buttonVariant}
                  className="w-full"
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Plano Atual' : plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Finalizar Upgrade - {plans.find(p => p.id === selectedPlan)?.name}
            </DialogTitle>
          </DialogHeader>
          <PaymentForm onSubmit={handlePaymentSubmit} />
          {isProcessing && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionPlans;
