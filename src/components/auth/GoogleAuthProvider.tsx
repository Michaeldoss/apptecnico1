
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({ children }) => {
  // TODO: Substitua pela sua Client ID do Google Cloud Console
  const GOOGLE_CLIENT_ID = "SEU_CLIENT_ID_AQUI.apps.googleusercontent.com";
  
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
