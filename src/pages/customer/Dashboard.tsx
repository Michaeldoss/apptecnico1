
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, MapPin, CreditCard, Clock } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  // Dados de exemplo
  const activeServices = 2;
  const completedServices = 8;
  const pendingPayments = 1;
  
  return (
    <CustomerLayout title="Painel do Cliente">
      {/* Cards principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Serviços Ativos</CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeServices}</div>
            <p className="text-xs text-muted-foreground">
              Em andamento
            </p>
            <Button variant="link" size="sm" asChild className="mt-2 p-0">
              <Link to="/cliente/servicos">Ver serviços</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Técnicos em Campo</CardTitle>
            <MapPin className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Atendimento em andamento
            </p>
            <Button variant="link" size="sm" asChild className="mt-2 p-0">
              <Link to="/cliente/rastreamento">Rastrear técnico</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos</CardTitle>
            <CreditCard className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">
              Pendente de pagamento
            </p>
            <Button variant="link" size="sm" asChild className="mt-2 p-0">
              <Link to="/cliente/pagamentos">Ver pagamentos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Visão rápida */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Serviços Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Reparo de Computador</p>
                  <p className="text-sm text-muted-foreground">Agendado para 15/08/2023</p>
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Em andamento
                </span>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Manutenção de Rede</p>
                  <p className="text-sm text-muted-foreground">Concluído em 10/08/2023</p>
                </div>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  Concluído
                </span>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/cliente/servicos">Ver todos os serviços</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Técnicos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">TD</span>
                </div>
                <div>
                  <p className="font-medium">Técnico Demo</p>
                  <p className="text-sm text-muted-foreground">Último atendimento: 15/08/2023</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">JS</span>
                </div>
                <div>
                  <p className="font-medium">João Silva</p>
                  <p className="text-sm text-muted-foreground">Último atendimento: 10/08/2023</p>
                </div>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/cliente/tecnicos">Ver todos os técnicos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
