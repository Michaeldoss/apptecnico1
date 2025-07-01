
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TechnicianEquipments = () => {
  return (
    <TechnicianLayout title="Equipamentos">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Equipamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Interface de gerenciamento de equipamentos será implementada aqui.</p>
        </CardContent>
      </Card>
    </TechnicianLayout>
  );
};

export default TechnicianEquipments;
