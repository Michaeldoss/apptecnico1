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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
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
  AlertTriangle,
  Plus,
  Eye,
  History,
  Wrench,
  Factory,
  Settings,
  Upload,
  ExternalLink
} from 'lucide-react';

const CustomerClients = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('DTF');

  // Dados completos do cliente conforme especificação
  const clientData = {
    id: 1,
    name: "ABC Comunicação Visual Ltda",
    type: "juridica",
    cnpj: "12.345.678/0001-90",
    ie: "123.456.789.123",
    cpf: "",
    email: "contato@abccomunicacao.com.br",
    phoneFixed: "(11) 3456-7890",
    phoneMobile: "(11) 98765-4321",
    whatsapp: "(11) 98765-4321",
    address: {
      street: "Rua das Gráficas, 1234",
      neighborhood: "Distrito Industrial",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      complement: "Galpão B"
    },
    contacts: [
      {
        name: "José Silva",
        position: "Responsável Técnico",
        phone: "(11) 99999-9999",
        email: "jose@abccomunicacao.com.br",
        type: "tecnico"
      },
      {
        name: "Maria Santos",
        position: "Responsável Financeiro",
        phone: "(11) 88888-8888",
        email: "financeiro@abccomunicacao.com.br",
        type: "financeiro"
      }
    ],
    emergencyContact: {
      name: "Pedro Costa",
      phone: "(11) 77777-7777"
    },
    location: {
      equipmentLocation: "Galpão B - Setor de Produção",
      grounding: true,
      airConditioning: true,
      employees: 8,
      environmentalConditions: "Ambiente controlado, baixa umidade",
      electricalInstallation: "Trifásico 220V",
      protectionEquipment: true,
      hasNobreak: true,
      hasFilters: true,
      hasStabilizers: true,
      photos: ["local1.jpg", "local2.jpg"]
    },
    equipment: [
      {
        id: 1,
        type: "DTF",
        brand: "Grando",
        model: "DTF 60cm",
        width: "60cm",
        heads: "2x i3200",
        serialNumber: "DTF001234",
        manufactureYear: "2023",
        installDate: "2023-01-15",
        status: "active",
        location: "Galpão B - Setor 1",
        oven: {
          model: "Forno Nacional Esteira",
          temperature: "150°C",
          belt: "Esteira automática",
          power: "220V Trifásico"
        },
        maintenanceHistory: 3,
        lastMaintenance: "2023-12-01"
      },
      {
        id: 2,
        type: "CNC Router",
        brand: "CNC Tech",
        model: "Router 1224",
        area: "1.2x2.4m",
        motorType: "Servo motor",
        control: "Mach3",
        software: "ArtCAM, Vectric",
        lubrication: "Manual",
        usage: "Alta",
        serialNumber: "CNC005678",
        installDate: "2023-02-20",
        status: "active",
        location: "Galpão B - Setor 2",
        maintenanceHistory: 2
      },
      {
        id: 3,
        type: "Prensa Térmica",
        brand: "Metalnox",
        model: "Pneumática 40x60",
        activation: "Pneumático",
        voltage: "220V",
        serialNumber: "PRS009876",
        installDate: "2023-03-10",
        status: "active",
        location: "Galpão B - Acabamento",
        maintenanceHistory: 1
      }
    ],
    history: {
      totalServices: 12,
      totalValue: "R$ 18.750,00",
      responseTime: "1.8 horas",
      activeEquipment: 3,
      inactiveEquipment: 0,
      monthlyCallFrequency: 2.1,
      overallRating: 4.9
    },
    technicians: [
      {
        name: "Ricardo Silva",
        photo: "",
        services: 8,
        rating: 4.9,
        lastVisit: "2023-12-15"
      },
      {
        name: "Ana Costa",
        photo: "",
        services: 4,
        rating: 4.8,
        lastVisit: "2023-12-01"
      }
    ],
    documents: [
      { type: "Fotos do Local", count: 5 },
      { type: "Laudos de Instalação", count: 2 },
      { type: "Notas Fiscais", count: 8 },
      { type: "Contratos", count: 1 },
      { type: "Vídeos", count: 3 }
    ],
    installationChecklist: true
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

  const renderEquipmentDetails = (equipment: any) => {
    switch (equipment.type) {
      case 'DTF':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-yellow-700">Largura</Label>
                <Input value={equipment.width} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Cabeças</Label>
                <Input value={equipment.heads} readOnly className="border-yellow-200" />
              </div>
            </div>
            <Separator className="bg-yellow-200" />
            <div>
              <Label className="text-yellow-700 font-medium">Dados do Forno</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <Label className="text-sm text-yellow-600">Modelo</Label>
                  <Input value={equipment.oven?.model} readOnly className="border-yellow-200" />
                </div>
                <div>
                  <Label className="text-sm text-yellow-600">Temperatura Máx.</Label>
                  <Input value={equipment.oven?.temperature} readOnly className="border-yellow-200" />
                </div>
                <div>
                  <Label className="text-sm text-yellow-600">Esteira</Label>
                  <Input value={equipment.oven?.belt} readOnly className="border-yellow-200" />
                </div>
                <div>
                  <Label className="text-sm text-yellow-600">Alimentação</Label>
                  <Input value={equipment.oven?.power} readOnly className="border-yellow-200" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'CNC Router':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-yellow-700">Área Útil</Label>
                <Input value={equipment.area} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Tipo de Motor</Label>
                <Input value={equipment.motorType} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Controle</Label>
                <Input value={equipment.control} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Software</Label>
                <Input value={equipment.software} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Lubrificação</Label>
                <Input value={equipment.lubrication} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Frequência de Uso</Label>
                <Badge className="bg-yellow-100 text-yellow-800">{equipment.usage}</Badge>
              </div>
            </div>
          </div>
        );
      case 'Prensa Térmica':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-yellow-700">Tipo de Acionamento</Label>
                <Input value={equipment.activation} readOnly className="border-yellow-200" />
              </div>
              <div>
                <Label className="text-yellow-700">Tensão</Label>
                <Input value={equipment.voltage} readOnly className="border-yellow-200" />
              </div>
            </div>
          </div>
        );
      default:
        return <p className="text-yellow-600">Detalhes específicos não disponíveis</p>;
    }
  };

  return (
    <CustomerLayout title="Prontuário Técnico - Clientes">
      <div className="space-y-6">
        {/* Dashboard do Cliente - Tema Amarelo */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">Total de Atendimentos</p>
                  <p className="text-2xl font-bold text-yellow-800">{clientData.history.totalServices}</p>
                </div>
                <FileText className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">Equipamentos Ativos</p>
                  <p className="text-2xl font-bold text-yellow-800">{clientData.history.activeEquipment}</p>
                </div>
                <Printer className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">Valor Total Investido</p>
                  <p className="text-2xl font-bold text-yellow-800">{clientData.history.totalValue}</p>
                </div>
                <FileText className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">Avaliação Geral</p>
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold text-yellow-800">{clientData.history.overallRating}</p>
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cadastral" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 bg-yellow-100">
            <TabsTrigger value="cadastral" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">Dados Cadastrais</TabsTrigger>
            <TabsTrigger value="local" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">Estrutura Local</TabsTrigger>
            <TabsTrigger value="equipment" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">Equipamentos</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">Histórico</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">Documentos</TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">Ações</TabsTrigger>
          </TabsList>

          {/* Dados Cadastrais */}
          <TabsContent value="cadastral" className="space-y-4">
            <Card className="border-yellow-200">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Building2 className="h-5 w-5" />
                  Informações da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-yellow-700">Razão Social</Label>
                    <Input value={clientData.name} readOnly className="border-yellow-200" />
                  </div>
                  <div>
                    <Label className="text-yellow-700">Tipo</Label>
                    <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                      {clientData.type === 'juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-yellow-700">CNPJ</Label>
                    <Input value={clientData.cnpj} readOnly className="border-yellow-200" />
                  </div>
                  <div>
                    <Label className="text-yellow-700">Inscrição Estadual</Label>
                    <Input value={clientData.ie} readOnly className="border-yellow-200" />
                  </div>
                  <div>
                    <Label className="text-yellow-700">E-mail</Label>
                    <Input value={clientData.email} readOnly className="border-yellow-200" />
                  </div>
                  <div>
                    <Label className="text-yellow-700">WhatsApp</Label>
                    <Input value={clientData.whatsapp} readOnly className="border-yellow-200" />
                  </div>
                </div>
                
                <div>
                  <Label className="text-yellow-700">Endereço Completo</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={`${clientData.address.street}, ${clientData.address.neighborhood}, ${clientData.address.city} - ${clientData.address.state}, ${clientData.address.zipCode}`} 
                      readOnly 
                      className="flex-1 border-yellow-200"
                    />
                    <Button variant="outline" size="icon" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contatos Responsáveis */}
            <Card className="border-yellow-200">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <User className="h-5 w-5" />
                  Pessoas Responsáveis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-yellow-700">Nome</TableHead>
                      <TableHead className="text-yellow-700">Cargo</TableHead>
                      <TableHead className="text-yellow-700">Telefone</TableHead>
                      <TableHead className="text-yellow-700">E-mail</TableHead>
                      <TableHead className="text-yellow-700">Tipo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientData.contacts.map((contact, index) => (
                      <TableRow key={index}>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.position}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.email}</TableCell>
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
          </TabsContent>

          {/* Estrutura do Local */}
          <TabsContent value="local" className="space-y-4">
            <Card className="border-yellow-200">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Factory className="h-5 w-5" />
                  Estrutura de Instalação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-yellow-700">Localização dos Equipamentos</Label>
                    <Input value={clientData.location.equipmentLocation} readOnly className="border-yellow-200" />
                  </div>
                  <div>
                    <Label className="text-yellow-700">Funcionários no Setor</Label>
                    <Input value={clientData.location.employees.toString()} readOnly className="border-yellow-200" />
                  </div>
                  <div>
                    <Label className="text-yellow-700">Instalação Elétrica</Label>
                    <Input value={clientData.location.electricalInstallation} readOnly className="border-yellow-200" />
                  </div>
                  <div>
                    <Label className="text-yellow-700">Condições Ambientais</Label>
                    <Input value={clientData.location.environmentalConditions} readOnly className="border-yellow-200" />
                  </div>
                </div>

                <Separator className="bg-yellow-200" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg">
                    <span className="text-yellow-700">Aterramento</span>
                    {clientData.location.grounding ? 
                      <Badge className="bg-green-100 text-green-800">✔ Presente</Badge> : 
                      <Badge className="bg-red-100 text-red-800">⚠ Ausente</Badge>
                    }
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg">
                    <span className="text-yellow-700">Ar-condicionado</span>
                    {clientData.location.airConditioning ? 
                      <Badge className="bg-green-100 text-green-800">✔ Presente</Badge> : 
                      <Badge className="bg-red-100 text-red-800">❌ Ausente</Badge>
                    }
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg">
                    <span className="text-yellow-700">Nobreaks</span>
                    {clientData.location.hasNobreak ? 
                      <Badge className="bg-green-100 text-green-800">Sim</Badge> : 
                      <Badge className="bg-red-100 text-red-800">Não</Badge>
                    }
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg">
                    <span className="text-yellow-700">Filtros/Estabilizadores</span>
                    {clientData.location.hasFilters ? 
                      <Badge className="bg-green-100 text-green-800">Sim</Badge> : 
                      <Badge className="bg-red-100 text-red-800">Não</Badge>
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Equipamentos */}
          <TabsContent value="equipment" className="space-y-4">
            <Card className="border-yellow-200">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Printer className="h-5 w-5" />
                  Equipamentos Cadastrados
                  <Button size="sm" className="ml-auto bg-yellow-500 hover:bg-yellow-600 text-white">
                    <Plus className="h-4 w-4 mr-1" />
                    Novo Equipamento
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {clientData.equipment.map((equipment) => (
                    <Card key={equipment.id} className="border-yellow-200 bg-yellow-50/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-yellow-800">
                            {equipment.type} - {equipment.brand} {equipment.model}
                          </CardTitle>
                          <Badge className={getStatusColor(equipment.status)}>
                            {getStatusIcon(equipment.status)}
                            <span className="ml-1">
                              {equipment.status === 'active' ? 'Ativo' : 
                               equipment.status === 'maintenance' ? 'Manutenção' : 'Inativo'}
                            </span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <Label className="text-yellow-700">Série</Label>
                            <p className="font-medium">{equipment.serialNumber}</p>
                          </div>
                          <div>
                            <Label className="text-yellow-700">Instalação</Label>
                            <p className="font-medium">{equipment.installDate}</p>
                          </div>
                          <div>
                            <Label className="text-yellow-700">Localização</Label>
                            <p className="font-medium">{equipment.location}</p>
                          </div>
                          <div>
                            <Label className="text-yellow-700">Manutenções</Label>
                            <p className="font-medium">{equipment.maintenanceHistory} OSs</p>
                          </div>
                        </div>
                        
                        <Separator className="bg-yellow-200" />
                        
                        {renderEquipmentDetails(equipment)}
                        
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Detalhes
                          </Button>
                          <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                            <History className="h-4 w-4 mr-1" />
                            Histórico
                          </Button>
                          <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                            <Wrench className="h-4 w-4 mr-1" />
                            Manutenção
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Histórico */}
          <TabsContent value="history" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-yellow-200">
                <CardHeader className="bg-yellow-50">
                  <CardTitle className="text-yellow-800">Técnicos Mais Frequentes</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {clientData.technicians.map((tech, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border border-yellow-200 rounded-lg">
                        <Avatar>
                          <AvatarImage src={tech.photo} />
                          <AvatarFallback className="bg-yellow-100 text-yellow-700">
                            {tech.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-yellow-800">{tech.name}</p>
                          <p className="text-sm text-yellow-600">{tech.services} atendimentos</p>
                          <p className="text-xs text-yellow-500">Última visita: {tech.lastVisit}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{tech.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200">
                <CardHeader className="bg-yellow-50">
                  <CardTitle className="text-yellow-800">Resumo de Atendimentos</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border border-yellow-200 rounded">
                      <div>
                        <p className="font-medium text-yellow-800">Chamados/Mês</p>
                        <p className="text-2xl font-bold text-yellow-700">{clientData.history.monthlyCallFrequency}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-yellow-500" />
                    </div>
                    <div className="flex justify-between items-center p-3 border border-yellow-200 rounded">
                      <div>
                        <p className="font-medium text-yellow-800">Tempo Médio Resposta</p>
                        <p className="text-2xl font-bold text-yellow-700">{clientData.history.responseTime}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Histórico Completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documentos e Anexos */}
          <TabsContent value="documents" className="space-y-4">
            <Card className="border-yellow-200">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <FileText className="h-5 w-5" />
                  Anexos e Documentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {clientData.documents.map((doc, index) => (
                    <Card key={index} className="border-yellow-200 bg-yellow-50/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-yellow-800">{doc.type}</p>
                            <p className="text-sm text-yellow-600">{doc.count} arquivo(s)</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documentos
                  </Button>
                  <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                    <Camera className="h-4 w-4 mr-2" />
                    Fotos do Local
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ações */}
          <TabsContent value="actions" className="space-y-4">
            <Card className="border-yellow-200">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Settings className="h-5 w-5" />
                  Ações Disponíveis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white h-16 flex-col">
                    <Plus className="h-6 w-6 mb-1" />
                    Abrir Novo Chamado
                  </Button>
                  <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-16 flex-col">
                    <FileText className="h-6 w-6 mb-1" />
                    Visualizar OSs
                  </Button>
                  <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-16 flex-col">
                    <Download className="h-6 w-6 mb-1" />
                    Exportar Dados
                  </Button>
                  <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 h-16 flex-col">
                    <Edit className="h-6 w-6 mb-1" />
                    Atualizar Informações
                  </Button>
                </div>

                <Separator className="bg-yellow-200" />

                <div>
                  <Label className="text-yellow-700 font-medium">Checklist de Instalação</Label>
                  <div className="flex items-center gap-2 mt-2">
                    {clientData.installationChecklist ? (
                      <Badge className="bg-green-100 text-green-800">✔ Preenchido</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">⚠ Pendente</Badge>
                    )}
                    <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700">
                      Ver Checklist
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
