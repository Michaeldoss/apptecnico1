import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, User, ExternalLink, MapPin, Phone, Mail, Globe, Calendar, Users, Target, Eye, Heart, Settings } from 'lucide-react';

interface ClientDataProps {
  clientData: any;
}

const ClientData = ({ clientData }: ClientDataProps) => {
  return (
    <div className="space-y-6">
      {/* Informações Principais da Empresa */}
      <Card className="border border-blue-200 bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Building2 className="h-6 w-6" />
            Sobre a Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-blue-700 font-semibold">Razão Social</Label>
              <Input 
                value={clientData.name} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold">Tipo de Pessoa</Label>
              <div className="mt-1">
                <Badge variant="outline" className="border border-blue-600 text-blue-800 bg-blue-50">
                  {clientData.type === 'juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-blue-700 font-semibold">Segmento de Atuação</Label>
              <Input 
                value={clientData.businessSegment} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold">Porte da Empresa</Label>
              <div className="mt-1">
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  {clientData.companySize === 'small' ? 'Pequena' : 
                   clientData.companySize === 'medium' ? 'Média' : 'Grande'}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-blue-700 font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Ano de Fundação
              </Label>
              <Input 
                value={clientData.foundedYear} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                Número de Funcionários
              </Label>
              <Input 
                value={clientData.employeeCount} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-blue-700 font-semibold">Descrição da Empresa</Label>
            <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 leading-relaxed">{clientData.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Missão, Visão e Valores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-green-200 bg-white shadow-md">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-lg">
              <Target className="h-5 w-5" />
              Missão
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-green-900 leading-relaxed">{clientData.mission}</p>
          </CardContent>
        </Card>

        <Card className="border border-purple-200 bg-white shadow-md">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-lg">
              <Eye className="h-5 w-5" />
              Visão
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-purple-900 leading-relaxed">{clientData.vision}</p>
          </CardContent>
        </Card>
      </div>

      {/* Valores */}
      <Card className="border border-orange-200 bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-lg">
            <Heart className="h-5 w-5" />
            Valores da Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-3">
            {clientData.values?.map((value: string, index: number) => (
              <Badge key={index} className="bg-orange-100 text-orange-800 border-orange-300 px-3 py-1">
                {value}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações de Contato */}
      <Card className="border border-blue-200 bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Phone className="h-6 w-6" />
            Informações de Contato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-blue-700 font-semibold">CNPJ</Label>
              <Input 
                value={clientData.cnpj} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold">Inscrição Estadual</Label>
              <Input 
                value={clientData.ie} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4" />
                E-mail Principal
              </Label>
              <Input 
                value={clientData.email} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4" />
                WhatsApp
              </Label>
              <Input 
                value={clientData.whatsapp} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold">Telefone Fixo</Label>
              <Input 
                value={clientData.phone} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <div className="flex gap-2 mt-1">
                <Input 
                  value={clientData.website || 'Não informado'} 
                  readOnly 
                  className="flex-1 border border-blue-300 bg-white focus:border-blue-500"
                />
                {clientData.website && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-blue-700 font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Endereço Completo
            </Label>
            <div className="flex gap-3 mt-1">
              <Input 
                value={`${clientData.address.street}, ${clientData.address.number}, ${clientData.address.neighborhood}, ${clientData.address.city} - ${clientData.address.state}, ${clientData.address.zipCode}`} 
                readOnly 
                className="flex-1 border border-blue-300 bg-white focus:border-blue-500"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="border border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pessoas Responsáveis */}
      <Card className="border border-blue-200 bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <User className="h-6 w-6" />
            Pessoas Responsáveis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-blue-200">
                  <TableHead className="text-blue-700 font-semibold">Nome</TableHead>
                  <TableHead className="text-blue-700 font-semibold">Cargo</TableHead>
                  <TableHead className="text-blue-700 font-semibold">Telefone</TableHead>
                  <TableHead className="text-blue-700 font-semibold">E-mail</TableHead>
                  <TableHead className="text-blue-700 font-semibold">Área</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientData.contacts.map((contact: any, index: number) => (
                  <TableRow key={index} className="border-b border-blue-100 hover:bg-blue-50">
                    <TableCell className="text-blue-800 font-medium">{contact.name}</TableCell>
                    <TableCell className="text-blue-800">{contact.position}</TableCell>
                    <TableCell className="text-blue-800">{contact.phone}</TableCell>
                    <TableCell className="text-blue-800 break-all">{contact.email}</TableCell>
                    <TableCell>
                      <Badge className={
                        contact.type === 'tecnico' ? 'bg-blue-100 text-blue-800 border-blue-300' : 
                        contact.type === 'financeiro' ? 'bg-green-100 text-green-800 border-green-300' :
                        'bg-purple-100 text-purple-800 border-purple-300'
                      }>
                        {contact.type === 'tecnico' ? 'Técnico' : 
                         contact.type === 'financeiro' ? 'Financeiro' : 'Administrativo'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Informações de Atendimento */}
      <Card className="border border-yellow-200 bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Settings className="h-6 w-6" />
            Preferências de Atendimento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label className="text-yellow-700 font-semibold">Serviços Contratados</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {clientData.services.map((service: string, index: number) => (
                <Badge key={index} className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <Label className="text-yellow-700 font-semibold">Horário Preferencial</Label>
            <Input 
              value={clientData.preferredServiceTime} 
              readOnly 
              className="border border-yellow-300 bg-white focus:border-yellow-500 mt-1"
            />
          </div>
          
          <div>
            <Label className="text-yellow-700 font-semibold">Observações Especiais</Label>
            <div className="mt-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-900 leading-relaxed">{clientData.specialRequirements}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientData;
