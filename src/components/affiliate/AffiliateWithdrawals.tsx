import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/format';
import { AffiliateWithdrawal, AffiliateStats } from '@/types/affiliate';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DollarSign, Download } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AffiliateWithdrawalsProps {
  withdrawals: AffiliateWithdrawal[];
  stats: AffiliateStats;
  onRequestWithdrawal: (amount: number, paymentDetails: any) => Promise<boolean>;
}

export const AffiliateWithdrawals: React.FC<AffiliateWithdrawalsProps> = ({
  withdrawals,
  stats,
  onRequestWithdrawal
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [pixKeyType, setPixKeyType] = useState('cpf');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const minWithdrawAmount = 50; // R$ 50 mínimo

  const handleWithdrawal = async () => {
    const withdrawAmount = parseFloat(amount);
    
    if (withdrawAmount < minWithdrawAmount) {
      return;
    }

    if (withdrawAmount > stats.pendingCommission) {
      return;
    }

    if (!pixKey.trim()) {
      return;
    }

    setIsLoading(true);
    
    const paymentDetails = {
      pix_key: pixKey,
      pix_key_type: pixKeyType,
    };

    const success = await onRequestWithdrawal(withdrawAmount, paymentDetails);
    
    if (success) {
      setAmount('');
      setPixKey('');
      setIsDialogOpen(false);
    }
    
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-100 text-green-800';
      case 'processando':
        return 'bg-blue-100 text-blue-800';
      case 'solicitado':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pago':
        return 'Pago';
      case 'processando':
        return 'Processando';
      case 'solicitado':
        return 'Solicitado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={cn(
            "font-bold text-gray-900",
            isMobile ? "text-xl" : "text-2xl"
          )}>
            Saques e Comissões
          </h2>
          <p className="text-gray-600">Gerencie suas solicitações de saque</p>
        </div>
      </div>

      {/* Resumo de Comissões */}
      <div className={cn(
        "grid gap-4",
        isMobile ? "grid-cols-1" : "grid-cols-3"
      )}>
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-800 text-sm">Disponível para Saque</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-900">
              {formatCurrency(stats.pendingCommission)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-800 text-sm">Total Recebido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-900">
              {formatCurrency(stats.paidCommission)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-800 text-sm">Comissão Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-900">
              {formatCurrency(stats.totalCommission)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Botão de Saque */}
      <div className="flex justify-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg"
              disabled={stats.pendingCommission < minWithdrawAmount}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Solicitar Saque
            </Button>
          </DialogTrigger>
          <DialogContent className={cn(isMobile ? "w-[95%]" : "")}>
            <DialogHeader>
              <DialogTitle>Solicitar Saque</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Valor do Saque</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Ex: 100.00"
                  max={stats.pendingCommission}
                  min={minWithdrawAmount}
                />
                <p className="text-xs text-gray-500">
                  Valor mínimo: {formatCurrency(minWithdrawAmount)} | 
                  Disponível: {formatCurrency(stats.pendingCommission)}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Chave PIX</Label>
                <Input
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="Digite sua chave PIX"
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo da Chave</Label>
                <select 
                  value={pixKeyType} 
                  onChange={(e) => setPixKeyType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="cpf">CPF</option>
                  <option value="email">E-mail</option>
                  <option value="telefone">Telefone</option>
                  <option value="aleatoria">Chave Aleatória</option>
                </select>
              </div>

              <Button 
                onClick={handleWithdrawal}
                disabled={isLoading || !amount || !pixKey || parseFloat(amount) < minWithdrawAmount}
                className="w-full"
              >
                {isLoading ? 'Processando...' : 'Confirmar Solicitação'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Histórico de Saques */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Saques</CardTitle>
        </CardHeader>
        <CardContent>
          {withdrawals.length === 0 ? (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum saque solicitado ainda</p>
            </div>
          ) : isMobile ? (
            <div className="space-y-4">
              {withdrawals.map((withdrawal) => (
                <div key={withdrawal.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">
                      {formatCurrency(withdrawal.amount)}
                    </span>
                    <Badge className={getStatusColor(withdrawal.status)}>
                      {getStatusText(withdrawal.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>PIX: {withdrawal.payment_details?.pix_key}</div>
                    <div>
                      {format(new Date(withdrawal.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Processado em</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell className="font-medium">
                      {formatCurrency(withdrawal.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(withdrawal.status)}>
                        {getStatusText(withdrawal.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>{withdrawal.payment_method.toUpperCase()}</div>
                        {withdrawal.payment_details?.pix_key && (
                          <div className="text-xs text-gray-500">
                            {withdrawal.payment_details.pix_key}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(withdrawal.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      {withdrawal.processed_at 
                        ? format(new Date(withdrawal.processed_at), 'dd/MM/yyyy', { locale: ptBR })
                        : '-'
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};