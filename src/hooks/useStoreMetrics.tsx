
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StoreMetrics {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  totalOrders: number;
  loading: boolean;
}

export const useStoreMetrics = (userId: string | undefined) => {
  const [metrics, setMetrics] = useState<StoreMetrics>({
    totalProducts: 0,
    activeProducts: 0,
    lowStockProducts: 0,
    totalOrders: 0,
    loading: true
  });

  useEffect(() => {
    if (!userId) return;
    
    const loadMetrics = async () => {
      setMetrics(prev => ({ ...prev, loading: true }));
      
      // Carregar produtos
      const { data: products, error: prodError } = await supabase
        .from('produtos')
        .select('id, ativo, estoque')
        .eq('loja_id', userId);

      if (!prodError && products) {
        const activeProducts = products.filter(p => p.ativo);
        const lowStock = products.filter(p => (p.estoque ?? 0) <= 5);
        
        setMetrics(prev => ({
          ...prev,
          totalProducts: products.length,
          activeProducts: activeProducts.length,
          lowStockProducts: lowStock.length,
          loading: false
        }));
      } else {
        setMetrics(prev => ({ ...prev, loading: false }));
      }
    };

    loadMetrics();
  }, [userId]);

  return metrics;
};

export const useTechnicianMetrics = (userId: string | undefined) => {
  const [metrics, setMetrics] = useState({
    totalParts: 0,
    lowStockParts: 0,
    totalBudgets: 0,
    pendingBudgets: 0,
    totalServiceOrders: 0,
    loading: true
  });

  useEffect(() => {
    if (!userId) return;
    
    const loadMetrics = async () => {
      // Carregar peças
      const { data: parts } = await supabase
        .from('pecas')
        .select('id, estoque')
        .eq('tecnico_id', userId);

      // Carregar orçamentos
      const { data: budgets } = await supabase
        .from('orcamentos')
        .select('id, status')
        .eq('tecnico_id', userId);

      // Carregar ordens de serviço
      const { data: orders } = await supabase
        .from('ordens_servico')
        .select('id')
        .eq('tecnico_id', userId);

      setMetrics({
        totalParts: parts?.length ?? 0,
        lowStockParts: parts?.filter(p => (p.estoque ?? 0) <= 3).length ?? 0,
        totalBudgets: budgets?.length ?? 0,
        pendingBudgets: budgets?.filter(b => b.status === 'enviado').length ?? 0,
        totalServiceOrders: orders?.length ?? 0,
        loading: false
      });
    };

    loadMetrics();
  }, [userId]);

  return metrics;
};
