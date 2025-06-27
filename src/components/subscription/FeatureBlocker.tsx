
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Crown, Star, Zap } from 'lucide-react';

interface FeatureBlockerProps {
  feature: string;
  requiredPlan: 'basic' | 'professional' | 'corporate';
  onUpgrade?: () => void;
  children?: React.ReactNode;
}

const planInfo = {
  basic: {
    name: 'Básico',
    icon: Zap,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  professional: {
    name: 'Profissional',
    icon: Star,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  corporate: {
    name: 'Corporativo',
    icon: Crown,
    color: 'text-gold-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  }
};

const FeatureBlocker: React.FC<FeatureBlockerProps> = ({
  feature,
  requiredPlan,
  onUpgrade,
  children
}) => {
  const plan = planInfo[requiredPlan];
  const Icon = plan.icon;

  return (
    <Card className={`${plan.bgColor} ${plan.borderColor} border-2`}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className={`p-4 rounded-full ${plan.bgColor} ${plan.borderColor} border-2`}>
              <Icon className={`h-8 w-8 ${plan.color}`} />
            </div>
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm">
              <Lock className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
        
        <CardTitle className="text-lg font-bold text-gray-800">
          Recurso Exclusivo
        </CardTitle>
        
        <p className="text-sm text-gray-600 mt-2">
          Esta funcionalidade está disponível no 
          <span className={`font-semibold ${plan.color} mx-1`}>
            Plano {plan.name}
          </span>
        </p>
      </CardHeader>

      <CardContent className="text-center space-y-4">
        {children && (
          <div className="text-sm text-gray-600">
            {children}
          </div>
        )}
        
        <Button 
          onClick={onUpgrade}
          className={`w-full bg-tech-primary hover:bg-tech-primary-hover text-white`}
        >
          Fazer Upgrade Agora
        </Button>
        
        <p className="text-xs text-gray-500">
          Desbloqueie este recurso e muito mais
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureBlocker;
