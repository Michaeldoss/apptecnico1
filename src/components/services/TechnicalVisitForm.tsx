
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TechnicalVisitFormProps {
  onSuccess: () => void;
  technicianId?: number;
  visitPrice: number;
}

const TechnicalVisitForm: React.FC<TechnicalVisitFormProps> = ({ onSuccess, technicianId, visitPrice }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    preferredDate: undefined as Date | undefined,
    preferredTime: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Visita agendada!",
        description: `Sua visita técnica foi agendada. Custo: R$ ${visitPrice}`,
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Erro ao agendar",
        description: "Não foi possível agendar sua visita. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-blue-700">
          <strong>Custo da visita técnica: R$ {visitPrice}</strong>
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Este valor será cobrado para cobrir os custos de deslocamento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nome completo</label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Seu nome completo"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Telefone</label>
        <Input
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="(11) 99999-9999"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Endereço completo</label>
        <Input
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Rua, número, bairro, cidade"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Data preferida</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.preferredDate ? (
                  format(formData.preferredDate, "PPP", { locale: ptBR })
                ) : (
                  <span>Selecionar data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.preferredDate}
                onSelect={(date) => setFormData({ ...formData, preferredDate: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Horário preferido</label>
          <Select value={formData.preferredTime} onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar horário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Manhã (8h às 12h)</SelectItem>
              <SelectItem value="afternoon">Tarde (13h às 17h)</SelectItem>
              <SelectItem value="evening">Noite (18h às 20h)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descrição do problema</label>
        <Textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descreva o problema que precisa ser verificado..."
          rows={4}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Agendando...' : `Agendar Visita - R$ ${visitPrice}`}
      </Button>
    </form>
  );
};

export default TechnicalVisitForm;
