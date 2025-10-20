
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
import { useServices } from '@/hooks/useServices';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  type: z.string().min(3, { message: "O tipo de serviço é obrigatório" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  address: z.string().min(5, { message: "Endereço é obrigatório" }),
  date: z.string().min(1, { message: "Data é obrigatória" }),
});

interface ServiceRequestFormProps {
  onSuccess?: () => void;
}

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ onSuccess }) => {
  const { requestService } = useServices();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      description: "",
      address: "",
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      requestService({
        type: values.type,
        description: values.description,
        address: values.address,
        date: new Date(values.date).toLocaleDateString('pt-BR'),
      });
      
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Erro ao solicitar serviço",
        description: "Ocorreu um erro ao enviar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Serviço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Manutenção em Impressora UV" {...field} />
              </FormControl>
              <FormDescription>
                Descreva o tipo de serviço que você precisa.
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
                  placeholder="Descreva o problema em detalhes..."
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Rua, número, bairro, cidade - Estado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Preferencial</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Data preferencial para a realização do serviço.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Solicitar Serviço
        </Button>
      </form>
    </Form>
  );
};

export default ServiceRequestForm;
