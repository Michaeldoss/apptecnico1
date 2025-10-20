import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAffiliate } from '@/hooks/useAffiliate';
import { AffiliateSetup } from '@/components/affiliate/AffiliateSetup';
import { AffiliateOverview } from '@/components/affiliate/AffiliateOverview';
import { AffiliateSales } from '@/components/affiliate/AffiliateSales';
import { AffiliateLinks } from '@/components/affiliate/AffiliateLinks';
import { AffiliateWithdrawals } from '@/components/affiliate/AffiliateWithdrawals';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import StoreLayout from '@/components/layout/StoreLayout';

const CompanyAffiliates = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const {
    profile,
    sales,
    withdrawals,
    stats,
    isLoading,
    createAffiliateProfile,
    requestWithdrawal,
    getAffiliateLink
  } = useAffiliate();

  if (isLoading) {
    return (
      <StoreLayout title="Afiliados" subtitle="Gerencie seu programa de afiliados">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      </StoreLayout>
    );
  }

  // Se não é afiliado, aguardar criação automática
  if (!profile && isLoading) {
    return (
      <StoreLayout title="Afiliados" subtitle="Carregando seu programa de afiliados...">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      </StoreLayout>
    );
  }

  // Se mesmo após carregar não tem perfil, mostrar tela de setup
  if (!profile && !isLoading) {
    return (
      <StoreLayout title="Configurar Afiliados" subtitle="Configure seu programa de afiliados">
        <div className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6">
          <AffiliateSetup 
            onCreateProfile={createAffiliateProfile}
            isLoading={isLoading}
          />
        </div>
      </StoreLayout>
    );
  }

  // Se é afiliado, mostrar dashboard
  return (
    <StoreLayout title="Programa de Afiliados" subtitle="Gerencie seus afiliados e comissões">
      <div className="space-y-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-5'} bg-white/10 border-white/20`}>
            <TabsTrigger 
              value="overview" 
              className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 border-white/20"
            >
              Dashboard
            </TabsTrigger>
            {!isMobile && (
              <TabsTrigger 
                value="sales" 
                className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 border-white/20"
              >
                Vendas
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="links" 
              className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 border-white/20"
            >
              Materiais
            </TabsTrigger>
            {!isMobile && (
              <TabsTrigger 
                value="withdrawals" 
                className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 border-white/20"
              >
                Financeiro
              </TabsTrigger>
            )}
            {isMobile && (
              <TabsTrigger 
                value="more" 
                className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 border-white/20"
              >
                Mais
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6">
            <AffiliateOverview 
              stats={stats || {
                totalSales: 0,
                totalCommission: 0,
                pendingCommission: 0,
                paidCommission: 0,
                salesCount: 0,
                conversionRate: 0
              }} 
              affiliateSlug={profile?.affiliate_slug || ''}
            />
          </TabsContent>

          {!isMobile ? (
            <>
              <TabsContent value="sales" className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6">
                <AffiliateSales sales={sales} />
              </TabsContent>

              <TabsContent value="links" className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6">
                <AffiliateLinks 
                  affiliateSlug={profile?.affiliate_slug || ''}
                  getAffiliateLink={getAffiliateLink}
                />
              </TabsContent>

              <TabsContent value="withdrawals" className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6">
                <AffiliateWithdrawals 
                  withdrawals={withdrawals}
                  stats={stats || {
                    totalSales: 0,
                    totalCommission: 0,
                    pendingCommission: 0,
                    paidCommission: 0,
                    salesCount: 0,
                    conversionRate: 0
                  }}
                  onRequestWithdrawal={requestWithdrawal}
                />
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="links" className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6">
                <AffiliateLinks 
                  affiliateSlug={profile?.affiliate_slug || ''}
                  getAffiliateLink={getAffiliateLink}
                />
              </TabsContent>

              <TabsContent value="more" className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-6">
                <Tabs defaultValue="sales" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
                    <TabsTrigger 
                      value="sales" 
                      className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
                    >
                      Vendas
                    </TabsTrigger>
                    <TabsTrigger 
                      value="withdrawals" 
                      className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
                    >
                      Financeiro
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="sales">
                    <AffiliateSales sales={sales} />
                  </TabsContent>

                  <TabsContent value="withdrawals">
                    <AffiliateWithdrawals 
                      withdrawals={withdrawals}
                      stats={stats || {
                        totalSales: 0,
                        totalCommission: 0,
                        pendingCommission: 0,
                        paidCommission: 0,
                        salesCount: 0,
                        conversionRate: 0
                      }}
                      onRequestWithdrawal={requestWithdrawal}
                    />
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </StoreLayout>
  );
};

export default CompanyAffiliates;