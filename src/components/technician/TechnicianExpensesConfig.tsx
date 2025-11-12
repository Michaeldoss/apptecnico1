import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Car, 
  Plane, 
  Bus, 
  Home, 
  UtensilsCrossed, 
  PlusCircle, 
  Trash2,
  DollarSign,
  MapPin,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DespesaExtra {
  id: string;
  nome: string;
  valor: number;
  unidade: string;
}

const TechnicianExpensesConfig = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Despesas de deslocamento
  const [valorKmVeiculo, setValorKmVeiculo] = useState(2.50);
  const [valorPedagio, setValorPedagio] = useState(15.00);
  const [valorEstacionamento, setValorEstacionamento] = useState(10.00);
  const [valorPassagemOnibus, setValorPassagemOnibus] = useState(50.00);
  const [valorPassagemAviao, setValorPassagemAviao] = useState(500.00);

  // Hospedagem e alimentação
  const [valorDiariaHospedagem, setValorDiariaHospedagem] = useState(150.00);
  const [valorRefeicao, setValorRefeicao] = useState(40.00);

  // Configurações
  const [raioAtendimentoKm, setRaioAtendimentoKm] = useState(50);
  const [cobraDeslocamentoAcimaKm, setCobraDeslocamentoAcimaKm] = useState(10);

  // Despesas extras personalizadas
  const [despesasExtras, setDespesasExtras] = useState<DespesaExtra[]>([
    { id: '1', nome: 'Ferramentas especiais', valor: 100.00, unidade: 'por uso' },
  ]);

  const handleAddDespesaExtra = () => {
    const newDespesa: DespesaExtra = {
      id: Date.now().toString(),
      nome: '',
      valor: 0,
      unidade: 'por unidade'
    };
    setDespesasExtras([...despesasExtras, newDespesa]);
  };

  const handleRemoveDespesaExtra = (id: string) => {
    setDespesasExtras(despesasExtras.filter(d => d.id !== id));
    toast({
      title: "Despesa removida",
      description: "A despesa foi removida com sucesso.",
    });
  };

  const handleUpdateDespesaExtra = (id: string, field: keyof DespesaExtra, value: any) => {
    setDespesasExtras(despesasExtras.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Salvando configurações de despesas...', {
      valorKmVeiculo,
      valorPedagio,
      valorEstacionamento,
      valorPassagemOnibus,
      valorPassagemAviao,
      valorDiariaHospedagem,
      valorRefeicao,
      raioAtendimentoKm,
      cobraDeslocamentoAcimaKm,
      despesasExtras
    });

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "✅ Configurações salvas!",
        description: "Suas configurações de despesas foram atualizadas com sucesso.",
      });
    }, 1500);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300">
      <form onSubmit={handleSave}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Despesas e Cobranças
            </span>
          </CardTitle>
          <CardDescription className="text-base text-foreground/80">
            Configure valores para diferentes tipos de despesas que serão incluídos nos orçamentos
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Deslocamento */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Deslocamento</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valor-km" className="text-foreground flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  Valor por KM (veículo próprio)
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">R$</span>
                  <Input
                    id="valor-km"
                    type="number"
                    step="0.01"
                    min="0"
                    value={valorKmVeiculo}
                    onChange={(e) => setValorKmVeiculo(Number(e.target.value))}
                    className="border-2 border-border focus:border-primary"
                  />
                  <span className="text-sm font-medium text-muted-foreground">/km</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor-pedagio" className="text-foreground">
                  Pedágio (média)
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">R$</span>
                  <Input
                    id="valor-pedagio"
                    type="number"
                    step="0.01"
                    min="0"
                    value={valorPedagio}
                    onChange={(e) => setValorPedagio(Number(e.target.value))}
                    className="border-2 border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor-estacionamento" className="text-foreground">
                  Estacionamento
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">R$</span>
                  <Input
                    id="valor-estacionamento"
                    type="number"
                    step="0.01"
                    min="0"
                    value={valorEstacionamento}
                    onChange={(e) => setValorEstacionamento(Number(e.target.value))}
                    className="border-2 border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor-onibus" className="text-foreground flex items-center gap-2">
                  <Bus className="h-4 w-4 text-muted-foreground" />
                  Passagem de Ônibus
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">R$</span>
                  <Input
                    id="valor-onibus"
                    type="number"
                    step="0.01"
                    min="0"
                    value={valorPassagemOnibus}
                    onChange={(e) => setValorPassagemOnibus(Number(e.target.value))}
                    className="border-2 border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor-aviao" className="text-foreground flex items-center gap-2">
                  <Plane className="h-4 w-4 text-muted-foreground" />
                  Passagem de Avião
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">R$</span>
                  <Input
                    id="valor-aviao"
                    type="number"
                    step="0.01"
                    min="0"
                    value={valorPassagemAviao}
                    onChange={(e) => setValorPassagemAviao(Number(e.target.value))}
                    className="border-2 border-border focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Hospedagem e Alimentação */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Hospedagem e Alimentação</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valor-hospedagem" className="text-foreground flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  Diária de Hospedagem
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">R$</span>
                  <Input
                    id="valor-hospedagem"
                    type="number"
                    step="0.01"
                    min="0"
                    value={valorDiariaHospedagem}
                    onChange={(e) => setValorDiariaHospedagem(Number(e.target.value))}
                    className="border-2 border-border focus:border-primary"
                  />
                  <span className="text-sm font-medium text-muted-foreground">/dia</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor-refeicao" className="text-foreground flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                  Refeição
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">R$</span>
                  <Input
                    id="valor-refeicao"
                    type="number"
                    step="0.01"
                    min="0"
                    value={valorRefeicao}
                    onChange={(e) => setValorRefeicao(Number(e.target.value))}
                    className="border-2 border-border focus:border-primary"
                  />
                  <span className="text-sm font-medium text-muted-foreground">/refeição</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Configurações de Raio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Configurações de Atendimento</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="raio-atendimento" className="text-foreground">
                  Raio de Atendimento (KM)
                </Label>
                <Input
                  id="raio-atendimento"
                  type="number"
                  min="0"
                  value={raioAtendimentoKm}
                  onChange={(e) => setRaioAtendimentoKm(Number(e.target.value))}
                  className="border-2 border-border focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Distância máxima que você atende
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cobra-deslocamento" className="text-foreground">
                  Cobrar deslocamento acima de (KM)
                </Label>
                <Input
                  id="cobra-deslocamento"
                  type="number"
                  min="0"
                  value={cobraDeslocamentoAcimaKm}
                  onChange={(e) => setCobraDeslocamentoAcimaKm(Number(e.target.value))}
                  className="border-2 border-border focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Distância a partir da qual cobra deslocamento
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Despesas Extras Personalizadas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Despesas Extras Personalizadas</h3>
              </div>
              <Button
                type="button"
                onClick={handleAddDespesaExtra}
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>

            <div className="space-y-3">
              {despesasExtras.map((despesa) => (
                <div key={despesa.id} className="flex items-end gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex-1 space-y-2">
                    <Label className="text-foreground text-sm">Nome da Despesa</Label>
                    <Input
                      value={despesa.nome}
                      onChange={(e) => handleUpdateDespesaExtra(despesa.id, 'nome', e.target.value)}
                      placeholder="Ex: Equipamento especial, Certificação..."
                      className="border-2 border-border focus:border-primary"
                    />
                  </div>

                  <div className="w-32 space-y-2">
                    <Label className="text-foreground text-sm">Valor</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">R$</span>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={despesa.valor}
                        onChange={(e) => handleUpdateDespesaExtra(despesa.id, 'valor', Number(e.target.value))}
                        className="border-2 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="w-32 space-y-2">
                    <Label className="text-foreground text-sm">Unidade</Label>
                    <Input
                      value={despesa.unidade}
                      onChange={(e) => handleUpdateDespesaExtra(despesa.id, 'unidade', e.target.value)}
                      placeholder="Ex: por uso"
                      className="border-2 border-border focus:border-primary"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleRemoveDespesaExtra(despesa.id)}
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {despesasExtras.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma despesa extra cadastrada. Clique em "Adicionar" para criar uma.
                </p>
              )}
            </div>
          </div>

          {/* Informações */}
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 space-y-2 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
              ℹ️ Como funciona:
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-6 list-disc">
              <li>Esses valores serão usados para calcular automaticamente os orçamentos</li>
              <li>Você pode ajustar os valores em cada orçamento individualmente</li>
              <li>As despesas extras aparecem como opções ao criar orçamentos</li>
              <li>O cliente verá todos os custos discriminados no orçamento</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 border-t border-border">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salvar Configurações de Despesas'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TechnicianExpensesConfig;
