import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Bell,
  Calendar,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Crown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Search,
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
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 md:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/tecnico/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-700 text-white">
              <Wrench className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-base font-black leading-none text-slate-950">Instalei</p>
              <p className="mt-1 text-xs font-bold text-emerald-700">Central Técnica</p>
            </div>
          </Link>

          <div className="hidden max-w-xl flex-1 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar chamado, cliente, cidade ou peça..."
                className="h-10 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/tecnico/servicos"
              className="hidden rounded-2xl bg-emerald-700 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-800 md:inline-flex"
            >
              Pegar chamado
            </Link>

            <button className="relative rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:bg-slate-50">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-black text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-800 transition hover:bg-slate-50">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline">Minha Conta</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={closeMenu} />
      )}

      <div className="mx-auto flex max-w-[1440px] gap-5 px-4 py-5">
        <aside
          className={cn(
            'shrink-0 transition-all duration-300',
            isMobile
              ? cn(
                  'fixed bottom-0 left-0 top-16 z-40 w-80 overflow-y-auto bg-white p-4 shadow-xl',
                  isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                )
              : 'sticky top-20 hidden h-[calc(100vh-96px)] w-72 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:block'
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

          {children}
        </main>
      </div>
    </div>
  );
};

export default TechnicianLayout;
