import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  equipmentType: z.string().min(3, { message: "Tipo de equipamento é obrigatório" }),
  description: z.string().min(10, { message: "Descrição deve ter pelo menos 10 caracteres" }),
  urgency: z.string().min(1, { message: "Urgência é obrigatória" }),
});

interface QuoteRequestFormProps {
  onSuccess?: () => void;
  technicianId?: number;
}

const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({ onSuccess, technicianId }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      equipmentType: "",
      description: "",
      urgency: "normal",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      // Simulate API call
      console.log('Quote request:', { ...values, technicianId });
      
      form.reset();
      
      toast({
        title: "Orçamento solicitado!",
        description: "Sua solicitação foi enviada com sucesso. O técnico entrará em contato em breve.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Erro ao solicitar orçamento",
        description: "Ocorreu um erro ao enviar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Pricing Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-green-800">Orçamento Gratuito</h3>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            R$ 0,00
          </Badge>
        </div>
        <p className="text-sm text-green-700 mt-1">
          O orçamento é totalmente gratuito. Você receberá uma estimativa detalhada sem nenhum custo.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="equipmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Equipamento</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Plotter eco solvente" {...field} />
                </FormControl>
                <FormDescription>
                  Descreva o tipo de equipamento que precisa de serviço.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do Problema</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva o problema ou serviço necessário em detalhes..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urgência</FormLabel>
                <FormControl>
                  <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="baixa">Baixa</option>
                    <option value="normal">Normal</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </FormControl>
                <FormDescription>
                  Selecione a urgência do serviço.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">
            Solicitar Orçamento Gratuito
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuoteRequestForm;
