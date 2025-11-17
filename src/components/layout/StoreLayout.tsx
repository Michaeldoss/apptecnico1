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
      href: '/loja/configuracoes', 
      icon: Settings, 
      label: 'Configurações',
      active: location.pathname === '/loja/configuracoes'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Cabeçalho Azul Navy */}
      <div className="bg-primary-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={cn(
            "text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-inter text-white animate-fade-in",
            isMobile ? "text-4xl" : ""
          )}>
            {title}
          </h1>
          <p className={cn(
            "text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in",
            isMobile ? "text-lg" : ""
          )}>
            {subtitle || "Gerencie sua loja e produtos"}
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex container mx-auto px-4 gap-6 max-w-7xl py-8">
        {/* Sidebar */}
        {!isMobile && (
          <aside className="w-64 bg-card border border-border rounded-lg p-6 h-fit sticky top-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-all duration-200 hover:bg-muted font-inter font-medium",
                    item.active ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", item.active ? "text-primary-foreground" : "text-primary")} />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        )}
        
        {/* Main content */}
        <main className={cn("flex-1 min-w-0 relative", isMobile ? "pl-0" : "")}>
          
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