import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/format';
import { Copy, Edit, Eye, Loader2, MoreVertical, Package, PackagePlus, Plus, Search, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Product { id: string; nome: string; categoria: string | null; preco: number; estoque: number | null; imagens_url: string[] | null; ativo: boolean | null; created_at: string; marca: string | null; modelo: string | null; descricao: string | null; }

const CompanyProducts = () => {
  const { isAuthenticated, userType, user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'low-stock'>('all');

  if (!isAuthenticated || userType !== 'company') return <Navigate to="/login" replace />;

  useEffect(() => { loadProducts(); }, [user]);

  const loadProducts = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase.from('produtos').select('*').eq('loja_id', user.id).order('created_at', { ascending: false });
    if (error) { toast({ title: 'Erro ao carregar produtos', description: error.message, variant: 'destructive' }); }
    else setProducts((data || []).map((item: any) => ({ ...item, imagens_url: Array.isArray(item.imagens_url) ? item.imagens_url as string[] : null })));
    setLoading(false);
  };

  const handleToggleStatus = async (productId: string) => {
    const product = products.find(p => p.id === productId); if (!product) return;
    const { error } = await supabase.from('produtos').update({ ativo: !product.ativo }).eq('id', productId);
    if (error) toast({ title: 'Erro ao atualizar status', description: error.message, variant: 'destructive' });
    else { setProducts(prev => prev.map(p => p.id === productId ? { ...p, ativo: !p.ativo } : p)); toast({ title: 'Status atualizado', description: 'O status do produto foi alterado com sucesso.' }); }
  };

  const handleDuplicate = async (productId: string) => {
    const productToDuplicate = products.find(p => p.id === productId); if (!productToDuplicate || !user) return;
    const { id, created_at, ...productData } = productToDuplicate;
    const { data, error } = await supabase.from('produtos').insert({ ...productData, nome: productData.nome + ' - Cópia', loja_id: user.id }).select().single();
    if (error) toast({ title: 'Erro ao duplicar produto', description: error.message, variant: 'destructive' });
    else { setProducts(prev => [{ ...data, imagens_url: Array.isArray(data.imagens_url) ? data.imagens_url as string[] : null }, ...prev]); toast({ title: 'Produto duplicado' }); }
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    const { error } = await supabase.from('produtos').delete().eq('id', productId);
    if (error) toast({ title: 'Erro ao excluir produto', description: error.message, variant: 'destructive' });
    else { setProducts(prev => prev.filter(p => p.id !== productId)); toast({ title: 'Produto excluído' }); }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase()) || (product.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    if (filter === 'active') return matchesSearch && product.ativo;
    if (filter === 'inactive') return matchesSearch && !product.ativo;
    if (filter === 'low-stock') return matchesSearch && (product.estoque ?? 0) <= 5;
    return matchesSearch;
  });

  const getStockStatus = (quantity: number | null) => { const qty = quantity ?? 0; if (qty === 0) return { label: 'Sem estoque', className: 'bg-red-100 text-red-700 border-red-200' }; if (qty <= 5) return { label: 'Estoque baixo', className: 'bg-amber-100 text-amber-700 border-amber-200' }; return { label: 'Em estoque', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' }; };

  return <StoreLayout title="Produtos" subtitle="Gerencie o catálogo da sua loja com visual padronizado." action={<Link to="/loja/products/create"><Button className="bg-white text-violet-950 hover:bg-violet-100"><Plus className="mr-2 h-4 w-4" />Adicionar produto</Button></Link>}>
    <div className="space-y-6">
      <Card className="border-slate-200 bg-white"><CardContent className="p-5"><div className="flex flex-col gap-4 xl:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><Input placeholder="Buscar produtos..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="h-11 pl-10"/></div><div className="flex flex-wrap gap-2">{[['all','Todos'],['active','Ativos'],['inactive','Inativos'],['low-stock','Estoque baixo']].map(([key,label])=><Button key={key} variant={filter===key?'default':'outline'} size="sm" onClick={()=>setFilter(key as any)} className={filter===key?'bg-violet-700 hover:bg-violet-800':'border-slate-200'}>{label}</Button>)}</div></div></CardContent></Card>
      {loading ? <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-violet-700"/></div> : filteredProducts.length > 0 ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredProducts.map(product=>{ const stockStatus=getStockStatus(product.estoque); const mainImage=product.imagens_url?.[0]||'/placeholder.svg'; return <Card key={product.id} className="overflow-hidden border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"><div className="aspect-video bg-slate-100"><img src={mainImage} alt={product.nome} className="h-full w-full object-cover"/></div><CardContent className="p-5"><div className="mb-3 flex items-start justify-between gap-3"><div className="space-y-2"><div className="flex flex-wrap gap-2"><Badge className={product.ativo?'bg-violet-100 text-violet-700 hover:bg-violet-100':'bg-slate-100 text-slate-600 hover:bg-slate-100'}>{product.ativo?'Ativo':'Inativo'}</Badge><Badge variant="outline" className={stockStatus.className}>{stockStatus.label}</Badge></div><h3 className="line-clamp-2 text-lg font-black text-slate-950">{product.nome}</h3></div><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4"/></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem><Eye className="mr-2 h-4 w-4"/>Ver</DropdownMenuItem><DropdownMenuItem><Edit className="mr-2 h-4 w-4"/>Editar</DropdownMenuItem><DropdownMenuItem onClick={()=>handleDuplicate(product.id)}><Copy className="mr-2 h-4 w-4"/>Duplicar</DropdownMenuItem><DropdownMenuItem onClick={()=>handleToggleStatus(product.id)}><Package className="mr-2 h-4 w-4"/>{product.ativo?'Inativar':'Ativar'}</DropdownMenuItem><DropdownMenuItem onClick={()=>handleDelete(product.id)} className="text-red-600"><Trash2 className="mr-2 h-4 w-4"/>Excluir</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div><div className="mt-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase text-slate-400">Preço</p><p className="text-2xl font-black text-violet-700">{formatCurrency(product.preco)}</p></div><div className="text-right"><p className="text-xs font-bold uppercase text-slate-400">Estoque</p><p className="font-bold text-slate-700">{product.estoque??0}</p></div></div></CardContent></Card>})}</div> : <Card className="border-dashed border-slate-300 bg-white"><CardContent className="py-16 text-center"><PackagePlus className="mx-auto mb-4 h-12 w-12 text-slate-300"/><h3 className="text-xl font-black text-slate-950">Nenhum produto encontrado</h3><p className="mt-2 text-sm text-slate-500">Comece adicionando seu primeiro produto ao marketplace.</p><Link to="/loja/products/create"><Button className="mt-6 bg-violet-700 hover:bg-violet-800"><Plus className="mr-2 h-4 w-4"/>Adicionar primeiro produto</Button></Link></CardContent></Card>}
    </div>
  </StoreLayout>;
};
export default CompanyProducts;
