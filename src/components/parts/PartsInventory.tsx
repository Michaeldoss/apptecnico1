
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Package, AlertTriangle, Edit, Trash2, Eye, Plus, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { toast } from '@/hooks/use-toast';

interface Part {
  id: string;
  nome: string;
  categoria: string | null;
  marca: string | null;
  modelo: string | null;
  preco: number;
  estoque: number | null;
  descricao: string | null;
  compatibilidade: string[] | null;
  ativo: boolean | null;
  created_at: string;
}

interface PartsInventoryProps {
  searchQuery: string;
}

const PartsInventory: React.FC<PartsInventoryProps> = ({ searchQuery }) => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('pecas')
      .select('*')
      .eq('tecnico_id', user.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao carregar peças:', error);
      toast({
        title: "Erro ao carregar peças",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setParts(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (partId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta peça?')) return;

    const { error } = await supabase
      .from('pecas')
      .delete()
      .eq('id', partId);

    if (error) {
      toast({
        title: "Erro ao excluir peça",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setParts(prev => prev.filter(p => p.id !== partId));
      toast({
        title: "Peça excluída",
        description: "A peça foi removida com sucesso.",
      });
    }
  };

  const handleUpdateStock = async (partId: string, newStock: number) => {
    const { error } = await supabase
      .from('pecas')
      .update({ estoque: newStock })
      .eq('id', partId);

    if (error) {
      toast({
        title: "Erro ao atualizar estoque",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setParts(prev => prev.map(p => 
        p.id === partId ? { ...p, estoque: newStock } : p
      ));
      toast({
        title: "Estoque atualizado",
        description: "O estoque foi atualizado com sucesso.",
      });
    }
  };

  const filteredParts = parts.filter(part => 
    part.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (part.marca?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (part.modelo?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (part.categoria?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  const getStockStatus = (current: number | null, min: number = 3) => {
    const stock = current ?? 0;
    if (stock <= min) return { color: 'text-red-500', icon: AlertTriangle, status: 'Crítico' };
    if (stock <= min * 1.5) return { color: 'text-yellow-500', icon: AlertTriangle, status: 'Baixo' };
    return { color: 'text-green-500', icon: Package, status: 'Normal' };
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Inventário de Peças
        </CardTitle>
        <CardDescription>
          Controle completo do seu estoque de peças e componentes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Peça</TableHead>
              <TableHead>Marca/Modelo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParts.length > 0 ? (
              filteredParts.map((part) => {
                const stockStatus = getStockStatus(part.estoque);
                const StatusIcon = stockStatus.icon;
                
                return (
                  <TableRow key={part.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{part.nome}</p>
                        {part.descricao && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {part.descricao}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {part.marca && <Badge variant="outline" className="text-xs w-fit">{part.marca}</Badge>}
                        {part.modelo && <span className="text-sm text-muted-foreground">{part.modelo}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      {part.categoria && (
                        <Badge variant="secondary" className="text-xs">
                          {part.categoria}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">
                        {formatCurrency(part.preco)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${stockStatus.color}`} />
                        <span className={`font-medium ${stockStatus.color}`}>
                          {part.estoque ?? 0}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={stockStatus.status === 'Crítico' ? 'destructive' : 
                                stockStatus.status === 'Baixo' ? 'secondary' : 'default'}
                        className="text-xs"
                      >
                        {stockStatus.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            const newStock = prompt('Novo estoque:', String(part.estoque ?? 0));
                            if (newStock !== null) {
                              handleUpdateStock(part.id, parseInt(newStock) || 0);
                            }
                          }}>
                            <Package className="h-4 w-4 mr-2" />
                            Atualizar estoque
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            const qty = prompt('Quantidade a dar baixa:', '1');
                            if (qty !== null) {
                              const current = part.estoque ?? 0;
                              const newStock = Math.max(0, current - (parseInt(qty) || 0));
                              handleUpdateStock(part.id, newStock);
                            }
                          }}>
                            <Plus className="h-4 w-4 mr-2" />
                            Dar baixa
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-500"
                            onClick={() => handleDelete(part.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  {searchQuery ? 'Nenhuma peça encontrada com os termos de busca.' : 'Nenhuma peça cadastrada. Clique em "Nova Peça" para adicionar.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PartsInventory;
