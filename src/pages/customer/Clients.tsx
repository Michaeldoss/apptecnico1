
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Zap, 
  Thermometer,
  Shield,
  Printer,
  Calendar,
  FileText,
  Camera,
  Download,
  Edit,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const CustomerClients = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  // Dados de exemplo do cliente
  const clientData = {
    id: 1,
    name: "Textil Brasil Ltda",
    type: "juridica",
    cnpj: "12.345.678/0001-90",
    ie: "123.456.789.123",
    email: "contato@textilbrasil.com.br",
    phoneFixed: "(11) 3456-7890",
    phoneMobile: "(11) 98765-4321",
    address: {
      street: "Rua da Indústria, 1234",
      neighborhood: "Distrito Industrial",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567"
    },
    contacts: [
      {
        name: "Maria Silva",
        position: "Gerente de Produção",
        phone: "(11) 99999-9999",
        email: "maria@textilbrasil.com.br"
      },
      {
        name: "João Santos",
        position: "Técnico Responsável",
        phone: "(11) 88888-8888",
        email: "joao@textilbrasil.com.br"
      }
    ],
    emergencyContact: {
      name: "Pedro Costa",
      phone: "(11) 77777-7777"
    },
    technicalInfo: {
      computers: 3,
      grounding: true,
      airConditioning: true,
      dedicatedPanel: true,
      separateEnvironments: true,
      protectionEquipment: ["Extintores", "Filtros de linha", "Estabilizadores"]
    },
    equipment: [
      {
        id: 1,
        type: "DTF",
        brand: "Epson",
        model: "L1800",
        serialNumber: "DTF001234",
        installDate: "2023-01-15",
        status: "active",
        location: "Sala A - Setor 1",
        maintenanceHistory: 3
      },
      {
        id: 2,
        type: "Sublimática",
        brand: "Canon",
        model: "Pro-1000",
        serialNumber: "SUB005678",
        installDate: "2023-02-20",
        status: "maintenance",
        location: "Sala B - Setor 2",
        maintenanceHistory: 1
      }
    ],
    history: {
      totalServices: 8,
      totalValue: "R$ 12.450,00",
      responseTime: "2.5 horas",
      activeEquipment: 2,
      inactiveEquipment: 0
    },
    technicians: [
      {
        name: "Ricardo Silva",
        photo: "",
        services: 5,
        rating: 4.8
      },
      {
        name: "Ana Costa",
        photo: "",
        services: 3,
        rating: 4.9
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4" />;
      case 'inactive': return <XCircle className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <CustomerLayout title="Prontuário Técnico - Clientes">
      <div className="space-y-6">
        {/* Dashboard do Cliente */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Atendimentos</p>
                  <p className="text-2xl font-bold">{clientData.history.totalServices}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Equipamentos Ativos</p>
                  <p className="text-2xl font-bold">{clientData.history.activeEquipment}</p>
                </div>
                <Printer className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total Gasto</p>
                  <p className="text-2xl font-bold">{clientData.history.totalValue}</p>
                </div>
                <FileText className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tempo Médio Resposta</p>
                  <p className="text-2xl font-bold">{clientData.history.responseTime}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cadastral" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="cadastral">Dados Cadastrais</TabsTrigger>
            <TabsTrigger value="technical">Info. Técnicas</TabsTrigger>
            <TabsTrigger value="equipment">Equipamentos</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>

          {/* Dados Cadastrais */}
          <TabsContent value="cadastral" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Informações da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Razão Social</Label>
                    <Input value={clientData.name} readOnly />
                  </div>
                  <div>
                    <Label>Tipo</Label>
                    <Badge variant="outline">{clientData.type === 'juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}</Badge>
                  </div>
                  <div>
                    <Label>CNPJ</Label>
                    <Input value={clientData.cnpj} readOnly />
                  </div>
                  <div>
                    <Label>Inscrição Estadual</Label>
                    <Input value={clientData.ie} readOnly />
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <Input value={clientData.email} readOnly />
                  </div>
                  <div>
                    <Label>Telefone Fixo</Label>
                    <Input value={clientData.phoneFixed} readOnly />
                  </div>
                </div>
                
                <div>
                  <Label>Endereço Completo</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={`${clientData.address.street}, ${clientData.address.neighborhood}, ${clientData.address.city} - ${clientData.address.state}, ${clientData.address.zipCode}`} 
                      readOnly 
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contatos Responsáveis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Pessoas Responsáveis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>E-mail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientData.contacts.map((contact, index) => (
                      <TableRow key={index}>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.position}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Informações Técnicas */}
          <TabsContent value="technical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Estrutura de Instalação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span>Computadores no processo</span>
                    <Badge variant="outline">{clientData.technicalInfo.computers}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span>Aterramento</span>
                    {clientData.technicalInfo.grounding ? 
                      <Badge className="bg-green-100 text-green-800">✔ Presente</Badge> : 
                      <Badge className="bg-red-100 text-red-800">⚠ Ausente</Badge>
                    }
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span>Ar-condicionado</span>
                    {clientData.technicalInfo.airConditioning ? 
                      <Badge className="bg-green-100 text-green-800">✔ Presente</Badge> : 
                      <Badge className="bg-red-100 text-red-800">❌ Ausente</Badge>
                    }
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span>Quadro dedicado</span>
                    {clientData.technicalInfo.dedicatedPanel ? 
                      <Badge className="bg-green-100 text-green-800">Sim</Badge> : 
                      <Badge className="bg-red-100 text-red-800">Não</Badge>
                    }
                  </div>
                </div>

                <div>
                  <Label>Equipamentos de Proteção</Label>
                  <div className="flex gap-2 mt-2">
                    {clientData.technicalInfo.protectionEquipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Equipamentos */}
          <TabsContent value="equipment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Printer className="h-5 w-5" />
                  Equipamentos Cadastrados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Marca/Modelo</TableHead>
                      <TableHead>Série</TableHead>
                      <TableHead>Instalação</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Manutenções</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientData.equipment.map((equipment) => (
                      <TableRow key={equipment.id}>
                        <TableCell>{equipment.type}</TableCell>
                        <TableCell>{equipment.brand} {equipment.model}</TableCell>
                        <TableCell>{equipment.serialNumber}</TableCell>
                        <TableCell>{equipment.installDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(equipment.status)}>
                            {getStatusIcon(equipment.status)}
                            <span className="ml-1">
                              {equipment.status === 'active' ? 'Ativo' : 
                               equipment.status === 'maintenance' ? 'Manutenção' : 'Inativo'}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>{equipment.location}</TableCell>
                        <TableCell>
                          <Button variant="link" size="sm">
                            {equipment.maintenanceHistory} OSs
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Histórico */}
          <TabsContent value="history" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Técnicos Mais Frequentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clientData.technicians.map((tech, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={tech.photo} />
                          <AvatarFallback>{tech.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{tech.name}</p>
                          <p className="text-sm text-muted-foreground">{tech.services} atendimentos</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{tech.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Serviços Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">Manutenção Preventiva</p>
                        <p className="text-sm text-muted-foreground">15/12/2023 - Ricardo Silva</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Concluído</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">Troca de Peças DTF</p>
                        <p className="text-sm text-muted-foreground">10/12/2023 - Ana Costa</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Concluído</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Ver Histórico Completo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documentos e Anexos */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Anexos e Documentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center gap-2 h-20 flex-col">
                    <Camera className="h-6 w-6" />
                    <span>Fotos do Local</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 h-20 flex-col">
                    <FileText className="h-6 w-6" />
                    <span>Planta Baixa</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 h-20 flex-col">
                    <Shield className="h-6 w-6" />
                    <span>Certificados</span>
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Ações</h4>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Atualizar Informações
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Exportar Dados
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default CustomerClients;
