import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Users, Award } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { AffiliateStats } from '@/types/affiliate';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AffiliateOverviewProps {
  stats: AffiliateStats;
  affiliateSlug: string;
}

export const AffiliateOverview: React.FC<AffiliateOverviewProps> = ({ stats, affiliateSlug }) => {
  const isMobile = useIsMobile();

  const cards = [
    {
      title: 'Comissão Total',
      value: formatCurrency(stats.totalCommission),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pendente',
      value: formatCurrency(stats.pendingCommission),
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Vendas Realizadas',
      value: stats.salesCount.toString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Taxa de Conversão',
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={cn(
            "font-bold text-white",
            isMobile ? "text-xl" : "text-2xl"
          )}>
            Dashboard do Afiliado
          </h2>
          <p className="text-blue-100">Acompanhe seu desempenho e ganhos</p>
        </div>
        <Badge variant="secondary" className="bg-green-500/20 text-green-100 border-green-400/50">
          Afiliado Ativo
        </Badge>
      </div>

      <div className={cn(
        "grid gap-4",
        isMobile ? "grid-cols-2" : "grid-cols-4"
      )}>
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="bg-white/20 backdrop-blur-sm border-white/30 shadow-lg">
              <CardHeader className={cn(
                "pb-2",
                isMobile ? "p-4" : ""
              )}>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-white/20">
                    <Icon className="h-4 w-4 text-yellow-400" />
                  </div>
                  <CardTitle className={cn(
                    "text-white",
                    isMobile ? "text-xs" : "text-sm"
                  )}>
                    {card.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className={cn(
                "pt-0",
                isMobile ? "p-4 pt-0" : ""
              )}>
                <p className={cn(
                  "font-bold text-white",
                  isMobile ? "text-lg" : "text-2xl"
                )}>
                  {card.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border-yellow-400/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">🔗 Seu Link de Afiliado Principal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <code className={cn(
                "bg-white/10 px-3 py-2 rounded border border-white/20 flex-1 text-yellow-300 font-mono backdrop-blur-sm",
                isMobile ? "text-xs" : "text-sm"
              )}>
                {window.location.origin}/store?ref={affiliateSlug}
              </code>
            </div>
            <p className={cn(
              "text-blue-100",
              isMobile ? "text-xs" : "text-sm"
            )}>
              💰 Compartilhe este link para ganhar comissão em todas as vendas!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hotmart-style Performance Chart */}
      <Card className="bg-white/20 backdrop-blur-sm border-white/30">
        <CardHeader>
          <CardTitle className="text-white">📊 Performance dos Últimos 30 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.salesCount}</div>
              <div className="text-sm text-blue-100">Vendas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{formatCurrency(stats.totalCommission)}</div>
              <div className="text-sm text-blue-100">Total Ganho</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.conversionRate.toFixed(1)}%</div>
              <div className="text-sm text-blue-100">Conversão</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{formatCurrency(stats.pendingCommission)}</div>
              <div className="text-sm text-blue-100">Pendente</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};