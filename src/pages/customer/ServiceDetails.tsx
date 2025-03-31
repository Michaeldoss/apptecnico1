
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, MapPin, CreditCard, FileText, Clock } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Service } from '@/types/service';
import { useServices } from '@/hooks/useServices';
import StatusBadge from '@/components/services/StatusBadge';
import TrackingStatus from '@/components/services/TrackingStatus';

const CustomerServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { services } = useServices();
  
  // Find the service by ID
  const service = services.find(s => s.id === Number(id));
  
  if (!service) {
    return (
      <CustomerLayout title="Serviço não encontrado">
        <div className="text-center py-12">
          <p className="text-xl">Serviço não encontrado</p>
          <Button className="mt-4" asChild>
            <Link to="/cliente/servicos">Voltar para serviços</Link>
          </Button>
        </div>
      </CustomerLayout>
    );
  }
  
  return (
    <CustomerLayout title={`Serviço #${service.id}`}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Serviço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{service.type}</h3>
                <StatusBadge status={service.status} />
              </div>
              <div className="text-right">
                <p className="font-medium">{service.price}</p>
                {service.payment && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    service.payment.status === 'pago' ? 'bg-green-100 text-green-800' :
                    service.payment.status === 'aguardando' ? 'bg-yellow-100 text-yellow-800' :
                    service.payment.status === 'parcial' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {service.payment.status === 'pago' ? 'Pago' : 
                     service.payment.status === 'aguardando' ? 'Pagamento Pendente' :
                     service.payment.status === 'parcial' ? 'Pago Parcialmente' :
                     'Pagamento Cancelado'}
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Descrição</h4>
                <p className="text-sm">{service.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Endereço</h4>
                <p className="text-sm flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {service.address}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Data</h4>
                <p className="text-sm flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {service.date}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Técnico</h4>
                <p className="text-sm">Técnico Demo</p>
              </div>
            </div>
            
            {service.tracking && (
              <div>
                <h4 className="text-sm font-medium mb-1">Status do Atendimento</h4>
                <TrackingStatus tracking={service.tracking} />
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mt-4">
              {service.serviceOrderId && (
                <Button variant="outline" asChild>
                  <Link to={`/cliente/servicos/${service.id}/os`}>
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Ordem de Serviço
                  </Link>
                </Button>
              )}
              
              {service.tracking?.checkedIn && !service.tracking?.checkedOut && (
                <Button variant="outline" asChild>
                  <Link to={`/cliente/rastreamento/${service.id}`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Rastrear Técnico
                  </Link>
                </Button>
              )}
              
              {service.status === 'concluído' && (!service.payment || service.payment.status !== 'pago') && (
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <Link to={`/cliente/pagamentos/${service.id}`}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Realizar Pagamento
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Histórico de atividades (exemplo) */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {service.tracking?.checkedOut && (
                <li className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-3">
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Serviço finalizado</p>
                    <p className="text-sm text-muted-foreground">{service.tracking.checkoutTime}</p>
                  </div>
                </li>
              )}
              
              {service.tracking?.checkedIn && (
                <li className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-3">
                    <Wrench className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Técnico iniciou o atendimento</p>
                    <p className="text-sm text-muted-foreground">{service.tracking.checkinTime}</p>
                  </div>
                </li>
              )}
              
              <li className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mr-3">
                  <Clock className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Serviço agendado</p>
                  <p className="text-sm text-muted-foreground">{service.date}</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

// Componente auxiliar para ícone
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default CustomerServiceDetails;
