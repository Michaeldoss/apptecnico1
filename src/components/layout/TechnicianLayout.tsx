
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
  CreditCard
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
        "flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-gray-light font-inter font-medium relative",
        active ? "bg-tech-primary text-white shadow-sm" : "text-gray-primary hover:text-tech-primary"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", active ? "text-white" : "text-tech-primary")} />
      <span>{children}</span>
      
      {badge && badge > 0 && (
        <Badge 
          className="absolute right-2 bg-tech-accent text-white border-0 shadow-sm" 
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
  
  const pathPrefix = '/technician';
  
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="flex-1 flex container-standard px-4 py-6 gap-6">
        {isMobile && (
          <button 
            onClick={toggleMenu}
            className="fixed top-20 left-4 z-40 bg-tech-primary text-white p-3 rounded-full shadow-lg md:hidden hover:bg-tech-primary-hover transition-colors duration-200"
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
          "w-64 shrink-0 border-r border-gray-border pr-6 transition-all duration-300",
          isMobile ? "fixed left-0 top-16 bottom-0 bg-white z-30 h-[calc(100vh-4rem)] px-4 pt-16 pb-6 shadow-xl overflow-y-auto" : "hidden md:block",
          isMobile && !isMenuOpen ? "-translate-x-full" : isMobile && isMenuOpen ? "translate-x-0" : ""
        )}>
          <div className="space-y-2 py-4">
            <SidebarItem 
              href={`${pathPrefix}/dashboard`} 
              icon={LayoutDashboard} 
              active={location.pathname?.includes('/dashboard')}
              onClick={closeMenu}
            >
              Painel
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/profile`} 
              icon={User} 
              active={location.pathname?.includes('/profile')}
              onClick={closeMenu}
            >
              Meu Perfil
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/services`} 
              icon={Wrench} 
              active={location.pathname?.includes('/services')}
              onClick={closeMenu}
            >
              Serviços
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
              href={`${pathPrefix}/parts`} 
              icon={Package} 
              active={location.pathname?.includes('/parts')}
              onClick={closeMenu}
            >
              Peças
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/payments`} 
              icon={CreditCard} 
              active={location.pathname?.includes('/payments')}
              onClick={closeMenu}
            >
              Pagamentos
            </SidebarItem>
            <SidebarItem 
              href={`${pathPrefix}/schedule`} 
              icon={Calendar} 
              active={location.pathname?.includes('/schedule')}
              onClick={closeMenu}
            >
              Agenda
            </SidebarItem>
          </div>
          
          <div className="pt-6 mt-6 border-t border-gray-border">
            <button 
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-gray-light text-gray-primary hover:text-tech-primary w-full text-left font-inter font-medium"
            >
              <LogOut className="h-5 w-5 text-tech-primary" />
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
              "text-3xl font-bold text-tech-primary font-inter",
              isMobile ? "text-2xl pl-12" : ""
            )}>{title}</h1>
          </div>
          
          <div className={cn(
            "w-full h-full grid-standard",
            isMobile ? "px-2" : ""
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
