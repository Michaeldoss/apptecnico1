-- Fix database function security issues
-- Update existing function to have proper search_path
CREATE OR REPLACE FUNCTION public.debug_auth_state()
 RETURNS TABLE(auth_user_email text, auth_user_id uuid, auth_confirmed boolean, usuarios_count bigint, user_in_usuarios boolean)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
    SELECT 
        au.email::text,
        au.id,
        (au.email_confirmed_at IS NOT NULL) as auth_confirmed,
        (SELECT COUNT(*) FROM usuarios)::bigint,
        EXISTS(SELECT 1 FROM usuarios u WHERE u.id = au.id) as user_in_usuarios
    FROM auth.users au
    WHERE au.email = 'dossgroupequipa@gmail.com';
$function$;

-- Create audit log table for security events
CREATE TABLE IF NOT EXISTS public.security_audit_log (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type text NOT NULL,
    user_id uuid,
    ip_address text,
    user_agent text,
    details jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins podem ver logs de auditoria"
ON public.security_audit_log
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM usuarios 
        WHERE usuarios.id::text = auth.uid()::text 
        AND usuarios.tipo_usuario = 'admin'
    )
);

-- Function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
    event_type text,
    user_id uuid DEFAULT auth.uid(),
    details jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
    INSERT INTO security_audit_log (event_type, user_id, details)
    VALUES (event_type, user_id, details);
END;
$function$;

-- Create function to validate payment amounts
CREATE OR REPLACE FUNCTION public.validate_payment_amount(amount numeric)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
SET search_path = 'public'
AS $function$
BEGIN
    RETURN amount > 0 AND amount <= 999999;
END;
$function$;

-- Add validation trigger for transactions
CREATE OR REPLACE FUNCTION public.validate_transacao()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
    -- Validate amount
    IF NOT validate_payment_amount(NEW.valor_total) THEN
        RAISE EXCEPTION 'Valor da transação inválido: %', NEW.valor_total;
    END IF;
    
    -- Log transaction creation
    PERFORM log_security_event('transaction_created', NEW.cliente_id, 
        jsonb_build_object('transaction_id', NEW.id, 'amount', NEW.valor_total));
    
    RETURN NEW;
END;
$function$;

-- Create the trigger
DROP TRIGGER IF EXISTS validate_transacao_trigger ON transacoes;
CREATE TRIGGER validate_transacao_trigger
    BEFORE INSERT OR UPDATE ON transacoes
    FOR EACH ROW
    EXECUTE FUNCTION validate_transacao();