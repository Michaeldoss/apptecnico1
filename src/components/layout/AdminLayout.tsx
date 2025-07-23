import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import PageHeader from './PageHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Users, 
  DollarSign, 
  Wrench, 
  BarChart3, 
  Settings, 
  Shield,
  UserCheck,
  FileText
} from 'lucide-react';

type AdminLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const sidebarItems = [
    { 
      href: '/admin/dashboard', 
      icon: BarChart3, 
      label: 'Dashboard',
      active: location.pathname === '/admin/dashboard'
    },
    { 
      href: '/admin/users', 
      icon: Users, 
      label: 'Usuários',
      active: location.pathname === '/admin/users'
    },
    { 
      href: '/admin/roles', 
      icon: Shield, 
      label: 'Perfis',
      active: location.pathname === '/admin/roles'
    },
    { 
      href: '/admin/payments', 
      icon: DollarSign, 
      label: 'Pagamentos',
      active: location.pathname === '/admin/payments'
    },
    { 
      href: '/admin/services', 
      icon: Wrench, 
      label: 'Serviços',
      active: location.pathname === '/admin/services'
    },
    { 
      href: '/admin/reports', 
      icon: FileText, 
      label: 'Relatórios',
      active: location.pathname === '/admin/reports'
    },
    { 
      href: '/admin/settings', 
      icon: Settings, 
      label: 'Configurações',
      active: location.pathname === '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-blue-600">
      <Navbar />
      
      <div className="flex-1 flex container mx-auto px-4 py-6 gap-6 max-w-7xl">
        {/* Sidebar */}
        {!isMobile && (
          <aside className="w-64 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 p-4 h-fit sticky top-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-blue-400/50 font-inter font-medium",
                    item.active ? "bg-white text-blue-600 shadow-sm" : "text-white hover:text-blue-100"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 flex-shrink-0", item.active ? "text-blue-600" : "text-yellow-400")} />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        )}
        
        {/* Main content */}
        <main className={cn("flex-1 min-w-0 relative", isMobile ? "pl-0" : "")}>
          <PageHeader title={title} subtitle={subtitle} />
          
          <div className={cn("w-full", isMobile ? "px-1" : "")}>
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;