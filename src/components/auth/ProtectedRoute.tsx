
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
  const { isAuthenticated, userType, user, isLoading } = useAuth();

  console.log('ProtectedRoute - Verificando acesso...');
  console.log('ProtectedRoute - isLoading:', isLoading);
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - userType:', userType);
  console.log('ProtectedRoute - user:', user?.name);
  console.log('ProtectedRoute - allowedUserTypes:', allowedUserTypes);

  if (isLoading) {
    console.log('ProtectedRoute - Ainda carregando...');
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

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
