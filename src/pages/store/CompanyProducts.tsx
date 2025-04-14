
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Search, 
  Plus,
  ArrowUpDown,
  Edit,
  Trash2,
  ArrowLeft,
  FileUp,
  Download
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import product data
import { products } from '@/data/products';
import ProductForm from '@/components/store/ProductForm';
import { Product } from '@/types/product';
import { toast } from 'sonner';

const CompanyProducts = () => {
  const { isAuthenticated, userType } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated || userType !== 'company') {
    return <Navigate to="/store/company-register" replace />;
  }

  // Filter company products (using Doss Group as company, filtering from all products)
  const filteredProducts = products
    .filter(product => 
      (searchTerm === '' || 
        product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.codigo.toLowerCase().includes(searchTerm.toLowerCase())
      ) && 
      (categoryFilter === 'all' || product.categoria === categoryFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.nome.localeCompare(b.nome);
      } else if (sortBy === 'price') {
        return a.preco - b.preco;
      } else if (sortBy === 'stock') {
        return b.estoque - a.estoque;
      }
      return 0;
    });

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(products.map(p => p.categoria))).filter(Boolean);

  const handleOpenNewProduct = () => {
    setEditingProduct(null);
    setOpenProductDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setOpenProductDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenProductDialog(false);
  };

  const handleSaveProduct = (productData: any) => {
    try {
      if (editingProduct) {
        // Handle product update logic
        toast.success(`Produto "${productData.nome}" atualizado com sucesso!`);
      } else {
        // Handle new product creation logic
        toast.success(`Produto "${productData.nome}" adicionado com sucesso!`);
      }
      
      setOpenProductDialog(false);
    } catch (error) {
      toast.error('Erro ao salvar produto. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Package className="h-10 w-10 text-primary mr-4" />
              <div>
                <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
                <p className="text-muted-foreground">
                  Controle o catálogo de produtos da sua loja
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/store/company-dashboard">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </Link>
              <Button onClick={handleOpenNewProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Catálogo de Produtos</CardTitle>
              <CardDescription>
                Total de {filteredProducts.length} produtos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produtos..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas categorias</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nome</SelectItem>
                      <SelectItem value="price">Preço</SelectItem>
                      <SelectItem value="stock">Estoque</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium border-b">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5 flex items-center cursor-pointer" onClick={() => setSortBy('name')}>
                    Nome
                    {sortBy === 'name' && <ArrowUpDown className="ml-1 h-3 w-3" />}
                  </div>
                  <div className="col-span-2 text-right cursor-pointer" onClick={() => setSortBy('stock')}>
                    Estoque
                    {sortBy === 'stock' && <ArrowUpDown className="ml-1 h-3 w-3 inline" />}
                  </div>
                  <div className="col-span-2 text-right cursor-pointer" onClick={() => setSortBy('price')}>
                    Preço
                    {sortBy === 'price' && <ArrowUpDown className="ml-1 h-3 w-3 inline" />}
                  </div>
                  <div className="col-span-2 text-right">Ações</div>
                </div>
                
                <div className="divide-y">
                  {filteredProducts.slice(0, 10).map(product => (
                    <div key={product.codigo} className="grid grid-cols-12 p-3 items-center hover:bg-muted/20">
                      <div className="col-span-1 text-muted-foreground">{product.codigo}</div>
                      <div className="col-span-5 font-medium">{product.nome}</div>
                      <div className="col-span-2 text-right">
                        {product.estoque <= 0 ? (
                          <span className="text-red-500">Sem estoque</span>
                        ) : product.estoque < 5 ? (
                          <span className="text-amber-500">{product.estoque}</span>
                        ) : (
                          <span>{product.estoque}</span>
                        )}
                      </div>
                      <div className="col-span-2 text-right">R$ {product.preco.toFixed(2).replace('.', ',')}</div>
                      <div className="col-span-2 text-right flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {filteredProducts.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      Nenhum produto encontrado com os filtros atuais.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            {filteredProducts.length > 10 && (
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Mostrando 10 de {filteredProducts.length} produtos
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Anterior</Button>
                  <Button variant="outline" size="sm">Próximo</Button>
                </div>
              </CardFooter>
            )}
          </Card>
          
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Importar Produtos</CardTitle>
                <CardDescription>
                  Importe produtos em massa para seu catálogo
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Input type="file" />
                <Button>Importar</Button>
              </CardContent>
            </Card>
            
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Estoque Baixo</CardTitle>
                <CardDescription>
                  Produtos que precisam de reposição
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {products.filter(p => p.estoque > 0 && p.estoque < 5).slice(0, 3).map(product => (
                    <li key={product.codigo} className="flex justify-between items-center p-2 bg-amber-50 border border-amber-100 rounded-md">
                      <span>{product.nome}</span>
                      <span className="font-medium text-amber-600">{product.estoque} un.</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Add/Edit Product Dialog */}
      <Dialog open={openProductDialog} onOpenChange={setOpenProductDialog}>
        <DialogContent className="max-w-5xl h-[90vh] overflow-y-auto p-0">
          <ProductForm
            initialData={editingProduct || {}}
            categories={categories}
            onSubmit={handleSaveProduct}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default CompanyProducts;
