
import React, { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileSidebar from './MobileSidebar';
import PageHeader from './PageHeader';
import { useIsMobile } from '@/hooks/use-mobile';

type CustomerLayoutProps = {
  children: ReactNode;
  title: string;
};

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, title }) => {
  // Development-only logging
  if (process.env.NODE_ENV === 'development') {
    console.log('CustomerLayout - Renderizando layout do cliente');
    console.log('CustomerLayout - title:', title);
  }
  
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-600">
      <Navbar />
      
      <div className="flex-1 flex container mx-auto px-4 py-6 gap-6 max-w-7xl">
        <MobileSidebar 
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          closeMenu={closeMenu}
        />
        
        {/* Main content */}
        <main className={cn("flex-1 min-w-0 relative", isMobile ? "pl-0" : "")}>
          <PageHeader title={title} />
          
          <div className={cn("w-full", isMobile ? "px-1" : "")}>
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerLayout;
