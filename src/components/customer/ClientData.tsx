
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, User, ExternalLink, MapPin, Phone, Mail, Globe, Calendar, Users, Target, Eye, Heart, Settings, CreditCard, Shield, FileText, UserCheck } from 'lucide-react';

interface ClientDataProps {
  clientData: any;
}

const ClientData = ({ clientData }: ClientDataProps) => {
  const formatAddress = (address: any) => {
    if (!address) return 'Não informado';
    return `${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ''}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zipCode}`;
  };

  return (
    <div className="space-y-6">
      {/* Informações Principais da Empresa */}
      <Card className="border border-blue-200 bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Building2 className="h-6 w-6" />
            Dados da Empresa
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
              <Label className="text-blue-700 font-semibold">Nome Fantasia</Label>
              <Input 
                value={clientData.fantasyName || 'Não informado'} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold">CNPJ</Label>
              <Input 
                value={clientData.cnpj || clientData.cpf || 'Não informado'} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold">Inscrição Estadual</Label>
              <Input 
                value={clientData.ie || 'Não informado'} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold">Inscrição Municipal</Label>
              <Input 
                value={clientData.im || 'Não informado'} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold">Regime Tributário</Label>
              <Input 
                value={clientData.taxRegime || 'Não informado'} 
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
              <Label className="text-blue-700 font-semibold">Porte da Empresa</Label>
              <div className="mt-1">
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  {clientData.companySize === 'small' ? 'Pequena' : 
                   clientData.companySize === 'medium' ? 'Média' : 'Grande'}
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
              <Label className="text-blue-700 font-semibold">Atividade Principal</Label>
              <Input 
                value={clientData.businessActivity} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Ano de Fundação
              </Label>
              <Input 
                value={clientData.foundedYear || 'Não informado'} 
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
                value={clientData.employeeCount || 'Não informado'} 
                readOnly 
                className="border border-blue-300 bg-white focus:border-blue-500 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-700 font-semibold">Faturamento Anual</Label>
              <Input 
                value={clientData.annualRevenue || 'Não informado'} 
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

      {/* Representante Legal */}
      {clientData.legalRepresentative && (
        <Card className="border border-indigo-200 bg-white shadow-md">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <UserCheck className="h-6 w-6" />
              Representante Legal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-indigo-700 font-semibold">Nome Completo</Label>
                <Input 
                  value={clientData.legalRepresentative.name} 
                  readOnly 
                  className="border border-indigo-300 bg-white focus:border-indigo-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700 font-semibold">CPF</Label>
                <Input 
                  value={clientData.legalRepresentative.cpf} 
                  readOnly 
                  className="border border-indigo-300 bg-white focus:border-indigo-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700 font-semibold">RG</Label>
                <Input 
                  value={clientData.legalRepresentative.rg} 
                  readOnly 
                  className="border border-indigo-300 bg-white focus:border-indigo-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700 font-semibold">Cargo</Label>
                <Input 
                  value={clientData.legalRepresentative.position} 
                  readOnly 
                  className="border border-indigo-300 bg-white focus:border-indigo-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700 font-semibold">Data de Nascimento</Label>
                <Input 
                  value={clientData.legalRepresentative.birthDate} 
                  readOnly 
                  className="border border-indigo-300 bg-white focus:border-indigo-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700 font-semibold">Estado Civil</Label>
                <Input 
                  value={clientData.legalRepresentative.maritalStatus} 
                  readOnly 
                  className="border border-indigo-300 bg-white focus:border-indigo-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700 font-semibold">Nacionalidade</Label>
                <Input 
                  value={clientData.legalRepresentative.nationality} 
                  readOnly 
                  className="border border-indigo-300 bg-white focus:border-indigo-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-indigo-700 font-semibold">Telefone</Label>
                <Input 
                  value={clientData.legalRepresentative.phone} 
                  readOnly 
                  className="border border-indigo-300 bg-white focus:border-indigo-500 mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-indigo-700 font-semibold">E-mail</Label>
                <Input 
                  value={clientData.legalRepresentative.email} 
                  readOnly 
                  className="border border-indigo-300 bg-white focus:border-indigo-500 mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-indigo-700 font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Endereço Residencial
              </Label>
              <Input 
                value={formatAddress(clientData.legalRepresentative.address)} 
                readOnly 
                className="border border-indigo-300 bg-white focus:border-indigo-500 mt-1"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sócios */}
      {clientData.partners && clientData.partners.length > 0 && (
        <Card className="border border-violet-200 bg-white shadow-md">
          <CardHeader className="bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Users className="h-6 w-6" />
              Quadro Societário
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {clientData.partners.map((partner: any, index: number) => (
                <Card key={index} className="border border-violet-200 bg-violet-50">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-violet-700 font-semibold">Nome</Label>
                        <Input 
                          value={partner.name} 
                          readOnly 
                          className="border border-violet-300 bg-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-violet-700 font-semibold">CPF</Label>
                        <Input 
                          value={partner.cpf} 
                          readOnly 
                          className="border border-violet-300 bg-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-violet-700 font-semibold">Cargo</Label>
                        <Input 
                          value={partner.position} 
                          readOnly 
                          className="border border-violet-300 bg-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-violet-700 font-semibold">Participação</Label>
                        <Input 
                          value={partner.participation} 
                          readOnly 
                          className="border border-violet-300 bg-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-violet-700 font-semibold">Telefone</Label>
                        <Input 
                          value={partner.phone} 
                          readOnly 
                          className="border border-violet-300 bg-white mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-violet-700 font-semibold">E-mail</Label>
                        <Input 
                          value={partner.email} 
                          readOnly 
                          className="border border-violet-300 bg-white mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-violet-700 font-semibold">Endereço</Label>
                        <Input 
                          value={formatAddress(partner.address)} 
                          readOnly 
                          className="border border-violet-300 bg-white mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
              <Label className="text-blue-700 font-semibold">Telefone Principal</Label>
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

          {/* E-mails Alternativos */}
          {clientData.alternativeEmails && clientData.alternativeEmails.length > 0 && (
            <div>
              <Label className="text-blue-700 font-semibold">E-mails Alternativos</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {clientData.alternativeEmails.map((email: string, index: number) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-300">
                    {email}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Telefones Alternativos */}
          {clientData.alternativePhones && clientData.alternativePhones.length > 0 && (
            <div>
              <Label className="text-blue-700 font-semibold">Telefones Alternativos</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {clientData.alternativePhones.map((phone: string, index: number) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-300">
                    {phone}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Redes Sociais */}
          {clientData.socialMedia && (
            <div>
              <Label className="text-blue-700 font-semibold">Redes Sociais</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {clientData.socialMedia.facebook && (
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Facebook:</span>
                    <span className="text-sm text-blue-700">{clientData.socialMedia.facebook}</span>
                  </div>
                )}
                {clientData.socialMedia.instagram && (
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">Instagram:</span>
                    <span className="text-sm text-blue-700">{clientData.socialMedia.instagram}</span>
                  </div>
                )}
                {clientData.socialMedia.linkedin && (
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">LinkedIn:</span>
                    <span className="text-sm text-blue-700">{clientData.socialMedia.linkedin}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Endereços */}
      <Card className="border border-cyan-200 bg-white shadow-md">
        <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <MapPin className="h-6 w-6" />
            Endereços
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <Label className="text-cyan-700 font-semibold">Endereço Principal</Label>
            <Input 
              value={formatAddress(clientData.address)} 
              readOnly 
              className="border border-cyan-300 bg-white focus:border-cyan-500 mt-1"
            />
          </div>
          
          {clientData.billingAddress && (
            <div>
              <Label className="text-cyan-700 font-semibold">Endereço de Cobrança</Label>
              <Input 
                value={formatAddress(clientData.billingAddress)} 
                readOnly 
                className="border border-cyan-300 bg-white focus:border-cyan-500 mt-1"
              />
            </div>
          )}
          
          {clientData.deliveryAddress && (
            <div>
              <Label className="text-cyan-700 font-semibold">Endereço de Entrega</Label>
              <Input 
                value={formatAddress(clientData.deliveryAddress)} 
                readOnly 
                className="border border-cyan-300 bg-white focus:border-cyan-500 mt-1"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dados Bancários */}
      {clientData.bankData && (
        <Card className="border border-emerald-200 bg-white shadow-md">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <CreditCard className="h-6 w-6" />
              Dados Bancários
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-emerald-700 font-semibold">Banco</Label>
                <Input 
                  value={clientData.bankData.bank} 
                  readOnly 
                  className="border border-emerald-300 bg-white focus:border-emerald-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-emerald-700 font-semibold">Agência</Label>
                <Input 
                  value={clientData.bankData.agency} 
                  readOnly 
                  className="border border-emerald-300 bg-white focus:border-emerald-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-emerald-700 font-semibold">Conta</Label>
                <Input 
                  value={clientData.bankData.account} 
                  readOnly 
                  className="border border-emerald-300 bg-white focus:border-emerald-500 mt-1"
                />
              </div>
              <div>
                <Label className="text-emerald-700 font-semibold">Tipo de Conta</Label>
                <Input 
                  value={clientData.bankData.accountType} 
                  readOnly 
                  className="border border-emerald-300 bg-white focus:border-emerald-500 mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
            <p className="text-green-900 leading-relaxed">{clientData.mission || 'Não informado'}</p>
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
            <p className="text-purple-900 leading-relaxed">{clientData.vision || 'Não informado'}</p>
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
                  <TableHead className="text-blue-700 font-semibold">WhatsApp</TableHead>
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
                    <TableCell className="text-blue-800">{contact.whatsapp || contact.phone}</TableCell>
                    <TableCell className="text-blue-800 break-all">{contact.email}</TableCell>
                    <TableCell>
                      <Badge className={
                        contact.type === 'tecnico' ? 'bg-blue-100 text-blue-800 border-blue-300' : 
                        contact.type === 'financeiro' ? 'bg-green-100 text-green-800 border-green-300' :
                        contact.type === 'comercial' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                        'bg-purple-100 text-purple-800 border-purple-300'
                      }>
                        {contact.type === 'tecnico' ? 'Técnico' : 
                         contact.type === 'financeiro' ? 'Financeiro' : 
                         contact.type === 'comercial' ? 'Comercial' : 'Administrativo'}
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

          {clientData.observations && (
            <div>
              <Label className="text-yellow-700 font-semibold">Observações Gerais</Label>
              <div className="mt-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-900 leading-relaxed">{clientData.observations}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientData;
