
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TechnicianCustomers = () => {
  return (
    <TechnicianLayout title="Meus Clientes">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Gerencie seus clientes e histórico de atendimentos.</p>
        </CardContent>
      </Card>
    </TechnicianLayout>
  );
};

export default TechnicianCustomers;
