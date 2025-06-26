
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import WeeklyAgenda from '@/components/dashboard/WeeklyAgenda';
import ServiceMetricsComponent from '@/components/dashboard/ServiceMetrics';
import StockControl from '@/components/dashboard/StockControl';
import KPIMetricsComponent from '@/components/dashboard/KPIMetrics';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import QuickActions from '@/components/dashboard/QuickActions';
import { useDashboard } from '@/hooks/useDashboard';

const TechnicianDashboard = () => {
  const {
    stats,
    weeklySchedule,
    serviceMetrics,
    stockItems,
    urgentStockItems,
    kpiMetrics,
    alerts,
    urgentAlerts,
    weeklyEarnings
  } = useDashboard();

  const totalConflicts = weeklySchedule.reduce((sum, day) => sum + day.conflicts, 0);

  return (
    <TechnicianLayout title="Painel de Controle">
      <div className="space-y-6 font-inter">
        {/* Primeira linha - Resumo Financeiro */}
        <FinancialSummary 
          stats={stats} 
          weeklyEarnings={weeklyEarnings}
        />

        {/* Segunda linha - Agenda e Chamados */}
        <div className="grid lg:grid-cols-2 gap-6 h-[400px]">
          <WeeklyAgenda 
            weeklySchedule={weeklySchedule}
            totalConflicts={totalConflicts}
          />
          <ServiceMetricsComponent metrics={serviceMetrics} />
        </div>

        {/* Terceira linha - KPIs e Estoque */}
        <div className="grid lg:grid-cols-2 gap-6 h-[400px]">
          <KPIMetricsComponent metrics={kpiMetrics} />
          <StockControl 
            stockItems={stockItems} 
            urgentItems={urgentStockItems}
          />
        </div>

        {/* Quarta linha - Alertas */}
        <div className="grid lg:grid-cols-1 gap-6 h-[400px]">
          <AlertsPanel 
            alerts={alerts}
            urgentAlerts={urgentAlerts}
          />
        </div>

        {/* Quinta linha - Acessos Rápidos */}
        <QuickActions />
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianDashboard;
