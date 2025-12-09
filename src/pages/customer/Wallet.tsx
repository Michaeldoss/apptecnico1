import { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCarteira } from '@/hooks/useCarteira';
import { Wallet, ArrowUpCircle, ArrowDownCircle, CreditCard, QrCode, Receipt, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CustomerWallet = () => {
  const { carteira, movimentacoes, isLoading, depositar, saldoDisponivel } = useCarteira();
  const [valorDeposito, setValorDeposito] = useState('');
  const [meioPagamento, setMeioPagamento] = useState<'pix' | 'cartao_credito' | 'cartao_debito' | 'boleto'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeposito = async () => {
    const valor = parseFloat(valorDeposito);
    if (isNaN(valor) || valor <= 0) {
      return;
    }

    setIsProcessing(true);
    try {
      await depositar(valor, meioPagamento);
      setValorDeposito('');
    } catch (error) {
      console.error('Erro ao depositar:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'deposito':
      case 'bonus':
      case 'reembolso':
        return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
      default:
        return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      deposito: 'Depósito',
      saque: 'Saque',
      pagamento_servico: 'Pagamento de Serviço',
      pagamento_peca: 'Compra de Peça',
      pagamento_assinatura: 'Assinatura',
      reembolso: 'Reembolso',
      bonus: 'Bônus',
    };
    return labels[tipo] || tipo;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      aprovado: 'default',
      pendente: 'secondary',
      rejeitado: 'destructive',
      cancelado: 'outline',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  if (isLoading && !carteira) {
    return (
      <CustomerLayout title="Carteira">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout title="Carteira Digital">
      <div className="space-y-6">
        {/* Saldo */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Saldo Disponível
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                R$ {saldoDisponivel.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {carteira?.saldo?.toFixed(2) || '0.00'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Saldo Bloqueado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">
                R$ {carteira?.saldo_bloqueado?.toFixed(2) || '0.00'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Adicionar Saldo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpCircle className="h-5 w-5" />
              Adicionar Saldo
            </CardTitle>
            <CardDescription>
              Adicione créditos à sua carteira para pagar serviços e peças
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="valor">Valor do Depósito</Label>
              <Input
                id="valor"
                type="number"
                placeholder="0.00"
                value={valorDeposito}
                onChange={(e) => setValorDeposito(e.target.value)}
                min="10"
                step="0.01"
              />
              <p className="text-xs text-muted-foreground">Valor mínimo: R$ 10,00</p>
            </div>

            <div className="space-y-2">
              <Label>Forma de Pagamento</Label>
              <RadioGroup
                value={meioPagamento}
                onValueChange={(v) => setMeioPagamento(v as typeof meioPagamento)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                    <QrCode className="h-4 w-4" />
                    PIX
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="cartao_credito" id="cartao_credito" />
                  <Label htmlFor="cartao_credito" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Cartão de Crédito
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="cartao_debito" id="cartao_debito" />
                  <Label htmlFor="cartao_debito" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Cartão de Débito
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="boleto" id="boleto" />
                  <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer">
                    <Receipt className="h-4 w-4" />
                    Boleto
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              className="w-full" 
              onClick={handleDeposito}
              disabled={isProcessing || !valorDeposito || parseFloat(valorDeposito) < 10}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  Adicionar R$ {valorDeposito || '0.00'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Histórico de Movimentações */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Movimentações</CardTitle>
            <CardDescription>
              Últimas transações da sua carteira
            </CardDescription>
          </CardHeader>
          <CardContent>
            {movimentacoes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma movimentação encontrada</p>
                <p className="text-sm">Faça seu primeiro depósito para começar!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {movimentacoes.map((mov) => (
                  <div key={mov.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      {getTipoIcon(mov.tipo)}
                      <div>
                        <p className="font-medium">{getTipoLabel(mov.tipo)}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(mov.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                        {mov.descricao && (
                          <p className="text-xs text-muted-foreground">{mov.descricao}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${mov.valor > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {mov.valor > 0 ? '+' : ''}R$ {Math.abs(mov.valor).toFixed(2)}
                      </p>
                      {getStatusBadge(mov.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default CustomerWallet;
