
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar } from 'lucide-react';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  showDate?: boolean;
};

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle = "Gerencie e monitore seus equipamentos", 
  showDate = true 
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn("mb-8", isMobile ? "mx-2 mt-4" : "")}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h1 className={cn(
            "text-4xl font-bold text-foreground font-inter mb-3",
            isMobile ? "text-2xl text-center" : ""
          )}>
            {title}
          </h1>
          {subtitle && (
            <p className={cn(
              "text-muted-foreground text-lg font-medium",
              isMobile ? "text-center text-base" : ""
            )}>
              {subtitle}
            </p>
          )}
        </div>
        {showDate && (
          <div className="hidden md:flex items-center bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-border shrink-0">
            <Calendar className="h-5 w-5 text-primary mr-2" />
            <span className="text-foreground font-semibold text-sm">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
