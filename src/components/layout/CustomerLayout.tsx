
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import { 
  LayoutDashboard, 
  Wrench, 
  MapPin, 
  CreditCard, 
  User,
  LogOut 
} from 'lucide-react';

type SidebarItemProps = {
  to: string;
  icon: React.ElementType;
  children: ReactNode;
  active?: boolean;
};

const SidebarItem = ({ to, icon: Icon, children, active }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all hover:bg-primary-foreground",
        active ? "bg-primary-foreground text-primary font-medium" : "text-muted-foreground"
      )}
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex container mx-auto px-4 py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r pr-6 hidden md:block">
          <div className="space-y-1 py-4">
            <SidebarItem 
              to="/cliente/painel" 
              icon={LayoutDashboard} 
              active={path === '/cliente/painel'}
            >
              Painel
            </SidebarItem>
            <SidebarItem 
              to="/cliente/servicos" 
              icon={Wrench} 
              active={path.startsWith('/cliente/servicos')}
            >
              Meus Serviços
            </SidebarItem>
            <SidebarItem 
              to="/cliente/rastreamento" 
              icon={MapPin} 
              active={path.startsWith('/cliente/rastreamento')}
            >
              Rastreamento
            </SidebarItem>
            <SidebarItem 
              to="/cliente/pagamentos" 
              icon={CreditCard} 
              active={path.startsWith('/cliente/pagamentos')}
            >
              Pagamentos
            </SidebarItem>
            <SidebarItem 
              to="/cliente/perfil" 
              icon={User} 
              active={path === '/cliente/perfil'}
            >
              Minha Conta
            </SidebarItem>
          </div>
          
          <div className="pt-6 mt-6 border-t">
            <SidebarItem to="/logout" icon={LogOut} active={false}>
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
