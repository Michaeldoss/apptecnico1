
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
  X,
  Calendar
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
        "flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-gray-50 font-inter font-medium",
        active ? "bg-blue-600 text-white shadow-sm" : "text-gray-900 hover:text-blue-600"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", active ? "text-white" : "text-blue-600")} />
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
  const { logout, isAuthenticated, userType } = useAuth();
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

  const isCustomerLoggedIn = isAuthenticated && userType === 'customer';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="flex-1 flex container-standard px-4 py-6 gap-6">
        {/* Mobile menu toggle */}
        {isMobile && (
          <button 
            onClick={toggleMenu}
            className="fixed top-20 left-4 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg md:hidden hover:bg-blue-700 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Overlay for mobile */}
        {isMobile && isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={closeMenu}
          />
        )}
        
        {/* Sidebar */}
        <aside 
          className={cn(
            "w-64 shrink-0 border-r border-gray-200 pr-6 transition-all duration-300",
            isMobile ? "fixed left-0 top-16 bottom-0 bg-white z-30 h-[calc(100vh-4rem)] px-4 pt-16 pb-6 shadow-xl overflow-y-auto" : "hidden md:block",
            isMobile && !isMenuOpen ? "-translate-x-full" : isMobile && isMenuOpen ? "translate-x-0" : ""
          )}
        >
          <div className="space-y-2 py-4">
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
            
            {isCustomerLoggedIn && (
              <SidebarItem 
                to="/cliente/agenda" 
                icon={Calendar} 
                active={path.startsWith('/cliente/agenda')}
                onClick={closeMenu}
              >
                Agenda
              </SidebarItem>
            )}
            
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
          
          <div className="pt-6 mt-6 border-t border-gray-200">
            <button 
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-gray-50 text-gray-900 hover:text-blue-600 w-full text-left font-inter font-medium"
            >
              <LogOut className="h-5 w-5 text-blue-600" />
              <span>Sair</span>
            </button>
          </div>
        </aside>
        
        {/* Conteúdo principal */}
        <main className={cn(
          "flex-1",
          isMobile ? "pl-0" : ""
        )}>
          <div className={cn(
            "flex items-center justify-between mb-6",
            isMobile ? "flex-col gap-4 items-start" : ""
          )}>
            <h1 className={cn(
              "text-3xl font-bold text-blue-600 font-inter",
              isMobile ? "text-2xl pl-12" : ""
            )}>{title}</h1>
          </div>
          
          <div className={cn(
            "grid-standard",
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

export default CustomerLayout;
