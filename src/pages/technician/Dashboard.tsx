
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Wrench, MapPin, DollarSign } from 'lucide-react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const TechnicianDashboard = () => {
  const { user, isAuthenticated, userType, isLoading } = useAuth();
  
  console.log('TechnicianDashboard - Renderizando');
  console.log('TechnicianDashboard - isAuthenticated:', isAuthenticated);
  console.log('TechnicianDashboard - userType:', userType);
  console.log('TechnicianDashboard - user:', user?.name);
  console.log('TechnicianDashboard - isLoading:', isLoading);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }
  
  // Access control with safe fallbacks
  if (!isAuthenticated || userType !== 'technician') {
    console.log('TechnicianDashboard - Acesso negado');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Acesso negado</h2>
          <p className="text-gray-500 mt-2">Você precisa estar logado como técnico para acessar esta página.</p>
          <Link href="/login" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  const todayServices = 3;
  const weeklyEarnings = 2450.00;
  const pendingServices = 5;
  const userName = user?.name || user?.email?.split('@')[0] || 'Técnico';

  return (
    <TechnicianLayout title="Dashboard do Técnico">
      <div className="space-y-6">
        <div className="mb-4">
          <p className="text-gray-600">
            Bem-vindo, {userName}! Aqui está um resumo das suas atividades.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Serviços Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayServices}</div>
              <p className="text-xs text-muted-foreground">Agendados para hoje</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Serviços Pendentes</CardTitle>
              <Wrench className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingServices}</div>
              <p className="text-xs text-muted-foreground">Aguardando atendimento</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Localização</CardTitle>
              <MapPin className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ativo</div>
              <p className="text-xs text-muted-foreground">Disponível para chamados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ganhos (Semana)</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {weeklyEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Atendimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Reparo de Impressora</p>
                    <p className="text-sm text-muted-foreground">14:00 - João Silva</p>
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Hoje
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Manutenção de PC</p>
                    <p className="text-sm text-muted-foreground">16:30 - Maria Oliveira</p>
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Hoje
                  </span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/tecnico/servicos">Ver todos os serviços</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href="/tecnico/agenda">Ver Agenda</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tecnico/perfil">Atualizar Perfil</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tecnico/pecas">Gerenciar Peças</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianDashboard;
