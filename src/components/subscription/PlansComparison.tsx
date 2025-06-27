
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Crown, Zap, Star } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PlansComparisonProps {
  currentPlan?: string;
  onUpgrade?: (planId: string) => void;
}

const planData = [
  {
    id: 'free',
    name: 'Gratuito / Teste',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    price: 'Grátis',
    period: '7 dias'
  },
  {
    id: 'professional',
    name: 'Profissional',
    icon: Star,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    price: 'R$ 59',
    period: 'mês'
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Crown,
    color: 'text-gold-600',
    bgColor: 'bg-yellow-50',
    price: 'R$ 99',
    period: 'mês'
  }
];

const features = [
  {
    name: 'Clientes cadastrados',
    free: '1',
    professional: '20',
    premium: 'Ilimitado'
  },
  {
    name: 'Chamados mensais',
    free: '5',
    professional: '40',
    premium: 'Ilimitado'
  },
  {
    name: 'Equipamentos por cliente',
    free: '1',
    professional: '10',
    premium: 'Ilimitado'
  },
  {
    name: 'Exportação de PDF de OS',
    free: false,
    professional: true,
    premium: true
  },
  {
    name: 'Suporte prioritário',
    free: false,
    professional: 'Email',
    premium: 'WhatsApp'
  },
  {
    name: 'Acesso a comissões detalhadas',
    free: false,
    professional: true,
    premium: true
  },
  {
    name: 'Lançar loja de peças',
    free: false,
    professional: true,
    premium: 'Com analytics'
  },
  {
    name: 'Comissão do app',
    free: '10%',
    professional: '8%',
    premium: '5%'
  }
];

const PlansComparison: React.FC<PlansComparisonProps> = ({ 
  currentPlan = 'free', 
  onUpgrade 
}) => {
  const renderFeatureValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-400 mx-auto" />
      );
    }
    return <span className="text-sm text-center">{value}</span>;
  };

  return (
    <Card className="border-2 border-gray-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-center text-tech-primary">
          Comparativo de Planos
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-gray-700">Recurso</TableHead>
              {planData.map((plan) => {
                const Icon = plan.icon;
                const isCurrentPlan = plan.id === currentPlan;
                
                return (
                  <TableHead key={plan.id} className="text-center">
                    <div className={`p-4 rounded-lg ${plan.bgColor} relative`}>
                      {isCurrentPlan && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-success text-white text-xs">
                          Atual
                        </Badge>
                      )}
                      <div className="flex flex-col items-center space-y-2">
                        <Icon className={`h-6 w-6 ${plan.color}`} />
                        <div className="text-sm font-semibold">{plan.name}</div>
                        <div className="text-lg font-bold text-tech-primary">
                          {plan.price}
                        </div>
                        <div className="text-xs text-gray-500">
                          {plan.price === 'Grátis' ? plan.period : `por ${plan.period}`}
                        </div>
                      </div>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {features.map((feature, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-700">
                  {feature.name}
                </TableCell>
                <TableCell className="text-center">
                  {renderFeatureValue(feature.free)}
                </TableCell>
                <TableCell className="text-center">
                  {renderFeatureValue(feature.professional)}
                </TableCell>
                <TableCell className="text-center">
                  {renderFeatureValue(feature.premium)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Botões de ação */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {planData.map((plan) => {
            const isCurrentPlan = plan.id === currentPlan;
            
            return (
              <Button
                key={plan.id}
                onClick={() => !isCurrentPlan && onUpgrade && onUpgrade(plan.id)}
                variant={isCurrentPlan ? 'outline' : 'default'}
                className="w-full"
                disabled={isCurrentPlan || plan.id === 'free'}
              >
                {isCurrentPlan ? 'Plano Ativo' : plan.id === 'free' ? 'Teste Grátis' : 'Selecionar Plano'}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlansComparison;
