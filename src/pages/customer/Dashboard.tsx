
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, isLoading } = useAuth();
  
  console.log('[DEBUG] CustomerDashboard - verificando autenticação');
  console.log('[DEBUG] isAuthenticated:', isAuthenticated);
  console.log('[DEBUG] userType:', userType);
  console.log('[DEBUG] isLoading:', isLoading);
  
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
    
    console.log('[DEBUG] Redirecionando para perfil unificado');
    navigate('/cliente/perfil', { replace: true });
  }, [isAuthenticated, userType, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verificando sessão...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-gray-600">Redirecionando para o painel...</p>
      </div>
    </div>
  );
};

export default CustomerDashboard;
