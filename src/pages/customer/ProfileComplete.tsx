import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileCompleteness from '@/components/profile/ProfileCompleteness';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import ContactsEditor from '@/components/customer/ContactsEditor';
import ServicesEditor from '@/components/customer/ServicesEditor';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { User, FileText, Shield, Star, Building2, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import ImageUpload from '@/components/ui/image-upload';

const ProfileComplete = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    company: '',
    businessSegment: '',
    description: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: ''
    },
    documents: {
      rg: false,
      cpf: false,
      addressProof: false,
      companyDocs: false,
    },
    profilePicture: false,
    contacts: [],
    services: []
  });
  
  const [documents, setDocuments] = useState([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  const handleDocumentsChange = (newDocuments: any[]) => {
    setDocuments(newDocuments);
    
    // Atualizar status dos documentos no profileData
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

  const handleFinishProfile = () => {
    toast({
      title: "Perfil completo!",
      description: "Agora você tem acesso completo à plataforma.",
    });
    navigate('/customer/dashboard');
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

  const isProfileComplete = getCompletionPercentage() >= 80;

  return (
    <CustomerLayout title="Completar Perfil">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
          <h1 className="text-2xl font-bold text-primary">Bem-vindo à plataforma!</h1>
          <p className="text-muted-foreground mt-2">
            Complete seu perfil para ter acesso completo a todos os recursos
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span>Progresso:</span>
              <div className="bg-background rounded-full w-32 h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
              <span className="font-medium">{getCompletionPercentage()}%</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Completude do Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Dados Básicos</span>
                    <span className={profileData.name && profileData.email && profileData.phone ? 'text-green-600' : 'text-muted-foreground'}>
                      {profileData.name && profileData.email && profileData.phone ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Foto de Perfil</span>
                    <span className={profileData.profilePicture ? 'text-green-600' : 'text-muted-foreground'}>
                      {profileData.profilePicture ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Empresa</span>
                    <span className={profileData.company ? 'text-green-600' : 'text-muted-foreground'}>
                      {profileData.company ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Endereço</span>
                    <span className={profileData.address.street ? 'text-green-600' : 'text-muted-foreground'}>
                      {profileData.address.street ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Contatos</span>
                    <span className={profileData.contacts.length > 0 ? 'text-green-600' : 'text-muted-foreground'}>
                      {profileData.contacts.length > 0 ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Serviços</span>
                    <span className={profileData.services.length > 0 ? 'text-green-600' : 'text-muted-foreground'}>
                      {profileData.services.length > 0 ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Documentos</span>
                    <span className={Object.values(profileData.documents).some(Boolean) ? 'text-green-600' : 'text-muted-foreground'}>
                      {Object.values(profileData.documents).some(Boolean) ? '✓' : '○'}
                    </span>
                  </div>
                </div>

                {isProfileComplete && (
                  <Button 
                    onClick={handleFinishProfile}
                    className="w-full"
                    size="lg"
                  >
                    Finalizar Perfil
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="contacts">Contatos</TabsTrigger>
                <TabsTrigger value="services">Serviços</TabsTrigger>
                <TabsTrigger value="documents">Docs</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informações Básicas
                    </CardTitle>
                    <CardDescription>
                      Complete suas informações pessoais e da empresa
                    </CardDescription>
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
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleBasicDataChange('email', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleBasicDataChange('phone', e.target.value)}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Nome da Empresa</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => handleBasicDataChange('company', e.target.value)}
                          placeholder="Sua Empresa Ltda"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="businessSegment">Segmento</Label>
                        <Input
                          id="businessSegment"
                          value={profileData.businessSegment}
                          onChange={(e) => handleBasicDataChange('businessSegment', e.target.value)}
                          placeholder="Ex: Tecnologia, Saúde, Educação"
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
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="number">Número</Label>
                          <Input
                            id="number"
                            value={profileData.address.number}
                            onChange={(e) => handleBasicDataChange('address.number', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="neighborhood">Bairro</Label>
                          <Input
                            id="neighborhood"
                            value={profileData.address.neighborhood}
                            onChange={(e) => handleBasicDataChange('address.neighborhood', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            value={profileData.address.city}
                            onChange={(e) => handleBasicDataChange('address.city', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">Estado</Label>
                          <Input
                            id="state"
                            value={profileData.address.state}
                            onChange={(e) => handleBasicDataChange('address.state', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cep">CEP</Label>
                          <Input
                            id="cep"
                            value={profileData.address.cep}
                            onChange={(e) => handleBasicDataChange('address.cep', e.target.value)}
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
                      <Phone className="h-5 w-5" />
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
                    <DocumentUpload
                      userType="client"
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

export default ProfileComplete;