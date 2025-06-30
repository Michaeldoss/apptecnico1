
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import UserTypeSelector from './UserTypeSelector';

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  const [googleUserData, setGoogleUserData] = useState<any>(null);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Google login success:', credentialResponse);
      
      // Decodificar o JWT do Google para extrair informações do usuário
      const credential = credentialResponse.credential;
      const payload = JSON.parse(atob(credential.split('.')[1]));
      
      console.log('Google user data:', payload);
      
      // Armazenar dados do usuário e mostrar seletor de tipo
      setGoogleUserData(payload);
      setShowUserTypeSelector(true);
      
    } catch (error) {
      console.error('Erro ao processar login com Google:', error);
      toast({
        variant: "destructive",
        title: "Erro no login com Google",
        description: "Não foi possível fazer login. Tente novamente.",
      });
    }
  };

  const handleUserTypeSelection = async (userType: 'customer' | 'technician' | 'company') => {
    try {
      setShowUserTypeSelector(false);
      
      // Fazer login com o tipo selecionado
      const success = await login(googleUserData.email, 'google_login', userType);
      
      if (success) {
        toast({
          title: "Login com Google realizado!",
          description: `Bem-vindo, ${googleUserData.name}!`,
        });
        
        if (onSuccess) {
          onSuccess();
        }
      }
      
    } catch (error) {
      console.error('Erro ao processar seleção de tipo:', error);
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Não foi possível completar o login. Tente novamente.",
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
    <>
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
      
      {showUserTypeSelector && googleUserData && (
        <UserTypeSelector
          isOpen={showUserTypeSelector}
          onSelect={handleUserTypeSelection}
          userEmail={googleUserData.email}
        />
      )}
    </>
  );
};

export default GoogleLoginButton;
