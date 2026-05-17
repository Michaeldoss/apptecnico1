import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  LayoutDashboard,
  Package,
  Plus,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  TrendingUp,
  UserRound,
  Wallet,
} from 'lucide-react';
import DashboardChart from '@/components/store/DashboardChart';
import OrdersList from '@/components/store/OrdersList';

type OrderStatus = 'completed' | 'processing' | 'pending' | 'cancelled';

interface StoreOrder {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
  paymentMethod: string;
}

interface QuickMenuItem {
  icon: React.ElementType;
  title: string;
  href: string;
  description: string;
  badge?: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const CompanyDashboard = () => {
  const { isAuthenticated, userType, user } = useAuth();
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (user) {
      const newUserEmails = ['comercial@dossgroup.com.br', 'dossgroupequipa@gmail.com'];
      setIsNewUser(newUserEmails.includes(user.email || ''));
    }
  }, [user]);

  const storeName = useMemo(() => {
    return (
      user?.user_metadata?.nome_empresa ||
      user?.user_metadata?.company_name ||
      user?.user_metadata?.name ||
      user?.email?.split('@')[0] ||
      'Loja parceira'
    );
  }, [user]);

  const emptySalesData = [
    { name: 'Jan', vendas: 0, receita: 0 },
    { name: 'Fev', vendas: 0, receita: 0 },
    { name: 'Mar', vendas: 0, receita: 0 },
    { name: 'Abr', vendas: 0, receita: 0 },
    { name: 'Mai', vendas: 0, receita: 0 },
    { name: 'Jun', vendas: 0, receita: 0 },
    { name: 'Jul', vendas: 0, receita: 0 },
  ];

  const salesData = [
    { name: 'Jan', vendas: 18, receita: 8400 },
    { name: 'Fev', vendas: 22, receita: 11250 },
    { name: 'Mar', vendas: 16, receita: 9700 },
    { name: 'Abr', vendas: 28, receita: 15480 },
    { name: 'Mai', vendas: 31, receita: 18100 },
    { name: 'Jun', vendas: 26, receita: 16240 },
    { name: 'Jul', vendas: 34, receita: 22450 },
  ];

  const sampleOrders: StoreOrder[] = [
    {
      id: '1001',
      customer: 'João Silva',
      date: '14/04/2026',
      total: 1250.0,
      status: 'completed',
      items: 3,
      paymentMethod: 'Cartão de Crédito',
    },
    {
      id: '1002',
      customer: 'Maria Oliveira',
      date: '13/04/2026',
      total: 450.9,
      status: 'processing',
      items: 2,
      paymentMethod: 'Pix',
    },
  ];

  const currentSalesData = isNewUser ? emptySalesData : salesData;
  const currentOrders = isNewUser ? [] : sampleOrders;

  const metrics = {
    products: isNewUser ? 0 : 87,
    orders: isNewUser ? 0 : 23,
    revenue: isNewUser ? 0 : 12450,
    rating: isNewUser ? 0 : 4.8,
    pendingOrders: isNewUser ? 0 : 5,
    lowStock: isNewUser ? 0 : 3,
  };

  const menuItems: QuickMenuItem[] = [
    {
      icon: LayoutDashboard,
      title: 'Dashboard',
      href: '/loja/dashboard',
      description: 'Visão geral da operação',
    },
    {
      icon: Package,
      title: 'Produtos',
      href: '/loja/products',
      description: 'Gerenciar catálogo',
      badge: `${metrics.products}`,
    },
    {
      icon: ShoppingBag,
      title: 'Pedidos',
      href: '/loja/orders',
      description: 'Acompanhar vendas',
      badge: `${metrics.orders}`,
    },
    {
      icon: BarChart3,
      title: 'Financeiro',
      href: '/loja/financeiro',
      description: 'Receitas e repasses',
    },
    {
      icon: Star,
      title: 'Avaliações',
      href: '/loja/avaliacoes',
      description: 'Feedback dos clientes',
    },
    {
      icon: Package,
      title: 'Estoque',
      href: '/loja/estoque',
      description: 'Controle de inventário',
      badge: metrics.lowStock > 0 ? `${metrics.lowStock}` : undefined,
    },
    {
      icon: DollarSign,
      title: 'Afiliados',
      href: '/loja/afiliados',
      description: 'Programa de indicação',
    },
    {
      icon: Settings,
      title: 'Configurações',
      href: '/loja/configuracoes',
      description: 'Dados e preferências',
    },
  ];

  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.35),transparent_35%)]" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:py-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
                  <Store className="h-9 w-9 text-violet-200" />
                </div>

                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-violet-100 ring-1 ring-white/15">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Portal da Loja
                  </div>

                  <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                    Painel do Fornecedor
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm text-violet-100 md:text-base">
                    Bem-vindo, <span className="font-semibold text-white">{storeName}</span>. Gerencie
                    produtos, pedidos, estoque, financeiro e reputação da sua loja em um só lugar.
                  </p>

                  <p className="mt-1 text-xs text-violet-200">
                    Conta conectada: {user?.email || 'email não identificado'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/loja/profile">
                  <Button
                    variant="outline"
                    className="w-full border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:w-auto"
                  >
                    <UserRound className="mr-2 h-4 w-4" />
                    Meu Perfil
                  </Button>
                </Link>

                <Link to="/loja/configuracoes">
                  <Button className="w-full bg-white text-indigo-950 hover:bg-violet-100 sm:w-auto">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Link to="/loja/products" className="group">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-violet-100">Produtos ativos</p>
                    <Package className="h-6 w-6 text-violet-200 transition group-hover:scale-110" />
                  </div>
                  <p className="mt-3 text-3xl font-black">{metrics.products}</p>
                  <p className="mt-1 text-xs text-violet-200">Gerencie seu catálogo</p>
                </div>
              </Link>

              <Link to="/loja/orders" className="group">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-violet-100">Pedidos no mês</p>
                    <ShoppingBag className="h-6 w-6 text-violet-200 transition group-hover:scale-110" />
                  </div>
                  <p className="mt-3 text-3xl font-black">{metrics.orders}</p>
                  <p className="mt-1 text-xs text-violet-200">Acompanhe suas vendas</p>
                </div>
              </Link>

              <Link to="/loja/financeiro" className="group">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-violet-100">Faturamento</p>
                    <Wallet className="h-6 w-6 text-violet-200 transition group-hover:scale-110" />
                  </div>
                  <p className="mt-3 text-2xl font-black">{formatCurrency(metrics.revenue)}</p>
                  <p className="mt-1 text-xs text-emerald-200">Pagamento protegido</p>
                </div>
              </Link>

              <Link to="/loja/avaliacoes" className="group">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-violet-100">Avaliação média</p>
                    <Star className="h-6 w-6 text-violet-200 transition group-hover:scale-110" />
                  </div>
                  <p className="mt-3 text-3xl font-black">
                    {metrics.rating > 0 ? `${metrics.rating} ★` : '—'}
                  </p>
                  <p className="mt-1 text-xs text-violet-200">Reputação da loja</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b bg-white py-8">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Acesso rápido</h2>
                <p className="text-sm text-slate-500">
                  Principais áreas para operar sua loja sem perder tempo.
                </p>
              </div>

              <Link to="/loja/products/create">
                <Button className="bg-indigo-700 text-white hover:bg-indigo-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo produto
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link key={item.href} to={item.href} className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
                      <CardContent className="p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700 transition group-hover:bg-indigo-700 group-hover:text-white">
                            <Icon className="h-5 w-5" />
                          </div>

                          {item.badge && (
                            <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-800">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-slate-950">{item.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-8">
          <div className="mx-auto max-w-7xl px-4">
            {isNewUser && (
              <Card className="mb-6 border-indigo-200 bg-indigo-50">
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-indigo-700" />
                    <div>
                      <p className="font-bold text-indigo-950">Sua loja está pronta para configurar</p>
                      <p className="text-sm text-indigo-800">
                        Cadastre produtos, complete o perfil e configure suas informações comerciais.
                      </p>
                    </div>
                  </div>

                  <Link to="/loja/profile">
                    <Button className="bg-indigo-700 text-white hover:bg-indigo-800">
                      Completar perfil
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="overview" className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <TabsList className="grid h-auto w-full grid-cols-3 bg-transparent p-0">
                  <TabsTrigger
                    value="overview"
                    className="rounded-xl py-3 text-slate-600 data-[state=active]:bg-indigo-700 data-[state=active]:text-white"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Visão Geral
                  </TabsTrigger>

                  <TabsTrigger
                    value="products"
                    className="rounded-xl py-3 text-slate-600 data-[state=active]:bg-indigo-700 data-[state=active]:text-white"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Produtos
                  </TabsTrigger>

                  <TabsTrigger
                    value="orders"
                    className="rounded-xl py-3 text-slate-600 data-[state=active]:bg-indigo-700 data-[state=active]:text-white"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Pedidos
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <Card className="border-slate-200 lg:col-span-2">
                    <CardHeader>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <CardTitle className="text-slate-950">Desempenho recente</CardTitle>
                          <CardDescription>
                            Vendas e receita dos últimos meses da sua loja.
                          </CardDescription>
                        </div>

                        <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                          <TrendingUp className="mr-1 inline h-3.5 w-3.5" />
                          Operação monitorada
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <DashboardChart
                        data={currentSalesData}
                        type="area"
                        dataKeys={['vendas', 'receita']}
                        height={300}
                      />
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-slate-950">Atenção necessária</CardTitle>
                      <CardDescription>
                        Itens que merecem ação rápida para não travar a operação.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <Link to="/loja/estoque" className="block">
                        <div className="group flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 transition hover:bg-amber-100">
                          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-700 transition group-hover:scale-110" />
                          <div className="flex-1">
                            <p className="font-bold text-amber-950">Estoque baixo</p>
                            <p className="text-sm text-amber-800">
                              {metrics.lowStock} produtos estão abaixo do mínimo.
                            </p>
                          </div>
                          <Eye className="h-4 w-4 text-amber-700 opacity-60" />
                        </div>
                      </Link>

                      <Link to="/loja/orders" className="block">
                        <div className="group flex items-start gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4 transition hover:bg-indigo-100">
                          <Clock className="mt-0.5 h-5 w-5 text-indigo-700 transition group-hover:scale-110" />
                          <div className="flex-1">
                            <p className="font-bold text-indigo-950">Pedidos pendentes</p>
                            <p className="text-sm text-indigo-800">
                              {metrics.pendingOrders} pedidos aguardando processamento.
                            </p>
                          </div>
                          <Eye className="h-4 w-4 text-indigo-700 opacity-60" />
                        </div>
                      </Link>

                      <Link to="/loja/configuracoes" className="block">
                        <div className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">
                          <Settings className="mt-0.5 h-5 w-5 text-slate-700 transition group-hover:scale-110" />
                          <div className="flex-1">
                            <p className="font-bold text-slate-950">Configurações da loja</p>
                            <p className="text-sm text-slate-600">
                              Revise dados comerciais e preferências.
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-500" />
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="products">
                <Card className="border-slate-200">
                  <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-slate-950">Produtos</CardTitle>
                      <CardDescription>
                        Gerencie o catálogo de produtos da sua loja.
                      </CardDescription>
                    </div>

                    <Link to="/loja/products/create">
                      <Button className="bg-indigo-700 text-white hover:bg-indigo-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar produto
                      </Button>
                    </Link>
                  </CardHeader>

                  <CardContent>
                    <div className="overflow-hidden rounded-xl border border-slate-200">
                      <div className="grid grid-cols-12 bg-slate-100 p-3 text-xs font-bold uppercase tracking-wide text-slate-600">
                        <div className="col-span-2 md:col-span-1">Código</div>
                        <div className="col-span-5 md:col-span-5">Produto</div>
                        <div className="col-span-2 text-right">Estoque</div>
                        <div className="col-span-3 md:col-span-2 text-right">Preço</div>
                        <div className="hidden md:block md:col-span-2 text-right">Status</div>
                      </div>

                      {isNewUser ? (
                        <div className="p-6 text-center">
                          <Package className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                          <p className="font-bold text-slate-900">Nenhum produto cadastrado</p>
                          <p className="mt-1 text-sm text-slate-500">
                            Comece adicionando o primeiro produto da sua loja.
                          </p>
                        </div>
                      ) : (
                        <Link to="/loja/products/8006" className="block group">
                          <div className="grid grid-cols-12 items-center p-3 text-sm transition hover:bg-indigo-50">
                            <div className="col-span-2 text-slate-500 md:col-span-1">8006</div>
                            <div className="col-span-5 font-semibold text-slate-950 transition group-hover:text-indigo-700">
                              BOMBA DE TINTA 100/200ML
                            </div>
                            <div className="col-span-2 text-right text-slate-700">14</div>
                            <div className="col-span-3 text-right font-semibold text-slate-900 md:col-span-2">
                              R$ 155,00
                            </div>
                            <div className="hidden items-center justify-end gap-2 md:col-span-2 md:flex">
                              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                                Ativo
                              </span>
                              <Eye className="h-4 w-4 text-slate-400 opacity-0 transition group-hover:opacity-100" />
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                    <p className="text-sm text-slate-500">
                      {isNewUser
                        ? 'Cadastre produtos para começar a vender.'
                        : 'Mostrando produtos principais da loja.'}
                    </p>

                    <Link to="/loja/products">
                      <Button variant="outline" size="sm" className="group">
                        Ver todos os produtos
                        <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="border-slate-200">
                  <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-slate-950">Pedidos</CardTitle>
                      <CardDescription>
                        Acompanhe pedidos recebidos, pagamentos e situação operacional.
                      </CardDescription>
                    </div>

                    <Link to="/loja/orders">
                      <Button className="bg-indigo-700 text-white hover:bg-indigo-800">
                        Ver central de pedidos
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardHeader>

                  <CardContent>
                    {isNewUser || currentOrders.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
                        <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                        <p className="font-bold text-slate-950">Nenhum pedido recebido ainda</p>
                        <p className="mt-1 text-sm text-slate-500">
                          Quando sua loja receber pedidos, eles aparecerão aqui.
                        </p>
                      </div>
                    ) : (
                      <OrdersList orders={currentOrders} />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyDashboard;
