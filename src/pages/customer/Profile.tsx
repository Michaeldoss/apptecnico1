
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, User, Settings, FileText, MapPin, Phone, Mail, Globe, AlertCircle, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useClientData } from '@/hooks/useClientData';
import ClientData from '@/components/customer/ClientData';
import EditableClientData from '@/components/customer/EditableClientData';

const CustomerProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { clientData, loading, error } = useClientData();
  
  if (loading) {
    return (
      <CustomerLayout title="Perfil da Empresa">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando informações...</p>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  if (error || !clientData) {
    return (
      <CustomerLayout title="Perfil da Empresa">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro ao carregar dados</h3>
              <p className="text-gray-600">{error || 'Não foi possível carregar as informações da empresa.'}</p>
            </CardContent>
          </Card>
        </div>
      </CustomerLayout>
    );
  }
  
  return (
    <CustomerLayout title="Perfil da Empresa">
      <div className="space-y-6">
        {/* Header do Perfil */}
        <Card className="border border-blue-200 bg-gradient-to-r from-blue-50 to-white shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-blue-200">
                <AvatarImage src="" alt={clientData.name} />
                <AvatarFallback className="text-2xl bg-blue-100 text-blue-700">
                  {clientData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl text-blue-900">{clientData.name}</CardTitle>
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Cliente Ativo</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span>{clientData.businessSegment}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{clientData.address.city}, {clientData.address.state}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{clientData.email}</span>
                  </div>
                  {clientData.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <span>{clientData.website}</span>
                    </div>
                  )}
                </div>
                
                <CardDescription className="text-base leading-relaxed">
                  {clientData.description.substring(0, 200)}...
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        {/* Tabs de Navegação */}
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12 bg-blue-50 border border-blue-200">
            <TabsTrigger 
              value="company" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Empresa</span>
            </TabsTrigger>
            <TabsTrigger 
              value="contacts" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Contatos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Serviços</span>
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documentos</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="company" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Dados da Empresa</h3>
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancelar Edição' : 'Editar Perfil'}
                </Button>
              </div>
              
              {isEditing ? (
                <EditableClientData
                  clientData={clientData}
                  onSave={(updatedData) => {
                    // Aqui você implementaria a lógica de salvamento
                    console.log('Dados atualizados:', updatedData);
                    setIsEditing(false);
                    toast({
                      title: "Perfil atualizado!",
                      description: "Suas informações foram salvas com sucesso.",
                    });
                  }}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <ClientData clientData={clientData} />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="contacts" className="mt-6">
            <div className="grid gap-6">
              {/* Informações de Contato Principais */}
              <Card className="border border-blue-200 bg-white shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Phone className="h-6 w-6" />
                    Contatos Principais
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-6">
                    {clientData.contacts.map((contact: any, index: number) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-lg text-gray-900">{contact.name}</h4>
                              <p className="text-blue-600 font-medium">{contact.position}</p>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  <span>{contact.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  <span>{contact.email}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button variant="outline" size="sm">
                                <Phone className="h-4 w-4 mr-1" />
                                Ligar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4 mr-1" />
                                E-mail
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="mt-6">
            <div className="grid gap-6">
              {/* Serviços Contratados */}
              <Card className="border border-green-200 bg-white shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Settings className="h-6 w-6" />
                    Serviços Contratados
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clientData.services.map((service: string, index: number) => (
                      <Card key={index} className="border border-green-200 bg-green-50">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-green-800">{service}</span>
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Preferências de Atendimento */}
              <Card className="border border-yellow-200 bg-white shadow-md">
                <CardHeader className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-t-lg">
                  <CardTitle className="text-xl">Preferências de Atendimento</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Horário Preferencial</h4>
                    <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      {clientData.preferredServiceTime}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Observações Especiais</h4>
                    <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200 leading-relaxed">
                      {clientData.specialRequirements}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card className="border border-purple-200 bg-white shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <FileText className="h-6 w-6" />
                  Documentos da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-800">Documentos Legais</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <span className="text-sm font-medium text-purple-800">CNPJ</span>
                        <span className="text-sm text-gray-700">{clientData.cnpj}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <span className="text-sm font-medium text-purple-800">Inscrição Estadual</span>
                        <span className="text-sm text-gray-700">{clientData.ie}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-800">Informações Corporativas</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <span className="text-sm font-medium text-purple-800">Faturamento Anual</span>
                        <span className="text-sm text-gray-700">{clientData.annualRevenue || 'Não informado'}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <span className="text-sm font-medium text-purple-800">Ano de Fundação</span>
                        <span className="text-sm text-gray-700">{clientData.foundedYear}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default CustomerProfile;
