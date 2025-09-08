import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SecurityMetrics {
  loginAttempts: number;
  lastLogin: Date | null;
  failedAttempts: number;
  isBlocked: boolean;
  blockUntil: Date | null;
}

interface RateLimitInfo {
  allowed: boolean;
  attemptsRemaining: number;
  resetTime: Date | null;
}

export const useSecureAuth = () => {
  const { user, isAuthenticated } = useAuth();
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    loginAttempts: 0,
    lastLogin: null,
    failedAttempts: 0,
    isBlocked: false,
    blockUntil: null
  });

  // Check rate limiting before authentication attempts
  const checkRateLimit = async (action: string): Promise<RateLimitInfo> => {
    try {
      const identifier = window.location.hostname + '_' + (user?.id || 'anonymous');
      
      const { data, error } = await supabase.rpc('check_rate_limit', {
        p_identifier: identifier,
        p_action_type: action,
        p_max_attempts: action === 'login' ? 5 : 3,
        p_window_minutes: 15,
        p_block_minutes: 60
      });

      if (error) {
        console.warn('Rate limit check failed:', error);
        return { allowed: true, attemptsRemaining: 3, resetTime: null };
      }

      return {
        allowed: data,
        attemptsRemaining: data ? 3 : 0,
        resetTime: data ? null : new Date(Date.now() + 60 * 60 * 1000)
      };
    } catch (error) {
      console.warn('Rate limit check error:', error);
      return { allowed: true, attemptsRemaining: 3, resetTime: null };
    }
  };

  // Enhanced password validation
  const validatePasswordSecurity = async (password: string): Promise<{
    isValid: boolean;
    errors: string[];
    strength: 'weak' | 'medium' | 'strong';
  }> => {
    const errors: string[] = [];
    let strength: 'weak' | 'medium' | 'strong' = 'weak';

    // Basic validations
    if (password.length < 8) {
      errors.push('Senha deve ter pelo menos 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Deve conter pelo menos uma letra maiúscula');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Deve conter pelo menos uma letra minúscula');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Deve conter pelo menos um número');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Deve conter pelo menos um caractere especial');
    }

    // Calculate strength
    if (errors.length === 0) {
      if (password.length >= 12 && /[!@#$%^&*(),.?":{}|<>].*[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength = 'strong';
      } else if (password.length >= 10) {
        strength = 'medium';
      }
    }

    // Check against database validation
    try {
      const { data, error } = await supabase.rpc('validate_password_security', {
        password: password
      });

      if (error || !data) {
        errors.push('Senha não atende aos critérios de segurança');
      }
    } catch (error) {
      console.warn('Password security check failed:', error);
    }

    return {
      isValid: errors.length === 0,
      errors,
      strength
    };
  };

  // Log security events
  const logSecurityEvent = async (eventType: string, details: any = {}) => {
    try {
      await supabase.rpc('log_security_event', {
        event_type: eventType,
        user_id: user?.id || null,
        details: {
          ...details,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          ip_address: 'client_side' // Note: actual IP would need server-side detection
        }
      });
    } catch (error) {
      console.warn('Failed to log security event:', error);
    }
  };

  // Monitor for suspicious activity
  const detectSuspiciousActivity = () => {
    // Check for multiple rapid login attempts
    const recentAttempts = parseInt(localStorage.getItem('recent_login_attempts') || '0');
    if (recentAttempts > 10) {
      logSecurityEvent('suspicious_activity_detected', {
        type: 'rapid_login_attempts',
        count: recentAttempts
      });
      
      toast({
        variant: "destructive",
        title: "Atividade Suspeita Detectada",
        description: "Múltiplas tentativas de login detectadas. Aguarde alguns minutos."
      });
      
      return true;
    }

    // Check for unusual time patterns (optional)
    const now = new Date();
    const hour = now.getHours();
    if (hour < 5 || hour > 23) {
      logSecurityEvent('unusual_activity_time', {
        hour: hour,
        timestamp: now.toISOString()
      });
    }

    return false;
  };

  // Clear sensitive data from local storage on logout
  const secureClearStorage = () => {
    // Remove all potentially sensitive data
    const keysToRemove = [
      'recent_login_attempts',
      'password_check_timestamp',
      'password_check_count',
      'user_preferences'
    ];

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });

    // Clear session storage as well
    sessionStorage.clear();

    logSecurityEvent('secure_storage_cleared');
  };

  // Initialize security monitoring
  useEffect(() => {
    if (isAuthenticated) {
      logSecurityEvent('session_established');
      
      // Clear any failed attempt counters on successful login
      localStorage.removeItem('recent_login_attempts');
    }

    // Set up periodic security checks
    const securityInterval = setInterval(() => {
      detectSuspiciousActivity();
    }, 30000); // Check every 30 seconds

    return () => {
      clearInterval(securityInterval);
    };
  }, [isAuthenticated]);

  return {
    securityMetrics,
    checkRateLimit,
    validatePasswordSecurity,
    logSecurityEvent,
    detectSuspiciousActivity,
    secureClearStorage
  };
};