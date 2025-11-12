
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, FileText, Wrench, AlertTriangle, Crown } from 'lucide-react';

interface PlanLimits {
  clients: { current: number; max: number };
  serviceCalls: { current: number; max: number };
  equipment: { current: number; max: number };
}

interface CurrentPlanStatusProps {
  planName: string;
  planType: 'free' | 'basic' | 'professional' | 'premium';
  expiresAt?: string;
  daysRemaining?: number;
  limits?: PlanLimits;
  onUpgrade?: () => void;
}

const planIcons = {
  free: AlertTriangle,
  basic: Users,
  professional: Wrench,
  premium: Crown
};

const planColors = {
  free: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
  basic: 'bg-gradient-to-br from-blue-500 to-blue-700',
  professional: 'bg-gradient-to-br from-purple-500 to-purple-700',
  premium: 'bg-gradient-to-br from-accent to-orange-600'
};

const planBorderColors = {
  free: 'border-yellow-200',
  basic: 'border-blue-200',
  professional: 'border-purple-200',
  premium: 'border-accent/30'
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
  const borderClass = planBorderColors[planType];
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className={`border-2 ${borderClass} shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
      {/* Decorative gradient top bar */}
      <div className={`h-1.5 ${colorClass}`}></div>
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl ${colorClass} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Plano Atual</CardTitle>
            <Badge variant="outline" className="mt-1.5 font-semibold">
              {planName}
            </Badge>
          </div>
        </div>
        
        {planType !== 'premium' && (
          <Button 
            onClick={onUpgrade} 
            size="sm" 
            className="bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            ⚡ Fazer Upgrade
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Informações de expiração */}
        {expiresAt && daysRemaining !== undefined && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {planType === 'free' ? 'Teste expira em:' : 'Próxima renovação:'}
              </span>
            </div>
            <div className="flex items-center justify-between pl-2">
              <span className="text-sm font-medium text-muted-foreground">
                {formatDate(expiresAt)}
              </span>
              <Badge variant={daysRemaining <= 3 ? 'destructive' : 'outline'} className="font-semibold">
                {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
              </Badge>
            </div>
          </div>
        )}

        {/* Separador */}
        <div className="border-t border-border"></div>

        {/* Limites de uso */}
        {limits && (
          <div className="space-y-5">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              Detalhes do uso
            </h4>
            
            {/* Clientes */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50/50 to-transparent border border-blue-100 space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Users className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Clientes</span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {limits.clients.current}/{limits.clients.max === -1 ? '∞' : limits.clients.max}
                </span>
              </div>
              {limits.clients.max !== -1 && (
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-blue-100">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
                    style={{ width: `${(limits.clients.current / limits.clients.max) * 100}%` }}
                  />
                </div>
              )}
            </div>

            {/* Chamados */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50/50 to-transparent border border-purple-100 space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <FileText className="h-4 w-4 text-purple-600 flex-shrink-0" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Chamados</span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {limits.serviceCalls.current}/{limits.serviceCalls.max === -1 ? '∞' : limits.serviceCalls.max}
                </span>
              </div>
              {limits.serviceCalls.max !== -1 && (
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-purple-100">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 rounded-full"
                    style={{ width: `${(limits.serviceCalls.current / limits.serviceCalls.max) * 100}%` }}
                  />
                </div>
              )}
            </div>

            {/* Equipamentos */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-50/50 to-transparent border border-green-100 space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Wrench className="h-4 w-4 text-green-600 flex-shrink-0" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Equipamentos</span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {limits.equipment.current}/{limits.equipment.max === -1 ? '∞' : limits.equipment.max}
                </span>
              </div>
              {limits.equipment.max !== -1 && (
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-green-100">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 rounded-full"
                    style={{ width: `${(limits.equipment.current / limits.equipment.max) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Alerta para plano gratuito */}
        {planType === 'free' && daysRemaining && daysRemaining <= 3 && (
          <div className="p-4 bg-gradient-to-r from-warning/20 via-warning/10 to-transparent border-l-4 border-warning rounded-xl animate-pulse">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <span className="text-sm font-bold text-foreground block mb-1">
                  ⚠️ Seu plano gratuito expira em {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
                </span>
                <p className="text-xs text-muted-foreground">
                  Após esse prazo, seus recursos serão limitados. Faça upgrade para continuar.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentPlanStatus;
