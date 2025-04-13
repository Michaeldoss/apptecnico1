
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import { ShoppingBag, Building2, Package, Truck, Search, Filter } from 'lucide-react';
import { ProductCategory } from '@/types/product';
import CategoryList from '@/components/store/CategoryList';
import ProductList from '@/components/store/ProductList';
import { products, getUniqueCategories, getProductCountByCategory, getProductsByCategory } from '@/data/products';
import { Input } from '@/components/ui/input';

const Store = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Define categories with their counts and descriptions
  const categories: ProductCategory[] = [
    {
      name: "Cabeças de Impressão",
      slug: "cabecas-de-impressao",
      description: "Cabeças de impressão para diversos modelos de impressoras",
      count: getProductCountByCategory("Cabeças de Impressão"),
      icon: <Package className="h-8 w-8 text-primary" />,
    },
    {
      name: "Componentes de Impressão",
      slug: "componentes-de-impressao",
      description: "Dampers, bulks e outros componentes de impressão",
      count: getProductCountByCategory("Componentes de Impressão"),
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
    },
    {
      name: "Peças de Reposição",
      slug: "pecas-de-reposicao",
      description: "Peças e componentes para manutenção de equipamentos",
      count: getProductCountByCategory("Peças de Reposição"),
      icon: <Truck className="h-8 w-8 text-primary" />,
    }
  ];
  
  // Filter products based on search term and/or category
  useEffect(() => {
    let filtered = products;
    
    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(product => product.categoria === selectedCategory);
    }
    
    // Apply search filter if there's a search term
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.nome.toLowerCase().includes(searchLower) || 
        product.codigo.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);
  
  // Set category filter from URL param if present
  useEffect(() => {
    if (categorySlug) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.name);
      }
    }
  }, [categorySlug]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatedContainer animation="fade" className="mb-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Loja de Peças e Equipamentos</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encontre componentes de qualidade, ferramentas especializadas e suprimentos da Doss Group para todas as suas necessidades técnicas.
            </p>
          </div>
        </AnimatedContainer>

        {/* Search and filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Buscar por nome ou código..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
                className={!selectedCategory ? "bg-primary/10" : ""}
              >
                Todos
              </Button>
              {categories.map(category => (
                <Button
                  key={category.slug}
                  variant="outline"
                  onClick={() => setSelectedCategory(category.name)}
                  className={selectedCategory === category.name ? "bg-primary/10" : ""}
                >
                  {category.name.split(' ')[0]}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Show categories if no filter and no search */}
        {!selectedCategory && searchTerm.trim() === '' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Categorias</h2>
            <CategoryList categories={categories} />
            
            <div className="mt-12 mb-8">
              <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
              <ProductList 
                products={products
                  .filter(p => p.estoque > 0)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 6)} 
              />
            </div>
          </>
        )}

        {/* Show filtered products */}
        {(selectedCategory || searchTerm.trim() !== '') && (
          <AnimatedContainer animation="fade">
            <ProductList 
              products={filteredProducts}
              title={selectedCategory || searchTerm.trim() !== '' ? `Produtos encontrados (${filteredProducts.length})` : undefined}
            />
          </AnimatedContainer>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 mb-12">
          <AnimatedContainer animation="slide-right" className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Venda seus produtos na nossa plataforma</h2>
            <p className="text-muted-foreground mb-6">
              Você é uma empresa que fornece peças, equipamentos ou suprimentos? Cadastre-se como vendedor e alcance milhares de técnicos em nossa plataforma.
            </p>
            <div>
              <Link to="/store/company-register">
                <Button className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5" />
                  Cadastrar Empresa
                </Button>
              </Link>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slide-left">
            <div className="bg-muted/20 p-6 rounded-lg border border-border h-full">
              <h3 className="text-xl font-bold mb-3">Vantagens para Empresas</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="rounded-full bg-primary/10 p-1 mr-2">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Acesso a uma rede de técnicos qualificados</span>
                </li>
                <li className="flex items-start">
                  <span className="rounded-full bg-primary/10 p-1 mr-2">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Ferramentas de gestão de estoque e pedidos</span>
                </li>
                <li className="flex items-start">
                  <span className="rounded-full bg-primary/10 p-1 mr-2">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Divulgação para um público-alvo específico</span>
                </li>
                <li className="flex items-start">
                  <span className="rounded-full bg-primary/10 p-1 mr-2">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Processamento de pagamentos seguro</span>
                </li>
              </ul>
            </div>
          </AnimatedContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
