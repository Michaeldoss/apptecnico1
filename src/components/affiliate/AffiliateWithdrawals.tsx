import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AffiliateWithdrawal, AffiliateStats } from '@/types/affiliate';
import { 
  Wallet, 
  CreditCard, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle,
  ArrowUpRight,
  PiggyBank,
  TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

interface AffiliateWithdrawalsProps {
  withdrawals: AffiliateWithdrawal[];
  stats: AffiliateStats | null;
  onRequestWithdrawal: (amount: number, paymentDetails: any) => Promise<boolean>;
}

export const AffiliateWithdrawals: React.FC<AffiliateWithdrawalsProps> = ({ 
  withdrawals, 
  stats, 
  onRequestWithdrawal 
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const minimumWithdraw = 50;
  const availableBalance = stats?.pendingCommission || 0;

  const handleWithdrawRequest = async () => {
    const amount = parseFloat(withdrawAmount);
    
    if (amount < minimumWithdraw) {
      toast({
        variant: "destructive",
        title: "Valor mínimo",
        description: `O valor mínimo para saque é R$ ${minimumWithdraw.toLocaleString()}.`
      });
      return;
    }

    if (amount > availableBalance) {
      toast({
        variant: "destructive",
        title: "Saldo insuficiente",
        description: "O valor solicitado é maior que seu saldo disponível."
      });
      return;
    }

    if (!pixKey.trim()) {
      toast({
        variant: "destructive",
        title: "Chave PIX obrigatória",
        description: "Informe sua chave PIX para receber o pagamento."
      });
      return;
    }

    setIsLoading(true);
    const success = await onRequestWithdrawal(amount, { pixKey });
    
    if (success) {
      setIsDialogOpen(false);
      setWithdrawAmount('');
      setPixKey('');
    }
    
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pago':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'processando':
        return <Clock className="h-4 w-4 text-blue-400" />;
      case 'cancelado':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'processando':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'cancelado':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  const totalWithdrawn = withdrawals
    .filter(w => w.status === 'pago')
    .reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="space-y-6">
      {/* Cards de Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-emerald-500/20 to-green-600/20 border-emerald-400/30 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-100">💰 Saldo Disponível</p>
                <p className="text-2xl font-bold">R$ {availableBalance.toLocaleString()}</p>
                <p className="text-xs text-emerald-200 mt-1">
                  Mín. saque: R$ {minimumWithdraw}
                </p>
              </div>
              <PiggyBank className="h-8 w-8 text-emerald-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-instalei-navy-500/20 to-blue-600/20 border-instalei-navy-400/30 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">📈 Total Sacado</p>
                <p className="text-2xl font-bold">R$ {totalWithdrawn.toLocaleString()}</p>
                <p className="text-xs text-blue-200 mt-1">
                  Lifetime earnings
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-instalei-orange-500/20 to-amber-500/20 border-instalei-orange-400/30 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-instalei-orange-100">🔄 Em Processamento</p>
                <p className="text-2xl font-bold">
                  {withdrawals.filter(w => w.status === 'processando').length}
                </p>
                <p className="text-xs text-instalei-orange-200 mt-1">
                  Saques pendentes
                </p>
              </div>
              <Clock className="h-8 w-8 text-instalei-orange-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botão de Saque e Informações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-instalei-navy-800/40 border-instalei-orange-500/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💳 Solicitar Saque
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-500/10 to-instalei-navy-500/10 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-300 mb-2">✨ Saque Instantâneo via PIX</h4>
              <p className="text-sm text-white/80 mb-3">
                Receba suas comissões em até 30 minutos, 24h por dia!
              </p>
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <CheckCircle className="h-4 w-4" />
                <span>Sem taxas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <CheckCircle className="h-4 w-4" />
                <span>Processamento automático</span>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  disabled={availableBalance < minimumWithdraw}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Sacar R$ {availableBalance.toLocaleString()}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-instalei-navy-900 border-instalei-orange-500/30 text-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    💳 Solicitar Saque via PIX
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white/80">Valor do saque</Label>
                    <Input
                      type="number"
                      placeholder={`Mínimo: R$ ${minimumWithdraw}`}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="bg-instalei-navy-800/50 border-instalei-orange-500/30 text-white"
                      max={availableBalance}
                    />
                    <p className="text-xs text-white/60 mt-1">
                      Disponível: R$ {availableBalance.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-white/80">Chave PIX</Label>
                    <Input
                      placeholder="Digite sua chave PIX (CPF, email, celular ou aleatória)"
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                      className="bg-instalei-navy-800/50 border-instalei-orange-500/30 text-white"
                    />
                  </div>

                  <div className="bg-instalei-navy-500/20 border border-instalei-orange-500/20 rounded-lg p-3">
                    <h4 className="font-semibold text-instalei-orange-300 mb-1">ℹ️ Informações importantes:</h4>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>• Saques são processados em até 30 minutos</li>
                      <li>• Não cobramos taxas para saques via PIX</li>
                      <li>• Disponível 24h por dia, inclusive finais de semana</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleWithdrawRequest}
                    disabled={isLoading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600"
                  >
                    {isLoading ? (
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                    )}
                    {isLoading ? 'Processando...' : 'Confirmar Saque'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {availableBalance < minimumWithdraw && (
              <p className="text-sm text-instalei-orange-300 text-center">
                Você precisa de mais R$ {(minimumWithdraw - availableBalance).toLocaleString()} para solicitar um saque.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-instalei-navy-800/40 border-instalei-orange-500/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Resumo Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-instalei-navy-900/40 rounded-lg">
                <div>
                  <p className="text-sm text-white/60">Janeiro 2024</p>
                  <p className="font-semibold">R$ 1.250,00</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300">Pago</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-instalei-navy-900/40 rounded-lg">
                <div>
                  <p className="text-sm text-white/60">Fevereiro 2024</p>
                  <p className="font-semibold">R$ 890,00</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300">Pago</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-instalei-navy-900/40 rounded-lg">
                <div>
                  <p className="text-sm text-white/60">Março 2024</p>
                  <p className="font-semibold">R$ {availableBalance.toLocaleString()}</p>
                </div>
                <Badge className="bg-instalei-orange-500/20 text-instalei-orange-300">Disponível</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Saques */}
      <Card className="bg-instalei-navy-800/40 border-instalei-orange-500/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Histórico de Saques
            <Badge variant="secondary" className="bg-instalei-orange-500/20 text-instalei-orange-300">
              {withdrawals.length} saques
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {withdrawals.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Nenhum saque realizado</h3>
              <p className="text-white/60">
                Quando você solicitar um saque, ele aparecerá aqui.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-instalei-orange-500/20">
                    <TableHead className="text-white/80">Valor</TableHead>
                    <TableHead className="text-white/80">Método</TableHead>
                    <TableHead className="text-white/80">Status</TableHead>
                    <TableHead className="text-white/80">Data Solicitação</TableHead>
                    <TableHead className="text-white/80">Data Pagamento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id} className="border-instalei-orange-500/20">
                      <TableCell>
                        <div className="font-semibold">R$ {withdrawal.amount.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-blue-400" />
                          <span>PIX</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(withdrawal.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(withdrawal.status)}
                            {withdrawal.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(withdrawal.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                        <div className="text-xs text-white/60">
                          {format(new Date(withdrawal.created_at), 'HH:mm')}
                        </div>
                      </TableCell>
                      <TableCell>
                        {withdrawal.processed_at ? (
                          <div className="text-sm">
                            {format(new Date(withdrawal.processed_at), 'dd/MM/yyyy', { locale: ptBR })}
                          </div>
                        ) : (
                          <span className="text-white/60">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};