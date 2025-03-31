
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CustomerProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Dados de exemplo do perfil
  const profile = {
    name: 'Ana Silva',
    email: 'ana.silva@exemplo.com',
    phone: '(11) 98765-4321',
    document: '123.456.789-00',
    address: 'Rua das Flores, 123, São Paulo - SP',
    cep: '01234-567',
    city: 'São Paulo',
    state: 'SP',
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    }, 1500);
  };
  
  return (
    <CustomerLayout title="Meu Perfil">
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
                  <span className="text-muted-foreground">{profile.email}</span>
                </CardDescription>
              </div>
            </div>
            <Button>Alterar Foto</Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mt-2">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">Conta verificada</span>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
            <TabsTrigger value="address">Endereço</TabsTrigger>
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
                      <Label htmlFor="document">CPF</Label>
                      <Input id="document" defaultValue={profile.document} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Alterar Senha</Label>
                    <Input id="password" type="password" placeholder="Digite a nova senha" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirme a nova senha" />
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
          
          <TabsContent value="address" className="mt-4">
            <Card>
              <form onSubmit={handleSaveProfile}>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                  <CardDescription>
                    Atualize seu endereço para entrega e retirada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Endereço completo</Label>
                      <Input id="address" defaultValue={profile.address} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" defaultValue={profile.cep} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" defaultValue={profile.city} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input id="state" defaultValue={profile.state} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional-info">Complemento</Label>
                    <Textarea 
                      id="additional-info" 
                      placeholder="Informações adicionais para entrega (apartamento, referências, etc.)" 
                      rows={3}
                    />
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
    </CustomerLayout>
  );
};

export default CustomerProfile;
