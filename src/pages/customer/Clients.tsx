import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import ClientDashboard from '@/components/customer/ClientDashboard';
import ClientData from '@/components/customer/ClientData';
import ClientEquipmentDetails from '@/components/customer/ClientEquipmentDetails';
import { getStatusColor, getStatusIcon } from '@/utils/clientUtils';
import { clientData } from '@/data/mockClientData';
import { 
  Building2,
  Printer,
  Calendar,
  FileText,
  Camera,
  Settings,
  Plus,
  Eye,
  History,
  Wrench,
  Upload,
  Download,
  Edit,
  Star,
  AlertTriangle,
  Factory,
  User
} from 'lucide-react';

const CustomerClients = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('DTF');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100">
      <CustomerLayout title="Prontuário Técnico - Clientes">
        <div className="space-y-6">
          <ClientDashboard clientData={clientData} />

          <Tabs defaultValue="cadastral" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6 bg-yellow-200 border border-yellow-300">
              <TabsTrigger value="cadastral" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white text-yellow-800 hover:bg-yellow-300">
                <User className="h-4 w-4 mr-2" />
                Dados Cadastrais
              </TabsTrigger>
              <TabsTrigger value="local" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white text-yellow-800 hover:bg-yellow-300">
                <Factory className="h-4 w-4 mr-2" />
                Estrutura Local
              </TabsTrigger>
              <TabsTrigger value="equipment" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white text-yellow-800 hover:bg-yellow-300">
                <Printer className="h-4 w-4 mr-2" />
                Equipamentos
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white text-yellow-800 hover:bg-yellow-300">
                <History className="h-4 w-4 mr-2" />
                Histórico
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white text-yellow-800 hover:bg-yellow-300">
                <FileText className="h-4 w-4 mr-2" />
                Documentos
              </TabsTrigger>
              <TabsTrigger value="actions" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white text-yellow-800 hover:bg-yellow-300">
                <Settings className="h-4 w-4 mr-2" />
                Ações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cadastral" className="space-y-4">
              <ClientData clientData={clientData} />
            </TabsContent>

            <TabsContent value="local" className="space-y-4">
              <Card className="border-yellow-300 bg-yellow-50/80 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100 border-b border-yellow-200">
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <Factory className="h-6 w-6 text-yellow-600" />
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

                  <Separator className="bg-yellow-300" />

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

            <TabsContent value="equipment" className="space-y-4">
              <Card className="border-yellow-300 bg-yellow-50/80 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100 border-b border-yellow-200">
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <Printer className="h-6 w-6 text-yellow-600" />
                    Equipamentos Cadastrados
                    <Button size="sm" className="ml-auto bg-yellow-500 hover:bg-yellow-600 text-white shadow-md">
                      <Plus className="h-4 w-4 mr-1" />
                      Novo Equipamento
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {clientData.equipment.map((equipment) => {
                      const StatusIcon = getStatusIcon(equipment.status);
                      return (
                        <Card key={equipment.id} className="border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 shadow-md hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3 bg-yellow-100/50">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg text-yellow-800 flex items-center gap-2">
                                <Printer className="h-5 w-5 text-yellow-600" />
                                {equipment.type} - {equipment.brand} {equipment.model}
                              </CardTitle>
                              <Badge className={getStatusColor(equipment.status)}>
                                <StatusIcon className="h-4 w-4" />
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
                            
                            <Separator className="bg-yellow-300" />
                            
                            <ClientEquipmentDetails equipment={equipment} />
                            
                            <div className="flex gap-2 pt-2">
                              <Button size="sm" variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100">
                                <Eye className="h-4 w-4 mr-1" />
                                Ver Detalhes
                              </Button>
                              <Button size="sm" variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100">
                                <History className="h-4 w-4 mr-1" />
                                Histórico
                              </Button>
                              <Button size="sm" variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100">
                                <Wrench className="h-4 w-4 mr-1" />
                                Manutenção
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-yellow-300 bg-yellow-50/80 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100 border-b border-yellow-200">
                    <CardTitle className="text-yellow-800 flex items-center gap-2">
                      <User className="h-5 w-5 text-yellow-600" />
                      Técnicos Mais Frequentes
                    </CardTitle>
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

                <Card className="border-yellow-300 bg-yellow-50/80 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100 border-b border-yellow-200">
                    <CardTitle className="text-yellow-800 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-yellow-600" />
                      Resumo de Atendimentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border border-yellow-300 rounded-lg bg-yellow-50">
                        <div>
                          <p className="font-medium text-yellow-800">Chamados/Mês</p>
                          <p className="text-2xl font-bold text-yellow-700">{clientData.history.monthlyCallFrequency}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-yellow-600" />
                      </div>
                      <div className="flex justify-between items-center p-4 border border-yellow-300 rounded-lg bg-yellow-50">
                        <div>
                          <p className="font-medium text-yellow-800">Tempo Médio Resposta</p>
                          <p className="text-2xl font-bold text-yellow-700">{clientData.history.responseTime}</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-yellow-600" />
                      </div>
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-md">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Histórico Completo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card className="border-yellow-300 bg-yellow-50/80 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100 border-b border-yellow-200">
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <FileText className="h-6 w-6 text-yellow-600" />
                    Anexos e Documentos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {clientData.documents.map((doc, index) => (
                      <Card key={index} className="border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-yellow-800">{doc.type}</p>
                              <p className="text-sm text-yellow-600">{doc.count} arquivo(s)</p>
                            </div>
                            <Button size="sm" variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-md">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documentos
                    </Button>
                    <Button variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100">
                      <Camera className="h-4 w-4 mr-2" />
                      Fotos do Local
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <Card className="border-yellow-300 bg-yellow-50/80 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100 border-b border-yellow-200">
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <Settings className="h-6 w-6 text-yellow-600" />
                    Ações Disponíveis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white h-16 flex-col shadow-md">
                      <Plus className="h-6 w-6 mb-1" />
                      Abrir Novo Chamado
                    </Button>
                    <Button variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100 h-16 flex-col">
                      <FileText className="h-6 w-6 mb-1" />
                      Visualizar OSs
                    </Button>
                    <Button variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100 h-16 flex-col">
                      <Download className="h-6 w-6 mb-1" />
                      Exportar Dados
                    </Button>
                    <Button variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100 h-16 flex-col">
                      <Edit className="h-6 w-6 mb-1" />
                      Atualizar Informações
                    </Button>
                  </div>

                  <Separator className="bg-yellow-300" />

                  <div>
                    <Label className="text-yellow-700 font-medium">Checklist de Instalação</Label>
                    <div className="flex items-center gap-2 mt-2">
                      {clientData.installationChecklist ? (
                        <Badge className="bg-green-100 text-green-800">✔ Preenchido</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">⚠ Pendente</Badge>
                      )}
                      <Button size="sm" variant="outline" className="border-yellow-400 text-yellow-700 hover:bg-yellow-100">
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
    </div>
  );
};

export default CustomerClients;
