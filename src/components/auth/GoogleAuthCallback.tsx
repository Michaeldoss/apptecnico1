import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import UserTypeSelector from './UserTypeSelector';
import { buscarTipoUsuario } from '@/utils/buscarTipoUsuario';

const GoogleAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        if (!session) {
          navigate('/login');
          return;
        }

        const user = session.user;
        setUserId(user.id);
        setUserEmail(user.email || '');

        // Verificar se usuário já tem tipo definido
        const { role } = await buscarTipoUsuario(user.id);

        if (role === 'desconhecido') {
          // Novo usuário - mostrar seletor de tipo
          setShowTypeSelector(true);
        } else {
          // Usuário existente - redirecionar para dashboard apropriado
          redirectToDashboard(role);
        }
      } catch (error) {
        console.error('Error in Google callback:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Erro ao processar login com Google.",
        });
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  const redirectToDashboard = (role: string) => {
    const dashboardPaths: Record<string, string> = {
      cliente: '/cliente/dashboard',
      tecnico: '/tecnico/dashboard',
      loja: '/loja/dashboard',
      admin: '/admin/dashboard',
    };

    const path = dashboardPaths[role] || '/';
    navigate(path);
  };

  const handleUserTypeSelection = async (userType: 'customer' | 'technician' | 'company') => {
    try {
      const tipoMap: Record<string, string> = {
        customer: 'cliente',
        technician: 'tecnico',
        company: 'loja',
      };

      const tipo = tipoMap[userType];

      // Obter dados do usuário
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não encontrado');

      const nome = user.user_metadata.full_name || user.user_metadata.name || user.email?.split('@')[0] || 'Usuário';
      const email = user.email || '';

      // Criar registro na tabela usuarios
      const { error: usuarioError } = await supabase
        .from('usuarios')
        .insert({
          id: user.id,
          nome,
          email,
          tipo_usuario: tipo,
          ativo: true,
        });

      if (usuarioError && !usuarioError.message.includes('duplicate key')) {
        throw usuarioError;
      }

      // Criar registro na tabela específica
      if (tipo === 'cliente') {
        const { error } = await supabase
          .from('clientes')
          .insert({
            id: user.id,
            nome,
            email,
            perfil_completo: false,
            ativo: true,
          });

        if (error && !error.message.includes('duplicate key')) throw error;
      } else if (tipo === 'tecnico') {
        const { error } = await supabase
          .from('tecnicos')
          .insert({
            id: user.id,
            nome,
            email,
            perfil_completo: false,
            verificado: false,
            ativo: true,
          });

        if (error && !error.message.includes('duplicate key')) throw error;
      } else if (tipo === 'loja') {
        const { error } = await supabase
          .from('lojas')
          .insert({
            id: user.id,
            nome_empresa: nome,
            nome_contato: nome,
            email,
            perfil_completo: false,
            verificado: false,
            ativo: true,
          });

        if (error && !error.message.includes('duplicate key')) throw error;
      }

      toast({
        title: "Cadastro concluído!",
        description: "Complete seu perfil para começar a usar a plataforma.",
      });

      redirectToDashboard(tipo);
    } catch (error) {
      console.error('Error creating user profile:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao criar perfil. Tente novamente.",
      });
    }
  };

  if (showTypeSelector) {
    return (
      <UserTypeSelector
        isOpen={showTypeSelector}
        onSelect={handleUserTypeSelection}
        userEmail={userEmail}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Processando login...</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
