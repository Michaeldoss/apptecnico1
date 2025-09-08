import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Enhanced CORS configuration with security headers
const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGINS') || 'https://f4bbe0c8-b3f0-447f-9168-55f9a39cfcf9.sandbox.lovable.dev',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-csrf-token',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Credentials': 'false',
  'Access-Control-Max-Age': '86400',
  // Security headers
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none';",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}

serve(async (req) => {
  const origin = req.headers.get('Origin')
  console.log('🌍 Request from origin:', origin)
  
  // Validate origin against allowed list
  const allowedOrigins = [
    'https://f4bbe0c8-b3f0-447f-9168-55f9a39cfcf9.sandbox.lovable.dev',
    'http://localhost:5173',
    'http://localhost:3000',
    // Add production domains here
  ]
  
  const isOriginAllowed = allowedOrigins.some(allowed => 
    origin === allowed || (origin && allowed.includes(origin))
  )
  
  // If origin is not allowed, deny access
  if (origin && !isOriginAllowed) {
    console.warn('🚫 Blocked request from unauthorized origin:', origin)
    return new Response('Forbidden', { 
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        ...corsHeaders
      }
    })
  }
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ CORS preflight request handled')
    return new Response(null, { 
      status: 200,
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Origin': isOriginAllowed ? origin! : corsHeaders['Access-Control-Allow-Origin']
      }
    })
  }
  
  // For actual requests, just return success with security headers
  return new Response(
    JSON.stringify({ 
      message: 'Secure CORS handler active',
      timestamp: new Date().toISOString(),
      origin: origin
    }), 
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
        'Access-Control-Allow-Origin': isOriginAllowed ? origin! : corsHeaders['Access-Control-Allow-Origin']
      }
    }
  )
})