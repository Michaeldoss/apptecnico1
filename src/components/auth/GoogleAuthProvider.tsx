
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({ children }) => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  if (!GOOGLE_CLIENT_ID) {
    console.error('Google Client ID não configurado');
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600">Configuração do Google Auth não encontrada</p>
          <p className="text-sm text-gray-600 mt-2">
            Configure VITE_GOOGLE_CLIENT_ID nas variáveis de ambiente
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
