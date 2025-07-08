import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Star, Shield } from 'lucide-react';

interface ProfileData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  documents?: {
    rg?: boolean;
    cpf?: boolean;
    addressProof?: boolean;
    cnpj?: boolean;
  };
  profilePicture?: boolean;
  experience?: string;
  certifications?: boolean;
}

interface ProfileCompletenessProps {
  profileData: ProfileData;
  userType: 'client' | 'technician' | 'store';
}

export const ProfileCompleteness: React.FC<ProfileCompletenessProps> = ({
  profileData,
  userType
}) => {
  const calculateCompleteness = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    // Informações básicas (40 pontos)
    if (profileData.name) earnedPoints += 10;
    if (profileData.email) earnedPoints += 10;
    if (profileData.phone) earnedPoints += 10;
    if (profileData.address) earnedPoints += 10;
    totalPoints += 40;

    // Documentos (30 pontos)
    if (profileData.documents?.rg) earnedPoints += 10;
    if (profileData.documents?.cpf) earnedPoints += 10;
    if (profileData.documents?.addressProof) earnedPoints += 10;
    totalPoints += 30;

    // Foto de perfil (10 pontos)
    if (profileData.profilePicture) earnedPoints += 10;
    totalPoints += 10;

    // Específicos por tipo de usuário (20 pontos)
    if (userType === 'technician') {
      if (profileData.experience) earnedPoints += 10;
      if (profileData.certifications) earnedPoints += 10;
      totalPoints += 20;
    } else if (userType === 'store') {
      if (profileData.documents?.cnpj) earnedPoints += 20;
      totalPoints += 20;
    } else {
      // Para cliente, considerar pontos extras por avaliações
      totalPoints += 20;
      earnedPoints += 20; // Assume que cliente sempre tem esses pontos
    }

    return Math.round((earnedPoints / totalPoints) * 100);
  };

  const getSecurityLevel = (completeness: number) => {
    if (completeness >= 90) return { level: 'Alta', color: 'bg-green-500', icon: Shield };
    if (completeness >= 70) return { level: 'Média', color: 'bg-yellow-500', icon: Star };
    if (completeness >= 50) return { level: 'Básica', color: 'bg-orange-500', icon: Clock };
    return { level: 'Baixa', color: 'bg-red-500', icon: Clock };
  };

  const completeness = calculateCompleteness();
  const security = getSecurityLevel(completeness);
  const SecurityIcon = security.icon;

  const missingItems = () => {
    const missing = [];
    if (!profileData.name) missing.push('Nome completo');
    if (!profileData.phone) missing.push('Telefone');
    if (!profileData.address) missing.push('Endereço completo');
    if (!profileData.documents?.rg) missing.push('RG');
    if (!profileData.documents?.cpf) missing.push('CPF');
    if (!profileData.documents?.addressProof) missing.push('Comprovante de endereço');
    if (!profileData.profilePicture) missing.push('Foto de perfil');
    
    if (userType === 'technician') {
      if (!profileData.experience) missing.push('Experiência profissional');
      if (!profileData.certifications) missing.push('Certificações');
    } else if (userType === 'store') {
      if (!profileData.documents?.cnpj) missing.push('CNPJ');
    }
    
    return missing;
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Completude do Perfil</h3>
        <div className="flex items-center gap-2">
          {completeness === 100 && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verificado
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso do perfil</span>
          <span className="font-medium">{completeness}%</span>
        </div>
        <Progress value={completeness} className="h-3" />
      </div>

      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
        <div className={`p-2 rounded-full ${security.color} text-white`}>
          <SecurityIcon className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium text-sm">Nível de Segurança: {security.level}</p>
          <p className="text-xs text-muted-foreground">
            Baseado no preenchimento e verificação do perfil
          </p>
        </div>
      </div>

      {completeness < 100 && missingItems().length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Para completar seu perfil, adicione:
          </p>
          <div className="flex flex-wrap gap-1">
            {missingItems().slice(0, 3).map((item, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
            {missingItems().length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{missingItems().length - 3} mais
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};