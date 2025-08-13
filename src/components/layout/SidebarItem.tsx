
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
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-primary/50 font-inter font-medium",
        active ? "bg-white text-primary shadow-sm" : "text-white hover:text-secondary"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-4 w-4 flex-shrink-0", active ? "text-primary" : "text-accent")} />
      <span className="truncate">{children}</span>
    </Link>
  );
};

export default SidebarItem;
