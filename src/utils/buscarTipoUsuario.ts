import { supabase } from "@/integrations/supabase/client";

export type Role = 'cliente' | 'tecnico' | 'loja' | 'admin' | 'desconhecido';

export async function buscarTipoUsuario(userId: string): Promise<{ role: Role }> {
  // 1) Tenta via função segura (RPC)
  const { data: rpcType } = await supabase.rpc('get_current_user_type');
  if (rpcType) {
    const t = (rpcType as string).toLowerCase();
    if (t === 'cliente') return { role: 'cliente' };
    if (t === 'tecnico') return { role: 'tecnico' };
    if (t === 'loja' || t === 'empresa' || t === 'company') return { role: 'loja' };
    if (t === 'admin') return { role: 'admin' };
  }

  // 2) Fallback: lê de usuarios diretamente
  const { data: usuario } = await supabase
    .from('usuarios')
    .select('tipo_usuario')
    .eq('id', userId)
    .maybeSingle();

  if (usuario?.tipo_usuario) {
    const t = (usuario.tipo_usuario as string).toLowerCase();
    if (t === 'cliente') return { role: 'cliente' };
    if (t === 'tecnico') return { role: 'tecnico' };
    if (t === 'loja' || t === 'empresa' || t === 'company') return { role: 'loja' };
    if (t === 'admin') return { role: 'admin' };
  }

  return { role: 'desconhecido' };
}

