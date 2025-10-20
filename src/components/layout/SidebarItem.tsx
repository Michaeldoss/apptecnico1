
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  to: string;
  icon: React.ElementType;
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ to, icon: Icon, children, active, onClick }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all duration-300 font-medium group relative overflow-hidden",
        active 
          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/10 hover:shadow-md"
      )}
      onClick={onClick}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
      )}
      <Icon className={cn(
        "h-5 w-5 flex-shrink-0 transition-all duration-300 relative z-10", 
        active ? "text-primary-foreground drop-shadow-sm" : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
      )} />
      <span className="truncate relative z-10 font-semibold">{children}</span>
    </Link>
  );
};

export default SidebarItem;
