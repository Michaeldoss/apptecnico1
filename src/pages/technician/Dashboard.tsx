
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import WeeklyAgenda from '@/components/dashboard/WeeklyAgenda';
import ServiceMetrics from '@/components/dashboard/ServiceMetrics';
import StockControl from '@/components/dashboard/StockControl';
import KPIMetrics from '@/components/dashboard/KPIMetrics';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import QuickActions from '@/components/dashboard/QuickActions';
import { useDashboard } from '@/hooks/useDashboard';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const TechnicianDashboard = () => {
  const { user, isAuthenticated, userType, isLoading } = useAuth();
  const {
    stats,
    weeklyEarnings,
    weeklySchedule,
    serviceMetrics,
    stockItems,
    urgentStockItems,
    kpiMetrics,
    alerts,
    urgentAlerts,
    totalConflicts
  } = useDashboard();
  
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
          <Link to="/login" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  const userName = user?.name || user?.email?.split('@')[0] || 'Técnico';

  return (
    <TechnicianLayout title="Dashboard do Técnico">
      <div className="space-y-6">
        {/* Bem-vindo */}
        <div className="mb-4">
          <p className="text-gray-600">
            Bem-vindo, {userName}! Aqui está um resumo completo das suas atividades e performance.
          </p>
        </div>
        
        {/* Resumo Financeiro */}
        <FinancialSummary 
          stats={stats}
          weeklyEarnings={weeklyEarnings}
        />
        
        {/* Grade Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Agenda Semanal */}
          <div className="lg:col-span-1">
            <WeeklyAgenda 
              weeklySchedule={weeklySchedule}
              totalConflicts={totalConflicts}
            />
          </div>
          
          {/* Métricas de Serviços */}
          <div className="lg:col-span-1">
            <ServiceMetrics metrics={serviceMetrics} />
          </div>
          
          {/* Controle de Estoque */}
          <div className="lg:col-span-1 xl:col-span-1">
            <StockControl 
              stockItems={stockItems}
              urgentItems={urgentStockItems}
            />
          </div>
        </div>
        
        {/* Segunda Grade */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KPI Metrics */}
          <KPIMetrics metrics={kpiMetrics} />
          
          {/* Alertas */}
          <AlertsPanel 
            alerts={alerts}
            urgentAlerts={urgentAlerts}
          />
        </div>
        
        {/* Acessos Rápidos */}
        <QuickActions />
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianDashboard;
