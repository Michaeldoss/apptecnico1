-- Fix the security definer view issue and continue security improvements

-- Drop the problematic security definer view
DROP VIEW IF EXISTS public.lojas_public;

-- Create a regular view instead (not security definer)
CREATE VIEW public.lojas_public AS
SELECT 
  id,
  nome_empresa,
  cidade,
  estado,
  logo_url,
  verificado,
  ativo,
  created_at
FROM public.lojas 
WHERE ativo = true;

-- Also drop the problematic tecnicos_public view if it exists
DROP VIEW IF EXISTS public.tecnicos_public;

-- Update the authentication and profile creation system
-- Update validation schema to include compromised password checking
CREATE OR REPLACE FUNCTION public.validate_password_security(password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Basic validation (length, complexity)
  IF length(password) < 8 THEN
    RETURN false;
  END IF;
  
  -- Check for uppercase, lowercase, and number
  IF password !~ '[A-Z]' OR password !~ '[a-z]' OR password !~ '[0-9]' THEN
    RETURN false;
  END IF;
  
  -- Additional security: check against common weak passwords
  IF lower(password) = ANY(ARRAY[
    'password', '12345678', 'qwerty123', 'admin123', 
    'password123', '87654321', 'welcome123'
  ]) THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Create secure registration function that uses proper validation
CREATE OR REPLACE FUNCTION public.secure_user_registration(
  p_email text,
  p_password text,
  p_user_type text,
  p_user_data jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
  v_user_id uuid;
BEGIN
  -- Validate password security
  IF NOT public.validate_password_security(p_password) THEN
    RAISE EXCEPTION 'Password does not meet security requirements';
  END IF;
  
  -- Validate email format
  IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Check if email already exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = p_email) THEN
    RAISE EXCEPTION 'Email already registered';
  END IF;
  
  -- Log registration attempt
  PERFORM log_security_event('secure_registration_attempt', NULL, 
    jsonb_build_object('email', p_email, 'user_type', p_user_type));
  
  -- Return success (actual auth creation will happen on frontend)
  v_result := jsonb_build_object(
    'success', true,
    'message', 'Registration validation passed',
    'requires_email_confirmation', true
  );
  
  RETURN v_result;
EXCEPTION
  WHEN OTHERS THEN
    -- Log failed registration attempt
    PERFORM log_security_event('secure_registration_failed', NULL, 
      jsonb_build_object('email', p_email, 'error', SQLERRM));
    
    RAISE EXCEPTION 'Registration failed: %', SQLERRM;
END;
$$;

-- Create rate limiting table for security
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL, -- IP address or user ID
  action_type text NOT NULL, -- 'login', 'registration', 'api_call'
  attempt_count integer DEFAULT 1,
  first_attempt timestamp with time zone DEFAULT now(),
  last_attempt timestamp with time zone DEFAULT now(),
  blocked_until timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on rate limits table
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy for rate limits (only system can manage)
CREATE POLICY "System manages rate limits" 
ON public.rate_limits 
FOR ALL 
USING (false) -- No user access
WITH CHECK (false);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_action 
ON public.rate_limits(identifier, action_type);

-- Create rate limiting function
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier text,
  p_action_type text,
  p_max_attempts integer DEFAULT 5,
  p_window_minutes integer DEFAULT 15,
  p_block_minutes integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_record record;
  v_window_start timestamp with time zone;
BEGIN
  v_window_start := now() - (p_window_minutes || ' minutes')::interval;
  
  -- Get or create rate limit record
  SELECT * INTO v_record 
  FROM public.rate_limits 
  WHERE identifier = p_identifier 
  AND action_type = p_action_type;
  
  -- Check if currently blocked
  IF v_record.blocked_until IS NOT NULL AND v_record.blocked_until > now() THEN
    RETURN false;
  END IF;
  
  -- If no record exists or outside window, reset
  IF v_record IS NULL OR v_record.first_attempt < v_window_start THEN
    INSERT INTO public.rate_limits (identifier, action_type, attempt_count, first_attempt, last_attempt)
    VALUES (p_identifier, p_action_type, 1, now(), now())
    ON CONFLICT (identifier, action_type) 
    DO UPDATE SET 
      attempt_count = 1,
      first_attempt = now(),
      last_attempt = now(),
      blocked_until = NULL;
    RETURN true;
  END IF;
  
  -- Increment attempts
  UPDATE public.rate_limits 
  SET 
    attempt_count = attempt_count + 1,
    last_attempt = now(),
    blocked_until = CASE 
      WHEN attempt_count + 1 >= p_max_attempts 
      THEN now() + (p_block_minutes || ' minutes')::interval
      ELSE NULL 
    END
  WHERE identifier = p_identifier AND action_type = p_action_type;
  
  -- Return whether limit exceeded
  RETURN (v_record.attempt_count + 1) < p_max_attempts;
END;
$$;

-- Add unique constraint for rate limits
ALTER TABLE public.rate_limits 
ADD CONSTRAINT rate_limits_identifier_action_unique 
UNIQUE (identifier, action_type);

-- Log this security enhancement
INSERT INTO public.security_logs (event_type, details, created_at) 
VALUES (
  'advanced_security_features_implemented', 
  '{"features": ["password_validation", "secure_registration", "rate_limiting", "fixed_security_definer_views"], "priority": "high"}',
  now()
);