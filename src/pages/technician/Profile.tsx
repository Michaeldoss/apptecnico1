
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
import { CheckCircle, Calculator, MapPin, Wrench } from 'lucide-react';
import { getAllEquipmentTypes } from '@/types/equipment';
import { serviceTypeLabels } from '@/types/technician';
import { useToast } from '@/hooks/use-toast';
import TechnicianPricing from '@/components/technician/TechnicianPricing';

const TechnicianProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([
    'eco-solvent', 'uv-flexible', 'solvent'
  ]);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'installation', 'maintenance'
  ]);
  
  // Estado para preços
  const [pricing, setPricing] = useState({
    visitPrice: 80,
    laborPrice: 120
  });
  
  const { toast } = useToast();
  
  // Dados de exemplo do perfil
  const profile = {
    name: 'Ricardo Oliveira',
    email: 'ricardo.oliveira@exemplo.com',
    phone: '(11) 98765-4321',
    document: '123.456.789-00',
    specialty: 'eco-solvent',
    description: 'Técnico especializado em manutenção de plotters e equipamentos gráficos. Mais de 5 anos de experiência no mercado.',
    address: 'Av. Paulista, 1000, São Paulo - SP',
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
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso."
      });
    }, 1500);
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Preços atualizados",
        description: "Sua tabela de preços foi atualizada com sucesso."
      });
    }, 1500);
  };
  
  const equipmentOptions = getAllEquipmentTypes();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt={profile.name} />
              <AvatarFallback className="text-lg">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{profile.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center mt-1">
                  <span className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{profile.rating}</span>
                  </span>
                  <span className="mx-2">•</span>
                  <span>{profile.reviewCount} avaliações</span>
                </div>
              </CardDescription>
            </div>
          </div>
          <Button>Alterar Foto</Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{profile.description}</p>
          <div className="flex items-center mt-4">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm">Perfil verificado</span>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="professional">Informações Profissionais</TabsTrigger>
          <TabsTrigger value="pricing">Preços</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-4">
          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Nome Completo</Label>
                    <Input id="full-name" defaultValue={profile.name} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={profile.email} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue={profile.phone} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="document">CNPJ</Label>
                    <Input id="document" defaultValue={profile.document} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço completo</Label>
                  <Input id="address" defaultValue={profile.address} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="professional" className="mt-4">
          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Perfil Profissional</CardTitle>
                <CardDescription>
                  Atualize suas informações profissionais e especialidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg">Tipos de Equipamentos</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {equipmentOptions.map((equipment) => (
                      <div key={equipment.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`equipment-${equipment.value}`}
                          checked={selectedEquipment.includes(equipment.value)}
                          onCheckedChange={() => handleEquipmentChange(equipment.value)}
                        />
                        <Label 
                          htmlFor={`equipment-${equipment.value}`}
                          className="text-sm"
                        >
                          {equipment.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4 border-t pt-4">
                  <Label className="text-lg">Tipos de Serviços</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(serviceTypeLabels).map(([value, label]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`service-${value}`}
                          checked={selectedServices.includes(value)}
                          onCheckedChange={() => handleServiceChange(value)}
                        />
                        <Label 
                          htmlFor={`service-${value}`}
                          className="text-sm"
                        >
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição profissional</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descreva sua experiência, habilidades e serviços oferecidos" 
                    defaultValue={profile.description}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service-area">Área de atendimento (raio em km)</Label>
                  <Input id="service-area" type="number" placeholder="10" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <form onSubmit={handleSavePricing}>
                <CardHeader>
                  <CardTitle>Configurar Preços</CardTitle>
                  <CardDescription>
                    Defina os valores para seus serviços
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Orçamento - sempre gratuito */}
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <Calculator className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-medium text-green-800">Orçamento</h4>
                        <p className="text-sm text-green-600">Estimativa detalhada</p>
                      </div>
                    </div>
                    <span className="text-green-800 font-medium">Gratuito</span>
                  </div>

                  {/* Visita Técnica */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <Label htmlFor="visit-price" className="text-base font-medium">
                        Taxa de Visita Técnica
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">R$</span>
                      <Input
                        id="visit-price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={pricing.visitPrice}
                        onChange={(e) => setPricing({...pricing, visitPrice: Number(e.target.value)})}
                        className="max-w-32"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Custo de deslocamento para visita técnica
                    </p>
                  </div>

                  {/* Mão de Obra */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-orange-600" />
                      <Label htmlFor="labor-price" className="text-base font-medium">
                        Valor da Mão de Obra (por hora)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">R$</span>
                      <Input
                        id="labor-price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={pricing.laborPrice}
                        onChange={(e) => setPricing({...pricing, laborPrice: Number(e.target.value)})}
                        className="max-w-32"
                      />
                      <span className="text-sm">/hora</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Valor cobrado por hora de trabalho
                    </p>
                  </div>

                  <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
                    * Materiais e peças são cobrados à parte conforme necessário
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : 'Salvar Preços'}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            {/* Preview da tabela de preços */}
            <div>
              <h3 className="text-lg font-medium mb-4">Preview da Tabela de Preços</h3>
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
  );
};

export default TechnicianProfile;
