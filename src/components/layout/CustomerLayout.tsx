
import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wrench, 
  MapPin, 
  CreditCard, 
  User,
  LogOut,
  FileText,
  Printer,
  Menu,
  X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarItemProps = {
  to: string;
  icon: React.ElementType;
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ to, icon: Icon, children, active, onClick }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-primary-foreground",
        active ? "bg-primary-foreground text-primary font-medium" : "text-muted-foreground"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
};

type CustomerLayoutProps = {
  children: ReactNode;
  title: string;
};

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex container mx-auto px-4 py-6 gap-6">
        {/* Mobile menu toggle */}
        {isMobile && (
          <button 
            onClick={toggleMenu}
            className="fixed top-20 left-4 z-40 bg-primary text-white p-2 rounded-full shadow-lg"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
        
        {/* Sidebar */}
        <aside 
          className={cn(
            "w-64 shrink-0 border-r pr-6 transition-all duration-300",
            isMobile ? "fixed left-0 top-16 bottom-0 bg-background z-30 h-[calc(100vh-4rem)] px-4 pt-16 pb-6 shadow-xl" : "hidden md:block",
            isMobile && !isMenuOpen ? "-translate-x-full" : isMobile && isMenuOpen ? "translate-x-0" : ""
          )}
        >
          <div className="space-y-1 py-4">
            <SidebarItem 
              to="/cliente/painel" 
              icon={LayoutDashboard} 
              active={path === '/cliente/painel'}
              onClick={closeMenu}
            >
              Painel
            </SidebarItem>
            <SidebarItem 
              to="/cliente/servicos" 
              icon={Wrench} 
              active={path.startsWith('/cliente/servicos')}
              onClick={closeMenu}
            >
              Meus Serviços
            </SidebarItem>
            <SidebarItem 
              to="/cliente/equipamentos" 
              icon={Printer} 
              active={path.startsWith('/cliente/equipamentos')}
              onClick={closeMenu}
            >
              Meus Equipamentos
            </SidebarItem>
            <SidebarItem 
              to="/cliente/rastreamento" 
              icon={MapPin} 
              active={path.startsWith('/cliente/rastreamento')}
              onClick={closeMenu}
            >
              Rastreamento
            </SidebarItem>
            <SidebarItem 
              to="/cliente/pagamentos" 
              icon={CreditCard} 
              active={path.startsWith('/cliente/pagamentos')}
              onClick={closeMenu}
            >
              Pagamentos
            </SidebarItem>
            <SidebarItem 
              to="/cliente/ordens" 
              icon={FileText} 
              active={path.startsWith('/cliente/ordens')}
              onClick={closeMenu}
            >
              Ordens de Serviço
            </SidebarItem>
            <SidebarItem 
              to="/cliente/perfil" 
              icon={User} 
              active={path === '/cliente/perfil'}
              onClick={closeMenu}
            >
              Minha Conta
            </SidebarItem>
          </div>
          
          <div className="pt-6 mt-6 border-t">
            <SidebarItem 
              to="/logout" 
              icon={LogOut} 
              active={false}
              onClick={closeMenu}
            >
              Sair
            </SidebarItem>
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

export default CustomerLayout;
