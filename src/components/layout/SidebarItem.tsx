
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
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 font-inter font-medium group",
        active 
          ? "bg-white/95 text-gray-900 shadow-md border border-white/30 backdrop-blur-sm" 
          : "text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-sm"
      )}
      onClick={onClick}
    >
      <Icon className={cn(
        "h-4 w-4 flex-shrink-0 transition-colors", 
        active ? "text-gray-900" : "text-gray-300 group-hover:text-white"
      )} />
      <span className="truncate">{children}</span>
    </Link>
  );
};

export default SidebarItem;
