
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar } from 'lucide-react';

type PageHeaderProps = {
  title: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const isMobile = useIsMobile();

  return (
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
  );
};

export default PageHeader;
