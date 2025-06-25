
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Calculator, MapPin, Wrench, Star } from 'lucide-react';
import { getAllEquipmentTypes } from '@/types/equipment';
import { serviceTypeLabels } from '@/types/technician';
import { useToast } from '@/hooks/use-toast';
import TechnicianPricing from '@/components/technician/TechnicianPricing';
import ImageUpload from '@/components/ui/image-upload';

const TechnicianProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([
    'eco-solvent', 'uv-flexible', 'solvent'
  ]);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'installation', 'maintenance'
  ]);
  
  // Estado para a foto do perfil
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  
  // Estado para dados do perfil
  const [profileData, setProfileData] = useState({
    name: 'Ricardo Oliveira',
    email: 'ricardo.oliveira@exemplo.com',
    phone: '(11) 98765-4321',
    document: '123.456.789-00',
    description: 'Técnico especializado em manutenção de plotters e equipamentos gráficos. Mais de 5 anos de experiência no mercado.',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    serviceArea: 10,
  });
  
  // Estado para preços
  const [pricing, setPricing] = useState({
    visitPrice: 80,
    laborPrice: 120
  });
  
  const { toast } = useToast();
  
  // Dados de exemplo do perfil
  const profile = {
    rating: 4.8,
    reviewCount: 36,
  };
  
  const handleEquipmentChange = (equipmentId: string) => {
    setSelectedEquipment(prev => 
      prev.includes(equipmentId) 
        ? prev.filter(id => id !== equipmentId) 
        : [...prev, equipmentId]
    );
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const handleImageChange = (file: File | null, imageUrl: string | null) => {
    setProfileImageFile(file);
    setProfileImage(imageUrl);
    
    if (file) {
      toast({
        title: "Foto carregada",
        description: `Arquivo "${file.name}" foi carregado com sucesso.`,
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Salvando perfil...', { 
      profileData, 
      profileImageFile, 
      profileImage,
      selectedEquipment,
      selectedServices 
    });
    
    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    }, 1500);
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Salvando preços...', pricing);
    
    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Preços atualizados!",
        description: "Sua tabela de preços foi atualizada com sucesso.",
      });
    }, 1500);
  };
  
  const equipmentOptions = getAllEquipmentTypes();
  
  return (
    <TechnicianLayout title="Meu Perfil">
      <div className="space-y-6 font-inter">
        {/* Header do Perfil */}
        <Card className="bg-white border-2 border-gray-border shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-start justify-between bg-gradient-to-r from-tech-primary to-blue-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage 
                  src={profileImage || ""} 
                  alt={profileData.name} 
                />
                <AvatarFallback className="text-xl bg-white text-tech-primary font-bold">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold text-white">{profileData.name}</CardTitle>
                <CardDescription className="text-blue-100">
                  <div className="flex items-center mt-2">
                    <span className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-tech-accent mr-1 fill-current" />
                      <span className="font-semibold text-white">{profile.rating}</span>
                    </span>
                    <span className="mx-3 text-blue-200">•</span>
                    <span className="text-blue-100">{profile.reviewCount} avaliações</span>
                  </div>
                </CardDescription>
              </div>
            </div>
            
            <div className="space-y-4">
              <ImageUpload
                currentImage={profileImage || undefined}
                onImageChange={handleImageChange}
                size="md"
              />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-secondary text-base leading-relaxed">{profileData.description}</p>
            <div className="flex items-center mt-4 bg-green-50 p-3 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-success mr-3" />
              <span className="text-success font-medium">Perfil verificado</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-light border border-gray-border">
            <TabsTrigger 
              value="personal" 
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Informações Pessoais
            </TabsTrigger>
            <TabsTrigger 
              value="professional"
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Informações Profissionais
            </TabsTrigger>
            <TabsTrigger 
              value="pricing"
              className="font-semibold text-gray-primary data-[state=active]:bg-tech-primary data-[state=active]:text-white"
            >
              Preços
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="mt-6">
            <Card className="bg-white border-2 border-gray-border shadow-sm">
              <form onSubmit={handleSaveProfile}>
                <CardHeader className="bg-gray-light border-b border-gray-border">
                  <CardTitle className="text-xl font-bold text-tech-primary">Dados Pessoais</CardTitle>
                  <CardDescription className="text-gray-secondary">
                    Atualize suas informações pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full-name" className="text-gray-800 font-semibold">Nome Completo</Label>
                      <Input 
                        id="full-name" 
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-800 font-semibold">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-800 font-semibold">Telefone</Label>
                      <Input 
                        id="phone" 
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="document" className="text-gray-800 font-semibold">CNPJ</Label>
                      <Input 
                        id="document" 
                        value={profileData.document}
                        onChange={(e) => handleInputChange('document', e.target.value)}
                        className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-800 font-semibold">Endereço completo</Label>
                    <Input 
                      id="address" 
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-light border-t border-gray-border">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-tech-primary hover:bg-tech-primary-hover text-white font-semibold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:scale-105"
                  >
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="professional" className="mt-6">
            <Card className="bg-white border-2 border-gray-border shadow-sm">
              <form onSubmit={handleSaveProfile}>
                <CardHeader className="bg-gray-light border-b border-gray-border">
                  <CardTitle className="text-xl font-bold text-tech-primary">Perfil Profissional</CardTitle>
                  <CardDescription className="text-gray-secondary">
                    Atualize suas informações profissionais e especialidades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-bold text-tech-primary">Tipos de Equipamentos</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {equipmentOptions.map((equipment) => (
                        <div key={equipment.value} className="flex items-center space-x-3 p-3 border border-gray-border rounded-lg hover:bg-gray-50 transition-colors">
                          <Checkbox 
                            id={`equipment-${equipment.value}`}
                            checked={selectedEquipment.includes(equipment.value)}
                            onCheckedChange={() => handleEquipmentChange(equipment.value)}
                            className="border-2 border-tech-primary data-[state=checked]:bg-tech-primary"
                          />
                          <Label 
                            htmlFor={`equipment-${equipment.value}`}
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            {equipment.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4 border-t border-gray-border pt-6">
                    <Label className="text-lg font-bold text-tech-primary">Tipos de Serviços</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(serviceTypeLabels).map(([value, label]) => (
                        <div key={value} className="flex items-center space-x-3 p-3 border border-gray-border rounded-lg hover:bg-gray-50 transition-colors">
                          <Checkbox 
                            id={`service-${value}`}
                            checked={selectedServices.includes(value)}
                            onCheckedChange={() => handleServiceChange(value)}
                            className="border-2 border-tech-primary data-[state=checked]:bg-tech-primary"
                          />
                          <Label 
                            htmlFor={`service-${value}`}
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                          >
                            {label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2 border-t border-gray-border pt-6">
                    <Label htmlFor="description" className="text-gray-800 font-semibold">Descrição profissional</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Descreva sua experiência, habilidades e serviços oferecidos" 
                      value={profileData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service-area" className="text-gray-800 font-semibold">Área de atendimento (raio em km)</Label>
                    <Input 
                      id="service-area" 
                      type="number" 
                      value={profileData.serviceArea}
                      onChange={(e) => handleInputChange('serviceArea', e.target.value)}
                      className="border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary max-w-32"
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-light border-t border-gray-border">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-tech-primary hover:bg-tech-primary-hover text-white font-semibold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:scale-105"
                  >
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border-2 border-gray-border shadow-sm">
                <form onSubmit={handleSavePricing}>
                  <CardHeader className="bg-gray-light border-b border-gray-border">
                    <CardTitle className="text-xl font-bold text-tech-primary">Configurar Preços</CardTitle>
                    <CardDescription className="text-gray-secondary">
                      Defina os valores para seus serviços
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 p-6">
                    {/* Orçamento - sempre gratuito */}
                    <div className="flex items-center justify-between p-4 bg-success-light rounded-lg border-2 border-success">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-success rounded-lg">
                          <Calculator className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-success">Orçamento</h4>
                          <p className="text-sm text-success">Estimativa detalhada</p>
                        </div>
                      </div>
                      <span className="text-success font-bold text-lg">Gratuito</span>
                    </div>

                    {/* Visita Técnica */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-tech-primary rounded-lg">
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <Label htmlFor="visit-price" className="text-base font-bold text-tech-primary">
                          Taxa de Visita Técnica
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">R$</span>
                        <Input
                          id="visit-price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={pricing.visitPrice}
                          onChange={(e) => setPricing({...pricing, visitPrice: Number(e.target.value)})}
                          className="max-w-32 border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                      </div>
                      <p className="text-sm text-gray-secondary">
                        Custo de deslocamento para visita técnica
                      </p>
                    </div>

                    {/* Mão de Obra */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-tech-accent rounded-lg">
                          <Wrench className="h-5 w-5 text-white" />
                        </div>
                        <Label htmlFor="labor-price" className="text-base font-bold text-tech-primary">
                          Valor da Mão de Obra (por hora)
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">R$</span>
                        <Input
                          id="labor-price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={pricing.laborPrice}
                          onChange={(e) => setPricing({...pricing, laborPrice: Number(e.target.value)})}
                          className="max-w-32 border-2 border-gray-300 focus:border-tech-primary focus:ring-tech-primary"
                        />
                        <span className="text-sm font-medium">/hora</span>
                      </div>
                      <p className="text-sm text-gray-secondary">
                        Valor cobrado por hora de trabalho
                      </p>
                    </div>

                    <div className="text-xs text-gray-500 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      * Materiais e peças são cobrados à parte conforme necessário
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-light border-t border-gray-border">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-tech-primary hover:bg-tech-primary-hover text-white font-semibold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:scale-105"
                    >
                      {isLoading ? 'Salvando...' : 'Salvar Preços'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              {/* Preview da tabela de preços */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-tech-primary">Preview da Tabela de Preços</h3>
                <TechnicianPricing 
                  pricing={{
                    quotePrice: 0,
                    visitPrice: pricing.visitPrice,
                    laborPrice: pricing.laborPrice
                  }} 
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianProfile;
