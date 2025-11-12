import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Trash2, Plus, Send } from 'lucide-react';

interface BudgetItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface ExtraExpense {
  description: string;
  value: number;
}

export const BudgetForm = () => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [expensesConfig, setExpensesConfig] = useState<any>(null);
  const [serviceOrders, setServiceOrders] = useState<any[]>([]);
  
  // Dados do orçamento
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedServiceOrder, setSelectedServiceOrder] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visitValue, setVisitValue] = useState(0);
  const [laborHours, setLaborHours] = useState(0);
  const [laborHourValue, setLaborHourValue] = useState(0);
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [distance, setDistance] = useState(0);
  const [workDays, setWorkDays] = useState(1);
  const [extraExpenses, setExtraExpenses] = useState<ExtraExpense[]>([]);
  const [discount, setDiscount] = useState(0);
  const [observations, setObservations] = useState('');

  useEffect(() => {
    loadClients();
    loadExpensesConfig();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      loadClientServiceOrders(selectedClient);
    }
  }, [selectedClient]);

  const loadClients = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    const { data, error } = await supabase
      .from('ordens_servico')
      .select('cliente_id, clientes(id, nome, email)')
      .eq('tecnico_id', user.user.id);

    if (error) {
      console.error('Erro ao carregar clientes:', error);
      return;
    }

    const uniqueClients = Array.from(
      new Map(data?.map((item: any) => [item.clientes.id, item.clientes])).values()
    );
    setClients(uniqueClients as any[]);
  };

  const loadClientServiceOrders = async (clientId: string) => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    const { data, error } = await supabase
      .from('ordens_servico')
      .select('*')
      .eq('tecnico_id', user.user.id)
      .eq('cliente_id', clientId);

    if (!error && data) {
      setServiceOrders(data);
    }
  };

  const loadExpensesConfig = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    const { data, error } = await supabase
      .from('tecnico_despesas_config')
      .select('*')
      .eq('tecnico_id', user.user.id)
      .single();

    if (!error && data) {
      setExpensesConfig(data);
    }
  };

  const addItem = () => {
    setItems([...items, {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof BudgetItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        updated.total = updated.quantity * updated.unitPrice;
        return updated;
      }
      return item;
    }));
  };

  const addExtraExpense = () => {
    setExtraExpenses([...extraExpenses, { description: '', value: 0 }]);
  };

  const removeExtraExpense = (index: number) => {
    setExtraExpenses(extraExpenses.filter((_, i) => i !== index));
  };

  const updateExtraExpense = (index: number, field: 'description' | 'value', value: any) => {
    setExtraExpenses(extraExpenses.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    ));
  };

  const calculateTotals = () => {
    const totalParts = items.reduce((sum, item) => sum + item.total, 0);
    const totalLabor = laborHours * laborHourValue;
    
    let travelExpense = 0;
    if (expensesConfig && distance > (expensesConfig.cobra_deslocamento_acima_km || 0)) {
      travelExpense = distance * (expensesConfig.valor_km_veiculo || 0);
    }

    const accommodationExpense = workDays > 1 ? 
      (workDays - 1) * (expensesConfig?.valor_diaria_hospedagem || 0) : 0;

    const foodExpense = workDays * (expensesConfig?.valor_refeicao || 0);

    const totalExtraExpenses = extraExpenses.reduce((sum, exp) => sum + exp.value, 0);

    const totalExpenses = travelExpense + accommodationExpense + foodExpense + totalExtraExpenses;
    
    const subtotal = visitValue + totalLabor + totalParts + totalExpenses;
    const discountValue = subtotal * (discount / 100);
    const total = subtotal - discountValue;

    return {
      totalParts,
      totalLabor,
      travelExpense,
      accommodationExpense,
      foodExpense,
      totalExtraExpenses,
      totalExpenses,
      subtotal,
      discountValue,
      total
    };
  };

  const handleSaveBudget = async (status: 'rascunho' | 'enviado') => {
    if (!selectedClient || !title) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    setLoading(true);
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    const totals = calculateTotals();

    const budgetData = {
      tecnico_id: user.user.id,
      cliente_id: selectedClient,
      ordem_servico_id: selectedServiceOrder || null,
      titulo: title,
      descricao: description,
      status,
      valor_visita: visitValue,
      horas_mao_obra: laborHours,
      valor_hora_mao_obra: laborHourValue,
      valor_total_mao_obra: totals.totalLabor,
      itens_pecas: items as any,
      valor_total_pecas: totals.totalParts,
      distancia_km: distance,
      valor_deslocamento: totals.travelExpense,
      dias_trabalho: workDays,
      valor_hospedagem: totals.accommodationExpense,
      valor_alimentacao: totals.foodExpense,
      despesas_extras: extraExpenses as any,
      valor_total_despesas: totals.totalExpenses,
      valor_subtotal: totals.subtotal,
      desconto_percentual: discount,
      desconto_valor: totals.discountValue,
      valor_total: totals.total,
      observacoes: observations,
      data_validade: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() // 15 dias
    };

    const { error } = await supabase
      .from('orcamentos')
      .insert([budgetData]);

    setLoading(false);

    if (error) {
      toast.error('Erro ao salvar orçamento');
      console.error(error);
      return;
    }

    toast.success(status === 'enviado' ? 'Orçamento enviado ao cliente!' : 'Orçamento salvo como rascunho');
    resetForm();
  };

  const resetForm = () => {
    setSelectedClient('');
    setSelectedServiceOrder('');
    setTitle('');
    setDescription('');
    setVisitValue(0);
    setLaborHours(0);
    setLaborHourValue(0);
    setItems([]);
    setDistance(0);
    setWorkDays(1);
    setExtraExpenses([]);
    setDiscount(0);
    setObservations('');
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dados Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cliente *</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client: any) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ordem de Serviço (opcional)</Label>
              <Select value={selectedServiceOrder} onValueChange={setSelectedServiceOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a OS" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOrders.map((os: any) => (
                    <SelectItem key={os.id} value={os.id}>
                      {os.titulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Título do Orçamento *</Label>
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Manutenção Ar Condicionado"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Descrição</Label>
              <Textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o serviço a ser realizado"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Valores de Serviço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Valor da Visita (R$)</Label>
              <Input 
                type="number"
                value={visitValue}
                onChange={(e) => setVisitValue(Number(e.target.value))}
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label>Horas de Mão de Obra</Label>
              <Input 
                type="number"
                value={laborHours}
                onChange={(e) => setLaborHours(Number(e.target.value))}
                step="0.5"
              />
            </div>

            <div className="space-y-2">
              <Label>Valor por Hora (R$)</Label>
              <Input 
                type="number"
                value={laborHourValue}
                onChange={(e) => setLaborHourValue(Number(e.target.value))}
                step="0.01"
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium">Total Mão de Obra: R$ {totals.totalLabor.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Peças e Materiais</CardTitle>
          <Button onClick={addItem} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-24">Qtd</TableHead>
                <TableHead className="w-32">Valor Unit.</TableHead>
                <TableHead className="w-32">Total</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input 
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Descrição do item"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                      min="1"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">R$ {item.total.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <p className="text-sm font-medium">Total Peças: R$ {totals.totalParts.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Despesas de Deslocamento e Hospedagem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Distância (km)</Label>
              <Input 
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                step="0.1"
              />
              <p className="text-xs text-muted-foreground">
                Cobrança acima de {expensesConfig?.cobra_deslocamento_acima_km || 0} km
              </p>
            </div>

            <div className="space-y-2">
              <Label>Dias de Trabalho</Label>
              <Input 
                type="number"
                value={workDays}
                onChange={(e) => setWorkDays(Number(e.target.value))}
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <p className="text-sm">Deslocamento: R$ {totals.travelExpense.toFixed(2)}</p>
            <p className="text-sm">Hospedagem: R$ {totals.accommodationExpense.toFixed(2)}</p>
            <p className="text-sm">Alimentação: R$ {totals.foodExpense.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Despesas Extras</CardTitle>
          <Button onClick={addExtraExpense} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Despesa
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {extraExpenses.map((expense, index) => (
            <div key={index} className="flex gap-3">
              <Input 
                value={expense.description}
                onChange={(e) => updateExtraExpense(index, 'description', e.target.value)}
                placeholder="Descrição da despesa"
                className="flex-1"
              />
              <Input 
                type="number"
                value={expense.value}
                onChange={(e) => updateExtraExpense(index, 'value', Number(e.target.value))}
                placeholder="Valor"
                step="0.01"
                className="w-32"
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeExtraExpense(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo e Finalização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Desconto (%)</Label>
            <Input 
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              max="100"
              min="0"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea 
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Observações adicionais sobre o orçamento"
              rows={3}
            />
          </div>

          <div className="bg-primary/10 p-6 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>R$ {totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-destructive">
              <span>Desconto ({discount}%):</span>
              <span>- R$ {totals.discountValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>TOTAL:</span>
              <span>R$ {totals.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => handleSaveBudget('rascunho')}
              variant="outline"
              className="flex-1"
              disabled={loading}
            >
              Salvar Rascunho
            </Button>
            <Button 
              onClick={() => handleSaveBudget('enviado')}
              className="flex-1"
              disabled={loading}
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar ao Cliente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
