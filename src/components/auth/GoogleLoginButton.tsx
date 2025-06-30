
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

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
