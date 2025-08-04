import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import PageHeader from './PageHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Store, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  DollarSign,
  Settings,
  Star,
  UserCheck,
  Boxes
} from 'lucide-react';

type StoreLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

const StoreLayout: React.FC<StoreLayoutProps> = ({ children, title, subtitle }) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const sidebarItems = [
    { 
      href: '/loja/dashboard', 
      icon: BarChart3, 
      label: 'Dashboard',
      active: location.pathname === '/loja/dashboard'
    },
    { 
      href: '/loja/products', 
      icon: Package, 
      label: 'Produtos',
      active: location.pathname === '/loja/products'
    },
    { 
      href: '/loja/orders', 
      icon: ShoppingCart, 
      label: 'Pedidos',
      active: location.pathname === '/loja/orders'
    },
    { 
      href: '/loja/inventory', 
      icon: Boxes, 
      label: 'Estoque',
      active: location.pathname === '/loja/inventory'
    },
    { 
      href: '/loja/afiliados', 
      icon: Users,
      label: 'Afiliados',
      active: location.pathname === '/loja/afiliados'
    },
    { 
      href: '/loja/financial', 
      icon: DollarSign, 
      label: 'Financeiro',
      active: location.pathname === '/loja/financial'
    },
    { 
      href: '/loja/reviews', 
      icon: Star, 
      label: 'Avaliações',
      active: location.pathname === '/loja/reviews'
    },
    { 
      href: '/loja/profile', 
      icon: Store, 
      label: 'Perfil da Loja',
      active: location.pathname === '/loja/profile'
    },
    { 
      href: '/loja/settings', 
      icon: Settings, 
      label: 'Configurações',
      active: location.pathname === '/loja/settings'
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

export default StoreLayout;