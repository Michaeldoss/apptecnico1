
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({ children }) => {
  // Use a variável de ambiente ou um valor padrão
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "SEU_CLIENT_ID_AQUI.apps.googleusercontent.com";
  
  console.log('Google Client ID configurado:', GOOGLE_CLIENT_ID ? 'Sim' : 'Não');
  
  // Se não houver Client ID válido, renderize apenas os children sem o provider do Google
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "SEU_CLIENT_ID_AQUI.apps.googleusercontent.com") {
    console.warn('Google Client ID não configurado. Login com Google não estará disponível.');
    return <>{children}</>;
  }
  
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
