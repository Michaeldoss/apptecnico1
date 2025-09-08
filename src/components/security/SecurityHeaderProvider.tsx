import React, { useEffect } from 'react';

interface SecurityHeaderProviderProps {
  children: React.ReactNode;
}

const SecurityHeaderProvider: React.FC<SecurityHeaderProviderProps> = ({ children }) => {
  useEffect(() => {
    // Set up Content Security Policy via meta tag (for additional protection)
    let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!cspMeta) {
      cspMeta = document.createElement('meta');
      cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
      document.head.appendChild(cspMeta);
    }
    
    // Strict CSP for production security
    const cspValue = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://apis.google.com https://accounts.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://zvokljetwvykcpolyqgp.supabase.co https://api.pwnedpasswords.com https://accounts.google.com",
      "frame-src https://accounts.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join('; ');
    
    cspMeta.setAttribute('content', cspValue);

    // Set referrer policy
    let referrerMeta = document.querySelector('meta[name="referrer"]');
    if (!referrerMeta) {
      referrerMeta = document.createElement('meta');
      referrerMeta.setAttribute('name', 'referrer');
      referrerMeta.setAttribute('content', 'strict-origin-when-cross-origin');
      document.head.appendChild(referrerMeta);
    }

    // Prevent clickjacking
    if (window.self !== window.top) {
      console.warn('Application loaded in iframe - potential security risk');
      // In production, you might want to break out of the iframe
      // window.top.location = window.self.location;
    }

    // Disable right-click and F12 in production (optional)
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname.includes('sandbox.lovable.dev');
    
    if (!isDevelopment) {
      const disableDevTools = (e: KeyboardEvent) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+U, etc.
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
          return false;
        }
      };

      const disableRightClick = (e: MouseEvent) => {
        if (e.button === 2) {
          e.preventDefault();
          return false;
        }
      };

      document.addEventListener('keydown', disableDevTools);
      document.addEventListener('contextmenu', disableRightClick);

      return () => {
        document.removeEventListener('keydown', disableDevTools);
        document.removeEventListener('contextmenu', disableRightClick);
      };
    }
  }, []);

  return <>{children}</>;
};

export default SecurityHeaderProvider;