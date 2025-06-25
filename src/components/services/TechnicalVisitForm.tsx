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
import { MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  address: z.string().min(10, { message: "Endereço completo é obrigatório" }),
  preferredDate: z.string().min(1, { message: "Data preferencial é obrigatória" }),
  preferredTime: z.string().min(1, { message: "Horário preferencial é obrigatório" }),
  equipmentType: z.string().min(3, { message: "Tipo de equipamento é obrigatório" }),
  description: z.string().min(10, { message: "Descrição deve ter pelo menos 10 caracteres" }),
});

interface TechnicalVisitFormProps {
  onSuccess?: () => void;
  technicianId?: number;
  visitPrice?: number;
}

const TechnicalVisitForm: React.FC<TechnicalVisitFormProps> = ({ 
  onSuccess, 
  technicianId,
  visitPrice = 80 // Valor padrão para demonstração
}) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: "09:00",
      equipmentType: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      // Simulate API call
      console.log('Technical visit request:', { ...values, technicianId, visitPrice });
      
      form.reset();
      
      toast({
        title: "Visita técnica agendada!",
        description: "Sua solicitação foi enviada com sucesso. O técnico confirmará o agendamento em breve.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Erro ao agendar visita",
        description: "Ocorreu um erro ao enviar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Pricing Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Custo de Deslocamento</h3>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            R$ {visitPrice.toFixed(2)}
          </Badge>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Taxa de deslocamento para visita técnica. Não inclui mão de obra ou materiais.
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço Completo</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Rua, número, bairro, cidade - Estado, CEP"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Endereço onde será realizada a visita técnica.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Preferencial</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário Preferencial</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
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
                  Descreva o tipo de equipamento que precisa de manutenção.
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
          
          <Button type="submit" className="w-full">
            Agendar Visita Técnica - R$ {visitPrice.toFixed(2)}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TechnicalVisitForm;
