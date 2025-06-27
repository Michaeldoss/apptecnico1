
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Save, 
  Copy, 
  Package,
  Upload,
  X,
  Plus
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { ProductCategory, EquipmentType } from '@/types/marketplace';

const categoryOptions: { value: ProductCategory; label: string }[] = [
  { value: 'damper', label: 'Dampers' },
  { value: 'capping', label: 'Cappings' },
  { value: 'wiper', label: 'Wipers' },
  { value: 'flat-cable', label: 'Flat Cables' },
  { value: 'cabeca-impressao', label: 'Cabeças de Impressão' },
  { value: 'filtros', label: 'Filtros' },
  { value: 'rolos', label: 'Rolos' },
  { value: 'placas', label: 'Placas' },
  { value: 'motores', label: 'Motores' },
  { value: 'sensores', label: 'Sensores' },
  { value: 'fusores', label: 'Fusores' },
  { value: 'bombas', label: 'Bombas' },
  { value: 'correias', label: 'Correias' },
  { value: 'pecas-uv', label: 'Peças UV' },
  { value: 'pecas-dtf', label: 'Peças DTF' },
  { value: 'eco-solvente', label: 'Eco-solvente' },
  { value: 'sublimacao', label: 'Sublimação' },
  { value: 'cnc', label: 'CNC' },
  { value: 'outros', label: 'Outros' }
];

const equipmentTypes: EquipmentType[] = ['DTF', 'UV', 'Solvente', 'Eco-solvente', 'Sublimática', 'CNC', 'Látex', 'Plotters', 'Outros'];

