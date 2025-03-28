
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PaymentForm from '@/components/services/PaymentForm';
import { ArrowLeft } from 'lucide-react';

const CustomerPaymentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: services, isLoading } = useServices();
  const navigate = useNavigate();
  
  const service = services.find(s => s.id === Number(id));
  
  const handleSuccess = () => {
    setTimeout(() => {
      navigate('/cliente/pagamentos');
    }, 1500);
  };
  
  if (isLoading) {
    return (
      <CustomerLayout title="Carregando...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </CustomerLayout>
    );
  }
  
  if (!service) {
    return (
      <CustomerLayout title="Serviço não encontrado">
        <div className="text-center py-12">
          <p className="text-xl">Serviço não encontrado</p>
          <Button className="mt-4" asChild>
            <Link to="/cliente/pagamentos">Voltar para pagamentos</Link>
          </Button>
        </div>
      </CustomerLayout>
    );
  }
  
  if (service.payment?.status === 'pago') {
    return (
      <CustomerLayout title="Pagamento já realizado">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Pagamento já realizado</h3>
            <p className="text-muted-foreground mb-6">
              Este serviço já foi pago em {service.payment.date} usando {service.payment.method}.
            </p>
            <Button asChild>
              <Link to="/cliente/pagamentos">Voltar para pagamentos</Link>
            </Button>
          </CardContent>
        </Card>
      </CustomerLayout>
    );
  }
  
  return (
    <CustomerLayout title="Realizar Pagamento">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Pagamento para {service.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentForm service={service} onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default CustomerPaymentDetails;
