
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TechnicianSettings = () => {
  return (
    <TechnicianLayout title="Configurações">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Técnico</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Interface de configurações será implementada aqui.</p>
        </CardContent>
      </Card>
    </TechnicianLayout>
  );
};

export default TechnicianSettings;
