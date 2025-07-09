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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Se não é afiliado, mostrar tela de setup
  if (!profile) {
    return (
      <div className="p-6">
        <AffiliateSetup 
          onCreateProfile={createAffiliateProfile}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // Se é afiliado, mostrar dashboard
  return (
    <div className="p-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-5'}`}>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          {!isMobile && <TabsTrigger value="sales">Vendas</TabsTrigger>}
          <TabsTrigger value="links">Minha Loja</TabsTrigger>
          {!isMobile && <TabsTrigger value="withdrawals">Saques</TabsTrigger>}
          {isMobile && (
            <TabsTrigger value="more">Mais</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview">
          <AffiliateOverview 
            stats={stats!} 
            affiliateSlug={profile.affiliate_slug}
          />
        </TabsContent>

        {!isMobile ? (
          <>
            <TabsContent value="sales">
              <AffiliateSales sales={sales} />
            </TabsContent>

            <TabsContent value="links">
              <AffiliateLinks 
                affiliateSlug={profile.affiliate_slug}
                getAffiliateLink={getAffiliateLink}
              />
            </TabsContent>

            <TabsContent value="withdrawals">
              <AffiliateWithdrawals 
                withdrawals={withdrawals}
                stats={stats!}
                onRequestWithdrawal={requestWithdrawal}
              />
            </TabsContent>
          </>
        ) : (
          <>
            <TabsContent value="links">
              <AffiliateLinks 
                affiliateSlug={profile.affiliate_slug}
                getAffiliateLink={getAffiliateLink}
              />
            </TabsContent>

            <TabsContent value="more">
              <Tabs defaultValue="sales" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sales">Vendas</TabsTrigger>
                  <TabsTrigger value="withdrawals">Saques</TabsTrigger>
                </TabsList>

                <TabsContent value="sales">
                  <AffiliateSales sales={sales} />
                </TabsContent>

                <TabsContent value="withdrawals">
                  <AffiliateWithdrawals 
                    withdrawals={withdrawals}
                    stats={stats!}
                    onRequestWithdrawal={requestWithdrawal}
                  />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default CompanyAffiliates;