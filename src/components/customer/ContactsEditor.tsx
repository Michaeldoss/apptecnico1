import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save, X, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id?: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  type: 'tecnico' | 'financeiro' | 'administrativo' | 'comercial';
}

interface ContactsEditorProps {
  contacts: Contact[];
  onSave: (contacts: Contact[]) => void;
  onCancel: () => void;
}

const ContactsEditor: React.FC<ContactsEditorProps> = ({ contacts, onSave, onCancel }) => {
  const [editingContacts, setEditingContacts] = useState<Contact[]>(
    contacts.length > 0 ? contacts : [{
      name: '',
      position: '',
      phone: '',
      email: '',
      type: 'comercial'
    }]
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const contactTypes = [
    { value: 'comercial', label: 'Comercial' },
    { value: 'tecnico', label: 'Técnico' },
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'administrativo', label: 'Administrativo' }
  ];

  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    setEditingContacts(prev => prev.map((contact, i) => 
      i === index ? { ...contact, [field]: value } : contact
    ));
  };

  const addContact = () => {
    setEditingContacts(prev => [...prev, {
      name: '',
      position: '',
      phone: '',
      email: '',
      type: 'comercial'
    }]);
  };

  const removeContact = (index: number) => {
    if (editingContacts.length > 1) {
      setEditingContacts(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    // Validar campos obrigatórios
    const invalidContacts = editingContacts.filter(contact => 
      !contact.name.trim() || !contact.email.trim() || !contact.phone.trim()
    );

    if (invalidContacts.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, email e telefone para todos os contatos.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(editingContacts);
      toast({
        title: "Contatos salvos!",
        description: "As informações de contato foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar os contatos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Editar Contatos</h3>
        <Button onClick={addContact} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Contato
        </Button>
      </div>

      <div className="space-y-4">
        {editingContacts.map((contact, index) => (
          <Card key={index} className="border border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Contato {index + 1}
                </div>
                {editingContacts.length > 1 && (
                  <Button
                    onClick={() => removeContact(index)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`name-${index}`}>Nome *</Label>
                  <Input
                    id={`name-${index}`}
                    value={contact.name}
                    onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                    placeholder="Nome completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`position-${index}`}>Cargo</Label>
                  <Input
                    id={`position-${index}`}
                    value={contact.position}
                    onChange={(e) => handleContactChange(index, 'position', e.target.value)}
                    placeholder="Ex: Gerente, Diretor"
                  />
                </div>
                <div>
                  <Label htmlFor={`phone-${index}`}>Telefone *</Label>
                  <Input
                    id={`phone-${index}`}
                    value={contact.phone}
                    onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`email-${index}`}>E-mail *</Label>
                  <Input
                    id={`email-${index}`}
                    type="email"
                    value={contact.email}
                    onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                    placeholder="email@empresa.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`type-${index}`}>Tipo de Contato</Label>
                  <Select
                    value={contact.type}
                    onValueChange={(value: any) => handleContactChange(index, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contactTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 justify-end pt-4 border-t">
        <Button onClick={onCancel} variant="outline">
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Salvando...' : 'Salvar Contatos'}
        </Button>
      </div>
    </div>
  );
};

export default ContactsEditor;