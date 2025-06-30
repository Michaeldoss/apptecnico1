
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Verificar se o Google Client ID está configurado
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "SEU_CLIENT_ID_AQUI.apps.googleusercontent.com";
  const isGoogleConfigured = GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== "SEU_CLIENT_ID_AQUI.apps.googleusercontent.com";

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Google login success:', credentialResponse);
      
      // Decodificar o JWT do Google para extrair informações do usuário
      const credential = credentialResponse.credential;
      const payload = JSON.parse(atob(credential.split('.')[1]));
      
      console.log('Google user data:', payload);
      
      // Simular login bem-sucedido
      const success = await login(payload.email, 'google_login');
      
      if (success) {
        toast({
          title: "Login com Google realizado!",
          description: `Bem-vindo, ${payload.name}!`,
        });
        
        if (onSuccess) {
          onSuccess();
        }
      }
      
    } catch (error) {
      console.error('Erro ao processar login com Google:', error);
      toast({
        variant: "destructive",
        title: "Erro no login com Google",
        description: "Não foi possível fazer login. Tente novamente.",
      });
    }
  };

  const handleGoogleError = () => {
    console.log('Login com Google falhou');
    toast({
      variant: "destructive",
      title: "Login cancelado",
      description: "Login com Google foi cancelado.",
    });
  };

  // Se o Google não estiver configurado, mostrar botão desabilitado
  if (!isGoogleConfigured) {
    return (
      <Button 
        variant="outline" 
        className="w-full" 
        disabled
        title="Google Client ID não configurado"
      >
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continuar com Google (Não configurado)
      </Button>
    );
  }

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        size="large"
        width="100%"
        text="continue_with"
        shape="rectangular"
        theme="outline"
      />
    </div>
  );
};

export default GoogleLoginButton;
