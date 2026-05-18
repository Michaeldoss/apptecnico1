import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  MessageSquare,
  Package,
  Route,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Wallet,
  Wrench,
  Zap,
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
      description: 'Chamados',
      match: ['/services', '/servicos'],
    },
    {
      href: `${pathPrefix}/ordens-servico`,
      icon: FileText,
      label: 'Ordens',
      description: 'Aceitos',
      match: ['/ordens-servico'],
    },
    {
      href: `${pathPrefix}/agenda`,
      icon: Calendar,
      label: 'Agenda',
      description: 'Rotas',
      match: ['/schedule', '/agenda'],
    },
    {
      href: `${pathPrefix}/pagamentos`,
      icon: CreditCard,
      label: 'Ganhos',
      description: 'Repasses',
      match: ['/payments', '/pagamentos'],
    },
    {
      href: `${pathPrefix}/pecas`,
      icon: Package,
      label: 'Peças',
      description: 'Estoque',
      match: ['/parts', '/pecas'],
    },
    {
      href: `${pathPrefix}/chat`,
      icon: MessageSquare,
      label: 'Chat',
      description: 'Mensagens',
      match: ['/chat'],
      badge: unreadCount,
    },
    {
      href: `${pathPrefix}/perfil`,
      icon: User,
      label: 'Perfil',
      description: 'Dados',
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
    <div className="min-h-screen bg-[#F3F7F6] text-slate-950">
      <Navbar />

      {isMobile && (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed left-4 top-20 z-40 rounded-xl bg-emerald-700 p-3 text-white shadow-lg transition hover:bg-emerald-800 md:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      )}

      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={closeMenu} />
      )}

      <div className="mx-auto flex max-w-[1440px] gap-5 px-4 py-5">
        <aside
          className={cn(
            'shrink-0 transition-all duration-300',
            isMobile
              ? 'fixed bottom-0 left-0 top-16 z-30 w-80 overflow-y-auto bg-white p-4 pt-16 shadow-xl'
              : 'sticky top-5 hidden h-[calc(100vh-40px)] w-72 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:block'
          )}
        >
          <div className="mb-4 rounded-3xl bg-gradient-to-br from-emerald-700 to-teal-600 p-4 text-white">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <Wrench className="h-5 w-5" />
            </div>

            <p className="text-sm font-black">Central Técnica</p>
            <p className="mt-1 text-xs text-emerald-100">Chamados, agenda e ganhos</p>
          </div>

          <nav className="space-y-1.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.match);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMenu}
                  className={cn(
                    'group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all',
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
                        'truncate text-sm font-black',
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

          <div className="mt-5 border-t border-slate-200 pt-4">
            <button
              onClick={() => {
                void handleLogout();
                closeMenu();
              }}
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-red-700"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <LogOut className="h-5 w-5" />
              </div>
              Sair
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                  Área do Técnico
                </div>

                <h1 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                  {title}
                </h1>

                <p className="mt-1 max-w-3xl text-sm font-medium text-slate-500">
                  {subtitle ||
                    'Gerencie chamados, agenda, ganhos, peças, pagamentos e reputação técnica.'}
                </p>
              </div>

              {action && <div className="flex shrink-0">{action}</div>}
            </div>
          </div>

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

          {children}
        </main>
      </div>
    </div>
  );
};

export default TechnicianLayout;
