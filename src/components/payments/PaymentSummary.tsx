
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Users, 
  Star,
  Download,
  TrendingUp
} from 'lucide-react';
import { PaymentSummary } from '@/types/payment';

interface PaymentSummaryProps {
  summary: PaymentSummary;
  onWithdraw: (amount: number) => void;
  isLoading: boolean;
}

const PaymentSummaryComponent: React.FC<PaymentSummaryProps> = ({
  summary,
  onWithdraw,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Disponível para Saque</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {summary.totalReleased.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Pronto para transferência
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aguardando Liberação</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              R$ {summary.totalRetained.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Será liberado em breve
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              R$ {summary.monthlyEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ticket médio: R$ {summary.averageTicket.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {summary.satisfactionRate.toFixed(1)} ⭐
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.completedServices} serviços concluídos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ações rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Ações Financeiras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => onWithdraw(summary.totalReleased)}
              disabled={summary.totalReleased <= 0 || isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? 'Processando...' : 'Sacar Tudo Disponível'}
            </Button>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Extrato
            </Button>
            
            <Button variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Ver Comprovantes
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              💡 Próximos Pagamentos Estimados
            </h4>
            <p className="text-sm text-blue-700">
              R$ {summary.pendingRelease.toFixed(2)} serão liberados nos próximos 2 dias, 
              após confirmação dos clientes ou prazo automático.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Métricas adicionais */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Serviços Concluídos</p>
                <p className="text-2xl font-bold">{summary.completedServices}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clientes Atendidos</p>
                <p className="text-2xl font-bold">{summary.clientsServed}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Aprovação</p>
                <p className="text-2xl font-bold">98%</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Excelente</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSummaryComponent;
