import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProfileCompleteness } from '@/components/profile/ProfileCompleteness';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { User, FileText, Shield, Star } from 'lucide-react';
import ImageUpload from '@/components/ui/image-upload';

const ProfileComplete = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123',
    documents: {
      rg: true,
      cpf: false,
      addressProof: false,
    },
    profilePicture: false,
  });
  
  const [documents, setDocuments] = useState([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleDocumentsChange = (newDocuments: any[]) => {
    setDocuments(newDocuments);
    
    // Atualizar status dos documentos no profileData
    const documentStatus = {
      rg: newDocuments.some(doc => doc.id === 'rg' && doc.uploaded),
      cpf: newDocuments.some(doc => doc.id === 'cpf' && doc.uploaded),
      addressProof: newDocuments.some(doc => doc.id === 'addressProof' && doc.uploaded),
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

  const handleSaveProfile = () => {
    toast({
      title: "Perfil salvo",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  return (
    <CustomerLayout title="Completar Perfil">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Completar Perfil</h1>
          <p className="text-muted-foreground">
            Complete seu perfil para ter acesso a todos os recursos da plataforma
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileCompleteness 
              profileData={profileData}
              userType="client"
            />
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informações do Perfil
                    </CardTitle>
                    <CardDescription>
                      Mantenha suas informações atualizadas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <ImageUpload
                        currentImage={profileImage || undefined}
                        onImageChange={handleImageChange}
                        size="lg"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nome</label>
                        <div className="p-2 bg-muted rounded border">
                          {profileData.name}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <div className="p-2 bg-muted rounded border">
                          {profileData.email}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Telefone</label>
                        <div className="p-2 bg-muted rounded border">
                          {profileData.phone}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Endereço</label>
                        <div className="p-2 bg-muted rounded border">
                          {profileData.address}
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleSaveProfile}>
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documentação
                    </CardTitle>
                    <CardDescription>
                      Envie seus documentos para verificação do perfil
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

              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Avaliação de Segurança
                    </CardTitle>
                    <CardDescription>
                      Sua pontuação de segurança na plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">Fatores de Confiabilidade</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Perfil completo</span>
                            <span className="text-sm text-green-600">✓ Verificado</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Documentos enviados</span>
                            <span className="text-sm text-yellow-600">○ Parcial</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Tempo na plataforma</span>
                            <span className="text-sm text-blue-600">+ Novo usuário</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Avaliações recebidas</span>
                            <span className="text-sm text-gray-600">- Nenhuma</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Próximos Passos</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• Complete o envio de documentos</p>
                          <p>• Realize seu primeiro serviço</p>
                          <p>• Mantenha perfil atualizado</p>
                          <p>• Confirme seu telefone</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Dica de Segurança</span>
                      </div>
                      <p className="text-sm text-blue-800">
                        Clientes com perfis completos e documentos verificados têm prioridade 
                        no atendimento e acesso a técnicos premium.
                      </p>
                    </div>
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