
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({ children }) => {
  // Use hardcoded Google Client ID for production security
  const GOOGLE_CLIENT_ID = "your-google-client-id-here"; // Should be configured in production
  
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "your-google-client-id-here") {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600">Configuração do Google Auth não encontrada</p>
          <p className="text-sm text-gray-600 mt-2">
            Configure o Google Client ID para habilitar autenticação com Google
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
