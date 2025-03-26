
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle } from 'lucide-react';

const TechnicianProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Dados de exemplo do perfil
  const profile = {
    name: 'Ricardo Oliveira',
    email: 'ricardo.oliveira@exemplo.com',
    phone: '(11) 98765-4321',
    document: '123.456.789-00',
    specialty: 'computadores',
    description: 'Técnico especializado em manutenção de computadores, notebooks e instalação de redes. Mais de 5 anos de experiência no mercado.',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    rating: 4.8,
    reviewCount: 36,
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      // Lógica de salvar
    }, 1500);
  };
  
  return (
    <TechnicianLayout title="Meu Perfil">
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
            <TabsTrigger value="professional">Informações Profissionais</TabsTrigger>
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
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Especialidades</Label>
                    <RadioGroup defaultValue={profile.specialty}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general">Reparos Gerais</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="computadores" id="computadores" />
                          <Label htmlFor="computadores">Computadores</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="eletrodomesticos" id="eletrodomesticos" />
                          <Label htmlFor="eletrodomesticos">Eletrodomésticos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="eletronicos" id="eletronicos" />
                          <Label htmlFor="eletronicos">Eletrônicos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="redes" id="redes" />
                          <Label htmlFor="redes">Redes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="outros" id="outros" />
                          <Label htmlFor="outros">Outros</Label>
                        </div>
                      </div>
                    </RadioGroup>
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
                    <Label htmlFor="hourly-rate">Valor da hora de serviço (R$)</Label>
                    <Input id="hourly-rate" type="number" placeholder="100" />
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
        </Tabs>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianProfile;
