
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({ children }) => {
  // Use hardcoded Google Client ID for production security
  const GOOGLE_CLIENT_ID = "563306312769-snjuhf4489q6imk666i48906h4c91f69.apps.googleusercontent.com";
  
  
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
