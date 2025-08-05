
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Calendar,
  Globe,
  Users,
  Briefcase,
  Target,
  Eye,
  Heart,
  Star,
  Factory,
  DollarSign
} from 'lucide-react';

interface ClientDataProps {
  clientData: any;
}

const ClientData: React.FC<ClientDataProps> = ({ clientData }) => {
  if (!clientData) {
    return (
      <Card className="border border-blue-200 bg-white shadow-md">
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Carregando dados do cliente...</p>
        </CardContent>
      </Card>
    );
  }

  const getContactsByType = (type: string) => {
    return clientData.contacts?.filter((contact: any) => contact.type === type) || [];
  };

  return (
    <div className="space-y-6">
      {/* Informações Básicas */}
      <Card className="border border-blue-200 bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Building2 className="h-6 w-6" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-blue-700 font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Razão Social
              </Label>
              <Input 
                value={clientData.name || ''} 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            
            {clientData.fantasyName && (
              <div>
                <Label className="text-blue-700 font-semibold">Nome Fantasia</Label>
                <Input 
                  value={clientData.fantasyName} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
            )}

            <div>
              <Label className="text-blue-700 font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4" />
                E-mail Principal
              </Label>
              <Input 
                value={clientData.email || ''} 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>

            <div>
              <Label className="text-blue-700 font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Telefone Principal
              </Label>
              <Input 
                value={clientData.phone || ''} 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>

            {clientData.type === 'juridica' && clientData.cnpj && (
              <div>
                <Label className="text-blue-700 font-semibold">CNPJ</Label>
                <Input 
                  value={clientData.cnpj} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
            )}

            {clientData.type === 'fisica' && clientData.cpf && (
              <div>
                <Label className="text-blue-700 font-semibold">CPF</Label>
                <Input 
                  value={clientData.cpf} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
            )}
          </div>

          <Separator className="bg-blue-300 h-px" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border border-blue-300 rounded-lg bg-blue-50">
              <span className="text-blue-700 font-semibold">Tipo de Pessoa</span>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                {clientData.type === 'juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-blue-300 rounded-lg bg-blue-50">
              <span className="text-blue-700 font-semibold">Segmento</span>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                {clientData.businessSegment || 'Não informado'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Endereço */}
      <Card className="border border-blue-200 bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <MapPin className="h-6 w-6" />
            Endereço Principal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {clientData.address && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label className="text-blue-700 font-semibold">Logradouro</Label>
                <Input 
                  value={`${clientData.address.street || ''}, ${clientData.address.number || ''}`} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold">Bairro</Label>
                <Input 
                  value={clientData.address.neighborhood || ''} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold">CEP</Label>
                <Input 
                  value={clientData.address.zipCode || ''} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold">Cidade</Label>
                <Input 
                  value={clientData.address.city || ''} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-700 font-semibold">Estado</Label>
                <Input 
                  value={clientData.address.state || ''} 
                  className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                />
              </div>
              {clientData.address.complement && (
                <div className="md:col-span-2">
                  <Label className="text-blue-700 font-semibold">Complemento</Label>
                  <Input 
                    value={clientData.address.complement} 
                    className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contatos */}
      <Card className="border border-blue-200 bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <User className="h-6 w-6" />
            Contatos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {clientData.contacts && clientData.contacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clientData.contacts.map((contact: any, index: number) => (
                <div key={index} className="p-4 border border-blue-300 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                        {contact.name?.split(' ').map((n: string) => n[0]).join('') || 'N/A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-blue-700 truncate">{contact.name || 'Nome não informado'}</p>
                      <p className="text-sm text-blue-600">{contact.position || 'Cargo não informado'}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                      {contact.type === 'tecnico' ? 'Técnico' :
                       contact.type === 'financeiro' ? 'Financeiro' :
                       contact.type === 'administrativo' ? 'Administrativo' :
                       contact.type === 'comercial' ? 'Comercial' : 'Outro'}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    {contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700">{contact.phone}</span>
                      </div>
                    )}
                    {contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700 truncate">{contact.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Nenhum contato cadastrado</p>
          )}
        </CardContent>
      </Card>

      {/* Informações Empresariais */}
      {clientData.type === 'juridica' && (
        <Card className="border border-blue-200 bg-white shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Briefcase className="h-6 w-6" />
              Informações Empresariais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clientData.foundedYear && (
                <div>
                  <Label className="text-blue-700 font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Ano de Fundação
                  </Label>
                  <Input 
                    value={clientData.foundedYear.toString()} 
                    className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                  />
                </div>
              )}

              {clientData.employeeCount && (
                <div>
                  <Label className="text-blue-700 font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Número de Funcionários
                  </Label>
                  <Input 
                    value={clientData.employeeCount} 
                    className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                  />
                </div>
              )}

              {clientData.annualRevenue && (
                <div>
                  <Label className="text-blue-700 font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Faturamento Anual
                  </Label>
                  <Input 
                    value={clientData.annualRevenue} 
                    className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                  />
                </div>
              )}

              {clientData.website && (
                <div>
                  <Label className="text-blue-700 font-semibold flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website
                  </Label>
                  <Input 
                    value={clientData.website} 
                    className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
                  />
                </div>
              )}
            </div>

            {clientData.description && (
              <div>
                <Label className="text-blue-700 font-semibold">Descrição da Empresa</Label>
                <div className="mt-2 p-4 border border-blue-300 rounded-lg bg-blue-50">
                  <p className="text-gray-700 text-sm leading-relaxed">{clientData.description}</p>
                </div>
              </div>
            )}

            {clientData.mission && (
              <div>
                <Label className="text-blue-700 font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Missão
                </Label>
                <div className="mt-2 p-4 border border-blue-300 rounded-lg bg-blue-50">
                  <p className="text-gray-700 text-sm leading-relaxed">{clientData.mission}</p>
                </div>
              </div>
            )}

            {clientData.vision && (
              <div>
                <Label className="text-blue-700 font-semibold flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Visão
                </Label>
                <div className="mt-2 p-4 border border-blue-300 rounded-lg bg-blue-50">
                  <p className="text-gray-700 text-sm leading-relaxed">{clientData.vision}</p>
                </div>
              </div>
            )}

            {clientData.values && clientData.values.length > 0 && (
              <div>
                <Label className="text-blue-700 font-semibold flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Valores
                </Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {clientData.values.map((value: string, index: number) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700 border-blue-200">
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientData;
