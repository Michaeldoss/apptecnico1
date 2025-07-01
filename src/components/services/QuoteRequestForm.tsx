
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { equipmentTypeLabels } from '@/types/equipment';

interface QuoteRequestFormProps {
  onSuccess: () => void;
  technicianId?: number;
}

const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({ onSuccess, technicianId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    equipmentType: '',
    description: '',
    urgency: 'normal'
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
        title: "Solicitação enviada!",
        description: "Seu pedido de orçamento foi enviado com sucesso. O técnico entrará em contato em breve.",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label className="block text-sm font-medium mb-2">Tipo de equipamento</label>
        <Select value={formData.equipmentType} onValueChange={(value) => setFormData({ ...formData, equipmentType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de equipamento" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(equipmentTypeLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descrição do problema</label>
        <Textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descreva o problema ou serviço que precisa..."
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Urgência</label>
        <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Baixa - Posso aguardar</SelectItem>
            <SelectItem value="normal">Normal - Alguns dias</SelectItem>
            <SelectItem value="high">Alta - Preciso urgente</SelectItem>
            <SelectItem value="emergency">Emergência - Parei de trabalhar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento Gratuito'}
      </Button>
    </form>
  );
};

export default QuoteRequestForm;
