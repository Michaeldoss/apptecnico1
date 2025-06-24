
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, User, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Appointment = {
  id: number;
  technician: string;
  serviceType: string;
  date: string;
  time: string;
  address: string;
  status: 'agendado' | 'em andamento' | 'concluído' | 'cancelado';
  notes?: string;
};

const CustomerSchedule = () => {
  const { isAuthenticated, userType } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Verificar se o usuário está logado como cliente
  if (!isAuthenticated || userType !== 'customer') {
    return (
      <CustomerLayout title="Agenda">
        <Alert className="max-w-md mx-auto mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Você precisa estar logado como cliente para acessar sua agenda.
          </AlertDescription>
        </Alert>
      </CustomerLayout>
    );
  }
  
  // Dados de exemplo para clientes
  const appointments: Appointment[] = [
    {
      id: 1,
      technician: 'João Silva',
      serviceType: 'Manutenção de Notebook',
      date: '2023-07-24',
      time: '10:00',
      address: 'Rua Vergueiro, 500, São Paulo - SP',
      status: 'agendado',
    },
    {
      id: 2,
      technician: 'Maria Santos',
      serviceType: 'Instalação de Software',
      date: '2023-07-24',
      time: '14:30',
      address: 'Av. Paulista, 1000, São Paulo - SP',
      status: 'agendado',
    },
    {
      id: 3,
      technician: 'Pedro Costa',
      serviceType: 'Reparo de PC Desktop',
      date: '2023-07-25',
      time: '09:00',
      address: 'Rua Augusta, 1200, São Paulo - SP',
      status: 'agendado',
    },
  ];
  
  // Filtrar compromissos pela data selecionada
  const selectedDateISO = date?.toISOString().split('T')[0];
  const filteredAppointments = appointments.filter(
    app => app.date === selectedDateISO
  ).sort((a, b) => a.time.localeCompare(b.time));
  
  // Verificar se existem agendamentos em uma data específica
  const hasAppointment = (date: Date) => {
    const dateISO = date.toISOString().split('T')[0];
    return appointments.some(app => app.date === dateISO);
  };
  
  const handleNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para adicionar novo agendamento
    setIsDialogOpen(false);
  };
  
  return (
    <CustomerLayout title="Minha Agenda">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
              <CardDescription>
                Selecione uma data para ver seus agendamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  booked: (date) => hasAppointment(date),
                }}
                modifiersStyles={{
                  booked: { 
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fontWeight: 'bold',
                    color: '#3b82f6',
                  }
                }}
              />
              
              <div className="mt-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Agendar Serviço
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleNewAppointment}>
                      <DialogHeader>
                        <DialogTitle>Agendar Serviço</DialogTitle>
                        <DialogDescription>
                          Solicite um novo agendamento de serviço técnico
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="service-type">Tipo de Serviço</Label>
                          <Select>
                            <SelectTrigger id="service-type">
                              <SelectValue placeholder="Selecione um tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="repair">Reparo</SelectItem>
                              <SelectItem value="installation">Instalação</SelectItem>
                              <SelectItem value="maintenance">Manutenção</SelectItem>
                              <SelectItem value="configuration">Configuração</SelectItem>
                              <SelectItem value="consultation">Consultoria</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date">Data Preferida</Label>
                            <Input 
                              id="date" 
                              type="date" 
                              required 
                              defaultValue={selectedDateISO}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time">Horário Preferido</Label>
                            <Input id="time" type="time" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Endereço do Serviço</Label>
                          <Input id="address" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Descrição do Problema</Label>
                          <Textarea 
                            id="description" 
                            placeholder="Descreva o problema ou serviço necessário"
                            rows={3}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Solicitar Agendamento</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {date ? (
                  <span>
                    Agendamentos para {date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </span>
                ) : (
                  'Meus Agendamentos'
                )}
              </CardTitle>
              <CardDescription>
                Seus serviços agendados e histórico
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredAppointments.length > 0 ? (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              {appointment.time}
                            </Badge>
                            <Badge variant="outline">{appointment.serviceType}</Badge>
                          </div>
                          <h3 className="font-medium flex items-center gap-1 mb-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            Técnico: {appointment.technician}
                          </h3>
                          <p className="text-sm flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {appointment.address}
                          </p>
                          {appointment.notes && (
                            <p className="text-sm mt-2 p-2 bg-muted rounded-sm">
                              {appointment.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Ver Detalhes</Button>
                          <Button variant="outline" size="sm" className="text-red-500">Cancelar</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 bg-muted rounded-lg">
                  <CalendarIcon className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium text-lg mb-1">Sem agendamentos</h3>
                  <p className="text-muted-foreground mb-4">
                    Não há serviços agendados para esta data.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Agendar Serviço
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      {/* Reutilizar o mesmo formulário */}
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {appointments
                  .filter(app => new Date(app.date) >= new Date())
                  .slice(0, 3)
                  .map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.serviceType}</p>
                          <p className="text-sm text-muted-foreground">Técnico: {appointment.technician}</p>
                          <p className="text-xs">
                            {new Date(appointment.date).toLocaleDateString('pt-BR')} - {appointment.time}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Ver</Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerSchedule;
