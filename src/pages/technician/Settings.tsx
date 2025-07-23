
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
          <p>Personalize suas preferências e configurações de perfil.</p>
        </CardContent>
      </Card>
    </TechnicianLayout>
  );
};

export default TechnicianSettings;
