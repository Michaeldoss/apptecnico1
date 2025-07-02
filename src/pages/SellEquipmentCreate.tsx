
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SellEquipmentCondition, equipmentConditionLabels } from '@/types/sellEquipment';
import { toast } from '@/hooks/use-toast';

const SellEquipmentCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    condition: 'seminovo' as SellEquipmentCondition,
    price: 0,
    description: '',
    city: '',
    state: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactWhatsapp: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Equipamento cadastrado!",
        description: "Seu anúncio foi criado com sucesso.",
      });
      
      navigate('/sell-equipment');
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: "Não foi possível criar o anúncio. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
        <div className="absolute top-6 left-6 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-6 right-6 w-32 h-32 bg-yellow-300/10 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-4">
              <Link to="/sell-equipment">
                <Button variant="outline" size="sm" className="mr-4 bg-white/10 border-white/30 text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Anunciar Equipamento</h1>
                <p className="text-white/90 drop-shadow-md">Preencha as informações do seu equipamento</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título do Anúncio *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ex: Plotter Roland VersaCAMM VS-640i"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Marca *</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="Ex: Roland, Epson, Mimaki"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="model">Modelo *</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="Ex: VersaCAMM VS-640i"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Ano</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                      min="1990"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="condition">Estado *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                      <SelectTrigger>
                        <SelectValue />
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
                </div>

                <div>
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva o equipamento, estado de conservação, acessórios inclusos..."
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Ex: São Paulo"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="Ex: SP"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fotos do Equipamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                        <img src={image} alt={`Equipamento ${index + 1}`} className="w-full h-full object-cover" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
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
                    Adicione até 5 fotos. Fotos de qualidade ajudam a vender mais rápido.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactName">Nome completo *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPhone">Telefone *</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactWhatsapp">WhatsApp</Label>
                    <Input
                      id="contactWhatsapp"
                      value={formData.contactWhatsapp}
                      onChange={(e) => handleInputChange('contactWhatsapp', e.target.value)}
                      placeholder="11999999999"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactEmail">E-mail *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Salvando..." : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Publicar Anúncio
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellEquipmentCreate;
