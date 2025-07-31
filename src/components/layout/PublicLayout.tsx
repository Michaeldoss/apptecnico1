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
        <div className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-20 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
          </div>
          <div className="max-w-7xl mx-auto text-center relative">
            <h1 className={cn(
              "text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-inter text-primary-foreground animate-fade-in",
              isMobile ? "text-4xl" : ""
            )}>
              {title}
            </h1>
            {subtitle && (
              <p className={cn(
                "text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed animate-fade-in",
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