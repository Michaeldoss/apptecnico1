
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarItem from './SidebarItem';
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
  Calendar,
  DollarSign
} from 'lucide-react';

type MobileSidebarProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isMenuOpen, toggleMenu, closeMenu }) => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { logout, isAuthenticated, userType } = useAuth();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isCustomerLoggedIn = isAuthenticated && userType === 'customer';

  return (
    <>
      {/* Mobile menu toggle */}
      {isMobile && (
        <button 
          onClick={toggleMenu}
          className="fixed top-20 left-4 z-50 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-instalei-text-dark p-2.5 rounded-full shadow-xl md:hidden transition-all duration-200 hover:scale-105"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
          "w-64 shrink-0 transition-all duration-300",
          isMobile ? "fixed left-0 top-16 bottom-0 bg-gradient-to-b from-primary to-primary-dark z-40 h-[calc(100vh-4rem)] px-3 pt-16 pb-6 shadow-2xl overflow-y-auto" : "hidden md:block bg-gradient-to-b from-primary to-primary-dark rounded-xl p-4 shadow-xl",
          isMobile && !isMenuOpen ? "-translate-x-full" : isMobile && isMenuOpen ? "translate-x-0" : ""
        )}
      >
        <div className="space-y-2 py-4">
          <div className="mb-6 pb-4 border-b border-white/30">
            <h2 className="text-lg font-bold text-white">Menu Principal</h2>
            <p className="text-white/80 text-xs">Acesse suas funcionalidades</p>
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
            to="/cliente/afiliados" 
            icon={DollarSign} 
            active={path.startsWith('/cliente/afiliados')}
            onClick={closeMenu}
          >
            Afiliados
          </SidebarItem>
          
          <SidebarItem 
            to="/cliente/clientes" 
            icon={User} 
            active={path.startsWith('/cliente/clientes')}
            onClick={closeMenu}
          >
            Meu Cadastro
          </SidebarItem>
        </div>
        
        <div className="pt-4 mt-6 border-t border-white/30">
          <button 
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-red-500 text-white hover:text-red-100 w-full text-left font-inter font-medium bg-red-600 shadow-lg"
          >
            <LogOut className="h-4 w-4 text-white flex-shrink-0" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
