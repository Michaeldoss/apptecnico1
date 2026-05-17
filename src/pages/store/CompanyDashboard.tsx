import React, { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowRight, BarChart3, Boxes, CheckCircle2, ClipboardList, DollarSign, PackagePlus, Settings, ShoppingBag, Star, Store, UserRound } from 'lucide-react';

const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const CompanyDashboard = () => {
  const { isAuthenticated, userType, user } = useAuth();
  const storeName = useMemo(() => user?.user_metadata?.nome_empresa || user?.user_metadata?.company_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Loja', [user]);

  if (!isAuthenticated || userType !== 'company') return <Navigate to="/login" replace />;

  const stats = [
    { label: 'Produtos ativos', value: '87', description: 'Itens disponíveis no catálogo', icon: Boxes, href: '/loja/products' },
    { label: 'Pedidos no mês', value: '23', description: 'Pedidos recebidos no período', icon: ShoppingBag, href: '/loja/orders' },
    { label: 'Faturamento', value: money(12450), description: 'Pagamento protegido', icon: DollarSign, href: '/loja/financeiro' },
    { label: 'Avaliação', value: '4.8 ★', description: 'Reputação da loja', icon: Star, href: '/loja/avaliacoes' },
  ];

  const actions = [
    { title: 'Produtos', description: 'Cadastrar, editar e revisar catálogo.', icon: Boxes, href: '/loja/products' },
    { title: 'Adicionar produto', description: 'Criar um novo item para venda.', icon: PackagePlus, href: '/loja/products/create' },
    { title: 'Pedidos', description: 'Acompanhar pedidos e status.', icon: ClipboardList, href: '/loja/orders' },
    { title: 'Estoque', description: 'Controlar quantidades e alertas.', icon: AlertTriangle, href: '/loja/estoque' },
    { title: 'Financeiro', description: 'Ver receitas, repasses e histórico.', icon: BarChart3, href: '/loja/financeiro' },
    { title: 'Avaliações', description: 'Monitorar feedback dos clientes.', icon: Star, href: '/loja/avaliacoes' },
    { title: 'Afiliados', description: 'Gerenciar indicações e parceiros.', icon: UserRound, href: '/loja/afiliados' },
    { title: 'Configurações', description: 'Ajustar dados e preferências da loja.', icon: Settings, href: '/loja/configuracoes' },
  ];

  return (
    <StoreLayout title="Dashboard da Loja" subtitle={`Bem-vindo, ${storeName}. Controle sua operação comercial com padrão visual único.`} action={<div className="flex gap-3"><Link to="/loja/products/create"><Button className="bg-white text-violet-950 hover:bg-violet-100"><PackagePlus className="mr-2 h-4 w-4"/>Cadastrar produto</Button></Link><Link to="/loja/configuracoes"><Button variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"><Settings className="mr-2 h-4 w-4"/>Configurações</Button></Link></div>}>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => { const Icon = item.icon; return <Link key={item.label} to={item.href} className="group"><Card className="h-full border-slate-200 bg-white transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"><CardContent className="p-6"><div className="mb-5 flex items-center justify-between"><div className="rounded-2xl bg-violet-50 p-3 text-violet-700 transition group-hover:bg-violet-700 group-hover:text-white"><Icon className="h-6 w-6" /></div><ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-700" /></div><p className="text-sm font-bold text-slate-500">{item.label}</p><p className="mt-2 text-3xl font-black text-slate-950">{item.value}</p><p className="mt-2 text-sm text-slate-500">{item.description}</p></CardContent></Card></Link>; })}
        </div>
        <Card className="border-violet-200 bg-violet-50"><CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"><div className="flex gap-3"><div className="rounded-xl bg-violet-100 p-2 text-violet-700"><Store className="h-5 w-5" /></div><div><h3 className="font-black text-violet-950">Resumo da operação</h3><p className="text-sm text-violet-800">Conta conectada: {user?.email || 'email não identificado'}</p></div></div><span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700"><CheckCircle2 className="h-4 w-4"/>Ativa</span></CardContent></Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{actions.map((item) => { const Icon = item.icon; return <Link key={item.href} to={item.href} className="group"><Card className="h-full border-slate-200 bg-white transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"><CardContent className="p-6"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-violet-700 group-hover:text-white"><Icon className="h-6 w-6" /></div><h3 className="font-black text-slate-950">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p><div className="mt-5 inline-flex items-center text-sm font-bold text-violet-700">Acessar<ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" /></div></CardContent></Card></Link>; })}</div>
      </div>
    </StoreLayout>
  );
};
export default CompanyDashboard;
