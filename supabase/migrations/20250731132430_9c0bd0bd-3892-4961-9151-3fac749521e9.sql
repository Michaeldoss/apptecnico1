-- Fix database function search path vulnerabilities
-- This prevents potential privilege escalation attacks

-- Update log_security_event function with secure search path
CREATE OR REPLACE FUNCTION public.log_security_event(event_type text, user_id uuid DEFAULT auth.uid(), details jsonb DEFAULT '{}'::jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    INSERT INTO security_audit_log (event_type, user_id, details)
    VALUES (event_type, user_id, details);
END;
$function$;

-- Update validate_payment_amount function with secure search path
CREATE OR REPLACE FUNCTION public.validate_payment_amount(amount numeric)
 RETURNS boolean
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path TO 'public'
AS $function$
BEGIN
    RETURN amount > 0 AND amount <= 999999;
END;
$function$;

-- Update validate_transacao trigger function with secure search path
CREATE OR REPLACE FUNCTION public.validate_transacao()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
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