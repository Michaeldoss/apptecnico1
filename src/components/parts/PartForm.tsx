
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/components/ui/image-upload';
import { Calculator, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PartFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PartForm: React.FC<PartFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mcmCode: '',
    category: '',
    machine: '',
    type: 'nova' as 'nova' | 'usada' | 'recondicionada',
    purchasePrice: 0,
    shippingCost: 0,
    additionalCosts: 0,
    markupPercent: 100,
    finalPrice: 0,
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    invoiceNumber: '',
    description: ''
  });

  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();

  const totalCost = formData.purchasePrice + formData.shippingCost + formData.additionalCosts;
  const suggestedPrice = totalCost * (1 + formData.markupPercent / 100);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculatePrice = () => {
    setFormData(prev => ({
      ...prev,
      finalPrice: suggestedPrice
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.name || !formData.mcmCode || !formData.category) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Peça cadastrada!",
      description: `${formData.name} foi adicionada ao estoque.`
    });
    
    onClose();
  };

  const handleImageChange = (file: File | null, imageUrl: string | null) => {
    if (imageUrl) {
      setImages(prev => [...prev, imageUrl]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Cadastrar Nova Peça</DialogTitle>
            <DialogDescription>
              Adicione uma nova peça ao seu controle de estoque
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* Upload de Imagens */}
            <div className="space-y-2">
              <Label>Fotos da Peça</Label>
              <ImageUpload 
                onImageChange={handleImageChange}
                size="md"
              />
            </div>

            <Separator />

            {/* Informações Básicas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Peça *</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ex: Capping DX5"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mcm">Código MCM/SKU *</Label>
                <Input 
                  id="mcm"
                  value={formData.mcmCode}
                  onChange={(e) => handleInputChange('mcmCode', e.target.value)}
                  placeholder="Ex: CAP-DX5-001"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cabecote">Cabeçote</SelectItem>
                    <SelectItem value="placa">Placa</SelectItem>
                    <SelectItem value="motor">Motor</SelectItem>
                    <SelectItem value="damper">Damper</SelectItem>
                    <SelectItem value="correia">Correia</SelectItem>
                    <SelectItem value="sensor">Sensor</SelectItem>
                    <SelectItem value="fonte">Fonte</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="machine">Máquina Associada</Label>
                <Input 
                  id="machine"
                  value={formData.machine}
                  onChange={(e) => handleInputChange('machine', e.target.value)}
                  placeholder="Ex: Epson F170, Grando 60cm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo da Peça</Label>
                <Select onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nova" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nova">Nova</SelectItem>
                    <SelectItem value="usada">Usada</SelectItem>
                    <SelectItem value="recondicionada">Recondicionada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice">Número da NF</Label>
                <Input 
                  id="invoice"
                  value={formData.invoiceNumber}
                  onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                  placeholder="Opcional"
                />
              </div>
            </div>

            <Separator />

            {/* Custos e Preços */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Custos e Formação de Preço</Label>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchase">Valor de Compra (R$)</Label>
                  <Input 
                    id="purchase"
                    type="number"
                    step="0.01"
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipping">Frete (R$)</Label>
                  <Input 
                    id="shipping"
                    type="number"
                    step="0.01"
                    value={formData.shippingCost}
                    onChange={(e) => handleInputChange('shippingCost', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additional">Custos Adicionais (R$)</Label>
                  <Input 
                    id="additional"
                    type="number"
                    step="0.01"
                    value={formData.additionalCosts}
                    onChange={(e) => handleInputChange('additionalCosts', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Custo Total:</span>
                  <Badge variant="outline" className="text-lg">
                    R$ {totalCost.toFixed(2)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="markup">Markup (%)</Label>
                  <Input 
                    id="markup"
                    type="number"
                    value={formData.markupPercent}
                    onChange={(e) => handleInputChange('markupPercent', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Preço Sugerido</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={`R$ ${suggestedPrice.toFixed(2)}`}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Button 
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={handleCalculatePrice}
                    >
                      <Calculator className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="final">Preço Final (R$)</Label>
                  <Input 
                    id="final"
                    type="number"
                    step="0.01"
                    value={formData.finalPrice}
                    onChange={(e) => handleInputChange('finalPrice', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Controle de Estoque */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Controle de Estoque</Label>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Quantidade Atual</Label>
                  <Input 
                    id="current"
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => handleInputChange('currentStock', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min">Estoque Mínimo</Label>
                  <Input 
                    id="min"
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => handleInputChange('minStock', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max">Estoque Máximo</Label>
                  <Input 
                    id="max"
                    type="number"
                    value={formData.maxStock}
                    onChange={(e) => handleInputChange('maxStock', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição (Opcional)</Label>
              <Textarea 
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detalhes adicionais sobre a peça..."
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Cadastrar Peça
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartForm;
