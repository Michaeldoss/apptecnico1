
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
        "flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-muted font-inter font-medium relative w-full",
        active ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/80 hover:text-foreground"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", active ? "text-primary-foreground" : "text-primary")} />
      <span className="flex-1 min-w-0 text-left w-full">{children}</span>
      
      {badge && badge > 0 && (
        <Badge 
          className="absolute right-2 bg-primary text-primary-foreground border-0 shadow-sm flex-shrink-0" 
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
  
  const handleLogout = async () => {
    await logout();
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Adicionado pt-24 para compensar a navbar absoluta */}
      <div className="flex-1 flex container mx-auto px-4 gap-6 max-w-7xl pt-24">
        {isMobile && (
          <button 
            onClick={toggleMenu}
            className="fixed top-20 left-4 z-40 bg-primary text-white p-3 rounded-full shadow-lg md:hidden hover:bg-primary/90 transition-colors duration-200"
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
          "w-64 shrink-0 transition-all duration-300 bg-card border border-border rounded-lg",
          isMobile ? "fixed left-0 top-16 bottom-0 z-30 h-[calc(100vh-4rem)] px-4 pt-16 pb-6 shadow-xl overflow-y-auto" : "hidden md:block p-6 h-fit sticky top-24"
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
          
          <div className="pt-6 mt-6 border-t border-border">
            <button
              onClick={() => {
                void handleLogout();
                closeMenu();
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-muted text-foreground w-full text-left font-inter font-medium"
            >
              <LogOut className="h-5 w-5 text-destructive" />
              <span>Sair</span>
            </button>
          </div>
        </aside>
        
        <main className={cn(
          "flex-1 min-w-0 relative",
          isMobile ? "pl-0" : ""
        )}>
          <div className={cn(
            "w-full",
            isMobile ? "px-1" : ""
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
