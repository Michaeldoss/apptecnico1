
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, FileText, Wrench, AlertTriangle, Crown } from 'lucide-react';

interface PlanLimits {
  clients: { current: number; max: number };
  serviceCalls: { current: number; max: number };
  equipment: { current: number; max: number };
}

interface CurrentPlanStatusProps {
  planName: string;
  planType: 'free' | 'basic' | 'professional' | 'corporate';
  expiresAt?: string;
  daysRemaining?: number;
  limits?: PlanLimits;
  onUpgrade?: () => void;
}

const planIcons = {
  free: AlertTriangle,
  basic: Users,
  professional: Wrench,
  corporate: Crown
};

const planColors = {
  free: 'bg-yellow-500',
  basic: 'bg-blue-500',
  professional: 'bg-purple-500',
  corporate: 'bg-gold-500'
};

const CurrentPlanStatus: React.FC<CurrentPlanStatusProps> = ({
  planName,
  planType,
  expiresAt,
  daysRemaining,
  limits,
  onUpgrade
}) => {
  const Icon = planIcons[planType];
  const colorClass = planColors[planType];
  
  const getProgressColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="border-2 border-gray-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${colorClass}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">Plano Atual</CardTitle>
            <Badge variant="outline" className="mt-1">
              {planName}
            </Badge>
          </div>
        </div>
        
        {planType !== 'corporate' && (
          <Button onClick={onUpgrade} size="sm" className="bg-tech-primary hover:bg-tech-primary-hover">
            Fazer Upgrade
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Informações de expiração */}
        {expiresAt && daysRemaining !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">
                {planType === 'free' ? 'Teste expira em:' : 'Próxima renovação:'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {formatDate(expiresAt)}
              </span>
              <Badge variant={daysRemaining <= 3 ? 'destructive' : 'outline'}>
                {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
              </Badge>
            </div>
          </div>
        )}

        {/* Limites de uso */}
        {limits && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Uso atual</h4>
            
            {/* Clientes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Clientes</span>
                </div>
                <span className="text-sm font-medium">
                  {limits.clients.current}/{limits.clients.max}
                </span>
              </div>
              <Progress 
                value={(limits.clients.current / limits.clients.max) * 100} 
                className="h-2"
              />
            </div>

            {/* Chamados */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Chamados</span>
                </div>
                <span className="text-sm font-medium">
                  {limits.serviceCalls.current}/{limits.serviceCalls.max === -1 ? '∞' : limits.serviceCalls.max}
                </span>
              </div>
              {limits.serviceCalls.max !== -1 && (
                <Progress 
                  value={(limits.serviceCalls.current / limits.serviceCalls.max) * 100} 
                  className="h-2"
                />
              )}
            </div>

            {/* Equipamentos */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Equipamentos</span>
                </div>
                <span className="text-sm font-medium">
                  {limits.equipment.current}/{limits.equipment.max === -1 ? '∞' : limits.equipment.max}
                </span>
              </div>
              {limits.equipment.max !== -1 && (
                <Progress 
                  value={(limits.equipment.current / limits.equipment.max) * 100} 
                  className="h-2"
                />
              )}
            </div>
          </div>
        )}

        {/* Alerta para plano gratuito */}
        {planType === 'free' && daysRemaining && daysRemaining <= 3 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Seu teste expira em {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
              </span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Faça upgrade para continuar usando todas as funcionalidades.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentPlanStatus;
