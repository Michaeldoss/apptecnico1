
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
        "flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-blue-500 font-inter font-medium",
        active ? "bg-white text-blue-600 shadow-sm" : "text-white hover:text-blue-100"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", active ? "text-blue-600" : "text-white")} />
      <span>{children}</span>
    </Link>
  );
};

type CustomerLayoutProps = {
  children: ReactNode;
  title: string;
};

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, title }) => {
  console.log('CustomerLayout - Renderizando layout do cliente');
  console.log('CustomerLayout - title:', title);
  
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { logout, isAuthenticated, userType } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log('CustomerLayout - path:', path);
  console.log('CustomerLayout - isAuthenticated:', isAuthenticated);
  console.log('CustomerLayout - userType:', userType);

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

  console.log('CustomerLayout - isCustomerLoggedIn:', isCustomerLoggedIn);

  return (
    <div className="min-h-screen flex flex-col bg-blue-600">
      <Navbar />
      
      <div className="flex-1 flex container mx-auto px-4 py-8 gap-8 max-w-7xl">
        {/* Mobile menu toggle */}
        {isMobile && (
          <button 
            onClick={toggleMenu}
            className="fixed top-24 left-6 z-40 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 p-3 rounded-full shadow-xl md:hidden transition-all duration-200 hover:scale-110"
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
            "w-72 shrink-0 transition-all duration-300",
            isMobile ? "fixed left-0 top-16 bottom-0 bg-gradient-to-b from-blue-600 to-blue-700 z-30 h-[calc(100vh-4rem)] px-6 pt-20 pb-6 shadow-2xl overflow-y-auto border-r-4 border-yellow-400" : "hidden md:block bg-gradient-to-b from-blue-600 to-blue-700 rounded-xl p-6 shadow-xl border-4 border-yellow-400",
            isMobile && !isMenuOpen ? "-translate-x-full" : isMobile && isMenuOpen ? "translate-x-0" : ""
          )}
        >
          <div className="space-y-3 py-4">
            <div className="mb-6 pb-4 border-b border-blue-400">
              <h2 className="text-xl font-bold text-white">Menu Principal</h2>
              <p className="text-blue-200 text-sm">Acesse suas funcionalidades</p>
            </div>
            
            <SidebarItem 
              to="/cliente/painel" 
              icon={LayoutDashboard} 
              active={path === '/cliente/painel' || path === '/cliente/dashboard'}
              onClick={closeMenu}
            >
              Painel
            </SidebarItem>
            
            <SidebarItem 
              to="/cliente/perfil" 
              icon={User} 
              active={path === '/cliente/perfil' || path === '/cliente/profile'}
              onClick={closeMenu}
            >
              Perfil
            </SidebarItem>
            
            <SidebarItem 
              to="/cliente/servicos" 
              icon={Wrench} 
              active={path.startsWith('/cliente/servicos') || path.startsWith('/cliente/services')}
              onClick={closeMenu}
            >
              Meus Serviços
            </SidebarItem>
            
            <SidebarItem 
              to="/cliente/equipamentos" 
              icon={Printer} 
              active={path.startsWith('/cliente/equipamentos') || path.startsWith('/cliente/equipment')}
              onClick={closeMenu}
            >
              Equipamentos
            </SidebarItem>
            
            <SidebarItem 
              to="/cliente/ordens" 
              icon={FileText} 
              active={path.startsWith('/cliente/ordens') || path.startsWith('/cliente/orders')}
              onClick={closeMenu}
            >
              Ordens de Serviço
            </SidebarItem>
            
            <SidebarItem 
              to="/cliente/pagamentos" 
              icon={CreditCard} 
              active={path.startsWith('/cliente/pagamentos') || path.startsWith('/cliente/payments')}
              onClick={closeMenu}
            >
              Pagamentos
            </SidebarItem>
            
            {isCustomerLoggedIn && (
              <SidebarItem 
                to="/cliente/agenda" 
                icon={Calendar} 
                active={path.startsWith('/cliente/agenda') || path.startsWith('/cliente/schedule')}
                onClick={closeMenu}
              >
                Agenda
              </SidebarItem>
            )}
            
            <SidebarItem 
              to="/cliente/rastreamento" 
              icon={MapPin} 
              active={path.startsWith('/cliente/rastreamento') || path.startsWith('/cliente/tracking')}
              onClick={closeMenu}
            >
              Rastreamento
            </SidebarItem>
            
            <SidebarItem 
              to="/cliente/clientes" 
              icon={User} 
              active={path.startsWith('/cliente/clientes')}
              onClick={closeMenu}
            >
              Clientes
            </SidebarItem>
          </div>
          
          <div className="pt-6 mt-8 border-t border-blue-400">
            <button 
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-red-500 text-white hover:text-red-100 w-full text-left font-inter font-medium bg-red-600 shadow-lg"
            >
              <LogOut className="h-5 w-5 text-white" />
              <span>Sair</span>
            </button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className={cn("flex-1 min-w-0", isMobile ? "pl-0" : "")}>
          {/* Header melhorado - Mais limpo */}
          <div className={cn("mb-8", isMobile ? "mx-2" : "")}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className={cn("text-4xl font-bold text-white font-inter mb-2", isMobile ? "text-3xl pl-12" : "")}>
                  {title}
                </h1>
                <p className="text-blue-100 text-lg font-medium">
                  Gerencie e monitore seus equipamentos
                </p>
              </div>
              <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <Calendar className="h-5 w-5 text-white mr-2" />
                <span className="text-white font-semibold">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
          
          <div className={cn("w-full", isMobile ? "px-2" : "")}>
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerLayout;
