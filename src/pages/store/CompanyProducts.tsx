
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Package,
  Edit,
  Copy,
  Trash2,
  Eye,
  ArrowLeft
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/format';

// Mock products data
const mockProducts = [
  {
    id: '1',
    nome: 'Damper UV Premium - Epson DX5',
    categoria: 'damper',
    preco: 45.90,
    quantidadeEstoque: 25,
    imagem: '/placeholder.svg',
    ativo: true,
    criadoEm: '2024-01-15',
    tipoEquipamento: ['UV'],
    marca: ['Epson']
  },
  {
    id: '2',
    nome: 'Cabeça de Impressão DTF - XP600',
    categoria: 'cabeca-impressao',
    preco: 850.00,
    quantidadeEstoque: 8,
    imagem: '/placeholder.svg',
    ativo: true,
    criadoEm: '2024-01-10',
    tipoEquipamento: ['DTF'],
    marca: ['Epson']
  },
  {
    id: '3',
    nome: 'Wiper Blade Original - Roland',
    categoria: 'wiper',
    preco: 12.50,
    quantidadeEstoque: 0,
    imagem: '/placeholder.svg',
    ativo: false,
    criadoEm: '2024-01-05',
    tipoEquipamento: ['Solvente'],
    marca: ['Roland']
  }
];

const CompanyProducts = () => {
  const { isAuthenticated, userType } = useAuth();
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'low-stock'>('all');

  // Redirect if not authenticated or not a company
  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/loja/register" replace />;
  }

  const handleToggleStatus = (productId: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, ativo: !product.ativo }
        : product
    ));
    toast({
      title: "Status atualizado",
      description: "O status do produto foi alterado com sucesso.",
    });
  };

  const handleDuplicate = (productId: string) => {
    const productToDuplicate = products.find(p => p.id === productId);
    if (productToDuplicate) {
      const duplicatedProduct = {
        ...productToDuplicate,
        id: Date.now().toString(),
        nome: productToDuplicate.nome + ' - Cópia',
        criadoEm: new Date().toISOString().split('T')[0]
      };
      setProducts(prev => [duplicatedProduct, ...prev]);
      toast({
        title: "Produto duplicado",
        description: "Uma cópia do produto foi criada com sucesso.",
      });
    }
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast({
        title: "Produto excluído",
        description: "O produto foi removido com sucesso.",
      });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case 'active':
        return matchesSearch && product.ativo;
      case 'inactive':
        return matchesSearch && !product.ativo;
      case 'low-stock':
        return matchesSearch && product.quantidadeEstoque <= 5;
      default:
        return matchesSearch;
    }
  });

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: 'Sem estoque', color: 'destructive' };
    if (quantity <= 5) return { label: 'Estoque baixo', color: 'secondary' };
    return { label: 'Em estoque', color: 'default' };
  };

  return (
    <StoreLayout 
      title="Meus Produtos" 
      subtitle="Gerencie seus produtos no marketplace"
    >
      <div className="space-y-6">
        {/* Header com botão adicionar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/loja/dashboard">
              <Button variant="outline" className="mr-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
          
          <Link to="/loja/products/create">
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-300"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? '' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
                >
                  Todos ({products.length})
                </Button>
                <Button
                  variant={filter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('active')}
                  className={filter === 'active' ? '' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
                >
                  Ativos ({products.filter(p => p.ativo).length})
                </Button>
                <Button
                  variant={filter === 'inactive' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('inactive')}
                  className={filter === 'inactive' ? '' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
                >
                  Inativos ({products.filter(p => !p.ativo).length})
                </Button>
                <Button
                  variant={filter === 'low-stock' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('low-stock')}
                  className={filter === 'low-stock' ? '' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}
                >
                  Estoque Baixo ({products.filter(p => p.quantidadeEstoque <= 5).length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.quantidadeEstoque);
              
              return (
                <Card key={product.id} className="bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-xl border-white/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={product.ativo ? 'default' : 'secondary'}>
                            {product.ativo ? 'Ativo' : 'Inativo'}
                          </Badge>
                          <Badge variant={stockStatus.color as any}>
                            {stockStatus.label}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg line-clamp-2 text-gray-900">{product.nome}</CardTitle>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver no Marketplace
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(product.id)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(product.id)}>
                            <Package className="h-4 w-4 mr-2" />
                            {product.ativo ? 'Inativar' : 'Ativar'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={product.imagem} 
                        alt={product.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">
                          {formatCurrency(product.preco)}
                        </span>
                        <span className="text-sm text-gray-600">
                          Estoque: {product.quantidadeEstoque}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {product.tipoEquipamento.map((tipo) => (
                          <Badge key={tipo} variant="outline" className="text-xs">
                            {tipo}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        Criado em: {new Date(product.criadoEm).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button 
                        variant={product.ativo ? 'secondary' : 'default'}
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleToggleStatus(product.id)}
                      >
                        {product.ativo ? 'Inativar' : 'Ativar'}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  {searchTerm || filter !== 'all' ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
                </h3>
                <p className="text-gray-300 mb-6">
                  {searchTerm || filter !== 'all' 
                    ? 'Tente ajustar os filtros ou termos de busca.'
                    : 'Comece adicionando seu primeiro produto ao marketplace.'
                  }
                </p>
                {!searchTerm && filter === 'all' && (
                  <Link to="/loja/products/create">
                    <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Primeiro Produto
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </StoreLayout>
  );
};

export default CompanyProducts;
