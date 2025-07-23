import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';

type PublicLayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  className?: string;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  showHeader = false,
  className 
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {showHeader && title && (
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className={cn(
              "text-5xl font-bold mb-6 font-inter",
              isMobile ? "text-3xl" : ""
            )}>
              {title}
            </h1>
            {subtitle && (
              <p className={cn(
                "text-xl text-blue-100 max-w-3xl mx-auto",
                isMobile ? "text-lg" : ""
              )}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
      
      <main className={cn("flex-1", className)}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicLayout;