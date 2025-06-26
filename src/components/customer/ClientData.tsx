
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, User, ExternalLink, MapPin } from 'lucide-react';

interface ClientDataProps {
  clientData: any;
}

const ClientData = ({ clientData }: ClientDataProps) => {
  return (
    <div className="space-y-4">
      <Card className="border-yellow-300 bg-yellow-50/80 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100 border-b border-yellow-200">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Building2 className="h-6 w-6 text-yellow-600" />
            Informações da Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-yellow-700 font-medium">Razão Social</Label>
              <Input value={clientData.name} readOnly className="border-yellow-300 bg-yellow-50/50" />
            </div>
            <div>
              <Label className="text-yellow-700 font-medium">Tipo</Label>
              <Badge variant="outline" className="border-yellow-400 text-yellow-700 bg-yellow-100">
                {clientData.type === 'juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}
              </Badge>
            </div>
            <div>
              <Label className="text-yellow-700 font-medium">CNPJ</Label>
              <Input value={clientData.cnpj} readOnly className="border-yellow-300 bg-yellow-50/50" />
            </div>
            <div>
              <Label className="text-yellow-700 font-medium">Inscrição Estadual</Label>
              <Input value={clientData.ie} readOnly className="border-yellow-300 bg-yellow-50/50" />
            </div>
            <div>
              <Label className="text-yellow-700 font-medium">E-mail</Label>
              <Input value={clientData.email} readOnly className="border-yellow-300 bg-yellow-50/50" />
            </div>
            <div>
              <Label className="text-yellow-700 font-medium">WhatsApp</Label>
              <Input value={clientData.whatsapp} readOnly className="border-yellow-300 bg-yellow-50/50" />
            </div>
          </div>
          
          <div>
            <Label className="text-yellow-700 font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Endereço Completo
            </Label>
            <div className="flex gap-2">
              <Input 
                value={`${clientData.address.street}, ${clientData.address.neighborhood}, ${clientData.address.city} - ${clientData.address.state}, ${clientData.address.zipCode}`} 
                readOnly 
                className="flex-1 border-yellow-300 bg-yellow-50/50"
              />
              <Button variant="outline" size="icon" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-300 bg-yellow-50/80 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100 border-b border-yellow-200">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <User className="h-6 w-6 text-yellow-600" />
            Pessoas Responsáveis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-yellow-200">
                <TableHead className="text-yellow-700 font-semibold">Nome</TableHead>
                <TableHead className="text-yellow-700 font-semibold">Cargo</TableHead>
                <TableHead className="text-yellow-700 font-semibold">Telefone</TableHead>
                <TableHead className="text-yellow-700 font-semibold">E-mail</TableHead>
                <TableHead className="text-yellow-700 font-semibold">Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientData.contacts.map((contact: any, index: number) => (
                <TableRow key={index} className="border-yellow-200 hover:bg-yellow-50">
                  <TableCell className="text-yellow-800">{contact.name}</TableCell>
                  <TableCell className="text-yellow-800">{contact.position}</TableCell>
                  <TableCell className="text-yellow-800">{contact.phone}</TableCell>
                  <TableCell className="text-yellow-800">{contact.email}</TableCell>
                  <TableCell>
                    <Badge className={contact.type === 'tecnico' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
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
