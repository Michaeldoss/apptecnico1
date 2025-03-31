
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export interface PaymentFormProps {
  onSubmit: (method: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(paymentMethod);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={setPaymentMethod}
          className="grid gap-4"
        >
          <Card className={`cursor-pointer transition ${paymentMethod === 'credit' ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="flex items-center gap-4 p-4">
              <RadioGroupItem value="credit" id="credit" className="mt-0" />
              <div className="flex-1">
                <Label htmlFor="credit" className="font-medium">Cartão de Crédito</Label>
                <p className="text-sm text-muted-foreground">Pague em até 12x</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer transition ${paymentMethod === 'debit' ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="flex items-center gap-4 p-4">
              <RadioGroupItem value="debit" id="debit" className="mt-0" />
              <div className="flex-1">
                <Label htmlFor="debit" className="font-medium">Cartão de Débito</Label>
                <p className="text-sm text-muted-foreground">Processamento imediato</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer transition ${paymentMethod === 'pix' ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="flex items-center gap-4 p-4">
              <RadioGroupItem value="pix" id="pix" className="mt-0" />
              <div className="flex-1">
                <Label htmlFor="pix" className="font-medium">Pix</Label>
                <p className="text-sm text-muted-foreground">Transferência instantânea</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer transition ${paymentMethod === 'invoice' ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="flex items-center gap-4 p-4">
              <RadioGroupItem value="invoice" id="invoice" className="mt-0" />
              <div className="flex-1">
                <Label htmlFor="invoice" className="font-medium">Boleto Bancário</Label>
                <p className="text-sm text-muted-foreground">Vencimento em 3 dias úteis</p>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
        
        {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
          <div className="grid gap-4">
            <div>
              <Label htmlFor="cardNumber">Número do Cartão</Label>
              <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Validade</Label>
                <Input id="expiry" placeholder="MM/AA" />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
          </div>
        )}
        
        <Button type="submit" className="w-full">
          Confirmar Pagamento
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
