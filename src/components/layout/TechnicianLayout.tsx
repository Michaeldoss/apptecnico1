
import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import { 
  LayoutDashboard, 
  User, 
  Wrench, 
  Package, 
  Calendar, 
  LogOut,
  MessageSquare,
  Menu,
  X,
  CreditCard,
  FileText,
  Crown
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarItemProps = {
  href: string;
  icon: React.ElementType;
  children: ReactNode;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
};

const SidebarItem = ({ href, icon: Icon, children, active, badge, onClick }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-gray-light font-inter font-medium relative w-full",
        active ? "bg-tech-primary text-white shadow-sm" : "text-white/80 hover:text-white"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", active ? "text-white" : "text-accent")} />
      <span className="flex-1 min-w-0 text-left w-full">{children}</span>
      
      {badge && badge > 0 && (
        <Badge 
          className="absolute right-2 bg-tech-accent text-white border-0 shadow-sm flex-shrink-0" 
          variant="outline"
        >
          {badge}
        </Badge>
      )}
    </Link>
  );
};

type TechnicianLayoutProps = {
  children: ReactNode;
  title: string;
};

const TechnicianLayout: React.FC<TechnicianLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const { unreadCount } = useNotifications();
  const { logout } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Usar rotas em português que estão funcionando
  const pathPrefix = '/tecnico';
  
  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary via-primary-dark to-sidebar-background relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-cover bg-center"></div>
      
      <Navbar />
      
      <div className="flex-1 flex container-standard px-4 py-6 gap-6 relative z-10 mt-16">
        {isMobile && (
          <button 
            onClick={toggleMenu}
            className="fixed top-20 left-4 z-40 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full shadow-lg md:hidden hover:bg-white/30 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {isMobile && isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={closeMenu}
          />
        )}
        
        <aside className={cn(
          "w-64 shrink-0 transition-all duration-300",
          isMobile ? "fixed left-0 top-16 bottom-0 bg-white/95 backdrop-blur-sm z-30 h-[calc(100vh-4rem)] px-4 pt-16 pb-6 shadow-xl overflow-y-auto" : "hidden md:block bg-white/10 backdrop-blur-sm rounded-lg p-6"
        )}>
          <div className="space-y-2 py-4">
            <SidebarItem 
              href={`${pathPrefix}/dashboard`} 
              icon={LayoutDashboard} 
              active={location.pathname?.includes('/dashboard') || location.pathname?.includes('/painel')}
              onClick={closeMenu}
            >
              Painel
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/perfil`} 
              icon={User} 
              active={location.pathname?.includes('/profile') || location.pathname?.includes('/perfil')}
              onClick={closeMenu}
            >
              Meu Perfil
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/servicos`} 
              icon={Wrench} 
              active={location.pathname?.includes('/services') || location.pathname?.includes('/servicos')}
              onClick={closeMenu}
            >
              Serviços
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/ordens-servico`} 
              icon={FileText} 
              active={location.pathname?.includes('/ordens-servico')}
              onClick={closeMenu}
            >
              Ordens de Serviço
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/chat`} 
              icon={MessageSquare} 
              active={location.pathname?.includes('/chat')}
              badge={unreadCount}
              onClick={closeMenu}
            >
              Mensagens
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/pecas`} 
              icon={Package} 
              active={location.pathname?.includes('/parts') || location.pathname?.includes('/pecas')}
              onClick={closeMenu}
            >
              Peças
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/pagamentos`} 
              icon={CreditCard} 
              active={location.pathname?.includes('/payments') || location.pathname?.includes('/pagamentos')}
              onClick={closeMenu}
            >
              Pagamentos
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/planos`} 
              icon={Crown} 
              active={location.pathname?.includes('/planos') || location.pathname?.includes('/subscription')}
              onClick={closeMenu}
            >
              Planos
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/agenda`} 
              icon={Calendar} 
              active={location.pathname?.includes('/schedule') || location.pathname?.includes('/agenda')}
              onClick={closeMenu}
            >
              Agenda
            </SidebarItem>
          </div>
          
          <div className="pt-6 mt-6 border-t border-white/20">
            <button 
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-white/10 text-white hover:text-white w-full text-left font-inter font-medium"
            >
              <LogOut className="h-5 w-5 text-white" />
              <span>Sair</span>
            </button>
          </div>
        </aside>
        
        <main className={cn(
          "flex-1 min-h-0",
          isMobile ? "pl-0" : ""
        )}>
          <div className={cn(
            "flex items-center justify-between mb-6",
            isMobile ? "flex-col gap-4 items-start" : ""
          )}>
            <h1 className={cn(
              "text-3xl font-bold text-white font-inter drop-shadow-lg",
              isMobile ? "text-2xl pl-12" : ""
            )}>{title}</h1>
          </div>
          
          <div className={cn(
            "w-full h-full grid-standard bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl",
            isMobile ? "mx-2" : ""
          )}>
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default TechnicianLayout;
