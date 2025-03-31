
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useServices } from '@/hooks/useServices';
import { formatDate } from '@/lib/utils';
import { FileText, ArrowLeft, Calendar, MapPin, CheckCircle } from 'lucide-react';
import PaymentForm from '@/components/services/PaymentForm';
import StatusBadge from '@/components/services/StatusBadge';
import RatingStars from '@/components/services/RatingStars';

const CustomerPaymentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { services, processPayment, rateTechnician } = useServices();
  const navigate = useNavigate();
  
  // Find the service by ID
  const service = services.find(s => s.id === Number(id));
  
  if (!service) {
    return (
      <CustomerLayout title="Pagamento não encontrado">
        <div className="text-center p-6">
          <p>Informações de pagamento não encontradas.</p>
          <Button 
            onClick={() => navigate('/cliente/pagamentos')}
            className="mt-4"
          >
            Voltar para pagamentos
          </Button>
        </div>
      </CustomerLayout>
    );
  }
  
  // Handler for completing payment
  const handlePayment = (method: string) => {
    processPayment(service.id, method);
    // Redirect back to payments list after a short delay
    setTimeout(() => {
      navigate('/cliente/pagamentos');
    }, 2000);
  };
  
  // Handler for rating the technician
  const handleRateTechnician = (rating: number) => {
    rateTechnician(service.id, rating);
  };
  
  return (
    <CustomerLayout title="Detalhes de Pagamento">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/cliente/pagamentos')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para pagamentos
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Serviço #{service.id}</span>
                <StatusBadge status={service.status} />
              </CardTitle>
              <CardDescription>
                {service.type}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Descrição</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Data do Serviço
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Local
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.address}</p>
                </div>
              </div>
              
              {service.payment?.status === 'pago' && (
                <div className="pt-2 mt-2 border-t">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="font-medium">Pagamento realizado</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    <p>Método: {service.payment.method}</p>
                    <p>Data: {service.payment.date}</p>
                  </div>
                </div>
              )}
              
              {service.status === 'concluído' && service.payment?.status !== 'pago' && (
                <div className="pt-4 mt-2 border-t">
                  <h3 className="text-sm font-medium mb-2">Realizar Pagamento</h3>
                  <PaymentForm onSubmit={handlePayment} />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to={`/cliente/servicos/${service.id}`}>
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Detalhes do Serviço
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Avaliação do Técnico - mostrar apenas se o serviço estiver concluído e o pagamento realizado */}
          {service.status === 'concluído' && service.payment?.status === 'pago' && (
            <Card>
              <CardHeader>
                <CardTitle>Avaliar o Serviço</CardTitle>
                <CardDescription>
                  Sua avaliação é importante para melhorarmos continuamente nossos serviços.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Como você avalia o serviço realizado?</h3>
                    <RatingStars 
                      rating={service.technicianRating || 0} 
                      onRate={handleRateTechnician}
                      readOnly={service.technicianRating !== null}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Serviço</span>
                <span>{service.price}</span>
              </div>
              <div className="pt-4 border-t flex justify-between font-bold">
                <span>Total</span>
                <span>{service.price}</span>
              </div>
              
              {service.payment?.status === 'pago' ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 mt-4 text-green-700 text-sm">
                  <p className="font-medium">Pagamento confirmado</p>
                  <p className="mt-1">Obrigado pela confiança!</p>
                </div>
              ) : service.status === 'concluído' ? (
                <p className="text-sm text-muted-foreground mt-4">
                  Realize o pagamento para concluir este serviço.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-4">
                  O pagamento estará disponível após a conclusão do serviço.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerPaymentDetails;
