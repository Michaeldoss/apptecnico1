import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Transacao } from '@/types/payment';
import { Clock, CheckCircle, XCircle, AlertTriangle, CreditCard } from 'lucide-react';

interface TransacaoCardProps {
  transacao: Transacao;
  onLiberar?: (id: string) => void;
  isLoading?: boolean;
  showActions?: boolean;
}

const TransacaoCard: React.FC<TransacaoCardProps> = ({ 
  transacao, 
  onLiberar, 
  isLoading = false,
  showActions = true 
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'retido':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'liberado':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'falhado':
      case 'cancelado':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'retido':
        return 'Retido';
      case 'liberado':
        return 'Liberado';
      case 'falhado':
        return 'Falhado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'retido':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'liberado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'falhado':
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMeioPagamentoText = (meio: string) => {
    switch (meio) {
      case 'pix':
        return 'PIX';
      case 'boleto':
        return 'Boleto';
      case 'cartao_credito':
        return 'Cartão de Crédito';
      case 'cartao_debito':
        return 'Cartão de Débito';
      default:
        return meio;
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const podeLiberar = transacao.status === 'retido' && showActions && onLiberar;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Serviço #{transacao.servico_id.slice(-6)}
          </CardTitle>
          <Badge className={getStatusColor(transacao.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(transacao.status)}
              {getStatusText(transacao.status)}
            </div>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Valor</p>
            <p className="font-semibold text-lg text-green-600">
              {formatarValor(transacao.valor_total)}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Meio de Pagamento</p>
            <div className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              <p className="font-medium">{getMeioPagamentoText(transacao.meio_pagamento)}</p>
            </div>
          </div>
        </div>

        {transacao.data_pagamento && (
          <div>
            <p className="text-gray-600 text-sm">Data do Pagamento</p>
            <p className="font-medium">{formatarData(transacao.data_pagamento)}</p>
          </div>
        )}

        {transacao.data_liberacao && (
          <div>
            <p className="text-gray-600 text-sm">
              {transacao.status === 'liberado' ? 'Liberado em' : 'Liberação prevista'}
            </p>
            <p className="font-medium">{formatarData(transacao.data_liberacao)}</p>
          </div>
        )}

        {transacao.status === 'retido' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              💰 Valor retido com segurança. Será liberado automaticamente em até 24h após o pagamento 
              ou quando o serviço for confirmado como concluído.
            </p>
          </div>
        )}

        {podeLiberar && (
          <div className="pt-2">
            <Button 
              onClick={() => onLiberar(transacao.id)}
              disabled={isLoading}
              className="w-full"
              variant="default"
            >
              {isLoading ? 'Liberando...' : 'Liberar Pagamento'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransacaoCard;