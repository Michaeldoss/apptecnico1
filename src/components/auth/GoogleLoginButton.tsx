
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import UserTypeSelector from './UserTypeSelector';

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  const [googleUserData, setGoogleUserData] = useState<any>(null);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // Decodificar o JWT do Google para extrair informações do usuário
      const credential = credentialResponse.credential;
      const payload = JSON.parse(atob(credential.split('.')[1]));
      
      // Armazenar dados do usuário e mostrar seletor de tipo
      setGoogleUserData(payload);
      setShowUserTypeSelector(true);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no login com Google",
        description: "Não foi possível fazer login. Tente novamente.",
      });
    }
  };

  const handleUserTypeSelection = async (userType: 'customer' | 'technician' | 'company') => {
    if (!googleUserData) return;

    try {
      setShowUserTypeSelector(false);
      
      // Use Supabase's built-in Google OAuth instead of temporary passwords
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            userType: userType
          }
        }
      });

      if (error) {
        throw error;
      }

      // The OAuth flow will handle the redirect automatically
      toast({
        title: "Redirecionando...",
        description: "Configurando sua conta Google.",
      });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao conectar com Google. Tente novamente.",
      });
    }
  };

  const handleGoogleError = () => {
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
