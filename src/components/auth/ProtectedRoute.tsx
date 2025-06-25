
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedUserTypes = ['customer', 'technician', 'admin', 'company'] 
}) => {
  const { isAuthenticated, userType, user } = useAuth();

  console.log('ProtectedRoute - Verificando acesso...');
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - userType:', userType);
  console.log('ProtectedRoute - user:', user?.name);
  console.log('ProtectedRoute - allowedUserTypes:', allowedUserTypes);

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Usuário não autenticado, redirecionando para login');
    return <Navigate to="/login" replace />;
  }

  if (!userType) {
    console.log('ProtectedRoute - UserType é null, redirecionando para login');
    return <Navigate to="/login" replace />;
  }

  if (!allowedUserTypes.includes(userType)) {
    console.log('ProtectedRoute - Tipo de usuário não permitido:', userType, 'permitidos:', allowedUserTypes);
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute - Acesso autorizado para:', userType);
  return <>{children}</>;
};

export default ProtectedRoute;