const ProductCreate = () => {
  const { isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedEquipmentTypes, setSelectedEquipmentTypes] = useState<EquipmentType[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [compatibleModels, setCompatibleModels] = useState<string[]>(['']);
  const [newBrand, setNewBrand] = useState('');
  
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '' as ProductCategory,
    subcategoria: '',
    descricao: '',
    especificacoesTecnicas: '',
    codigoInterno: '',
    sku: '',
    ncm: '',
    referenciaFabricante: '',
    quantidadeEstoque: 0,
    precoCusto: 0,
    markup: 50, // 50% default
    precoSugerido: 0,
    precoFinal: 0,
    peso: 0,
    comprimento: 0,
    largura: 0,
    altura: 0,
    garantiaDias: 90,
    notaFiscalDisponivel: true,
    observacoes: ''
  });

  // Redirect if not authenticated or not a company
  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/loja/register" replace />;
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-calculate suggested price when cost or markup changes
      if (field === 'precoCusto' || field === 'markup') {
        const cost = field === 'precoCusto' ? value : prev.precoCusto;
        const markupPercent = field === 'markup' ? value : prev.markup;
        const suggested = cost * (1 + markupPercent / 100);
        newData.precoSugerido = suggested;
        
        // Auto-set final price if not manually changed
        if (prev.precoFinal === prev.precoSugerido || prev.precoFinal === 0) {
          newData.precoFinal = suggested;
        }
      }
      
      return newData;
    });
  };

  const handleEquipmentTypeToggle = (type: EquipmentType) => {
    setSelectedEquipmentTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const addBrand = () => {
    if (newBrand.trim() && !selectedBrands.includes(newBrand.trim())) {
      setSelectedBrands(prev => [...prev, newBrand.trim()]);
      setNewBrand('');
    }
  };

  const addCompatibleModel = () => {
    setCompatibleModels(prev => [...prev, '']);
  };

  const updateCompatibleModel = (index: number, value: string) => {
    setCompatibleModels(prev => prev.map((model, i) => i === index ? value : model));
  };

  const removeCompatibleModel = (index: number) => {
    setCompatibleModels(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Mock image upload - in production would upload to storage service
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Limit to 5 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.nome || !formData.categoria || !formData.descricao) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      if (selectedEquipmentTypes.length === 0) {
        throw new Error('Selecione pelo menos um tipo de equipamento');
      }

      if (selectedBrands.length === 0) {
        throw new Error('Selecione pelo menos uma marca compatível');
      }

      // Mock product creation - in production would call API
      const productData = {
        ...formData,
        tipoEquipamento: selectedEquipmentTypes,
        marca: selectedBrands,
        modelosCompativeis: compatibleModels.filter(model => model.trim() !== ''),
        imagens: images,
        imagemPrincipal: images[0] || '/placeholder.svg',
        id: Date.now().toString(),
        vendorId: 'current-user-id',
        vendorName: 'Sua Loja',
        vendorRating: 4.5,
        dimensoes: {
          comprimento: formData.comprimento,
          largura: formData.largura,
          altura: formData.altura
        },
        ativo: true,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString()
      };

      console.log('Produto criado:', productData);
      
      toast({
        title: "Produto cadastrado com sucesso!",
        description: "Seu produto foi adicionado ao marketplace.",
      });

      navigate('/loja/products');
    } catch (error) {
      toast({
        title: "Erro ao cadastrar produto",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const duplicateProduct = () => {
    // Implementation for duplicating product
    toast({
      title: "Produto duplicado",
      description: "Uma cópia foi criada para edição.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link to="/loja/products">
                <Button variant="outline" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Cadastrar Produto</h1>
                <p className="text-gray-600">Adicione um novo produto ao marketplace</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome do Produto *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Ex: Damper UV Premium - Epson DX5"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="categoria">Categoria *</Label>
                    <Select 
                      value={formData.categoria} 
                      onValueChange={(value) => handleInputChange('categoria', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                    placeholder="Descreva o produto de forma clara e detalhada"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="especificacoesTecnicas">Especificações Técnicas</Label>
                  <Textarea
                    id="especificacoesTecnicas"
                    value={formData.especificacoesTecnicas}
                    onChange={(e) => handleInputChange('especificacoesTecnicas', e.target.value)}
                    placeholder="Ex: Material: Silicone premium, Pressão: 0.02-0.05 MPa"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Imagens do Produto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                        <img src={image} alt={`Produto ${index + 1}`} className="w-full h-full object-cover" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        {index === 0 && (
                          <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            Principal
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {images.length < 5 && (
                      <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400">
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-gray-600">Adicionar Foto</span>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Adicione até 5 imagens. A primeira será a imagem principal.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Compatibility */}
            <Card>
              <CardHeader>
                <CardTitle>Compatibilidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Tipo de Equipamento *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {equipmentTypes.map(type => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={selectedEquipmentTypes.includes(type)}
                          onCheckedChange={() => handleEquipmentTypeToggle(type)}
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Marcas Compatíveis *</Label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        placeholder="Digite uma marca"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBrand())}
                      />
                      <Button type="button" onClick={addBrand}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Epson', 'Canon', 'HP', 'Grando', 'Allwin', 'Mimaki', 'Roland'].map(brand => (
                        <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => handleBrandToggle(brand)}
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                    {selectedBrands.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {selectedBrands.map(brand => (
                          <span key={brand} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {brand}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Modelos Compatíveis</Label>
                  <div className="space-y-2">
                    {compatibleModels.map((model, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={model}
                          onChange={(e) => updateCompatibleModel(index, e.target.value)}
                          placeholder="Ex: R1900, L1300, etc."
                        />
                        {compatibleModels.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeCompatibleModel(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addCompatibleModel}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Modelo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Data */}
            <Card>
              <CardHeader>
                <CardTitle>Dados Técnicos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="codigoInterno">Código Interno *</Label>
                    <Input
                      id="codigoInterno"
                      value={formData.codigoInterno}
                      onChange={(e) => handleInputChange('codigoInterno', e.target.value)}
                      placeholder="DMP-UV-001"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      placeholder="SKU do produto"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ncm">NCM</Label>
                    <Input
                      id="ncm"
                      value={formData.ncm}
                      onChange={(e) => handleInputChange('ncm', e.target.value)}
                      placeholder="12345678"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="referenciaFabricante">Referência do Fabricante</Label>
                  <Input
                    id="referenciaFabricante"
                    value={formData.referenciaFabricante}
                    onChange={(e) => handleInputChange('referenciaFabricante', e.target.value)}
                    placeholder="EPD-DX5-UV"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing and Stock */}
            <Card>
              <CardHeader>
                <CardTitle>Preço e Estoque</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="quantidadeEstoque">Quantidade em Estoque *</Label>
                      <Input
                        id="quantidadeEstoque"
                        type="number"
                        value={formData.quantidadeEstoque}
                        onChange={(e) => handleInputChange('quantidadeEstoque', parseInt(e.target.value) || 0)}
                        min="0"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="precoCusto">Preço de Custo (R$)</Label>
                      <Input
                        id="precoCusto"
                        type="number"
                        step="0.01"
                        value={formData.precoCusto}
                        onChange={(e) => handleInputChange('precoCusto', parseFloat(e.target.value) || 0)}
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="markup">Markup (%)</Label>
                      <Input
                        id="markup"
                        type="number"
                        value={formData.markup}
                        onChange={(e) => handleInputChange('markup', parseFloat(e.target.value) || 0)}
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="precoSugerido">Preço Sugerido (R$)</Label>
                      <Input
                        id="precoSugerido"
                        type="number"
                        step="0.01"
                        value={formData.precoSugerido.toFixed(2)}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="precoFinal">Preço Final (R$) *</Label>
                  <Input
                    id="precoFinal"
                    type="number"
                    step="0.01"
                    value={formData.precoFinal}
                    onChange={(e) => handleInputChange('precoFinal', parseFloat(e.target.value) || 0)}
                    min="0"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Logistics */}
            <Card>
              <CardHeader>
                <CardTitle>Logística</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="peso">Peso (kg)</Label>
                    <Input
                      id="peso"
                      type="number"
                      step="0.01"
                      value={formData.peso}
                      onChange={(e) => handleInputChange('peso', parseFloat(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="comprimento">Comprimento (cm)</Label>
                    <Input
                      id="comprimento"
                      type="number"
                      value={formData.comprimento}
                      onChange={(e) => handleInputChange('comprimento', parseFloat(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="largura">Largura (cm)</Label>
                    <Input
                      id="largura"
                      type="number"
                      value={formData.largura}
                      onChange={(e) => handleInputChange('largura', parseFloat(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="altura">Altura (cm)</Label>
                    <Input
                      id="altura"
                      type="number"
                      value={formData.altura}
                      onChange={(e) => handleInputChange('altura', parseFloat(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Adicionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="garantiaDias">Garantia (dias)</Label>
                    <Input
                      id="garantiaDias"
                      type="number"
                      value={formData.garantiaDias}
                      onChange={(e) => handleInputChange('garantiaDias', parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="notaFiscalDisponivel"
                      checked={formData.notaFiscalDisponivel}
                      onCheckedChange={(checked) => handleInputChange('notaFiscalDisponivel', checked)}
                    />
                    <Label htmlFor="notaFiscalDisponivel">Nota fiscal disponível</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    placeholder="Informações adicionais sobre o produto"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Salvando..." : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Produto
                  </>
                )}
              </Button>
              
              <Button type="button" variant="outline" onClick={duplicateProduct}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicar Produto
              </Button>
              
              <Button type="button" variant="outline" disabled>
                <Package className="h-4 w-4 mr-2" />
                Inativar Produto
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductCreate;
