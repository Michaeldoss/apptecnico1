
import React, { useState } from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
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
import { CalendarIcon, Clock, MapPin, Plus, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type Appointment = {
  id: number;
  client: string;
  serviceType: string;
  date: string;
  time: string;
  address: string;
  status: 'agendado' | 'em andamento' | 'concluído' | 'cancelado';
  notes?: string;
};

const TechnicianSchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Dados de exemplo
  const appointments: Appointment[] = [
    {
      id: 1,
      client: 'Mariana Costa',
      serviceType: 'Manutenção de Notebook',
      date: '2023-07-24',
      time: '10:00',
      address: 'Rua Vergueiro, 500, São Paulo - SP',
      status: 'agendado',
    },
    {
      id: 2,
      client: 'Rafael Gomes',
      serviceType: 'Instalação de Software',
      date: '2023-07-24',
      time: '14:30',
      address: 'Av. Paulista, 1000, São Paulo - SP',
      status: 'agendado',
    },
    {
      id: 3,
      client: 'Carla Mendes',
      serviceType: 'Reparo de PC Desktop',
      date: '2023-07-25',
      time: '09:00',
      address: 'Rua Augusta, 1200, São Paulo - SP',
      status: 'agendado',
    },
    {
      id: 4,
      client: 'Fernando Silva',
      serviceType: 'Configuração de Rede',
      date: '2023-07-26',
      time: '16:00',
      address: 'Rua Oscar Freire, 300, São Paulo - SP',
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
    setIsDialogOpen(false);
  };
  
  return (
    <TechnicianLayout title="Agenda">
      <div className={cn(
        "w-full max-w-7xl mx-auto",
        isMobile ? "px-2 space-y-4" : "px-4"
      )}>
        <div className={cn(
          "grid gap-6",
          isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"
        )}>
          {/* Seção do Calendário */}
          <div className={cn(
            isMobile ? "order-1" : "lg:col-span-1"
          )}>
            <Card>
              <CardHeader>
                <CardTitle className={cn(
                  "flex items-center gap-2",
                  isMobile ? "text-lg" : "text-xl"
                )}>
                  <CalendarIcon className="h-5 w-5" />
                  Calendário
                </CardTitle>
                <CardDescription>
                  Selecione uma data para ver os agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full"
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
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size={isMobile ? "default" : "lg"}>
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Agendamento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleNewAppointment}>
                      <DialogHeader>
                        <DialogTitle>Agendar Serviço</DialogTitle>
                        <DialogDescription>
                          Adicione um novo agendamento à sua agenda
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="client">Cliente</Label>
                          <Input id="client" required />
                        </div>
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
                            <Label htmlFor="date">Data</Label>
                            <Input 
                              id="date" 
                              type="date" 
                              required 
                              defaultValue={selectedDateISO}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time">Horário</Label>
                            <Input id="time" type="time" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Endereço</Label>
                          <Input id="address" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notes">Observações</Label>
                          <Textarea 
                            id="notes" 
                            placeholder="Detalhes adicionais sobre o serviço"
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Agendar</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
          
          {/* Seção de Agendamentos */}
          <div className={cn(
            isMobile ? "order-2" : "lg:col-span-2"
          )}>
            <Card>
              <CardHeader>
                <CardTitle className={cn(
                  isMobile ? "text-lg" : "text-xl"
                )}>
                  {date ? (
                    <span className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Agendamentos para {date.toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric' 
                      })}
                    </span>
                  ) : (
                    'Agendamentos'
                  )}
                </CardTitle>
                <CardDescription>
                  {date ? 'Horários e detalhes dos serviços agendados' : 'Selecione uma data no calendário'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {date && filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow"
                      >
                        <div className={cn(
                          "flex justify-between",
                          isMobile ? "flex-col space-y-3" : "items-start"
                        )}>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                {appointment.time}
                              </Badge>
                              <Badge variant="outline">{appointment.serviceType}</Badge>
                            </div>
                            <h3 className="font-medium flex items-center gap-2 mb-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {appointment.client}
                            </h3>
                            <p className="text-sm flex items-start gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>{appointment.address}</span>
                            </p>
                            {appointment.notes && (
                              <p className="text-sm mt-2 p-2 bg-muted rounded-sm">
                                {appointment.notes}
                              </p>
                            )}
                          </div>
                          <div className={cn(
                            "flex gap-2",
                            isMobile ? "self-end" : ""
                          )}>
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : date ? (
                  <div className="text-center p-8 bg-muted/30 rounded-lg">
                    <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-2">Sem agendamentos</h3>
                    <p className="text-muted-foreground mb-4">
                      Não há serviços agendados para {date.toLocaleDateString('pt-BR')}.
                    </p>
                    <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Agendar Serviço
                    </Button>
                  </div>
                ) : (
                  <div className="text-center p-8 bg-muted/30 rounded-lg">
                    <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-2">Selecione uma data</h3>
                    <p className="text-muted-foreground">
                      Escolha uma data no calendário para ver os agendamentos.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Próximos Agendamentos */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className={cn(
                  "flex items-center gap-2",
                  isMobile ? "text-lg" : "text-xl"
                )}>
                  <Clock className="h-5 w-5" />
                  Próximos Agendamentos
                </CardTitle>
                <CardDescription>
                  Seus próximos compromissos agendados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointments
                    .filter(app => new Date(app.date) >= new Date())
                    .slice(0, 3)
                    .map(appointment => (
                      <div 
                        key={appointment.id} 
                        className={cn(
                          "flex justify-between p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors",
                          isMobile ? "flex-col space-y-2" : "items-center"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.client}</p>
                            <p className="text-sm text-muted-foreground">{appointment.serviceType}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(appointment.date).toLocaleDateString('pt-BR')} - {appointment.time}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className={cn(
                          isMobile ? "self-end" : ""
                        )}>
                          Ver Detalhes
                        </Button>
                      </div>
                    ))}
                  
                  {appointments.filter(app => new Date(app.date) >= new Date()).length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">Nenhum agendamento futuro encontrado.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianSchedule;
