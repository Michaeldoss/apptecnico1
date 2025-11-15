
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
    serialNumber: '',
    usageHours: 0,
    lastHeadReplacement: '',
    lastPreventiveMaintenance: '',
    technicalNotes: '',
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
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20"></div>
        <div className="absolute top-6 left-6 w-24 h-24 bg-background/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-6 right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Link to="/sell-equipment">
                <Button variant="outline" size="sm" className="bg-background/10 border-background/30 text-background hover:bg-background hover:text-primary backdrop-blur-sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-background drop-shadow-lg mb-3">Anunciar Equipamento</h1>
              <p className="text-lg md:text-xl text-background/90">Preencha as informações do seu equipamento</p>
            </div>
          </div>
        </div>
      </section>
      
      <main className="flex-grow container mx-auto px-4 py-8 bg-background">
        <div className="max-w-2xl mx-auto">

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader className="bg-muted/50 border-b border-border">
                <CardTitle className="text-card-foreground font-semibold">Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor="title" className="text-card-foreground">Título do Anúncio *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ex: Plotter Roland VersaCAMM VS-640i"
                    required
                    className="mt-1.5"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand" className="text-card-foreground">Marca *</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="Ex: Roland, Epson, Mimaki"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="model" className="text-card-foreground">Modelo *</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="Ex: VersaCAMM VS-640i"
                      required
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year" className="text-card-foreground">Ano</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                      min="1990"
                      max={new Date().getFullYear()}
                      className="mt-1.5"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="condition" className="text-card-foreground">Estado *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                      <SelectTrigger className="mt-1.5">
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
                  <Label htmlFor="price" className="text-card-foreground">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-card-foreground">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva o equipamento, estado de conservação, acessórios inclusos..."
                    rows={4}
                    required
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="bg-muted/50 border-b border-border">
                <CardTitle className="text-card-foreground font-semibold">Localização</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-card-foreground">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Ex: São Paulo"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state" className="text-card-foreground">Estado *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="Ex: SP"
                      required
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="bg-muted/50 border-b border-border">
                <CardTitle className="text-card-foreground font-semibold">Informações Técnicas</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor="serialNumber" className="text-card-foreground">Número de Série</Label>
                  <Input
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                    placeholder="Ex: ABC123456789"
                    className="mt-1.5"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="usageHours" className="text-card-foreground">Horas de Uso</Label>
                    <Input
                      id="usageHours"
                      type="number"
                      value={formData.usageHours}
                      onChange={(e) => handleInputChange('usageHours', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      min="0"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastHeadReplacement" className="text-card-foreground">Última Troca de Cabeça</Label>
                    <Input
                      id="lastHeadReplacement"
                      type="date"
                      value={formData.lastHeadReplacement}
                      onChange={(e) => handleInputChange('lastHeadReplacement', e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lastPreventiveMaintenance" className="text-card-foreground">Última Manutenção Preventiva</Label>
                  <Input
                    id="lastPreventiveMaintenance"
                    type="date"
                    value={formData.lastPreventiveMaintenance}
                    onChange={(e) => handleInputChange('lastPreventiveMaintenance', e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="technicalNotes" className="text-card-foreground">Observações Técnicas</Label>
                  <Textarea
                    id="technicalNotes"
                    value={formData.technicalNotes}
                    onChange={(e) => handleInputChange('technicalNotes', e.target.value)}
                    placeholder="Histórico de manutenções, peças trocadas, upgrades realizados..."
                    rows={3}
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="bg-muted/50 border-b border-border">
                <CardTitle className="text-card-foreground font-semibold">Fotos do Equipamento</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square border border-border rounded-lg overflow-hidden">
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
                      <label className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors bg-muted/30">
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-primary/60" />
                          <span className="text-sm text-card-foreground font-medium">Adicionar Foto</span>
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
                  <p className="text-sm text-muted-foreground">
                    Adicione até 5 fotos. Fotos de qualidade ajudam a vender mais rápido.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="bg-muted/50 border-b border-border">
                <CardTitle className="text-card-foreground font-semibold">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor="contactName" className="text-card-foreground">Nome completo *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    required
                    className="mt-1.5"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPhone" className="text-card-foreground">Telefone *</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactWhatsapp" className="text-card-foreground">WhatsApp</Label>
                    <Input
                      id="contactWhatsapp"
                      value={formData.contactWhatsapp}
                      onChange={(e) => handleInputChange('contactWhatsapp', e.target.value)}
                      placeholder="11999999999"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactEmail" className="text-card-foreground">E-mail *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    required
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link to="/sell-equipment">
                <Button type="button" variant="outline" className="border-border">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
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
