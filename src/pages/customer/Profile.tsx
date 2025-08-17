import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, User, Settings, FileText, CheckCircle, Save, X, Camera, Users, Wrench, Folder, Home, Phone, Building } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useClientData } from '@/hooks/useClientData';
import ContactsEditor from '@/components/customer/ContactsEditor';
import ServicesEditor from '@/components/customer/ServicesEditor';
import DocumentsUpload from '@/components/customer/DocumentsUpload';
import ImageUpload from '@/components/ui/image-upload';

const CustomerProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { clientData, loading, error } = useClientData();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [editingBasic, setEditingBasic] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const [profileData, setProfileData] = useState({
    name: clientData?.name || user?.name || '',
    email: clientData?.email || user?.email || '',
    phone: clientData?.phone || '',
    company: clientData?.name || '',
    businessSegment: clientData?.businessSegment || '',
    description: clientData?.description || '',
    address: {
      street: clientData?.address?.street || '',
      number: clientData?.address?.number || '',
      complement: clientData?.address?.complement || '',
      neighborhood: clientData?.address?.neighborhood || '',
      city: clientData?.address?.city || '',
      state: clientData?.address?.state || '',
      cep: (clientData?.address as any)?.cep || ''
    },
    documents: {
      rg: false,
      cpf: false,
      addressProof: false,
      companyDocs: false,
    },
    profilePicture: !!profileImage,
    contacts: clientData?.contacts || [],
    services: clientData?.services || []
  });
  
  const handleBasicDataChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleContactsChange = (contacts: any[]) => {
    setProfileData(prev => ({
      ...prev,
      contacts
    }));
  };

  const handleServicesChange = (services: any[]) => {
    setProfileData(prev => ({
      ...prev,
      services
    }));
  };

  const handleDocumentsChange = (newDocuments: any[]) => {
    setDocuments(newDocuments);
    const documentStatus = {
      rg: newDocuments.some(doc => doc.id === 'rg' && doc.uploaded),
      cpf: newDocuments.some(doc => doc.id === 'cpf' && doc.uploaded),
      addressProof: newDocuments.some(doc => doc.id === 'addressProof' && doc.uploaded),
      companyDocs: newDocuments.some(doc => doc.id === 'companyDocs' && doc.uploaded),
    };
    
    setProfileData(prev => ({
      ...prev,
      documents: documentStatus
    }));
  };

  const handleImageChange = (file: File | null, imageUrl: string | null) => {
    setProfileImage(imageUrl);
    setProfileData(prev => ({
      ...prev,
      profilePicture: !!imageUrl
    }));
    
    if (imageUrl) {
      toast({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    }
  };

  const saveBasicData = () => {
    console.log('Salvando dados básicos:', profileData);
    setEditingBasic(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 10;

    if (profileData.name) completed++;
    if (profileData.email) completed++;
    if (profileData.phone) completed++;
    if (profileData.company) completed++;
    if (profileData.businessSegment) completed++;
    if (profileData.profilePicture) completed++;
    if (Object.values(profileData.documents).some(Boolean)) completed++;
    if (profileData.contacts.length > 0) completed++;
    if (profileData.services.length > 0) completed++;
    if (profileData.address.street) completed++;

    return Math.round((completed / total) * 100);
  };

  if (loading) {
    return (
      <CustomerLayout title="Perfil da Empresa">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando informações...</p>
          </div>
        </div>
      </CustomerLayout>
    );
  }
  
  return (
    <CustomerLayout title="Perfil da Empresa">
      <div className="space-y-6">
        {/* Welcome Header com Progresso */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
          <h1 className="text-2xl font-bold text-primary">Perfil da Empresa</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas informações e complete seu perfil para ter mais credibilidade
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-3 text-sm">
              <span className="text-muted-foreground">Completude do Perfil:</span>
              <div className="relative bg-muted rounded-full w-48 h-3 overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-50" />
              </div>
              <span className="font-semibold text-primary text-base">{getCompletionPercentage()}%</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Status do Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab('basic')}
                    className={`w-full flex items-center gap-3 text-sm p-4 rounded-lg transition-all duration-200 hover:bg-accent/50 border group ${
                      activeTab === 'basic' ? 'bg-primary/10 border-primary/30 text-primary font-medium shadow-sm' : 'border-border/50 text-foreground hover:text-foreground/80 hover:border-primary/20'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      profileData.name && profileData.email && profileData.phone 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                        : 'bg-muted'
                    }`}>
                      {profileData.name && profileData.email && profileData.phone ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Dados Básicos</div>
                      <div className="text-xs text-muted-foreground">Nome, email e telefone</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      profileData.name && profileData.email && profileData.phone 
                        ? 'bg-emerald-500' 
                        : 'bg-muted-foreground/40'
                    }`} />
                  </button>

                  <button 
                    onClick={() => setActiveTab('basic')}
                    className={`w-full flex items-center gap-3 text-sm p-4 rounded-lg transition-all duration-200 hover:bg-accent/50 border group ${
                      activeTab === 'basic' ? 'bg-primary/10 border-primary/30 text-primary font-medium shadow-sm' : 'border-border/50 text-foreground hover:text-foreground/80 hover:border-primary/20'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      profileData.profilePicture 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                        : 'bg-muted'
                    }`}>
                      {profileData.profilePicture ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Camera className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Foto de Perfil</div>
                      <div className="text-xs text-muted-foreground">Imagem de identificação</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      profileData.profilePicture 
                        ? 'bg-emerald-500' 
                        : 'bg-muted-foreground/40'
                    }`} />
                  </button>

                  <button 
                    onClick={() => setActiveTab('basic')}
                    className={`w-full flex items-center gap-3 text-sm p-4 rounded-lg transition-all duration-200 hover:bg-accent/50 border group ${
                      activeTab === 'basic' ? 'bg-primary/10 border-primary/30 text-primary font-medium shadow-sm' : 'border-border/50 text-foreground hover:text-foreground/80 hover:border-primary/20'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      profileData.company 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                        : 'bg-muted'
                    }`}>
                      {profileData.company ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Building className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Empresa</div>
                      <div className="text-xs text-muted-foreground">Informações da empresa</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      profileData.company 
                        ? 'bg-emerald-500' 
                        : 'bg-muted-foreground/40'
                    }`} />
                  </button>

                  <button 
                    onClick={() => setActiveTab('basic')}
                    className={`w-full flex items-center gap-3 text-sm p-4 rounded-lg transition-all duration-200 hover:bg-accent/50 border group ${
                      activeTab === 'basic' ? 'bg-primary/10 border-primary/30 text-primary font-medium shadow-sm' : 'border-border/50 text-foreground hover:text-foreground/80 hover:border-primary/20'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      profileData.address.street 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                        : 'bg-muted'
                    }`}>
                      {profileData.address.street ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Home className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Endereço</div>
                      <div className="text-xs text-muted-foreground">Localização da empresa</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      profileData.address.street 
                        ? 'bg-emerald-500' 
                        : 'bg-muted-foreground/40'
                    }`} />
                  </button>

                  <button 
                    onClick={() => setActiveTab('contacts')}
                    className={`w-full flex items-center gap-3 text-sm p-4 rounded-lg transition-all duration-200 hover:bg-accent/50 border group ${
                      activeTab === 'contacts' ? 'bg-primary/10 border-primary/30 text-primary font-medium shadow-sm' : 'border-border/50 text-foreground hover:text-foreground/80 hover:border-primary/20'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      profileData.contacts.length > 0 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                        : 'bg-muted'
                    }`}>
                      {profileData.contacts.length > 0 ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Phone className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Contatos</div>
                      <div className="text-xs text-muted-foreground">Telefones e responsáveis</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      profileData.contacts.length > 0 
                        ? 'bg-emerald-500' 
                        : 'bg-muted-foreground/40'
                    }`} />
                  </button>

                  <button 
                    onClick={() => setActiveTab('services')}
                    className={`w-full flex items-center gap-3 text-sm p-4 rounded-lg transition-all duration-200 hover:bg-accent/50 border group ${
                      activeTab === 'services' ? 'bg-primary/10 border-primary/30 text-primary font-medium shadow-sm' : 'border-border/50 text-foreground hover:text-foreground/80 hover:border-primary/20'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      profileData.services.length > 0 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                        : 'bg-muted'
                    }`}>
                      {profileData.services.length > 0 ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Wrench className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Serviços</div>
                      <div className="text-xs text-muted-foreground">Serviços oferecidos</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      profileData.services.length > 0 
                        ? 'bg-emerald-500' 
                        : 'bg-muted-foreground/40'
                    }`} />
                  </button>

                  <button 
                    onClick={() => setActiveTab('documents')}
                    className={`w-full flex items-center gap-3 text-sm p-4 rounded-lg transition-all duration-200 hover:bg-accent/50 border group ${
                      activeTab === 'documents' ? 'bg-primary/10 border-primary/30 text-primary font-medium shadow-sm' : 'border-border/50 text-foreground hover:text-foreground/80 hover:border-primary/20'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      Object.values(profileData.documents).some(Boolean) 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                        : 'bg-muted'
                    }`}>
                      {Object.values(profileData.documents).some(Boolean) ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Folder className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Documentos</div>
                      <div className="text-xs text-muted-foreground">Contratos e certificações</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      Object.values(profileData.documents).some(Boolean) 
                        ? 'bg-emerald-500' 
                        : 'bg-muted-foreground/40'
                    }`} />
                  </button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2">
                    Perfis mais completos têm {getCompletionPercentage() >= 80 ? 'mais' : 'até 3x mais'} credibilidade com técnicos
                  </p>
                  {getCompletionPercentage() >= 80 && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Perfil Verificado</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="contacts">Contatos</TabsTrigger>
                <TabsTrigger value="services">Serviços</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Informações Básicas
                        </CardTitle>
                        <CardDescription>
                          Complete suas informações pessoais e da empresa
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => editingBasic ? saveBasicData() : setEditingBasic(true)}
                          variant={editingBasic ? "default" : "outline"}
                        >
                          {editingBasic ? (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Salvar
                            </>
                          ) : (
                            <>
                              <User className="h-4 w-4 mr-2" />
                              Editar
                            </>
                          )}
                        </Button>
                        {editingBasic && (
                          <Button 
                            onClick={() => setEditingBasic(false)}
                            variant="outline"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Foto de Perfil */}
                    <div className="flex flex-col items-center space-y-4">
                      <ImageUpload
                        currentImage={profileImage || undefined}
                        onImageChange={handleImageChange}
                        size="lg"
                      />
                    </div>

                    {/* Dados Pessoais */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => handleBasicDataChange('name', e.target.value)}
                          readOnly={!editingBasic}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleBasicDataChange('email', e.target.value)}
                          readOnly={!editingBasic}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleBasicDataChange('phone', e.target.value)}
                          placeholder="(11) 99999-9999"
                          readOnly={!editingBasic}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Nome da Empresa</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => handleBasicDataChange('company', e.target.value)}
                          placeholder="Sua Empresa Ltda"
                          readOnly={!editingBasic}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="businessSegment">Segmento</Label>
                        <Input
                          id="businessSegment"
                          value={profileData.businessSegment}
                          onChange={(e) => handleBasicDataChange('businessSegment', e.target.value)}
                          placeholder="Ex: Tecnologia, Saúde, Educação"
                          readOnly={!editingBasic}
                        />
                      </div>
                    </div>

                    {/* Descrição */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição da Empresa</Label>
                      <Textarea
                        id="description"
                        value={profileData.description}
                        onChange={(e) => handleBasicDataChange('description', e.target.value)}
                        placeholder="Descreva sua empresa e atividades principais..."
                        rows={3}
                        readOnly={!editingBasic}
                      />
                    </div>

                    {/* Endereço */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Endereço Comercial</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="street">Rua/Avenida</Label>
                          <Input
                            id="street"
                            value={profileData.address.street}
                            onChange={(e) => handleBasicDataChange('address.street', e.target.value)}
                            readOnly={!editingBasic}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="number">Número</Label>
                          <Input
                            id="number"
                            value={profileData.address.number}
                            onChange={(e) => handleBasicDataChange('address.number', e.target.value)}
                            readOnly={!editingBasic}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="neighborhood">Bairro</Label>
                          <Input
                            id="neighborhood"
                            value={profileData.address.neighborhood}
                            onChange={(e) => handleBasicDataChange('address.neighborhood', e.target.value)}
                            readOnly={!editingBasic}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            value={profileData.address.city}
                            onChange={(e) => handleBasicDataChange('address.city', e.target.value)}
                            readOnly={!editingBasic}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">Estado</Label>
                          <Input
                            id="state"
                            value={profileData.address.state}
                            onChange={(e) => handleBasicDataChange('address.state', e.target.value)}
                            readOnly={!editingBasic}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cep">CEP</Label>
                          <Input
                            id="cep"
                            value={profileData.address.cep}
                            onChange={(e) => handleBasicDataChange('address.cep', e.target.value)}
                            readOnly={!editingBasic}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contacts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Contatos da Empresa
                    </CardTitle>
                    <CardDescription>
                      Adicione contatos importantes da sua empresa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContactsEditor
                      contacts={profileData.contacts}
                      onSave={handleContactsChange}
                      onCancel={() => {}}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Serviços de Interesse
                    </CardTitle>
                    <CardDescription>
                      Selecione os tipos de serviços que sua empresa necessita
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ServicesEditor
                      services={profileData.services}
                      onSave={handleServicesChange}
                      onCancel={() => {}}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documentos para Verificação
                    </CardTitle>
                    <CardDescription>
                      Envie os documentos necessários para verificação do seu perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DocumentsUpload
                      onDocumentsChange={handleDocumentsChange}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerProfile;