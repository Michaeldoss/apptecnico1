import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { BarChart3, Boxes, ChevronRight, ClipboardList, DollarSign, LayoutDashboard, Package, Settings, ShieldCheck, Star, Store, UserRound, Users } from 'lucide-react';

type StoreLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

const StoreLayout: React.FC<StoreLayoutProps> = ({ children, title, subtitle, action }) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const sidebarItems = [
    { href: '/loja/dashboard', icon: LayoutDashboard, label: 'Dashboard', description: 'Visão geral' },
    { href: '/loja/products', icon: Package, label: 'Produtos', description: 'Catálogo' },
    { href: '/loja/orders', icon: ClipboardList, label: 'Pedidos', description: 'Vendas' },
    { href: '/loja/estoque', icon: Boxes, label: 'Estoque', description: 'Inventário' },
    { href: '/loja/financeiro', icon: DollarSign, label: 'Financeiro', description: 'Receitas' },
    { href: '/loja/avaliacoes', icon: Star, label: 'Avaliações', description: 'Reputação' },
    { href: '/loja/afiliados', icon: Users, label: 'Afiliados', description: 'Indicações' },
    { href: '/loja/profile', icon: Store, label: 'Perfil da Loja', description: 'Dados públicos' },
    { href: '/loja/configuracoes', icon: Settings, label: 'Configurações', description: 'Preferências' },
  ];

  const isActive = (href: string) => href === '/loja/dashboard' ? location.pathname === href : location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-slate-950">
      <Navbar />
      <section className="relative overflow-hidden bg-[#170B3B]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.42),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.34),transparent_36%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-violet-100">
                <ShieldCheck className="h-4 w-4" />
                Portal da Loja
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-violet-100 md:text-base">
                {subtitle || 'Gerencie sua loja, produtos, pedidos, estoque e financeiro em um só lugar.'}
              </p>
            </div>
            {action && <div className="flex shrink-0">{action}</div>}
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8">
        {!isMobile && (
          <aside className="sticky top-6 h-fit w-72 shrink-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-violet-50 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-700 text-white"><Store className="h-5 w-5" /></div>
              <div><p className="text-sm font-black text-slate-950">Área da Loja</p><p className="text-xs text-slate-500">Painel do fornecedor</p></div>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} to={item.href} className={cn('group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all', active ? 'bg-violet-700 text-white shadow-md shadow-violet-700/20' : 'text-slate-700 hover:bg-violet-50 hover:text-violet-800')}>
                    <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition', active ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-violet-100 group-hover:text-violet-800')}><Icon className="h-5 w-5" /></div>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.label}</p><p className={cn('truncate text-xs', active ? 'text-violet-100' : 'text-slate-400')}>{item.description}</p></div>
                    {active && <ChevronRight className="h-4 w-4 text-white" />}
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}
        <main className="min-w-0 flex-1">
          {isMobile && (
            <div className="mb-5 overflow-x-auto"><div className="flex min-w-max gap-2">
              {sidebarItems.map((item) => { const Icon = item.icon; const active = isActive(item.href); return <Link key={item.href} to={item.href} className={cn('inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition', active ? 'border-violet-700 bg-violet-700 text-white' : 'border-slate-200 bg-white text-slate-700')}><Icon className="h-4 w-4" />{item.label}</Link>; })}
            </div></div>
          )}
          <div className="rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur md:p-6">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default StoreLayout;
