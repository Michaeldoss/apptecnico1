async function buscarTipoUsuario(userId: string) {
  const { data: cliente } = await supabase
    .from('clientes')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (cliente) return { role: 'cliente' };

  const { data: tecnico } = await supabase
    .from('tecnicos')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (tecnico) return { role: 'tecnico' };

  const { data: loja } = await supabase
    .from('lojas')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (loja) return { role: 'lojista' };

  return { role: 'desconhecido' };
}
