
import React, { ReactNode } from 'react';
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
  MessageSquare 
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

type SidebarItemProps = {
  to: string;
  icon: React.ElementType;
  children: ReactNode;
  active?: boolean;
  badge?: number;
};

const SidebarItem = ({ to, icon: Icon, children, active, badge }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-primary-foreground relative",
        active ? "bg-primary-foreground text-primary font-medium" : "text-muted-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
      
      {badge && badge > 0 && (
        <Badge 
          className="absolute right-2 bg-primary text-primary-foreground" 
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
  const path = location.pathname;
  const { unreadCount } = useNotifications();
  const { logout } = useAuth();
  
  // Previnir a duplicação de sidebar verificando se já estamos em uma página de técnico
  const pathPrefix = path.includes('/tecnico/') ? '/tecnico' : '/technician';
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex container mx-auto px-4 py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r pr-6 hidden md:block">
          <div className="space-y-1 py-4">
            <SidebarItem 
              to={`${pathPrefix}/painel`} 
              icon={LayoutDashboard} 
              active={path.includes('/painel') || path.includes('/dashboard')}
            >
              Painel
            </SidebarItem>
            <SidebarItem 
              to={`${pathPrefix}/perfil`} 
              icon={User} 
              active={path.includes('/perfil') || path.includes('/profile')}
            >
              Meu Perfil
            </SidebarItem>
            <SidebarItem 
              to={`${pathPrefix}/servicos`} 
              icon={Wrench} 
              active={path.includes('/servicos') || path.includes('/services')}
            >
              Serviços
            </SidebarItem>
            <SidebarItem 
              to={`${pathPrefix}/chat`} 
              icon={MessageSquare} 
              active={path.includes('/chat')}
              badge={unreadCount}
            >
              Mensagens
            </SidebarItem>
            <SidebarItem 
              to={`${pathPrefix}/pecas`} 
              icon={Package} 
              active={path.includes('/pecas') || path.includes('/parts')}
            >
              Peças
            </SidebarItem>
            <SidebarItem 
              to={`${pathPrefix}/agenda`} 
              icon={Calendar} 
              active={path.includes('/agenda') || path.includes('/schedule')}
            >
              Agenda
            </SidebarItem>
          </div>
          
          <div className="pt-6 mt-6 border-t">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-primary-foreground text-muted-foreground w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </div>
        </aside>
        
        {/* Conteúdo principal */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default TechnicianLayout;
