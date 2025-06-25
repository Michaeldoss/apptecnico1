
import React from 'react';
import { cn } from '@/lib/utils';

interface BlurContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: 'light' | 'medium' | 'strong';
  dark?: boolean;
}

const BlurContainer = ({
  children,
  className,
  style,
  intensity = 'medium',
  dark = false,
}: BlurContainerProps) => {
  const blurIntensity = {
    light: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
    strong: 'backdrop-blur-lg',
  };

  const bgOpacity = {
    light: dark ? 'bg-black/5' : 'bg-white/5',
    medium: dark ? 'bg-black/10' : 'bg-white/10',
    strong: dark ? 'bg-black/20' : 'bg-white/20',
  };

  const borderColor = dark ? 'border-black/10' : 'border-white/20';

  return (
    <div
      className={cn(
        'border rounded-xl shadow-lg transition-all duration-300',
        blurIntensity[intensity],
        bgOpacity[intensity],
        borderColor,
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default BlurContainer;
