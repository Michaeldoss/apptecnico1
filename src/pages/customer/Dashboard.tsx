
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import CustomerLayout from '@/components/layout/CustomerLayout';
import CustomerFinancialSummary from '@/components/customer/CustomerFinancialSummary';
import CustomerServiceMetricsComponent from '@/components/customer/CustomerServiceMetrics';
import CustomerEquipmentOverview from '@/components/customer/CustomerEquipmentOverview';
import CustomerQuickActions from '@/components/customer/CustomerQuickActions';
import { useCustomerDashboard } from '@/hooks/useCustomerDashboard';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, isLoading } = useAuth();
  
  console.log('[DEBUG] CustomerDashboard - verificando autenticação');
  console.log('[DEBUG] isAuthenticated:', isAuthenticated);
  console.log('[DEBUG] userType:', userType);
  console.log('[DEBUG] isLoading:', isLoading);

  const {
    stats,
    serviceMetrics,
    equipment,
    weeklyPayments
  } = useCustomerDashboard();
  
  useEffect(() => {
    console.log('[DEBUG] CustomerDashboard useEffect executado');
    
    if (isLoading) {
      console.log('[DEBUG] Ainda carregando autenticação...');
      return;
    }
    
    if (!isAuthenticated) {
      console.log('[DEBUG] Usuário não autenticado, redirecionando para login');
      navigate('/login', { replace: true });
      return;
    }
    
    if (userType !== 'customer') {
      console.log('[DEBUG] Tipo de usuário incorreto:', userType);
      navigate('/', { replace: true });
      return;
    }
  }, [isAuthenticated, userType, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="mt-2 text-white">Verificando sessão...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || userType !== 'customer') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-600">
        <div className="text-center">
          <p className="text-white">Redirecionando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <CustomerLayout title="Painel de Controle do Cliente">
      <div className="space-y-8 font-inter">
        {/* Resumo Financeiro com Gráfico */}
        <CustomerFinancialSummary 
          stats={stats} 
          weeklyPayments={weeklyPayments}
        />

        {/* Métricas de Serviço com Gráfico de Pizza */}
        <CustomerServiceMetricsComponent metrics={serviceMetrics} />

        {/* Visão Geral dos Equipamentos com Gráficos */}
        <CustomerEquipmentOverview equipment={equipment} />

        {/* Ações Rápidas Organizadas */}
        <CustomerQuickActions />
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
