
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  console.log('ProtectedRoute - Verificando acesso para:', location.pathname);
  console.log('ProtectedRoute - isLoading:', isLoading);
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - userType:', userType);
  console.log('ProtectedRoute - user:', user?.name);
  console.log('ProtectedRoute - allowedUserTypes:', allowedUserTypes);

  if (isLoading) {
    console.log('ProtectedRoute - Ainda carregando...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Usuário não autenticado, redirecionando para login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!userType) {
    console.log('ProtectedRoute - UserType é null, redirecionando para login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedUserTypes.includes(userType)) {
    console.log('ProtectedRoute - Tipo de usuário não permitido:', userType, 'permitidos:', allowedUserTypes);
    
    // Redirecionar para o dashboard apropriado do usuário
    switch (userType) {
      case 'technician':
        return <Navigate to="/tecnico/dashboard" replace />;
      case 'customer':
        return <Navigate to="/cliente/dashboard" replace />;
      case 'company':
        return <Navigate to="/loja/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  console.log('ProtectedRoute - Acesso autorizado para:', userType);
  
  return <>{children}</>;
};

export default ProtectedRoute;
