import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { AffiliateProfile, AffiliateSale, AffiliateStats, AffiliateWithdrawal } from '@/types/affiliate';

export const useAffiliate = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  const [sales, setSales] = useState<AffiliateSale[]>([]);
  const [withdrawals, setWithdrawals] = useState<AffiliateWithdrawal[]>([]);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Gerar slug único baseado no nome do usuário
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Buscar perfil de afiliado
  const fetchAffiliateProfile = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('affiliate_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar perfil de afiliado:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Erro ao buscar perfil de afiliado:', error);
    }
  };

  // Buscar vendas do afiliado
  const fetchAffiliateSales = async () => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from('affiliate_sales')
        .select('*')
        .eq('affiliate_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar vendas:', error);
        return;
      }

      setSales(data as AffiliateSale[] || []);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  };

  // Buscar saques do afiliado
  const fetchAffiliateWithdrawals = async () => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from('affiliate_withdrawals')
        .select('*')
        .eq('affiliate_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar saques:', error);
        return;
      }

      setWithdrawals(data as AffiliateWithdrawal[] || []);
    } catch (error) {
      console.error('Erro ao buscar saques:', error);
    }
  };

  // Calcular estatísticas
  const calculateStats = (profileData: AffiliateProfile, salesData: AffiliateSale[]) => {
    const confirmedSales = salesData.filter(sale => sale.status === 'confirmado' || sale.status === 'pago');
    
    const stats: AffiliateStats = {
      totalSales: profileData.total_sales,
      totalCommission: profileData.total_commission,
      pendingCommission: profileData.commission_pending,
      paidCommission: profileData.commission_paid,
      salesCount: confirmedSales.length,
      conversionRate: confirmedSales.length > 0 ? (confirmedSales.length / salesData.length) * 100 : 0
    };

    setStats(stats);
  };

  // Criar perfil de afiliado
  const createAffiliateProfile = async (userData: { name: string }) => {
    if (!user?.id) return false;

    try {
      setIsLoading(true);
      
      let slug = generateSlug(userData.name);
      let attempts = 0;
      let isSlugUnique = false;
      
      // Verificar se o slug é único
      while (!isSlugUnique && attempts < 10) {
        const { data: existingProfile } = await supabase
          .from('affiliate_profiles')
          .select('id')
          .eq('affiliate_slug', attempts > 0 ? `${slug}-${attempts}` : slug)
          .single();

        if (!existingProfile) {
          isSlugUnique = true;
          if (attempts > 0) {
            slug = `${slug}-${attempts}`;
          }
        } else {
          attempts++;
        }
      }

      const { data, error } = await supabase
        .from('affiliate_profiles')
        .insert({
          user_id: user.id,
          affiliate_slug: slug,
          is_active: true
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar perfil de afiliado:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível criar seu perfil de afiliado."
        });
        return false;
      }

      setProfile(data);
      toast({
        title: "Sucesso!",
        description: "Perfil de afiliado criado com sucesso!"
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao criar perfil de afiliado:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro interno. Tente novamente."
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Solicitar saque
  const requestWithdrawal = async (amount: number, paymentDetails: any) => {
    if (!profile?.id) return false;

    try {
      const { error } = await supabase
        .from('affiliate_withdrawals')
        .insert({
          affiliate_id: profile.id,
          amount,
          payment_method: 'pix',
          payment_details: paymentDetails
        });

      if (error) {
        console.error('Erro ao solicitar saque:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível solicitar o saque."
        });
        return false;
      }

      toast({
        title: "Sucesso!",
        description: "Solicitação de saque enviada com sucesso!"
      });
      
      await fetchAffiliateWithdrawals();
      return true;
    } catch (error) {
      console.error('Erro ao solicitar saque:', error);
      return false;
    }
  };

  // Gerar link de afiliado
  const getAffiliateLink = (productId?: string) => {
    if (!profile?.affiliate_slug) return '';
    
    const baseUrl = window.location.origin;
    const affiliateParam = `?ref=${profile.affiliate_slug}`;
    
    if (productId) {
      return `${baseUrl}/produto/${productId}${affiliateParam}`;
    }
    
    return `${baseUrl}/store${affiliateParam}`;
  };

  // Efeitos
  useEffect(() => {
    if (user?.id) {
      fetchAffiliateProfile();
    }
  }, [user?.id]);

  useEffect(() => {
    if (profile?.id) {
      fetchAffiliateSales();
      fetchAffiliateWithdrawals();
    }
  }, [profile?.id]);

  useEffect(() => {
    if (profile && sales.length >= 0) {
      calculateStats(profile, sales);
      setIsLoading(false);
    }
  }, [profile, sales]);

  return {
    profile,
    sales,
    withdrawals,
    stats,
    isLoading,
    createAffiliateProfile,
    requestWithdrawal,
    getAffiliateLink,
    refreshData: fetchAffiliateProfile
  };
};