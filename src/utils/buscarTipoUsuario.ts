import { supabase } from "@/integrations/supabase/client";

export type Role = 'cliente' | 'tecnico' | 'loja' | 'admin' | 'desconhecido';

export async function buscarTipoUsuario(userId: string): Promise<{ role: Role }> {
  // 1) Checagens inequívocas primeiro
  const [{ data: adminRole }, { data: tech }, { data: store }, { data: customer }] = await Promise.all([
    supabase.from('user_roles').select('role').eq('user_id', userId).eq('role', 'admin').maybeSingle(),
    supabase.from('tecnicos').select('id').eq('id', userId).maybeSingle(),
    supabase.from('lojas').select('id').eq('id', userId).maybeSingle(),
    supabase.from('clientes').select('id').eq('id', userId).maybeSingle(),
  ]);

  if (adminRole) return { role: 'admin' };
  if (tech) return { role: 'tecnico' };
  if (store) return { role: 'loja' };
  if (customer) return { role: 'cliente' };

  // 2) Tenta via RPC (espelha usuarios.tipo_usuario)
  const { data: rpcType } = await supabase.rpc('get_current_user_type');
  if (rpcType) {
    const t = (rpcType as string).toLowerCase();
    if (t === 'cliente') return { role: 'cliente' };
    if (t === 'tecnico') return { role: 'tecnico' };
    if (t === 'loja' || t === 'empresa' || t === 'company') return { role: 'loja' };
    if (t === 'admin') return { role: 'admin' };
  }

  // 3) Fallback final: lê de usuarios
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

