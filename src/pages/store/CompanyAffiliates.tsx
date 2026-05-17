import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAffiliate } from '@/hooks/useAffiliate';
import { AffiliateSetup } from '@/components/affiliate/AffiliateSetup';
import { AffiliateOverview } from '@/components/affiliate/AffiliateOverview';
import { AffiliateSales } from '@/components/affiliate/AffiliateSales';
import { AffiliateLinks } from '@/components/affiliate/AffiliateLinks';
import { AffiliateWithdrawals } from '@/components/affiliate/AffiliateWithdrawals';
import { Loader2, Link2, Share2, TrendingUp, Users, Wallet } from 'lucide-react';

const CompanyAffiliates = () => {
  const {
    profile,
    sales,
    withdrawals,
    stats,
    isLoading,
    createAffiliateProfile,
    requestWithdrawal,
    getAffiliateLink,
  } = useAffiliate();

  if (isLoading) {
    return (
      <StoreLayout
        title="Afiliados"
        subtitle="Gerencie indicações, links de divulgação, vendas geradas e solicitações de saque."
      >
        <div className="flex min-h-[420px] items-center justify-center">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-violet-700" />
            <p className="font-bold text-slate-950">Carregando programa de afiliados...</p>
            <p className="mt-1 text-sm text-slate-500">Buscando seus dados e indicadores.</p>
          </div>
        </div>
      </StoreLayout>
    );
  }

  if (!profile) {
    return (
      <StoreLayout
        title="Afiliados"
        subtitle="Ative o programa de afiliados para criar links, acompanhar indicações e gerar novas vendas."
        action={
          <Button className="bg-white text-violet-950 hover:bg-violet-100">
            <Share2 className="mr-2 h-4 w-4" />
            Programa de indicação
          </Button>
        }
      >
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <AffiliateSetup onCreateProfile={createAffiliateProfile} />
          </CardContent>
        </Card>
      </StoreLayout>
    );
  }

  const metricCards = [
    {
      label: 'Vendas indicadas',
      value: stats?.totalSales ?? sales?.length ?? 0,
      description: 'Conversões por afiliados',
      icon: TrendingUp,
    },
    {
      label: 'Comissões',
      value: `R$ ${(stats?.totalCommission ?? 0).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}`,
      description: 'Valor total gerado',
      icon: Wallet,
    },
    {
      label: 'Afiliados ativos',
      value: stats?.activeAffiliates ?? 0,
      description: 'Parceiros em operação',
      icon: Users,
    },
    {
      label: 'Links criados',
      value: stats?.totalLinks ?? 0,
      description: 'Links de divulgação',
      icon: Link2,
    },
  ];

  return (
    <StoreLayout
      title="Afiliados"
      subtitle="Acompanhe vendas geradas por indicação, links, comissões e solicitações de saque."
      action={
        <Button className="bg-white text-violet-950 hover:bg-violet-100">
          <Link2 className="mr-2 h-4 w-4" />
          Criar link
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                      <Icon className="h-6 w-6" />
                    </div>

                    <Badge className="border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-50">
                      Ativo
                    </Badge>
                  </div>

                  <p className="text-sm font-bold text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-2xl font-black text-slate-950">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{metric.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-violet-200 bg-violet-50">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-black text-violet-950">Programa de afiliados ativo</p>
              <p className="mt-1 text-sm text-violet-800">
                Use os links para gerar vendas rastreadas e acompanhar comissões dentro do painel.
              </p>
            </div>

            <Button className="bg-violet-700 text-white hover:bg-violet-800">
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar link principal
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-5">
          <TabsList className="grid h-auto w-full grid-cols-4 rounded-2xl bg-slate-100 p-1">
            <TabsTrigger
              value="overview"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Visão geral
            </TabsTrigger>

            <TabsTrigger
              value="sales"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Vendas
            </TabsTrigger>

            <TabsTrigger
              value="links"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Links
            </TabsTrigger>

            <TabsTrigger
              value="withdrawals"
              className="rounded-xl py-3 font-bold data-[state=active]:bg-violet-700 data-[state=active]:text-white"
            >
              Saques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <AffiliateOverview profile={profile} stats={stats} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <AffiliateSales sales={sales} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <AffiliateLinks profile={profile} getAffiliateLink={getAffiliateLink} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <AffiliateWithdrawals
                  withdrawals={withdrawals}
                  profile={profile}
                  onRequestWithdrawal={requestWithdrawal}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StoreLayout>
  );
};

export default CompanyAffiliates;
