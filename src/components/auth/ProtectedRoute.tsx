
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: string; // Add this prop to match usage in App.tsx
  allowedUserTypes?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  userType, // Accept userType prop
  allowedUserTypes = ['customer', 'technician', 'admin', 'company'] 
}) => {
  const { isAuthenticated, userType: currentUserType, user, isLoading } = useAuth();
  const location = useLocation();

  // If userType is provided, use it as the only allowed type
  const finalAllowedTypes = userType ? [userType] : allowedUserTypes;

  console.log('ProtectedRoute - Verificando acesso para:', location.pathname);
  console.log('ProtectedRoute - isLoading:', isLoading);
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - userType:', currentUserType);
  console.log('ProtectedRoute - user:', user?.name);
  console.log('ProtectedRoute - finalAllowedTypes:', finalAllowedTypes);

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

  if (!currentUserType) {
    console.log('ProtectedRoute - UserType é null, redirecionando para login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!finalAllowedTypes.includes(currentUserType)) {
    console.log('ProtectedRoute - Tipo de usuário não permitido:', currentUserType, 'permitidos:', finalAllowedTypes);
    
    // Redirecionar para o dashboard apropriado do usuário
    switch (currentUserType) {
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

  console.log('ProtectedRoute - Acesso autorizado para:', currentUserType);
  
  return <>{children}</>;
};

export default ProtectedRoute;
