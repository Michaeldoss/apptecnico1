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
            "font-bold text-gray-900",
            isMobile ? "text-xl" : "text-2xl"
          )}>
            Visão Geral
          </h2>
          <p className="text-gray-600">Acompanhe seu desempenho como afiliado</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
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
            <Card key={index} className="border-0 shadow-sm">
              <CardHeader className={cn(
                "pb-2",
                isMobile ? "p-4" : ""
              )}>
                <div className="flex items-center gap-2">
                  <div className={cn("p-2 rounded-lg", card.bgColor)}>
                    <Icon className={cn("h-4 w-4", card.color)} />
                  </div>
                  <CardTitle className={cn(
                    "text-gray-700",
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
                  "font-bold text-gray-900",
                  isMobile ? "text-lg" : "text-2xl"
                )}>
                  {card.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Seu Link de Afiliado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <code className={cn(
                "bg-white px-3 py-2 rounded border flex-1 text-blue-700 font-mono",
                isMobile ? "text-xs" : "text-sm"
              )}>
                {window.location.origin}/store?ref={affiliateSlug}
              </code>
            </div>
            <p className={cn(
              "text-blue-700",
              isMobile ? "text-xs" : "text-sm"
            )}>
              Compartilhe este link para ganhar comissão em todas as vendas realizadas!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};