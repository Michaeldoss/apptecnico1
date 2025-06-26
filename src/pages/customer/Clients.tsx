
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
  User,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

const CustomerClients = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('DTF');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200">
      <CustomerLayout title="Prontuário Técnico - Clientes">
        <div className="space-y-8 p-6">
          {/* Dashboard Cards */}
          <div className="mb-8">
            <ClientDashboard clientData={clientData} />
          </div>

          {/* Main Content Tabs */}
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <Tabs defaultValue="cadastral" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-white border-2 border-yellow-500 shadow-lg rounded-xl p-2 mb-6">
                <TabsTrigger 
                  value="cadastral" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-md text-yellow-700 hover:bg-yellow-100 font-semibold transition-all duration-300 rounded-lg px-4 py-3"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Dados Cadastrais</span>
                  <span className="sm:hidden">Dados</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="local" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-md text-yellow-700 hover:bg-yellow-100 font-semibold transition-all duration-300 rounded-lg px-4 py-3"
                >
                  <Factory className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Estrutura Local</span>
                  <span className="sm:hidden">Local</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="equipment" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-md text-yellow-700 hover:bg-yellow-100 font-semibold transition-all duration-300 rounded-lg px-4 py-3"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Equipamentos</span>
                  <span className="sm:hidden">Equip.</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-md text-yellow-700 hover:bg-yellow-100 font-semibold transition-all duration-300 rounded-lg px-4 py-3"
                >
                  <History className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Histórico</span>
                  <span className="sm:hidden">Hist.</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="documents" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-md text-yellow-700 hover:bg-yellow-100 font-semibold transition-all duration-300 rounded-lg px-4 py-3"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Documentos</span>
                  <span className="sm:hidden">Docs</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="actions" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-md text-yellow-700 hover:bg-yellow-100 font-semibold transition-all duration-300 rounded-lg px-4 py-3"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Ações</span>
                  <span className="sm:hidden">Ações</span>
                </TabsTrigger>
              </TabsList>

              <div className="px-6 py-4">
                <TabsContent value="cadastral" className="mt-0">
                  <ClientData clientData={clientData} />
                </TabsContent>

                <TabsContent value="local" className="mt-0">
                  <Card className="border-2 border-yellow-400 bg-white shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white border-b-2 border-yellow-600">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <Factory className="h-6 w-6" />
                        Estrutura de Instalação
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-yellow-700 font-semibold flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Localização dos Equipamentos
                          </Label>
                          <Input 
                            value={clientData.location.equipmentLocation} 
                            readOnly 
                            className="border-2 border-yellow-300 bg-white focus:border-yellow-500 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-yellow-700 font-semibold flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Funcionários no Setor
                          </Label>
                          <Input 
                            value={clientData.location.employees.toString()} 
                            readOnly 
                            className="border-2 border-yellow-300 bg-white focus:border-yellow-500 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-yellow-700 font-semibold flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Instalação Elétrica
                          </Label>
                          <Input 
                            value={clientData.location.electricalInstallation} 
                            readOnly 
                            className="border-2 border-yellow-300 bg-white focus:border-yellow-500 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-yellow-700 font-semibold flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Condições Ambientais
                          </Label>
                          <Input 
                            value={clientData.location.environmentalConditions} 
                            readOnly 
                            className="border-2 border-yellow-300 bg-white focus:border-yellow-500 mt-1"
                          />
                        </div>
                      </div>

                      <Separator className="bg-yellow-400 h-0.5 my-6" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 border-2 border-yellow-300 rounded-lg bg-yellow-50">
                          <span className="text-yellow-700 font-semibold">Aterramento</span>
                          {clientData.location.grounding ? 
                            <Badge className="bg-green-100 text-green-800 border border-green-300">✔ Presente</Badge> : 
                            <Badge className="bg-red-100 text-red-800 border border-red-300">⚠ Ausente</Badge>
                          }
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border-2 border-yellow-300 rounded-lg bg-yellow-50">
                          <span className="text-yellow-700 font-semibold">Ar-condicionado</span>
                          {clientData.location.airConditioning ? 
                            <Badge className="bg-green-100 text-green-800 border border-green-300">✔ Presente</Badge> : 
                            <Badge className="bg-red-100 text-red-800 border border-red-300">❌ Ausente</Badge>
                          }
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border-2 border-yellow-300 rounded-lg bg-yellow-50">
                          <span className="text-yellow-700 font-semibold">Nobreaks</span>
                          {clientData.location.hasNobreak ? 
                            <Badge className="bg-green-100 text-green-800 border border-green-300">Sim</Badge> : 
                            <Badge className="bg-red-100 text-red-800 border border-red-300">Não</Badge>
                          }
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border-2 border-yellow-300 rounded-lg bg-yellow-50">
                          <span className="text-yellow-700 font-semibold">Filtros/Estabilizadores</span>
                          {clientData.location.hasFilters ? 
                            <Badge className="bg-green-100 text-green-800 border border-green-300">Sim</Badge> : 
                            <Badge className="bg-red-100 text-red-800 border border-red-300">Não</Badge>
                          }
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="equipment" className="mt-0">
                  <Card className="border-2 border-yellow-400 bg-white shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white border-b-2 border-yellow-600">
                      <CardTitle className="flex items-center justify-between text-xl">
                        <div className="flex items-center gap-3">
                          <Printer className="h-6 w-6" />
                          Equipamentos Cadastrados
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-white hover:bg-gray-100 text-yellow-700 border-2 border-white shadow-md font-semibold"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Novo Equipamento
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        {clientData.equipment.map((equipment) => {
                          const StatusIcon = getStatusIcon(equipment.status);
                          return (
                            <Card key={equipment.id} className="border-2 border-yellow-300 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                              <CardHeader className="pb-3 bg-yellow-50 border-b border-yellow-200">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <CardTitle className="text-lg text-yellow-700 flex items-center gap-3">
                                    <Printer className="h-6 w-6 text-yellow-600" />
                                    <span className="break-words">{equipment.type} - {equipment.brand} {equipment.model}</span>
                                  </CardTitle>
                                  <Badge className={getStatusColor(equipment.status)}>
                                    <StatusIcon className="h-4 w-4 mr-1" />
                                    {equipment.status === 'active' ? 'Ativo' : 
                                     equipment.status === 'maintenance' ? 'Manutenção' : 'Inativo'}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <Label className="text-yellow-700 font-semibold">Série</Label>
                                    <p className="font-medium text-gray-800 mt-1 break-all">{equipment.serialNumber}</p>
                                  </div>
                                  <div>
                                    <Label className="text-yellow-700 font-semibold">Instalação</Label>
                                    <p className="font-medium text-gray-800 mt-1">{equipment.installDate}</p>
                                  </div>
                                  <div>
                                    <Label className="text-yellow-700 font-semibold">Localização</Label>
                                    <p className="font-medium text-gray-800 mt-1">{equipment.location}</p>
                                  </div>
                                  <div>
                                    <Label className="text-yellow-700 font-semibold">Manutenções</Label>
                                    <p className="font-medium text-gray-800 mt-1">{equipment.maintenanceHistory} OSs</p>
                                  </div>
                                </div>
                                
                                <Separator className="bg-yellow-400 h-0.5" />
                                
                                <ClientEquipmentDetails equipment={equipment} />
                                
                                <div className="flex flex-wrap gap-3 pt-4">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white font-semibold"
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver Detalhes
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white font-semibold"
                                  >
                                    <History className="h-4 w-4 mr-2" />
                                    Histórico
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white font-semibold"
                                  >
                                    <Wrench className="h-4 w-4 mr-2" />
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

                <TabsContent value="history" className="mt-0">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-2 border-yellow-400 bg-white shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white border-b-2 border-yellow-600">
                        <CardTitle className="text-white flex items-center gap-3">
                          <User className="h-6 w-6" />
                          Técnicos Mais Frequentes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {clientData.technicians.map((tech, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 border-2 border-yellow-200 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={tech.photo} />
                                <AvatarFallback className="bg-yellow-100 text-yellow-700 font-semibold">
                                  {tech.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-yellow-700 truncate">{tech.name}</p>
                                <p className="text-sm text-yellow-600">{tech.services} atendimentos</p>
                                <p className="text-xs text-gray-600">Última visita: {tech.lastVisit}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-semibold text-yellow-700">{tech.rating}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-yellow-400 bg-white shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white border-b-2 border-yellow-600">
                        <CardTitle className="text-white flex items-center gap-3">
                          <FileText className="h-6 w-6" />
                          Resumo de Atendimentos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 border-2 border-yellow-300 rounded-lg bg-yellow-50">
                            <div>
                              <p className="font-semibold text-yellow-700">Chamados/Mês</p>
                              <p className="text-2xl font-bold text-yellow-800">{clientData.history.monthlyCallFrequency}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-yellow-600" />
                          </div>
                          <div className="flex justify-between items-center p-4 border-2 border-yellow-300 rounded-lg bg-yellow-50">
                            <div>
                              <p className="font-semibold text-yellow-700">Tempo Médio Resposta</p>
                              <p className="text-2xl font-bold text-yellow-800">{clientData.history.responseTime}</p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-yellow-600" />
                          </div>
                          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg font-semibold">
                            <FileText className="h-5 w-5 mr-2" />
                            Ver Histórico Completo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-0">
                  <Card className="border-2 border-yellow-400 bg-white shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white border-b-2 border-yellow-600">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <FileText className="h-6 w-6" />
                        Anexos e Documentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {clientData.documents.map((doc, index) => (
                          <Card key={index} className="border-2 border-yellow-300 bg-white shadow-md hover:shadow-lg transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-yellow-700 truncate">{doc.type}</p>
                                  <p className="text-sm text-yellow-600">{doc.count} arquivo(s)</p>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white ml-3"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg font-semibold">
                          <Upload className="h-5 w-5 mr-2" />
                          Upload Documentos
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white font-semibold"
                        >
                          <Camera className="h-5 w-5 mr-2" />
                          Fotos do Local
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="actions" className="mt-0">
                  <Card className="border-2 border-yellow-400 bg-white shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white border-b-2 border-yellow-600">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <Settings className="h-6 w-6" />
                        Ações Disponíveis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white h-20 flex-col shadow-lg font-semibold">
                          <Plus className="h-6 w-6 mb-2" />
                          Abrir Novo Chamado
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white h-20 flex-col font-semibold"
                        >
                          <FileText className="h-6 w-6 mb-2" />
                          Visualizar OSs
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white h-20 flex-col font-semibold"
                        >
                          <Download className="h-6 w-6 mb-2" />
                          Exportar Dados
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white h-20 flex-col font-semibold"
                        >
                          <Edit className="h-6 w-6 mb-2" />
                          Atualizar Informações
                        </Button>
                      </div>

                      <Separator className="bg-yellow-400 h-0.5" />

                      <div>
                        <Label className="text-yellow-700 font-semibold">Checklist de Instalação</Label>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          {clientData.installationChecklist ? (
                            <Badge className="bg-green-100 text-green-800 border border-green-300">✔ Preenchido</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 border border-red-300">⚠ Pendente</Badge>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white font-semibold"
                          >
                            Ver Checklist
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </CustomerLayout>
    </div>
  );
};

export default CustomerClients;
