
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// Card validation schemas
const cardNumberSchema = z.string()
  .regex(/^[0-9]{13,19}$/, 'Número de cartão inválido (13-19 dígitos)');

const expirySchema = z.string()
  .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Formato inválido (MM/AA)')
  .refine((val) => {
    const [month, year] = val.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    return expiry > new Date();
  }, 'Cartão expirado');

const cvcSchema = z.string()
  .regex(/^[0-9]{3,4}$/, 'CVC inválido (3-4 dígitos)');

export interface PaymentFormProps {
  onSubmit: (method: string, cardData?: { number: string; expiry: string; cvc: string }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const maskCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const maskExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };
  
  const validateCardFields = () => {
    const newErrors: { [key: string]: string } = {};
    
    const cardResult = cardNumberSchema.safeParse(cardNumber.replace(/\s/g, ''));
    if (!cardResult.success) {
      newErrors.cardNumber = cardResult.error.errors[0].message;
    }
    
    const expiryResult = expirySchema.safeParse(expiry);
    if (!expiryResult.success) {
      newErrors.expiry = expiryResult.error.errors[0].message;
    }
    
    const cvcResult = cvcSchema.safeParse(cvc);
    if (!cvcResult.success) {
      newErrors.cvc = cvcResult.error.errors[0].message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      if (!validateCardFields()) {
        toast({
          variant: "destructive",
          title: "Dados inválidos",
          description: "Verifique os dados do cartão"
        });
        return;
      }
      
      // AVISO: Em produção, NUNCA envie dados brutos do cartão
      // Use tokenização (Stripe, MercadoPago, etc)
      onSubmit(paymentMethod, {
        number: cardNumber.replace(/\s/g, ''),
        expiry,
        cvc
      });
    } else {
      onSubmit(paymentMethod);
    }
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
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
              <p className="text-xs text-amber-800">
                ⚠️ <strong>Demonstração apenas:</strong> Em produção, use processador PCI-compliant
              </p>
            </div>
            <div>
              <Label htmlFor="cardNumber">Número do Cartão</Label>
              <Input 
                id="cardNumber" 
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => {
                  const masked = maskCardNumber(e.target.value);
                  if (masked.replace(/\s/g, '').length <= 19) {
                    setCardNumber(masked);
                  }
                }}
                maxLength={23}
                inputMode="numeric"
                className={errors.cardNumber ? 'border-red-500' : ''}
              />
              {errors.cardNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Validade</Label>
                <Input 
                  id="expiry" 
                  placeholder="MM/AA"
                  value={expiry}
                  onChange={(e) => {
                    const masked = maskExpiry(e.target.value);
                    if (masked.length <= 5) {
                      setExpiry(masked);
                    }
                  }}
                  maxLength={5}
                  inputMode="numeric"
                  className={errors.expiry ? 'border-red-500' : ''}
                />
                {errors.expiry && (
                  <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc" 
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => {
                    const numbers = e.target.value.replace(/\D/g, '');
                    if (numbers.length <= 4) {
                      setCvc(numbers);
                    }
                  }}
                  maxLength={4}
                  inputMode="numeric"
                  type="password"
                  className={errors.cvc ? 'border-red-500' : ''}
                />
                {errors.cvc && (
                  <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>
                )}
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
