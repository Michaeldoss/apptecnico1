
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Service } from '@/types/service';
import { useServices } from '@/hooks/useServices';

const formSchema = z.object({
  cardName: z.string().min(3, { message: "Nome no cartão é obrigatório" }).optional(),
  cardNumber: z.string().min(16, { message: "Número do cartão inválido" }).optional(),
  expiryDate: z.string().min(5, { message: "Data de validade inválida" }).optional(),
  cvv: z.string().min(3, { message: "CVV inválido" }).optional(),
  paymentMethod: z.enum(["creditCard", "debitCard", "pix", "bankTransfer"]),
});

interface PaymentFormProps {
  service: Service;
  onSuccess?: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ service, onSuccess }) => {
  const { processPayment } = useServices();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      paymentMethod: "creditCard",
    },
  });
  
  const watchPaymentMethod = form.watch("paymentMethod");
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsProcessing(true);
    
    // Payment method mapping
    const methodMap: Record<string, string> = {
      creditCard: "Cartão de Crédito",
      debitCard: "Cartão de Débito",
      pix: "PIX",
      bankTransfer: "Transferência Bancária",
    };
    
    setTimeout(() => {
      processPayment(service.id, methodMap[values.paymentMethod]);
      setIsProcessing(false);
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Detalhes do Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="mb-6">
              <p className="text-lg font-medium">Total: {service.price}</p>
              <p className="text-sm text-muted-foreground">Serviço: {service.type}</p>
            </div>
          
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Método de Pagamento</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="creditCard" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Cartão de Crédito
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="debitCard" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Cartão de Débito
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pix" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          PIX
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="bankTransfer" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Transferência Bancária
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {(watchPaymentMethod === "creditCard" || watchPaymentMethod === "debitCard") && (
              <div className="space-y-4 mt-6">
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome no Cartão</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome como está no cartão" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número do Cartão</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="XXXX XXXX XXXX XXXX" 
                          maxLength={19}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Validade</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/AA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" maxLength={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            
            {watchPaymentMethod === "pix" && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <p className="font-medium mb-2">Instruções para PIX:</p>
                <p className="text-sm">Escaneie o QR Code abaixo ou copie a chave PIX.</p>
                <div className="bg-white w-32 h-32 mx-auto my-4 flex items-center justify-center text-center">
                  QR Code do PIX estaria aqui
                </div>
                <p className="text-sm text-center">Chave: 123e4567-e89b-12d3-a456-426655440000</p>
              </div>
            )}
            
            {watchPaymentMethod === "bankTransfer" && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <p className="font-medium mb-2">Dados Bancários:</p>
                <ul className="text-sm space-y-1">
                  <li><strong>Banco:</strong> Banco do Brasil</li>
                  <li><strong>Agência:</strong> 1234-5</li>
                  <li><strong>Conta:</strong> 12345-6</li>
                  <li><strong>CNPJ:</strong> 12.345.678/0001-90</li>
                  <li><strong>Favorecido:</strong> Empresa de Serviços Técnicos Ltda</li>
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter className="px-0 pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? "Processando..." : "Finalizar Pagamento"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default PaymentForm;
