
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType } = useAuth();
  
  console.log('CustomerDashboard - Redirecionando para perfil unificado');
  
  useEffect(() => {
    if (isAuthenticated && userType === 'customer') {
      navigate('/cliente/perfil', { replace: true });
    }
  }, [isAuthenticated, userType, navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-gray-600">Redirecionando para o painel...</p>
      </div>
    </div>
  );
};

export default CustomerDashboard;
