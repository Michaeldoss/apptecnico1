
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/layout/AdminLayout';

const AdminUsers = () => {
  return (
    <AdminLayout title="Gestão de Usuários" subtitle="Gerencie técnicos, clientes e empresas">
      <Card>
        <CardHeader>
          <CardTitle>Usuários do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Interface de gerenciamento de usuários será implementada aqui.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminUsers;
