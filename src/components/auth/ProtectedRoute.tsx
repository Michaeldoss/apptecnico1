import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: string;
  allowedUserTypes?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  userType,
  allowedUserTypes = ['customer', 'technician', 'admin', 'company'] 
}) => {
  const { isAuthenticated, userType: currentUserType, isLoading } = useAuth();
  const location = useLocation();

  // If userType is provided, use it as the only allowed type
  const finalAllowedTypes = userType ? [userType] : allowedUserTypes;

  // Security: Remove sensitive logging in production
  if (process.env.NODE_ENV === 'development') {
    console.log('ProtectedRoute - Verificando acesso para:', location.pathname);
    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
    console.log('ProtectedRoute - userType:', currentUserType);
  }

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

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!currentUserType) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!finalAllowedTypes.includes(currentUserType)) {
    // Redirecionar para o dashboard apropriado do usuário
    switch (currentUserType) {
      case 'technician':
        return <Navigate to="/tecnico/dashboard" replace />;
      case 'customer':
        return <Navigate to="/cliente/dashboard" replace />;
      case 'company':
        return <Navigate to="/loja/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;