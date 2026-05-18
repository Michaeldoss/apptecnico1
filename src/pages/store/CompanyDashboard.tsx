import React, { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Clock,
  DollarSign,
  Eye,
  Package,
  PackagePlus,
  Settings,
  ShoppingBag,
  Star,
  Store,
  TrendingUp,
  UserRound,
  Wallet,
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

  const quickActions = [
    {
      title: 'Cadastrar produto',
      description: 'Adicionar novo item no catálogo.',
      icon: PackagePlus,
      href: '/loja/products/create',
      primary: true,
    },
    {
      title: 'Ver pedidos',
      description: 'Acompanhar vendas e status.',
      icon: ClipboardList,
      href: '/loja/orders',
      primary: false,
    },
    {
      title: 'Atualizar estoque',
      description: 'Conferir itens baixos ou zerados.',
      icon: Boxes,
      href: '/loja/estoque',
      primary: false,
    },
    {
      title: 'Configurações',
      description: 'Ajustar dados da loja.',
      icon: Settings,
      href: '/loja/configuracoes',
      primary: false,
    },
  ];

  const pendingTasks = [
    {
      title: '5 pedidos aguardando ação',
      description: 'Revise pedidos pendentes para evitar atraso.',
      href: '/loja/orders',
      icon: Clock,
      tone: 'amber',
    },
    {
      title: '3 produtos com estoque crítico',
      description: 'Produtos podem parar de vender se não forem atualizados.',
      href: '/loja/estoque',
      icon: AlertTriangle,
      tone: 'red',
    },
    {
      title: '2 avaliações sem resposta',
      description: 'Responder avaliações aumenta confiança da loja.',
      href: '/loja/avaliacoes',
      icon: Star,
      tone: 'violet',
    },
  ];

  const operationCards = [
    {
      title: 'Produtos',
      description: 'Cadastrar, editar e revisar catálogo.',
      icon: Package,
      href: '/loja/products',
    },
    {
      title: 'Pedidos',
      description: 'Acompanhar pedidos e status de venda.',
      icon: ClipboardList,
      href: '/loja/orders',
    },
    {
      title: 'Estoque',
      description: 'Controlar quantidades e alertas.',
      icon: Boxes,
      href: '/loja/estoque',
    },
    {
      title: 'Financeiro',
      description: 'Receitas, repasses e histórico.',
      icon: BarChart3,
      href: '/loja/financeiro',
    },
    {
      title: 'Avaliações',
      description: 'Monitorar reputação e feedbacks.',
      icon: Star,
      href: '/loja/avaliacoes',
    },
    {
      title: 'Afiliados',
      description: 'Gerenciar indicações e parceiros.',
      icon: UserRound,
      href: '/loja/afiliados',
    },
  ];

  return (
    <StoreLayout
      title="Dashboard da Loja"
      subtitle={`Bem-vindo, ${storeName}. Use esta central para controlar pedidos, produtos, estoque, financeiro e reputação sem perder tempo.`}
      action={
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link to="/loja/products/create">
            <Button className="bg-white text-violet-950 hover:bg-violet-100">
              <PackagePlus className="mr-2 h-4 w-4" />
              Cadastrar produto
            </Button>
          </Link>

          <Link to="/loja/orders">
            <Button
              variant="outline"
              className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Ver pedidos
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.label} to={item.href} className="group">
                <Card className="h-full border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="rounded-2xl bg-violet-50 p-3 text-violet-700 transition group-hover:bg-violet-700 group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>

                      <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-700" />
                    </div>

                    <p className="text-sm font-bold text-slate-500">{item.label}</p>
                    <p className="mt-2 text-2xl font-black text-slate-950">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-slate-950">Ações rápidas</CardTitle>
                  <CardDescription>
                    Principais atalhos para operar a loja no dia a dia.
                  </CardDescription>
                </div>

                <Badge className="w-fit border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-50">
                  Operação da loja
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link key={action.title} to={action.href} className="group">
                      <div
                        className={`flex h-full items-start gap-4 rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-md ${
                          action.primary
                            ? 'border-violet-200 bg-violet-50'
                            : 'border-slate-200 bg-white hover:border-violet-200'
                        }`}
                      >
                        <div
                          className={`rounded-2xl p-3 ${
                            action.primary
                              ? 'bg-violet-700 text-white'
                              : 'bg-slate-100 text-slate-700 group-hover:bg-violet-700 group-hover:text-white'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-black text-slate-950">{action.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-500">
                            {action.description}
                          </p>

                          <p className="mt-4 inline-flex items-center text-sm font-bold text-violet-700">
                            Acessar
                            <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-950">Pendências de hoje</CardTitle>
              <CardDescription>
                Itens que merecem atenção antes de seguir a operação.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {pendingTasks.map((task) => {
                const Icon = task.icon;

                const toneClass =
                  task.tone === 'red'
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : task.tone === 'amber'
                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                      : 'border-violet-200 bg-violet-50 text-violet-700';

                return (
                  <Link key={task.title} to={task.href} className="group block">
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-violet-200 hover:bg-violet-50/40">
                      <div className={`rounded-xl border p-2 ${toneClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <p className="font-black text-slate-950">{task.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                          {task.description}
                        </p>
                      </div>

                      <ArrowRight className="mt-1 h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-700" />
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.4fr]">
          <Card className="border-violet-200 bg-violet-50 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-2xl bg-violet-700 p-3 text-white">
                  <Store className="h-6 w-6" />
                </div>

                <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  Ativa
                </Badge>
              </div>

              <h3 className="text-xl font-black text-violet-950">Resumo da operação</h3>

              <p className="mt-2 text-sm leading-relaxed text-violet-800">
                Conta conectada: {user?.email || 'email não identificado'}
              </p>

              <div className="mt-5 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-white/70 p-4">
                  <span className="text-sm font-bold text-violet-800">Status da loja</span>
                  <span className="inline-flex items-center gap-1 text-sm font-black text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Operando
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/70 p-4">
                  <span className="text-sm font-bold text-violet-800">Perfil público</span>
                  <Link to="/loja/profile" className="text-sm font-black text-violet-700">
                    Editar perfil
                  </Link>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/70 p-4">
                  <span className="text-sm font-bold text-violet-800">Configurações</span>
                  <Link to="/loja/configuracoes" className="text-sm font-black text-violet-700">
                    Ajustar
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-slate-950">Central operacional</CardTitle>
                  <CardDescription>
                    Áreas principais para controlar sua operação.
                  </CardDescription>
                </div>

                <Link to="/loja/products">
                  <Button variant="outline" className="border-slate-200">
                    Ver catálogo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {operationCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link key={item.href} to={item.href} className="group">
                      <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 transition group-hover:bg-violet-700 group-hover:text-white">
                            <Icon className="h-5 w-5" />
                          </div>

                          <Eye className="h-4 w-4 text-slate-300 transition group-hover:text-violet-700" />
                        </div>

                        <p className="font-black text-slate-950">{item.title}</p>

                        <p className="mt-2 min-h-[42px] text-sm leading-relaxed text-slate-500">
                          {item.description}
                        </p>

                        <p className="mt-4 inline-flex items-center text-sm font-bold text-violet-700">
                          Abrir
                          <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StoreLayout>
  );
};

export default CompanyDashboard;
