import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Store, 
  Star,
  Package,
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react';
import { MarketplaceProduct, ProductCategory, EquipmentType } from '@/types/marketplace';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/format';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data - em produção viria de API
const mockProducts: MarketplaceProduct[] = [
  {
    id: '1',
    vendorId: 'vendor1',
    vendorName: 'TechParts Pro',
    vendorRating: 4.8,
    nome: 'Damper UV Premium - Epson DX5',
    categoria: 'damper',
    preco: 45.90,
    precoOriginal: 55.00,
    desconto: 17,
    imagens: ['/placeholder.svg', '/placeholder.svg'],
    imagemPrincipal: '/placeholder.svg',
    descricao: 'Damper de alta qualidade para impressoras UV com cabeça Epson DX5',
    especificacoesTecnicas: 'Material: Silicone premium, Pressão: 0.02-0.05 MPa',
    tipoEquipamento: ['UV'],
    marca: ['Epson'],
    modelosCompativeis: ['R1900', 'R2000', 'R3000'],
    codigoInterno: 'DMP-UV-001',
    referenciaFabricante: 'EPD-DX5-UV',
    quantidadeEstoque: 25,
    peso: 0.1,
    dimensoes: { comprimento: 5, largura: 3, altura: 2 },
    garantiaDias: 90,
    notaFiscalDisponivel: true,
    ativo: true,
    criadoEm: '2024-01-15',
    atualizadoEm: '2024-01-15'
  },
  {
    id: '2',
    vendorId: 'vendor2',
    vendorName: 'Suprimentos Tech',
    vendorRating: 4.5,
    nome: 'Cabeça de Impressão DTF - XP600',
    categoria: 'cabeca-impressao',
    preco: 850.00,
    imagens: ['/placeholder.svg'],
    imagemPrincipal: '/placeholder.svg',
    descricao: 'Cabeça de impressão original para equipamentos DTF',
    especificacoesTecnicas: 'Resolução: 1440dpi, Tecnologia: Piezo',
    tipoEquipamento: ['DTF'],
    marca: ['Epson'],
    modelosCompativeis: ['L1300', 'L1800'],
    codigoInterno: 'CAB-DTF-002',
    referenciaFabricante: 'XP600-DTF',
    quantidadeEstoque: 8,
    peso: 0.5,
    dimensoes: { comprimento: 12, largura: 8, altura: 4 },
    garantiaDias: 180,
    notaFiscalDisponivel: true,
    ativo: true,
    criadoEm: '2024-01-10',
    atualizadoEm: '2024-01-10'
  }
];

const categoryLabels: Record<ProductCategory, string> = {
  'damper': 'Dampers',
  'capping': 'Cappings',
  'wiper': 'Wipers',
  'flat-cable': 'Flat Cables',
  'cabeca-impressao': 'Cabeças de Impressão',
  'filtros': 'Filtros',
  'rolos': 'Rolos',
  'placas': 'Placas',
  'motores': 'Motores',
  'sensores': 'Sensores',
  'fusores': 'Fusores',
  'bombas': 'Bombas',
  'correias': 'Correias',
  'pecas-uv': 'Peças UV',
  'pecas-dtf': 'Peças DTF',
  'eco-solvente': 'Eco-solvente',
  'sublimacao': 'Sublimação',
  'cnc': 'CNC',
  'outros': 'Outros'
};

const Marketplace = () => {
  const [products, setProducts] = useState<MarketplaceProduct[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<MarketplaceProduct[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { addToCart, getCartItemCount } = useCart();

  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.categoria === selectedCategory);
    }

    // Filter by equipment type
    if (selectedEquipment !== 'all') {
      filtered = filtered.filter(product => 
        product.tipoEquipamento.includes(selectedEquipment as EquipmentType)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.preco - b.preco);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.preco - a.preco);
        break;
      case 'rating':
        filtered.sort((a, b) => b.vendorRating - a.vendorRating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedEquipment, sortBy, products]);

  const handleAddToCart = (product: MarketplaceProduct) => {
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Store className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Marketplace Técnico</h1>
                  <p className="text-gray-600">Peças e componentes para equipamentos gráficos</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Link to="/carrinho">
                  <Button variant="outline" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Carrinho
                    {getCartItemCount() > 0 && (
                      <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs">
                        {getCartItemCount()}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link to="/loja/dashboard">
                  <Button>
                    <Package className="h-4 w-4 mr-2" />
                    Vender
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos, marcas ou vendedores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Categorias</SelectItem>
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Equipamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="DTF">DTF</SelectItem>
                    <SelectItem value="UV">UV</SelectItem>
                    <SelectItem value="Solvente">Solvente</SelectItem>
                    <SelectItem value="Sublimática">Sublimática</SelectItem>
                    <SelectItem value="CNC">CNC</SelectItem>
                  </SelectContent>
                </Select>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filtros Avançados</SheetTitle>
                      <SheetDescription>Refine sua busca por produtos</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="relevance">Relevância</SelectItem>
                            <SelectItem value="price-low">Menor Preço</SelectItem>
                            <SelectItem value="price-high">Maior Preço</SelectItem>
                            <SelectItem value="rating">Melhor Avaliado</SelectItem>
                            <SelectItem value="newest">Mais Recentes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results and View Toggle */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <Card key={product.id} className={`hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={product.imagemPrincipal} 
                      alt={product.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          {categoryLabels[product.categoria]}
                        </Badge>
                        <CardTitle className="text-lg line-clamp-2">{product.nome}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">{product.vendorName}</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600 ml-1">{product.vendorRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {product.precoOriginal && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.precoOriginal)}
                          </span>
                        )}
                        <span className="text-xl font-bold text-green-600">
                          {formatCurrency(product.preco)}
                        </span>
                        {product.desconto && (
                          <Badge variant="destructive" className="text-xs">
                            -{product.desconto}%
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Estoque: {product.quantidadeEstoque}</span>
                        <span>•</span>
                        <span>Garantia: {product.garantiaDias} dias</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {product.tipoEquipamento.slice(0, 2).map((tipo) => (
                          <Badge key={tipo} variant="outline" className="text-xs">
                            {tipo}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <div className="flex gap-2 w-full">
                      <Link to={`/produto/${product.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Ver Detalhes
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        disabled={product.quantidadeEstoque === 0}
                        className="flex-1"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.quantidadeEstoque > 0 ? 'Comprar' : 'Sem estoque'}
                      </Button>
                    </div>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou usar termos de busca diferentes.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
