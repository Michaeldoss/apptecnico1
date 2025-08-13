import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface ClientData {
  name?: string;
  email?: string;
  phone?: string;
  cnpj?: string;
  cpf?: string;
  address?: {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  contacts?: any[];
  services?: string[];
  businessSegment?: string;
  description?: string;
  website?: string;
  preferredServiceTime?: string;
  foundedYear?: number;
  employeeCount?: string;
  annualRevenue?: string;
  documents?: any[];
}

interface ProfileCompletenessProps {
  clientData: ClientData;
}

const ProfileCompleteness: React.FC<ProfileCompletenessProps> = ({ clientData }) => {
  const calculateCompleteness = () => {
    const fields = [
      // Dados básicos (peso alto)
      { field: clientData?.name, weight: 10, category: 'basic' },
      { field: clientData?.email, weight: 10, category: 'basic' },
      { field: clientData?.phone, weight: 10, category: 'basic' },
      { field: clientData?.cnpj || clientData?.cpf, weight: 10, category: 'basic' },
      
      // Endereço (peso médio)
      { field: clientData?.address?.street, weight: 5, category: 'address' },
      { field: clientData?.address?.city, weight: 5, category: 'address' },
      { field: clientData?.address?.state, weight: 5, category: 'address' },
      { field: clientData?.address?.zipCode, weight: 5, category: 'address' },
      
      // Contatos (peso alto)
      { field: clientData?.contacts && clientData.contacts.length > 0, weight: 15, category: 'contacts' },
      
      // Serviços (peso médio)
      { field: clientData?.services && clientData.services.length > 0, weight: 8, category: 'services' },
      
      // Informações empresariais (peso baixo)
      { field: clientData?.businessSegment, weight: 3, category: 'business' },
      { field: clientData?.description, weight: 3, category: 'business' },
      { field: clientData?.website, weight: 2, category: 'business' },
      { field: clientData?.preferredServiceTime, weight: 2, category: 'business' },
      
      // Documentos (peso alto)
      { field: clientData?.documents && clientData.documents.length > 0, weight: 12, category: 'documents' },
    ];

    const totalWeight = fields.reduce((sum, item) => sum + item.weight, 0);
    const completedWeight = fields.reduce((sum, item) => {
      return sum + (item.field ? item.weight : 0);
    }, 0);

    return Math.round((completedWeight / totalWeight) * 100);
  };

  const getCompletenessLevel = (percentage: number) => {
    if (percentage >= 80) return { level: 'Excelente', color: 'bg-green-500', icon: CheckCircle, textColor: 'text-green-700' };
    if (percentage >= 60) return { level: 'Bom', color: 'bg-blue-500', icon: Clock, textColor: 'text-blue-700' };
    if (percentage >= 40) return { level: 'Regular', color: 'bg-yellow-500', icon: AlertCircle, textColor: 'text-yellow-700' };
    return { level: 'Incompleto', color: 'bg-red-500', icon: AlertCircle, textColor: 'text-red-700' };
  };

  const getMissingFields = () => {
    const missing = [];
    
    if (!clientData?.name) missing.push('Nome da empresa');
    if (!clientData?.email) missing.push('E-mail');
    if (!clientData?.phone) missing.push('Telefone');
    if (!clientData?.cnpj && !clientData?.cpf) missing.push('CNPJ/CPF');
    if (!clientData?.address?.street) missing.push('Endereço');
    if (!clientData?.contacts || clientData.contacts.length === 0) missing.push('Contatos');
    if (!clientData?.services || clientData.services.length === 0) missing.push('Serviços');
    if (!clientData?.documents || clientData.documents.length === 0) missing.push('Documentos');
    
    return missing;
  };

  const percentage = calculateCompleteness();
  const { level, color, icon: Icon, textColor } = getCompletenessLevel(percentage);
  const missingFields = getMissingFields();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${textColor}`} />
            <span className="font-semibold text-gray-900">Completude do Perfil</span>
          </div>
          <Badge className={`${color} text-white font-medium`}>
            {level} - {percentage}%
          </Badge>
        </div>
        <div className="text-sm text-gray-600">
          Confiabilidade: <span className={`font-semibold ${textColor}`}>{level}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Progress value={percentage} className="h-3 bg-gray-200" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span className="font-medium">{percentage}% completo</span>
          <span>100%</span>
        </div>
      </div>

      {missingFields.length > 0 && percentage < 100 && (
        <div className="bg-white border border-orange-200 rounded-md p-3">
          <p className="text-sm font-medium text-orange-800 mb-2">
            Para aumentar sua confiabilidade, complete:
          </p>
          <div className="flex flex-wrap gap-1">
            {missingFields.slice(0, 4).map((field, index) => (
              <Badge key={index} variant="outline" className="text-xs border-orange-300 text-orange-700">
                {field}
              </Badge>
            ))}
            {missingFields.length > 4 && (
              <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                +{missingFields.length - 4} mais
              </Badge>
            )}
          </div>
        </div>
      )}

      {percentage >= 80 && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-sm text-green-800">
            ✨ <strong>Perfil Verificado!</strong> Sua empresa tem alta confiabilidade para os técnicos.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileCompleteness;