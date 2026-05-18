import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Calendar,
  ChevronRight,
  CreditCard,
  Crown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  ShieldCheck,
  User,
  Wrench,
  X,
} from 'lucide-react';

type TechnicianLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

const TechnicianLayout: React.FC<TechnicianLayoutProps> = ({
  children,
  title,
  subtitle,
  action,
}) => {
  const location = useLocation();
  const { unreadCount } = useNotifications();
  const { logout } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathPrefix = '/tecnico';

  const sidebarItems = [
    {
      href: `${pathPrefix}/dashboard`,
      icon: LayoutDashboard,
      label: 'Painel',
      description: 'Visão geral',
      match: ['/dashboard', '/painel'],
    },
    {
      href: `${pathPrefix}/servicos`,
      icon: Wrench,
      label: 'Serviços',
      description: 'Chamados disponíveis',
      match: ['/services', '/servicos'],
    },
    {
      href: `${pathPrefix}/ordens-servico`,
      icon: FileText,
      label: 'Ordens de Serviço',
      description: 'Serviços aceitos',
      match: ['/ordens-servico'],
    },
    {
      href: `${pathPrefix}/agenda`,
      icon: Calendar,
      label: 'Agenda',
      description: 'Rotina da semana',
      match: ['/schedule', '/agenda'],
    },
    {
      href: `${pathPrefix}/pagamentos`,
      icon: CreditCard,
      label: 'Pagamentos',
      description: 'Ganhos e repasses',
      match: ['/payments', '/pagamentos'],
    },
    {
      href: `${pathPrefix}/pecas`,
      icon: Package,
      label: 'Peças',
      description: 'Estoque e vendas',
      match: ['/parts', '/pecas'],
    },
    {
      href: `${pathPrefix}/chat`,
      icon: MessageSquare,
      label: 'Mensagens',
      description: 'Conversas',
      match: ['/chat'],
      badge: unreadCount,
    },
    {
      href: `${pathPrefix}/perfil`,
      icon: User,
      label: 'Meu Perfil',
      description: 'Dados e reputação',
      match: ['/profile', '/perfil'],
    },
    {
      href: `${pathPrefix}/planos`,
      icon: Crown,
      label: 'Planos',
      description: 'Assinatura',
      match: ['/planos', '/subscription'],
    },
  ];

  const isActive = (matches: string[]) => {
    return matches.some((match) => location.pathname?.includes(match));
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-[#F4F8F6] text-slate-950">
      <Navbar />

      <section className="relative overflow-hidden bg-[#052E24]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.32),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.22),transparent_38%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-4xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                <ShieldCheck className="h-4 w-4" />
                Área do Técnico
              </div>

              <h1 className="text-3xl font-black tracking-tight !text-white md:text-5xl">
                {title}
              </h1>

              <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed !text-emerald-100 md:text-base">
                {subtitle ||
                  'Gerencie chamados, agenda, ganhos, peças, pagamentos e reputação técnica em um só lugar.'}
              </p>
            </div>

            {action && (
              <div className="flex shrink-0 items-center justify-start lg:justify-end">
                {action}
              </div>
            )}
          </div>
        </div>
      </section>

      {isMobile && (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed left-4 top-20 z-40 rounded-full bg-emerald-700 p-3 text-white shadow-lg transition hover:bg-emerald-800 md:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      )}

      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={closeMenu} />
      )}

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8">
        <aside
          className={cn(
            'shrink-0 transition-all duration-300',
            isMobile
              ? 'fixed bottom-0 left-0 top-16 z-30 w-80 overflow-y-auto bg-white p-4 pt-16 shadow-xl'
              : 'sticky top-6 hidden h-fit w-72 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:block'
          )}
        >
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <Wrench className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-black text-slate-950">Central Técnica</p>
              <p className="text-xs font-medium text-slate-500">Serviços e ganhos</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.match);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMenu}
                  className={cn(
                    'group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all',
                    active
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                      : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition',
                      active
                        ? 'bg-white/15 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'truncate text-sm font-bold',
                        active ? 'text-white' : 'text-slate-800'
                      )}
                    >
                      {item.label}
                    </p>

                    <p
                      className={cn(
                        'truncate text-xs font-medium',
                        active ? 'text-emerald-100' : 'text-slate-400'
                      )}
                    >
                      {item.description}
                    </p>
                  </div>

                  {item.badge && item.badge > 0 && (
                    <Badge className="border-0 bg-red-500 text-white">{item.badge}</Badge>
                  )}

                  {active && <ChevronRight className="h-4 w-4 text-white" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-slate-200 pt-4">
            <button
              onClick={() => {
                void handleLogout();
                closeMenu();
              }}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-red-700"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <LogOut className="h-5 w-5" />
              </div>
              Sair
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {isMobile && (
            <div className="mb-5 overflow-x-auto">
              <div className="flex min-w-max gap-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.match);

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={closeMenu}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition',
                        active
                          ? 'border-emerald-700 bg-emerald-700 text-white'
                          : 'border-slate-200 bg-white text-slate-700'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TechnicianLayout;
