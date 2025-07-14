import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Shield, Star } from 'lucide-react';

interface ProfileData {
  // Dados pessoais
  nome?: string;
  email?: string;
  telefone?: string;
  
  // Endereço
  cep?: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  
  // Documentos
  cpf_cnpj?: string;
  documentos_url?: any[];
  
  // Extras
  foto_perfil_url?: string;
  dados_bancarios?: any;
}

interface ProfileCompletenessCardProps {
  profileData: ProfileData;
  userType: 'client' | 'technician' | 'store';
}

export const ProfileCompletenessCard: React.FC<ProfileCompletenessCardProps> = ({
  profileData,
  userType
}) => {
  const calculateCompleteness = (): number => {
    const checks = [
      // Essenciais (peso 2)
      { check: !!profileData.nome, weight: 2 },
      { check: !!profileData.email, weight: 2 },
      { check: !!profileData.telefone, weight: 2 },
      
      // Endereço completo (peso 2)
      { check: !!profileData.cep && !!profileData.endereco && !!profileData.numero, weight: 2 },
      { check: !!profileData.bairro && !!profileData.cidade && !!profileData.estado, weight: 2 },
      
      // Documentos (peso 3)
      { check: !!profileData.cpf_cnpj, weight: 3 },
      { check: Array.isArray(profileData.documentos_url) && profileData.documentos_url.length > 0, weight: 3 },
      
      // Extras (peso 1)
      { check: !!profileData.foto_perfil_url, weight: 1 },
      { check: !!profileData.dados_bancarios, weight: 1 },
    ];

    const totalWeight = checks.reduce((sum, item) => sum + item.weight, 0);
    const completedWeight = checks
      .filter(item => item.check)
      .reduce((sum, item) => sum + item.weight, 0);

    return Math.round((completedWeight / totalWeight) * 100);
  };

  const completeness = calculateCompleteness();

  const getSecurityLevel = (completeness: number) => {
    if (completeness >= 90) return { level: 'Alta', color: 'bg-green-500', variant: 'default' as const };
    if (completeness >= 70) return { level: 'Média-Alta', color: 'bg-blue-500', variant: 'secondary' as const };
    if (completeness >= 50) return { level: 'Média', color: 'bg-yellow-500', variant: 'outline' as const };
    return { level: 'Baixa', color: 'bg-red-500', variant: 'destructive' as const };
  };

  const security = getSecurityLevel(completeness);

  const getMissingItems = (): string[] => {
    const missing: string[] = [];
    
    if (!profileData.nome) missing.push('Nome completo');
    if (!profileData.telefone) missing.push('Telefone');
    if (!profileData.cep || !profileData.endereco) missing.push('Endereço completo');
    if (!profileData.cpf_cnpj) missing.push(userType === 'store' ? 'CNPJ' : 'CPF');
    if (!Array.isArray(profileData.documentos_url) || profileData.documentos_url.length === 0) {
      missing.push('Documentos verificados');
    }
    if (!profileData.foto_perfil_url) missing.push('Foto de perfil');
    if (!profileData.dados_bancarios) missing.push('Dados bancários');
    
    return missing;
  };

  const missingItems = getMissingItems();
  const isVerified = completeness >= 90;

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Completude do Perfil
          </CardTitle>
          {isVerified && (
            <Badge className="bg-green-500 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verificado
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Barra de Progresso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span className="font-semibold">{completeness}%</span>
          </div>
          <Progress value={completeness} className="h-3" />
        </div>

        {/* Nível de Segurança */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${security.color}`} />
            <span className="font-medium">Nível de Confiança</span>
          </div>
          <Badge variant={security.variant}>
            {security.level}
          </Badge>
        </div>

        {/* Benefícios da Verificação */}
        {isVerified ? (
          <div className="bg-green-50/50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <Star className="h-4 w-4" />
              <span className="font-medium">Perfil Verificado</span>
            </div>
            <p className="text-sm text-green-600">
              Seu perfil está completo e você tem máxima confiabilidade na plataforma!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-orange-700">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Itens em Falta ({missingItems.length})</span>
            </div>
            <div className="grid gap-2">
              {missingItems.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-2" />
                  {item}
                </div>
              ))}
              {missingItems.length > 3 && (
                <div className="text-sm text-muted-foreground pl-4">
                  +{missingItems.length - 3} outros itens
                </div>
              )}
            </div>
          </div>
        )}

        {/* Próximos Passos */}
        {!isVerified && (
          <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-medium text-blue-900 mb-2">Próximos Passos</h4>
            <p className="text-sm text-blue-700">
              Complete seu perfil para aumentar sua confiabilidade e ter acesso a mais oportunidades na plataforma.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};