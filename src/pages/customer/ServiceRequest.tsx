
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import ServiceRequestForm from '@/components/services/ServiceRequestForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const CustomerServiceRequest = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    setTimeout(() => {
      navigate('/cliente/servicos');
    }, 1500);
  };
  
  return (
    <CustomerLayout title="Solicitar Serviço">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Solicitar Novo Serviço</CardTitle>
            <CardDescription>
              Preencha as informações abaixo para solicitar um novo serviço técnico.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ServiceRequestForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default CustomerServiceRequest;
