
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, User, ExternalLink, MapPin, Phone, Mail } from 'lucide-react';

interface ClientDataProps {
  clientData: any;
}

const ClientData = ({ clientData }: ClientDataProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-800 bg-white shadow-xl">
        <CardHeader className="bg-blue-800 text-white border-b-2 border-blue-900">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Building2 className="h-6 w-6" />
            Informações da Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-blue-800 font-semibold">Razão Social</Label>
              <Input 
                value={clientData.name} 
                readOnly 
                className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-800 font-semibold">Tipo</Label>
              <div className="mt-1">
                <Badge variant="outline" className="border-2 border-blue-600 text-blue-800 bg-blue-50">
                  {clientData.type === 'juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-blue-800 font-semibold">CNPJ</Label>
              <Input 
                value={clientData.cnpj} 
                readOnly 
                className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-800 font-semibold">Inscrição Estadual</Label>
              <Input 
                value={clientData.ie} 
                readOnly 
                className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-800 font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4" />
                E-mail
              </Label>
              <Input 
                value={clientData.email} 
                readOnly 
                className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
              />
            </div>
            <div>
              <Label className="text-blue-800 font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4" />
                WhatsApp
              </Label>
              <Input 
                value={clientData.whatsapp} 
                readOnly 
                className="border-2 border-blue-300 bg-white focus:border-blue-600 mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-blue-800 font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Endereço Completo
            </Label>
            <div className="flex gap-3 mt-1">
              <Input 
                value={`${clientData.address.street}, ${clientData.address.neighborhood}, ${clientData.address.city} - ${clientData.address.state}, ${clientData.address.zipCode}`} 
                readOnly 
                className="flex-1 border-2 border-blue-300 bg-white focus:border-blue-600"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="border-2 border-blue-600 text-blue-800 hover:bg-blue-600 hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-800 bg-white shadow-xl">
        <CardHeader className="bg-blue-800 text-white border-b-2 border-blue-900">
          <CardTitle className="flex items-center gap-3 text-xl">
            <User className="h-6 w-6" />
            Pessoas Responsáveis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-blue-200">
                <TableHead className="text-blue-800 font-semibold">Nome</TableHead>
                <TableHead className="text-blue-800 font-semibold">Cargo</TableHead>
                <TableHead className="text-blue-800 font-semibold">Telefone</TableHead>
                <TableHead className="text-blue-800 font-semibold">E-mail</TableHead>
                <TableHead className="text-blue-800 font-semibold">Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientData.contacts.map((contact: any, index: number) => (
                <TableRow key={index} className="border-b border-blue-100 hover:bg-blue-50">
                  <TableCell className="text-blue-900 font-medium">{contact.name}</TableCell>
                  <TableCell className="text-blue-900">{contact.position}</TableCell>
                  <TableCell className="text-blue-900">{contact.phone}</TableCell>
                  <TableCell className="text-blue-900">{contact.email}</TableCell>
                  <TableCell>
                    <Badge className={contact.type === 'tecnico' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-green-100 text-green-800 border border-green-300'}>
                      {contact.type === 'tecnico' ? 'Técnico' : 'Financeiro'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientData;
