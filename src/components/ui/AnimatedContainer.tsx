
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  triggerOnce?: boolean;
}

const AnimatedContainer = ({
  children,
  className,
  animation = 'fade',
  delay = 0,
  duration = 300,
  triggerOnce = true,
}: AnimatedContainerProps) => {
  const [isVisible, setIsVisible] = useState(!triggerOnce);

  useEffect(() => {
    if (triggerOnce) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [delay, triggerOnce]);

  const animationStyles = {
    fade: {
      initial: 'opacity-0',
      animate: 'opacity-100 transition-opacity',
    },
    'slide-up': {
      initial: 'opacity-0 translate-y-6',
      animate: 'opacity-100 translate-y-0 transition-all',
    },
    'slide-down': {
      initial: 'opacity-0 -translate-y-6',
      animate: 'opacity-100 translate-y-0 transition-all',
    },
    'slide-left': {
      initial: 'opacity-0 translate-x-6',
      animate: 'opacity-100 translate-x-0 transition-all',
    },
    'slide-right': {
      initial: 'opacity-0 -translate-x-6',
      animate: 'opacity-100 translate-x-0 transition-all',
    },
    scale: {
      initial: 'opacity-0 scale-95',
      animate: 'opacity-100 scale-100 transition-all',
    },
  };

  return (
    <div
      className={cn(
        'transition-all',
        isVisible ? animationStyles[animation].animate : animationStyles[animation].initial,
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
