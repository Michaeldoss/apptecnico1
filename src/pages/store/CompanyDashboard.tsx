import React, { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  PackagePlus,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  UserRound,
} from 'lucide-react';

const money = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

const CompanyDashboard = () => {
  const { isAuthenticated, userType, user } = useAuth();

  const storeName = useMemo(() => {
    return (
      user?.user_metadata?.nome_empresa ||
      user?.user_metadata?.company_name ||
      user?.user_metadata?.name ||
      user?.email?.split('@')[0] ||
      'Loja'
    );
  }, [user]);

  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    {
      label: 'Produtos ativos',
      value: '87',
      description: 'Itens disponíveis no catálogo',
      icon: Boxes,
      href: '/loja/products',
    },
    {
      label: 'Pedidos no mês',
      value: '23',
      description: 'Pedidos recebidos no período',
      icon: ShoppingBag,
      href: '/loja/orders',
    },
    {
      label: 'Faturamento',
      value: money(12450),
      description: 'Pagamento protegido',
      icon: DollarSign,
      href: '/loja/financeiro',
    },
    {
      label: 'Avaliação',
      value: '4.8 ★',
      description: 'Reputação da loja',
      icon: Star,
      href: '/loja/avaliacoes',
    },
  ];

  const actions = [
    {
      title: 'Produtos',
      description: 'Cadastrar, editar e revisar catálogo.',
      icon: Boxes,
      href: '/loja/products',
    },
    {
      title: 'Adicionar produto',
      description: 'Criar um novo item para venda.',
      icon: PackagePlus,
      href: '/loja/products/create',
    },
    {
      title: 'Pedidos',
      description: 'Acompanhar pedidos e status.',
      icon: ClipboardList,
      href: '/loja/orders',
    },
    {
      title: 'Estoque',
      description: 'Controlar quantidades e alertas.',
      icon: AlertTriangle,
      href: '/loja/estoque',
    },
    {
      title: 'Financeiro',
      description: 'Ver receitas, repasses e histórico.',
      icon: BarChart3,
      href: '/loja/financeiro',
    },
    {
      title: 'Avaliações',
      description: 'Monitorar feedback dos clientes.',
      icon: Star,
      href: '/loja/avaliacoes',
    },
    {
      title: 'Afiliados',
      description: 'Gerenciar indicações e parceiros.',
      icon: UserRound,
      href: '/loja/afiliados',
    },
    {
      title: 'Configurações',
      description: 'Ajustar dados e preferências da loja.',
      icon: Settings,
      href: '/loja/configuracoes',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-slate-950">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-[#170B3B]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.35),transparent_35%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-violet-100">
                  <ShieldCheck className="h-4 w-4" />
                  Área da Loja
                </div>

                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-6xl">
                  Dashboard da Loja
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-violet-100 md:text-lg">
                  Bem-vindo, <strong className="text-white">{storeName}</strong>. Este painel
                  centraliza produtos, pedidos, estoque, financeiro e reputação da sua operação.
                </p>

                <p className="mt-2 text-sm text-violet-200">
                  Conta conectada: {user?.email || 'email não identificado'}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link to="/loja/products/create">
                    <Button className="h-12 bg-white px-6 font-bold text-[#170B3B] hover:bg-violet-100">
                      <PackagePlus className="mr-2 h-5 w-5" />
                      Cadastrar produto
                    </Button>
                  </Link>

                  <Link to="/loja/configuracoes">
                    <Button
                      variant="outline"
                      className="h-12 border-white/25 bg-white/10 px-6 font-bold text-white hover:bg-white/20 hover:text-white"
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      Configurações
                    </Button>
                  </Link>
                </div>
              </div>

              <Card className="border-white/15 bg-white/10 text-white backdrop-blur-xl">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <Store className="h-8 w-8 text-violet-100" />
                  </div>
                  <CardTitle className="text-2xl text-white">Resumo da operação</CardTitle>
                  <CardDescription className="text-violet-100">
                    Indicadores principais da loja.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-white/10 p-4">
                    <span className="text-violet-100">Status</span>
                    <span className="inline-flex items-center gap-2 font-bold text-emerald-200">
                      <CheckCircle2 className="h-4 w-4" />
                      Ativa
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/10 p-4">
                    <span className="text-violet-100">Perfil</span>
                    <Link to="/loja/profile" className="font-bold text-white hover:underline">
                      Ver perfil
                    </Link>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white/10 p-4">
                    <span className="text-violet-100">Painel</span>
                    <span className="font-bold text-white">Fornecedor</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.label} to={item.href} className="group">
                  <Card className="h-full border-slate-200 bg-white transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="rounded-2xl bg-violet-50 p-3 text-violet-700 transition group-hover:bg-violet-700 group-hover:text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-700" />
                      </div>

                      <p className="text-sm font-bold text-slate-500">{item.label}</p>
                      <p className="mt-2 text-3xl font-black text-slate-950">{item.value}</p>
                      <p className="mt-2 text-sm text-slate-500">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Central da loja</h2>
              <p className="text-sm text-slate-500">
                Acesse rapidamente as principais funções da conta de fornecedor.
              </p>
            </div>

            <Link to="/loja/products">
              <Button variant="outline" className="font-bold">
                Ver catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {actions.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.href} to={item.href} className="group">
                  <Card className="h-full border-slate-200 bg-white transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-violet-700 group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>

                      <h3 className="font-black text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {item.description}
                      </p>

                      <div className="mt-5 inline-flex items-center text-sm font-bold text-violet-700">
                        Acessar
                        <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14">
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-3">
                <div className="mt-1 rounded-xl bg-amber-100 p-2 text-amber-700">
                  <AlertTriangle className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-black text-amber-950">Pontos de atenção</h3>
                  <p className="text-sm text-amber-800">
                    Existem pedidos pendentes e produtos com estoque baixo. Revise a operação para
                    evitar atraso em vendas.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Link to="/loja/orders">
                  <Button className="bg-amber-700 text-white hover:bg-amber-800">
                    Ver pedidos
                  </Button>
                </Link>
                <Link to="/loja/estoque">
                  <Button variant="outline" className="border-amber-300 bg-white text-amber-800">
                    Ver estoque
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyDashboard;
