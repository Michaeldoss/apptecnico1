
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, DollarSign, MapPin, Phone, Mail, Camera, FileText, AlertCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { equipmentTypeLabels } from '@/types/equipment';
import { SellEquipmentCondition, equipmentConditionLabels } from '@/types/sellEquipment';
import { useToast } from '@/hooks/use-toast';

const SellEquipmentCreate = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    brand: '',
    model: '',
    year: '',
    condition: '' as SellEquipmentCondition | '',
    price: '',
    description: '',
    city: '',
    state: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactWhatsapp: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (images.length + newImages.length > 6) {
        toast({
          title: "Limite excedido",
          description: "Você pode adicionar no máximo 6 imagens.",
          variant: "destructive"
        });
        return;
      }
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação básica
    if (!formData.title || !formData.type || !formData.brand || !formData.condition || !formData.price) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Imagens necessárias",
        description: "Adicione pelo menos uma foto do equipamento.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simular criação do anúncio
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Anúncio criado com sucesso!",
        description: "Seu equipamento foi anunciado e está aguardando aprovação.",
      });
      
      // Reset form
      setFormData({
        title: '',
        type: '',
        brand: '',
        model: '',
        year: '',
        condition: '',
        price: '',
        description: '',
        city: '',
        state: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        contactWhatsapp: ''
      });
      setImages([]);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vender Meu Equipamento
            </h1>
            <p className="text-lg text-gray-600">
              Anuncie seu equipamento gráfico de forma rápida e segura. 
              Alcance milhares de compradores interessados!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações do Equipamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informações do Equipamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Anúncio *</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Plotter Roland VersaCAMM VS-640i"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Equipamento *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(equipmentTypeLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marca *</Label>
                    <Input
                      id="brand"
                      placeholder="Ex: Roland, Mimaki, HP"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo *</Label>
                    <Input
                      id="model"
                      placeholder="Ex: VersaCAMM VS-640i"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year">Ano (opcional)</Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="2023"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="condition">Estado de Conservação *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value as SellEquipmentCondition)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(equipmentConditionLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="50000"
                        className="pl-10"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva as condições do equipamento, histórico de uso, inclusos, etc..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Fotos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Fotos do Equipamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    <p className="text-sm text-blue-700">
                      Adicione fotos nítidas e bem iluminadas. Anúncios com mais fotos recebem 3x mais contatos!
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    {images.length < 6 && (
                      <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Adicionar foto</span>
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
                  
                  <p className="text-xs text-gray-500">
                    Máximo 6 fotos. Formatos aceitos: JPG, PNG, WebP
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Localização */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      placeholder="São Paulo"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado *</Label>
                    <Input
                      id="state"
                      placeholder="SP"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contato */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nome para Contato *</Label>
                    <Input
                      id="contactName"
                      placeholder="João Silva"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">E-mail *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="joao@exemplo.com"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Telefone *</Label>
                    <Input
                      id="contactPhone"
                      placeholder="(11) 99999-9999"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactWhatsapp">WhatsApp (opcional)</Label>
                    <Input
                      id="contactWhatsapp"
                      placeholder="11999999999"
                      value={formData.contactWhatsapp}
                      onChange={(e) => handleInputChange('contactWhatsapp', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumo e Envio */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Anúncio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Equipamento:</strong> {formData.title || 'Não informado'}</p>
                  <p><strong>Marca/Modelo:</strong> {formData.brand} {formData.model}</p>
                  <p><strong>Estado:</strong> {formData.condition ? equipmentConditionLabels[formData.condition] : 'Não informado'}</p>
                  <p><strong>Preço:</strong> {formData.price ? `R$ ${parseFloat(formData.price).toLocaleString('pt-BR')}` : 'Não informado'}</p>
                  <p><strong>Localização:</strong> {formData.city}, {formData.state}</p>
                  <p><strong>Fotos:</strong> {images.length} foto(s) adicionada(s)</p>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-2 p-4 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-700">
                      <p className="font-medium mb-1">Importante:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Seu anúncio será analisado antes de ser publicado</li>
                        <li>Mantenha seu telefone/WhatsApp disponível para contato</li>
                        <li>Seja honesto sobre o estado do equipamento</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Publicando anúncio...
                      </span>
                    ) : (
                      'Publicar Anúncio'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellEquipmentCreate;
