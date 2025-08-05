
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { 
  Building2, 
  UserRound, 
  MapPin, 
  Phone,
  Mail,
  FileText,
  Save,
  ArrowLeft,
  Wrench,
  CheckCircle,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const CompanyProfile = () => {
  const { isAuthenticated, userType, user } = useAuth();
  const [offersTechnicalService, setOffersTechnicalService] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Redirect to login if not authenticated or not a company
  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/loja/register" replace />;
  }

  // Handle form submission (mock)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Perfil atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
    }, 1500);
  };

  const handleTechProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Configurações técnicas salvas",
        description: "Seu perfil de assistência técnica foi atualizado com sucesso.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Building2 className="h-10 w-10 text-primary mr-4" />
              <div>
                <h1 className="text-3xl font-bold">Meu Perfil - Lojista</h1>
                <p className="text-muted-foreground">
                  Gerencie as informações da sua empresa
                </p>
              </div>
            </div>
            <Link to="/loja/dashboard">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Dashboard
              </Button>
            </Link>
          </div>
          
          <Tabs defaultValue="company">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="company">Empresa</TabsTrigger>
              <TabsTrigger value="technical">Assistência Técnica</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="company">
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
                          defaultValue={user?.cnpj || ""}
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
                  
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" disabled={loading}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Salvando..." : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="technical">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wrench className="h-5 w-5 mr-2" /> 
                    Assistência Técnica
                  </CardTitle>
                  <CardDescription>
                    Configure sua empresa como prestadora de serviços técnicos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="technical-services" 
                      checked={offersTechnicalService}
                      onCheckedChange={setOffersTechnicalService}
                    />
                    <Label htmlFor="technical-services">Oferecer serviços de assistência técnica</Label>
                  </div>
                  
                  {offersTechnicalService && (
                    <form onSubmit={handleTechProfileSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="tech-description">Descrição dos serviços técnicos</Label>
                        <Textarea 
                          id="tech-description" 
                          placeholder="Descreva quais tipos de serviços técnicos sua empresa oferece, especialidades, equipamentos atendidos, etc."
                          rows={4}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="service-area">Área de atendimento (km)</Label>
                          <Input 
                            id="service-area" 
                            type="number"
                            placeholder="10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="hourly-rate">Valor hora técnica (R$)</Label>
                          <Input 
                            id="hourly-rate" 
                            type="number"
                            placeholder="100"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3">Especialidades</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="computers" />
                            <Label htmlFor="computers">Computadores</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="printers" />
                            <Label htmlFor="printers">Impressoras</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="networks" />
                            <Label htmlFor="networks">Redes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="electronics" />
                            <Label htmlFor="electronics">Eletrônicos</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="appliances" />
                            <Label htmlFor="appliances">Eletrodomésticos</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="other" />
                            <Label htmlFor="other">Outros</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3">Certificações</h4>
                        <div className="space-y-2">
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                                <div>
                                  <p className="font-medium">Autorizada Fabricante X</p>
                                  <p className="text-sm text-muted-foreground">Certificação válida até 12/2025</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Visualizar</Button>
                            </div>
                          </div>
                          
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                                <div>
                                  <p className="font-medium">Certificação Técnica</p>
                                  <p className="text-sm text-muted-foreground">Aguardando aprovação</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Visualizar</Button>
                            </div>
                          </div>
                          
                          <div className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center">
                            <p className="text-sm text-muted-foreground mb-2">
                              Adicione certificações técnicas, autorizações de fabricantes, etc.
                            </p>
                            <Button variant="outline" type="button" size="sm">
                              Adicionar Nova Certificação
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                          {loading ? "Salvando..." : "Salvar Configurações Técnicas"}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
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
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600 mr-4">Aprovado</span>
                        <Button variant="outline" size="sm">Visualizar</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Certidão Negativa</p>
                        <p className="text-sm text-muted-foreground">Última atualização: 10/02/2025</p>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600 mr-4">Aprovado</span>
                        <Button variant="outline" size="sm">Visualizar</Button>
                      </div>
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyProfile;
