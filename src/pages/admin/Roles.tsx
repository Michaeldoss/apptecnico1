
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/layout/AdminLayout';

const AdminRoles = () => {
  return (
    <AdminLayout title="Gestão de Perfis" subtitle="Gerencie perfis e permissões do sistema">
      <Card>
        <CardHeader>
          <CardTitle>Perfis de Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Interface de gerenciamento de perfis será implementada aqui.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminRoles;
