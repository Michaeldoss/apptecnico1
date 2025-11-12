import React from 'react';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

// No-op provider to avoid loading Google's iframe inside preview iframes.
// We rely solely on Supabase OAuth redirects/popups.
const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({ children }) => {
  return <>{children}</>; 
};

export default GoogleAuthProvider;
