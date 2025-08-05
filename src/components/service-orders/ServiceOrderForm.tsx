
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Trash2, Save, FileText } from 'lucide-react';
import { ServiceOrder, ServiceOrderItem } from '@/types/service-order';
import { formatCurrency } from '@/lib/format';
import TechnicianLayout from '@/components/layout/TechnicianLayout';

interface ServiceOrderFormProps {
  order?: ServiceOrder;
  onSave: (order: ServiceOrder) => void;
  onCancel: () => void;
}

const ServiceOrderForm: React.FC<ServiceOrderFormProps> = ({ order, onSave, onCancel }) => {
  const isEditing = !!order;
  
  const [formData, setFormData] = useState<Partial<ServiceOrder>>({
    number: order?.number || `OS-${Date.now().toString().slice(-8)}`,
    status: order?.status || 'aberta',
    client: order?.client || {
      name: '',
      document: '',
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      },
      phone: ''
    },
    equipment: order?.equipment || '',
    serialNumber: order?.serialNumber || '',
    reportedProblem: order?.reportedProblem || '',
    technician: order?.technician || '',
    attendant: order?.attendant || '',
    items: order?.items || [],
    paymentCondition: order?.paymentCondition || 'À vista',
    servicesPerformed: order?.servicesPerformed || '',
    observations: order?.observations || '',
    ...order
  });

  const [newItem, setNewItem] = useState<Partial<ServiceOrderItem>>({
    code: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0
  });

  const calculateItemTotal = (item: Partial<ServiceOrderItem>) => {
    const subtotal = (item.quantity || 0) * (item.unitPrice || 0);
    const discount = (item.discount || 0);
    return Math.max(0, subtotal - discount);
  };

  const calculateOrderTotals = () => {
    const items = formData.items || [];
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = formData.discount || 0;
    const total = Math.max(0, subtotal - discount);
    
    return { subtotal, total };
  };

  const addItem = () => {
    if (!newItem.description || !newItem.quantity || !newItem.unitPrice) return;
    
    const item: ServiceOrderItem = {
      id: Date.now().toString(),
      code: newItem.code || '',
      description: newItem.description,
      quantity: newItem.quantity,
      unitPrice: newItem.unitPrice,
      discount: newItem.discount || 0,
      total: calculateItemTotal(newItem)
    };

    setFormData(prev => ({
      ...prev,
      items: [...(prev.items || []), item]
    }));

    setNewItem({
      code: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0
    });
  };

  const removeItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      items: (prev.items || []).filter(item => item.id !== itemId)
    }));
  };

  const handleSave = () => {
    const { subtotal, total } = calculateOrderTotals();
    
    const completeOrder: ServiceOrder = {
      id: order?.id || Date.now().toString(),
      createdAt: order?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subtotal,
      discount: formData.discount || 0,
      total,
      attachments: order?.attachments || [],
      history: order?.history || [],
      ...formData
    } as ServiceOrder;

    onSave(completeOrder);
  };

  return (
    <TechnicianLayout title={isEditing ? `Editar ${formData.number}` : 'Nova Ordem de Serviço'}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h2 className="text-2xl font-bold">{formData.number}</h2>
              <Badge className="mt-1">
                {isEditing ? 'Editando' : 'Nova OS'}
              </Badge>
            </div>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar OS
          </Button>
        </div>

        {/* Dados do Cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client-name">Nome/Razão Social *</Label>
                <Input
                  id="client-name"
                  value={formData.client?.name || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { ...prev.client!, name: e.target.value }
                  }))}
                  placeholder="Ex: Gráfica Digital Ltda"
                />
              </div>
              <div>
                <Label htmlFor="client-document">CNPJ/CPF *</Label>
                <Input
                  id="client-document"
                  value={formData.client?.document || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { ...prev.client!, document: e.target.value }
                   }))}
                   placeholder=""
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="client-phone">Telefone *</Label>
                <Input
                  id="client-phone"
                  value={formData.client?.phone || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { ...prev.client!, phone: e.target.value }
                  }))}
                  placeholder="(11) 98765-4321"
                />
              </div>
              <div>
                <Label htmlFor="client-street">Endereço *</Label>
                <Input
                  id="client-street"
                  value={formData.client?.address?.street || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { 
                      ...prev.client!, 
                      address: { ...prev.client!.address!, street: e.target.value }
                    }
                  }))}
                  placeholder="Rua das Impressoras"
                />
              </div>
              <div>
                <Label htmlFor="client-number">Número</Label>
                <Input
                  id="client-number"
                  value={formData.client?.address?.number || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    client: { 
                      ...prev.client!, 
                      address: { ...prev.client!.address!, number: e.target.value }
                    }
                  }))}
                  placeholder="123"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados Técnicos */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Técnicos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="equipment">Equipamento *</Label>
                <Input
                  id="equipment"
                  value={formData.equipment || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
                  placeholder="Ex: Epson SureColor F170"
                />
              </div>
              <div>
                <Label htmlFor="serial-number">Número de Série</Label>
                <Input
                  id="serial-number"
                  value={formData.serialNumber || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                  placeholder="X7YZ123456"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="reported-problem">Problema Relatado *</Label>
              <Textarea
                id="reported-problem"
                value={formData.reportedProblem || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, reportedProblem: e.target.value }))}
                placeholder="Descreva o problema relatado pelo cliente..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Produtos/Serviços */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos e Serviços</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Lista de itens */}
            {formData.items && formData.items.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Valor Unit.</TableHead>
                    <TableHead>Desconto</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">{item.code}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell>{formatCurrency(item.discount)}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(item.total)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Separator />

            {/* Adicionar novo item */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-end">
              <div>
                <Label htmlFor="item-code">Código</Label>
                <Input
                  id="item-code"
                  value={newItem.code || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="ROL-001"
                />
              </div>
              <div>
                <Label htmlFor="item-description">Descrição *</Label>
                <Input
                  id="item-description"
                  value={newItem.description || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Rolo de Papel"
                />
              </div>
              <div>
                <Label htmlFor="item-quantity">Quantidade</Label>
                <Input
                  id="item-quantity"
                  type="number"
                  min="1"
                  value={newItem.quantity || 1}
                  onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="item-price">Valor Unit.</Label>
                <Input
                  id="item-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newItem.unitPrice || 0}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="item-discount">Desconto</Label>
                <Input
                  id="item-discount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newItem.discount || 0}
                  onChange={(e) => setNewItem(prev => ({ ...prev, discount: Number(e.target.value) }))}
                />
              </div>
              <Button onClick={addItem}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>

            {/* Totais */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(calculateOrderTotals().subtotal)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">{formatCurrency(calculateOrderTotals().total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Serviços Realizados e Observações */}
        <Card>
          <CardHeader>
            <CardTitle>Serviços e Observações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="services-performed">Serviços Realizados</Label>
              <Textarea
                id="services-performed"
                value={formData.servicesPerformed || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, servicesPerformed: e.target.value }))}
                placeholder="Descreva detalhadamente os serviços executados..."
                className="min-h-[120px]"
              />
            </div>
            
            <div>
              <Label htmlFor="observations">Observações Gerais</Label>
              <Textarea
                id="observations"
                value={formData.observations || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                placeholder="Observações adicionais, orientações ao cliente, etc..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Botões de ação */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Ordem de Serviço
          </Button>
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default ServiceOrderForm;
