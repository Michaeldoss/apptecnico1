
import React from 'react';
import TechnicianLayout from '@/components/layout/TechnicianLayout';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import WeeklyAgenda from '@/components/dashboard/WeeklyAgenda';
import ServiceMetricsComponent from '@/components/dashboard/ServiceMetrics';
import StockControl from '@/components/dashboard/StockControl';
import KPIMetricsComponent from '@/components/dashboard/KPIMetrics';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import QuickActions from '@/components/dashboard/QuickActions';
import MonthlyRevenueChart from '@/components/dashboard/MonthlyRevenueChart';
import PerformanceAnalysisChart from '@/components/dashboard/PerformanceAnalysisChart';
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
    weeklyEarnings,
    isNewUser
  } = useDashboard();

  const totalConflicts = weeklySchedule.reduce((sum, day) => sum + day.conflicts, 0);

  return (
    <TechnicianLayout title="Painel de Controle">
      <div className="space-y-6 font-inter animate-fade-in">
        {/* Primeira linha - Resumo Financeiro */}
        <div className="animate-scale-in">
          <FinancialSummary 
            stats={stats} 
            weeklyEarnings={weeklyEarnings}
          />
        </div>

        {/* Segunda linha - Agenda e Chamados */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <WeeklyAgenda 
              weeklySchedule={weeklySchedule}
              totalConflicts={totalConflicts}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <ServiceMetricsComponent metrics={serviceMetrics} />
          </div>
        </div>

        {/* Terceira linha - KPIs e Estoque */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <KPIMetricsComponent metrics={kpiMetrics} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <StockControl 
              stockItems={stockItems} 
              urgentItems={urgentStockItems}
            />
          </div>
        </div>

        {/* Quarta linha - Gráficos Interativos */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <MonthlyRevenueChart isNewUser={isNewUser} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <PerformanceAnalysisChart isNewUser={isNewUser} />
          </div>
        </div>

        {/* Quinta linha - Alertas */}
        <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <AlertsPanel 
            alerts={alerts}
            urgentAlerts={urgentAlerts}
          />
        </div>

        {/* Sexta linha - Acessos Rápidos */}
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <QuickActions />
        </div>
      </div>
    </TechnicianLayout>
  );
};

export default TechnicianDashboard;
