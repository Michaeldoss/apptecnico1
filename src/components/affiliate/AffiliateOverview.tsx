import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AffiliateStats } from '@/types/affiliate';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Trophy,
  Star,
  Zap,
  Crown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AffiliateOverviewProps {
  stats: AffiliateStats | null;
  affiliateSlug: string;
}

export const AffiliateOverview: React.FC<AffiliateOverviewProps> = ({ stats, affiliateSlug }) => {
  // Default stats quando null
  const safeStats = stats || {
    totalSales: 0,
    totalCommission: 0,
    pendingCommission: 0,
    paidCommission: 0,
    salesCount: 0,
    conversionRate: 0
  };
  // Mock data para gráficos (substitua por dados reais)
  const salesData = [
    { name: 'Jan', vendas: 4000, comissao: 400 },
    { name: 'Fev', vendas: 3000, comissao: 300 },
    { name: 'Mar', vendas: 5000, comissao: 500 },
    { name: 'Abr', vendas: 4500, comissao: 450 },
    { name: 'Mai', vendas: 6000, comissao: 600 },
    { name: 'Jun', vendas: 7500, comissao: 750 }
  ];

  const performanceData = [
    { name: 'Clicks', value: 2400 },
    { name: 'Conversões', value: 240 },
    { name: 'Vendas', value: 120 }
  ];

  const getAffiliateLevel = (sales: number) => {
    if (sales >= 50000) return { level: 'Diamond', icon: Crown, color: 'text-purple-500' };
    if (sales >= 25000) return { level: 'Platinum', icon: Trophy, color: 'text-blue-500' };
    if (sales >= 10000) return { level: 'Gold', icon: Star, color: 'text-yellow-500' };
    if (sales >= 5000) return { level: 'Silver', icon: Zap, color: 'text-gray-400' };
    return { level: 'Bronze', icon: Target, color: 'text-orange-500' };
  };

  const level = getAffiliateLevel(safeStats.totalSales);
  const LevelIcon = level.icon;

  return (
    <div className="space-y-6">
      {/* Header com nível do afiliado */}
      <div className="bg-gradient-to-r from-instalei-orange-500 via-instalei-orange-600 to-instalei-navy-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">🎯 Bem-vindo, Afiliado!</h2>
            <p className="text-orange-100">Continue assim e alcance novos patamares!</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 mb-2">
              <LevelIcon className={`h-8 w-8 ${level.color}`} />
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 text-white">
                {level.level}
              </Badge>
            </div>
            <p className="text-sm text-orange-100">Seu nível atual</p>
          </div>
        </div>
      </div>

      {/* Cards de estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 border-emerald-400/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">💰 Total de Vendas</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {safeStats.totalSales.toLocaleString()}</div>
            <p className="text-xs text-emerald-300">
              +20.1% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-instalei-orange-500/20 to-amber-600/20 border-instalei-orange-400/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🏆 Comissões</CardTitle>
            <TrendingUp className="h-4 w-4 text-instalei-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {safeStats.totalCommission.toLocaleString()}</div>
            <div className="text-xs text-instalei-orange-300">
              Pendente: R$ {safeStats.pendingCommission.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-instalei-navy-500/20 to-blue-600/20 border-instalei-navy-400/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">📊 Conversão</CardTitle>
            <Target className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeStats.conversionRate.toFixed(1)}%</div>
            <Progress value={safeStats.conversionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-500/20 to-pink-600/20 border-rose-400/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🔥 Vendas</CardTitle>
            <Users className="h-4 w-4 text-rose-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeStats.salesCount}</div>
            <p className="text-xs text-rose-300">
              +12% esta semana
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-instalei-navy-800/40 border-instalei-orange-500/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📈 Evolução das Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                <YAxis stroke="rgba(255,255,255,0.7)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="vendas" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="comissao" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-instalei-navy-800/40 border-instalei-orange-500/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Performance do Funil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                <YAxis stroke="rgba(255,255,255,0.7)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar 
                  dataKey="value" 
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0.9}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Próximo nível */}
      <Card className="bg-gradient-to-r from-instalei-orange-500/20 via-amber-500/20 to-instalei-navy-600/20 border-instalei-orange-400/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚀 Próximo Nível: {level.level === 'Bronze' ? 'Silver' : level.level === 'Silver' ? 'Gold' : level.level === 'Gold' ? 'Platinum' : 'Diamond'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progresso atual</span>
                <span>R$ {safeStats.totalSales.toLocaleString()} / R$ {level.level === 'Bronze' ? '5.000' : level.level === 'Silver' ? '10.000' : level.level === 'Gold' ? '25.000' : '50.000'}</span>
              </div>
              <Progress 
                value={(safeStats.totalSales / (level.level === 'Bronze' ? 5000 : level.level === 'Silver' ? 10000 : level.level === 'Gold' ? 25000 : 50000)) * 100} 
                className="h-3"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-instalei-orange-500/20 rounded-lg p-3 border border-instalei-orange-500/30">
                <div className="text-2xl">🎁</div>
                <div className="text-sm">Bônus de nível</div>
              </div>
              <div className="bg-instalei-navy-500/20 rounded-lg p-3 border border-instalei-navy-500/30">
                <div className="text-2xl">📊</div>
                <div className="text-sm">Relatórios avançados</div>
              </div>
              <div className="bg-emerald-500/20 rounded-lg p-3 border border-emerald-500/30">
                <div className="text-2xl">🤝</div>
                <div className="text-sm">Suporte prioritário</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};