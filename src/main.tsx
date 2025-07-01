
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import GoogleAuthProvider from '@/components/auth/GoogleAuthProvider';
import './index.css';

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <GoogleAuthProvider>
      <App />
    </GoogleAuthProvider>
  </React.StrictMode>
);
