
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { 
  Building2, 
  UserRound, 
  MapPin, 
  Phone,
  Mail,
  FileText,
  Save,
  ArrowLeft
} from 'lucide-react';

const CompanyProfile = () => {
  const { isAuthenticated, userType, user } = useAuth();
  
  // Redirect to login if not authenticated or not a company
  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/store/company-register" replace />;
  }

  // Handle form submission (mock)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Perfil atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <UserRound className="h-10 w-10 text-primary mr-4" />
              <div>
                <h1 className="text-3xl font-bold">Meu Perfil</h1>
                <p className="text-muted-foreground">
                  Gerencie as informações da sua empresa
                </p>
              </div>
            </div>
            <Link to="/store/company-dashboard">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Dashboard
              </Button>
            </Link>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2" /> 
                    Informações da Empresa
                  </CardTitle>
                  <CardDescription>
                    Dados básicos da sua empresa na plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-muted">
                      <img 
                        src={user?.logo || "/placeholder.svg"} 
                        alt="Logo" 
                        className="max-h-20 max-w-20 object-contain" 
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input 
                        id="companyName" 
                        defaultValue={user?.name || "Doss Group"} 
                        className="mb-2"
                      />
                      <Button type="button" variant="outline" size="sm">
                        Alterar Logo
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Descrição da Empresa</Label>
                    <Textarea 
                      id="description" 
                      defaultValue={user?.description || "Peças originais e componentes para impressoras industriais. Distribuidores autorizados das principais marcas."} 
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input 
                      id="cnpj" 
                      defaultValue={user?.cnpj || "12.345.678/0001-90"}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" /> 
                    Endereço e Contato
                  </CardTitle>
                  <CardDescription>
                    Informações de localização e contato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address">Endereço</Label>
                      <Input 
                        id="address" 
                        defaultValue={user?.address || "Av. Rio Branco, 156 - Centro"}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contactName">Nome do Contato</Label>
                      <Input 
                        id="contactName" 
                        defaultValue={user?.contactName || "João Silva"}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input 
                        id="city" 
                        defaultValue={user?.city || "Rio de Janeiro"}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input 
                          id="state" 
                          defaultValue={user?.state || "RJ"}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">CEP</Label>
                        <Input 
                          id="zipCode" 
                          defaultValue={user?.zipCode || "20040-901"}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone" 
                        defaultValue={user?.phone || "(21) 99999-9999"}
                        className="flex-1"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        defaultValue={user?.email || "loja@exemplo.com"}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" /> 
                    Documentação
                  </CardTitle>
                  <CardDescription>
                    Documentos e certificações da empresa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Contrato de Fornecedor</p>
                        <p className="text-sm text-muted-foreground">Última atualização: 25/03/2025</p>
                      </div>
                      <Button variant="outline" size="sm">Visualizar</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Certidão Negativa</p>
                        <p className="text-sm text-muted-foreground">Última atualização: 10/02/2025</p>
                      </div>
                      <Button variant="outline" size="sm">Visualizar</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Adicionar novo documento</p>
                        <p className="text-sm text-muted-foreground">Anexe documentos necessários para sua operação</p>
                      </div>
                      <Button variant="outline" size="sm">Enviar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyProfile;
