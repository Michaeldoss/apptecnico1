import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { CreatePaymentRequest } from '@/types/payment';
import { CreditCard, QrCode, FileText, Banknote } from 'lucide-react';

interface PagamentoFormProps {
  onSubmit: (dados: CreatePaymentRequest) => void;
  isLoading?: boolean;
  servicoId?: string;
  tecnicoId?: string;
  valorSugerido?: number;
}

const PagamentoForm: React.FC<PagamentoFormProps> = ({
  onSubmit,
  isLoading = false,
  servicoId = '',
  tecnicoId = '',
  valorSugerido = 0,
}) => {
  const [formData, setFormData] = useState<CreatePaymentRequest>({
    cliente_id: '',
    tecnico_id: tecnicoId,
    servico_id: servicoId,
    valor_total: valorSugerido,
    meio_pagamento: 'pix',
    descricao: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof CreatePaymentRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const meiosPagamento = [
    {
      value: 'pix',
      label: 'PIX',
      description: 'Transferência instantânea',
      icon: <QrCode className="h-5 w-5" />,
    },
    {
      value: 'cartao_credito',
      label: 'Cartão de Crédito',
      description: 'Parcelamento disponível',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      value: 'cartao_debito',
      label: 'Cartão de Débito',
      description: 'Débito imediato',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      value: 'boleto',
      label: 'Boleto Bancário',
      description: 'Vencimento em 3 dias úteis',
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Banknote className="h-6 w-6 text-green-600" />
          Realizar Pagamento
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Valor */}
          <div className="space-y-2">
            <Label htmlFor="valor">Valor do Serviço</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                R$
              </span>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0"
                value={formData.valor_total}
                onChange={(e) => handleInputChange('valor_total', parseFloat(e.target.value) || 0)}
                className="pl-10"
                placeholder="0,00"
                required
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição do Serviço</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Descreva o serviço a ser pago..."
              rows={3}
              required
            />
          </div>

          {/* Meio de Pagamento */}
          <div className="space-y-3">
            <Label>Forma de Pagamento</Label>
            <RadioGroup
              value={formData.meio_pagamento}
              onValueChange={(value) => handleInputChange('meio_pagamento', value as any)}
            >
              {meiosPagamento.map((meio) => (
                <div key={meio.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={meio.value} id={meio.value} />
                  <Label
                    htmlFor={meio.value}
                    className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                  >
                    <div className="text-blue-600">
                      {meio.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{meio.label}</p>
                      <p className="text-sm text-gray-600">{meio.description}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Informativo sobre segurança */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              🛡️ Pagamento Seguro
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Valor fica retido em conta segura até conclusão do serviço</li>
              <li>• Liberação automática em até 24 horas</li>
              <li>• Processamento via Mercado Pago</li>
              <li>• Garantia de reembolso em caso de problemas</li>
            </ul>
          </div>

          {/* Botão */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !formData.valor_total || !formData.descricao}
            size="lg"
          >
            {isLoading ? 'Processando...' : `Pagar R$ ${formData.valor_total.toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PagamentoForm;