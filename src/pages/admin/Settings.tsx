
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/layout/AdminLayout';

const AdminSettings = () => {
  return (
    <AdminLayout title="Configurações do Sistema" subtitle="Defina configurações globais da plataforma">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Interface de configurações do sistema será implementada aqui.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminSettings;
