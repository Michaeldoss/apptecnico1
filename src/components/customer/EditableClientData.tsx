import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Save, X, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClientData {
  id: string;
  name: string;
  fantasyName?: string;
  email: string;
  type: 'juridica' | 'fisica';
  cnpj?: string;
  cpf?: string;
  ie?: string;
  whatsapp: string;
  phone: string;
  website?: string;
  businessSegment: string;
  businessActivity: string;
  description: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    complement?: string;
  };
  contacts: Array<{
    name: string;
    position: string;
    phone: string;
    email: string;
    type: 'tecnico' | 'financeiro' | 'administrativo' | 'comercial';
  }>;
  services: string[];
  preferredServiceTime: string;
  specialRequirements?: string;
  companySize: 'small' | 'medium' | 'large';
}

interface EditableClientDataProps {
  clientData: ClientData;
  onSave: (data: ClientData) => void;
  onCancel: () => void;
}

const EditableClientData: React.FC<EditableClientDataProps> = ({
  clientData,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<ClientData>(clientData);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleContactChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const addContact = () => {
    setFormData(prev => ({
      ...prev,
      contacts: [
        ...prev.contacts,
        {
          name: '',
          position: '',
          phone: '',
          email: '',
          type: 'comercial'
        }
      ]
    }));
  };

  const removeContact = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      toast({
        title: "Dados salvos com sucesso!",
        description: "As informações da empresa foram atualizadas.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as informações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Razão Social *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="fantasyName">Nome Fantasia</Label>
              <Input
                id="fantasyName"
                value={formData.fantasyName || ''}
                onChange={(e) => handleInputChange('fantasyName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={formData.cnpj || ''}
                onChange={(e) => handleInputChange('cnpj', e.target.value)}
                placeholder="00.000.000/0000-00"
              />
            </div>
            <div>
              <Label htmlFor="ie">Inscrição Estadual</Label>
              <Input
                id="ie"
                value={formData.ie || ''}
                onChange={(e) => handleInputChange('ie', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://www.exemplo.com.br"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Endereço */}
      <Card>
        <CardHeader>
          <CardTitle>Endereço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="street">Rua/Avenida</Label>
              <Input
                id="street"
                value={formData.address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                value={formData.address.number}
                onChange={(e) => handleAddressChange('number', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={formData.address.neighborhood}
                onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="state">Estado</Label>
              <Select value={formData.address.state} onValueChange={(value) => handleAddressChange('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SP">São Paulo</SelectItem>
                  <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                  <SelectItem value="MG">Minas Gerais</SelectItem>
                  <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                  <SelectItem value="PR">Paraná</SelectItem>
                  <SelectItem value="SC">Santa Catarina</SelectItem>
                  <SelectItem value="BA">Bahia</SelectItem>
                  <SelectItem value="GO">Goiás</SelectItem>
                  <SelectItem value="PE">Pernambuco</SelectItem>
                  <SelectItem value="CE">Ceará</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={formData.address.zipCode}
                onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                placeholder="00000-000"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={formData.address.complement || ''}
                onChange={(e) => handleAddressChange('complement', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações de Negócio */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Negócio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessSegment">Segmento de Negócio</Label>
              <Input
                id="businessSegment"
                value={formData.businessSegment}
                onChange={(e) => handleInputChange('businessSegment', e.target.value)}
                placeholder="Ex: Gráfica, Comunicação Visual"
              />
            </div>
            <div>
              <Label htmlFor="businessActivity">Atividade Principal</Label>
              <Input
                id="businessActivity"
                value={formData.businessActivity}
                onChange={(e) => handleInputChange('businessActivity', e.target.value)}
                placeholder="Ex: Impressão Digital, Sinalização"
              />
            </div>
            <div>
              <Label htmlFor="companySize">Porte da Empresa</Label>
              <Select value={formData.companySize} onValueChange={(value: 'small' | 'medium' | 'large') => handleInputChange('companySize', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequena (até 49 funcionários)</SelectItem>
                  <SelectItem value="medium">Média (50-249 funcionários)</SelectItem>
                  <SelectItem value="large">Grande (250+ funcionários)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="description">Descrição da Empresa</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              placeholder="Descreva sua empresa, principais atividades e diferenciais..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Contatos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Contatos
            <Button type="button" onClick={addContact} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.contacts.map((contact, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Contato {index + 1}</h4>
                {formData.contacts.length > 1 && (
                  <Button 
                    type="button" 
                    onClick={() => removeContact(index)} 
                    size="sm" 
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Nome</Label>
                  <Input
                    value={contact.name}
                    onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Cargo</Label>
                  <Input
                    value={contact.position}
                    onChange={(e) => handleContactChange(index, 'position', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input
                    value={contact.phone}
                    onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input
                    type="email"
                    value={contact.email}
                    onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Preferências de Atendimento */}
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Atendimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="preferredServiceTime">Horário Preferencial</Label>
            <Input
              id="preferredServiceTime"
              value={formData.preferredServiceTime}
              onChange={(e) => handleInputChange('preferredServiceTime', e.target.value)}
              placeholder="Ex: Segunda a sexta, 8h às 18h"
            />
          </div>
          <div>
            <Label htmlFor="specialRequirements">Observações Especiais</Label>
            <Textarea
              id="specialRequirements"
              value={formData.specialRequirements || ''}
              onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
              rows={3}
              placeholder="Informações importantes sobre acesso, restrições, etc."
            />
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  );
};

export default EditableClientData;