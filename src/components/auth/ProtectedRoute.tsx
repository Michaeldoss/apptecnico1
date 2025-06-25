
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
  const { isAuthenticated, userType } = useAuth();

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - userType:', userType);
  console.log('ProtectedRoute - allowedUserTypes:', allowedUserTypes);

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (userType && !allowedUserTypes.includes(userType)) {
    console.log('User type not allowed, redirecting to home');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
