import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Smartphone, FileText, Banknote } from 'lucide-react';

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

const paymentMethods = [
  {
    id: 'pix',
    label: 'PIX',
    description: 'Pagamento instantâneo - aprovação imediata',
    icon: Smartphone,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'cartao_credito',
    label: 'Cartão de Crédito',
    description: 'Pague em até 12x sem juros',
    icon: CreditCard,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'cartao_debito',
    label: 'Cartão de Débito',
    description: 'Débito à vista - processamento imediato',
    icon: Banknote,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'boleto',
    label: 'Boleto Bancário',
    description: 'Vencimento em 3 dias úteis',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('pix');
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
    
    if (paymentMethod === 'cartao_credito' || paymentMethod === 'cartao_debito') {
      if (!validateCardFields()) {
        toast({
          variant: "destructive",
          title: "Dados inválidos",
          description: "Verifique os dados do cartão"
        });
        return;
      }
      
      onSubmit(paymentMethod, {
        number: cardNumber.replace(/\s/g, ''),
        expiry,
        cvc
      });
    } else {
      onSubmit(paymentMethod);
    }
  };

  const isCardPayment = paymentMethod === 'cartao_credito' || paymentMethod === 'cartao_debito';
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Selecione a forma de pagamento
          </h3>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={setPaymentMethod}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              
              return (
                <Card 
                  key={method.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected 
                      ? 'ring-2 ring-primary border-primary shadow-sm' 
                      : 'hover:border-muted-foreground/30'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <CardContent className="flex items-start gap-3 p-4">
                    <RadioGroupItem 
                      value={method.id} 
                      id={method.id} 
                      className="mt-1 shrink-0" 
                    />
                    <div className={`p-2 rounded-lg ${method.bgColor} shrink-0`}>
                      <Icon className={`h-5 w-5 ${method.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Label 
                        htmlFor={method.id} 
                        className="font-semibold cursor-pointer block"
                      >
                        {method.label}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {method.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </RadioGroup>
        </div>
        
        {isCardPayment && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Dados do Cartão</span>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-800">
                ⚠️ <strong>Ambiente de teste:</strong> Use cartões de teste do MercadoPago
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

        {paymentMethod === 'pix' && (
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-700">
              <Smartphone className="h-4 w-4" />
              <span className="text-sm font-medium">Pagamento via PIX</span>
            </div>
            <p className="text-xs text-emerald-600 mt-1">
              Após confirmar, você será redirecionado para gerar o QR Code ou copiar o código PIX.
            </p>
          </div>
        )}

        {paymentMethod === 'boleto' && (
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 text-orange-700">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">Boleto Bancário</span>
            </div>
            <p className="text-xs text-orange-600 mt-1">
              O boleto será gerado após a confirmação. Vencimento em 3 dias úteis.
            </p>
          </div>
        )}
        
        <Button type="submit" className="w-full" size="lg">
          Confirmar Pagamento
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
