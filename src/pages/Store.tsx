
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUniqueCategories, getProductCountByCategory, products } from '@/data/products';
import { Printer, ArrowRight, Store as StoreIcon, Search, Package, Star, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import CategoryList from '@/components/store/CategoryList';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import ProductList from '@/components/store/ProductList';

// Sample promotions data - in a real app, this would come from an API or database
const promotions = [
  {
    id: 1,
    title: "50% OFF em Cabeças de Impressão",
    description: "Desconto especial em cabeças de impressão selecionadas. Válido até o fim do mês!",
    image: "/placeholder.svg",
    link: "/store/category/cabecas-de-impressao"
  },
  {
    id: 2,
    title: "Componentes de Impressão em Oferta",
    description: "Compre 3 e leve 4 em componentes selecionados. Aproveite enquanto durar o estoque!",
    image: "/placeholder.svg",
    link: "/store/category/componentes-de-impressao"
  },
  {
    id: 3,
    title: "Novos Equipamentos Disponíveis",
    description: "Confira os últimos lançamentos de equipamentos para impressão digital!",
    image: "/placeholder.svg",
    link: "/store/category/equipamentos"
  }
];

// Sample featured companies - in a real app, this would come from an API or database
const featuredCompanies = [
  {
    id: 1,
    name: "TechPrint Solutions",
    description: "Especialista em equipamentos de impressão digital",
    rating: 4.9,
    image: "/placeholder.svg",
    products: 124
  },
  {
    id: 2,
    name: "Doss Group",
    description: "Peças originais para impressoras industriais",
    rating: 4.8,
    image: "/placeholder.svg",
    products: 87
  },
  {
    id: 3,
    name: "PrintMax",
    description: "Soluções completas para o mercado gráfico",
    rating: 4.7,
    image: "/placeholder.svg",
    products: 156
  },
  {
    id: 4,
    name: "InkTech Brasil",
    description: "Tintas e suprimentos para impressão em grande formato",
    rating: 4.6,
    image: "/placeholder.svg",
    products: 93
  }
];

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const isMobile = useIsMobile();
  
  // Get unique categories and convert to the correct format for the CategoryList component
  const categories = getUniqueCategories().map(categoryName => {
    // Create a slug from the category name
    const slug = categoryName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    const count = getProductCountByCategory(categoryName);
    
    // Map category name to icon
    let icon;
    switch(categoryName) {
      case 'Cabeças de Impressão':
        icon = <Printer className="h-6 w-6" />;
        break;
      case 'Componentes de Impressão':
        icon = <Package className="h-6 w-6" />;
        break;
      default:
        icon = <StoreIcon className="h-6 w-6" />;
    }
    
    return {
      name: categoryName,
      slug,
      count,
      description: `${count} produtos disponíveis nesta categoria.`,
      icon
    };
  });
  
  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase();
    return products.filter(product => 
      product.nome.toLowerCase().includes(term) ||
      product.codigo.toLowerCase().includes(term) ||
      product.categoria.toLowerCase().includes(term) ||
      (product.ncm && product.ncm.toLowerCase().includes(term))
    );
  }, [searchTerm]);
  
  // Get featured products (most expensive ones for this demo)
  const featuredProducts = [...products]
    .sort((a, b) => b.preco - a.preco)
    .slice(0, 8);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Show results immediately if there's a search term, hide if empty
    setShowSearchResults(value.trim().length > 0);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section - cores da home: azul com gradiente */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className={cn(
              "flex mb-2",
              isMobile ? "justify-center" : "justify-end"
            )}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/store/company-register">
                      <Button variant="outline" size="sm" className="gap-1 rounded-full border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-blue-800 font-inter">
                        <Plus className="h-4 w-4" />
                        <span className={cn(isMobile ? "inline" : "hidden md:inline")}>
                          {isMobile ? "Cadastrar" : "Cadastrar Empresa"}
                        </span>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-inter">Cadastre sua empresa como fornecedor</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <h1 className={cn(
                "font-bold mb-4 text-white font-inter drop-shadow-lg",
                isMobile ? "text-2xl" : "text-3xl md:text-4xl"
              )}>Marketplace de Peças e Equipamentos</h1>
              <p className={cn(
                "text-gray-100 mb-6 font-inter drop-shadow-md",
                isMobile ? "text-sm px-4" : ""
              )}>
                Encontre peças, componentes e equipamentos especializados para impressoras industriais.
              </p>
              
              <div className={cn(
                "flex w-full mx-auto",
                isMobile ? "max-w-xs flex-col gap-2" : "max-w-md"
              )}>
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  className={cn(
                    "bg-white border-gray-300 text-gray-900 font-inter",
                    isMobile ? "rounded-md" : "rounded-r-none"
                  )}
                />
                <Button 
                  onClick={handleSearch}
                  className={cn(
                    "bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold font-inter",
                    isMobile ? "rounded-md" : "rounded-l-none"
                  )}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search Results Section */}
        {showSearchResults && (
          <section className="py-8 md:py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={cn(
                    "font-bold text-gray-900 font-inter",
                    isMobile ? "text-xl" : "text-2xl"
                  )}>
                    Resultados da Busca
                  </h2>
                  <p className="text-gray-600 font-inter">
                    {filteredProducts.length} produto(s) encontrado(s) para "{searchTerm}"
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setShowSearchResults(false);
                  }}
                  className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white font-inter"
                >
                  Limpar Busca
                </Button>
              </div>
              
              {filteredProducts.length > 0 ? (
                <ProductList products={filteredProducts} showCategory={true} />
              ) : (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-gray-900 font-inter">Nenhum produto encontrado</h3>
                  <p className="text-gray-600 mb-4 font-inter">
                    Tente usar termos diferentes ou navegue pelas categorias abaixo.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setShowSearchResults(false);
                    }}
                    className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white font-inter"
                  >
                    Ver Todos os Produtos
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Show other sections only when not showing search results */}
        {!showSearchResults && (
          <>
            {/* Promotions Carousel - fundo branco */}
            <section className="py-8 md:py-12 bg-white overflow-hidden">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <h2 className={cn(
                    "font-bold text-gray-900 font-inter",
                    isMobile ? "text-xl" : "text-2xl"
                  )}>Ofertas e Promoções</h2>
                  <Link to="/store/promotions">
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-inter" size={isMobile ? "sm" : "default"}>
                      Ver todas <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {promotions.map((promo) => (
                      <CarouselItem key={promo.id} className={cn(
                        "pl-2 md:pl-4",
                        isMobile ? "basis-full" : "md:basis-1/2 lg:basis-1/3"
                      )}>
                        <Link to={promo.link}>
                          <div className="overflow-hidden rounded-xl group">
                            <div className={cn(
                              "relative overflow-hidden",
                              isMobile ? "h-[200px]" : "h-[300px]"
                            )}>
                              <img 
                                src={promo.image} 
                                alt={promo.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className={cn(
                                "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end",
                                isMobile ? "p-4" : "p-6"
                              )}>
                                <Badge variant="secondary" className="w-fit mb-2 bg-yellow-400 text-gray-900 font-inter">Promoção</Badge>
                                <h3 className={cn(
                                  "font-bold text-white font-inter drop-shadow-lg",
                                  isMobile ? "text-lg" : "text-xl"
                                )}>{promo.title}</h3>
                                <p className={cn(
                                  "text-white/80 mt-2 font-inter drop-shadow-md",
                                  isMobile ? "text-xs" : "text-sm"
                                )}>{promo.description}</p>
                                <Button variant="secondary" className="w-fit mt-4 bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-inter" size={isMobile ? "sm" : "default"}>
                                  Ver Detalhes <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4 gap-2">
                    <CarouselPrevious className="static transform-none mx-0 bg-white/80 backdrop-blur-sm border-blue-600" />
                    <CarouselNext className="static transform-none mx-0 bg-white/80 backdrop-blur-sm border-blue-600" />
                  </div>
                </Carousel>
              </div>
            </section>
            
            {/* Featured Products - fundo cinza claro */}
            <section className="py-8 md:py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <h2 className={cn(
                    "font-bold text-gray-900 font-inter",
                    isMobile ? "text-xl" : "text-2xl"
                  )}>Produtos em Destaque</h2>
                  <Link to="/store/products">
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-inter" size={isMobile ? "sm" : "default"}>
                      Ver todos <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className={cn(
                  "grid gap-4 md:gap-6",
                  isMobile ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                )}>
                  {featuredProducts.map((product) => (
                    <motion.div
                      key={product.codigo}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full hover:shadow-md transition-all group overflow-hidden bg-white border-gray-200">
                        <CardHeader className={cn(
                          "pb-2",
                          isMobile ? "p-3" : ""
                        )}>
                          <CardTitle className={cn(
                            "font-medium text-gray-900 font-inter leading-tight",
                            isMobile ? "text-sm" : "text-base"
                          )} title={product.nome}>
                            {product.nome}
                          </CardTitle>
                          <p className={cn(
                            "text-gray-600 font-inter",
                            isMobile ? "text-xs" : "text-xs"
                          )}>Código: {product.codigo}</p>
                        </CardHeader>
                        <CardContent className={cn(
                          "pb-2",
                          isMobile ? "p-3 pt-0" : ""
                        )}>
                          <div className={cn(
                            "relative w-full bg-white rounded-md overflow-hidden mb-4",
                            isMobile ? "h-20" : "h-32"
                          )}>
                            <img 
                              src="/placeholder.svg" 
                              alt={product.nome}
                              className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className={cn(
                              "border-blue-600 text-blue-600 font-inter",
                              isMobile ? "text-xs" : ""
                            )}>{product.categoria}</Badge>
                            <p className={cn(
                              "font-semibold text-right text-blue-600 font-inter",
                              isMobile ? "text-sm" : ""
                            )}>
                              {formatCurrency(product.preco)}
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter className={cn(
                          isMobile ? "p-3 pt-0" : ""
                        )}>
                          <Button variant="secondary" className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-inter" size={isMobile ? "sm" : "default"}>
                            Ver Detalhes
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Featured Companies - fundo branco */}
            <section className="py-8 md:py-12 bg-white">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <h2 className={cn(
                    "font-bold text-gray-900 font-inter",
                    isMobile ? "text-xl" : "text-2xl"
                  )}>Empresas em Destaque</h2>
                  <Link to="/store/companies">
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-inter" size={isMobile ? "sm" : "default"}>
                      Ver todas <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className={cn(
                  "grid gap-4 md:gap-6",
                  isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                )}>
                  {featuredCompanies.map((company) => (
                    <motion.div
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full hover:shadow-md transition-all bg-white border-gray-200">
                        <CardHeader className={cn(
                          isMobile ? "p-4" : ""
                        )}>
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                              <img 
                                src={company.image}
                                alt={company.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <CardTitle className={cn(
                                "text-gray-900 font-inter",
                                isMobile ? "text-base" : "text-base"
                              )}>{company.name}</CardTitle>
                              <div className="flex items-center text-sm text-yellow-500">
                                <Star className="h-3 w-3 fill-current mr-1" />
                                <span className="font-inter">{company.rating}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className={cn(
                          isMobile ? "p-4 pt-0" : ""
                        )}>
                          <p className={cn(
                            "text-gray-600 mb-2 font-inter",
                            isMobile ? "text-sm" : "text-sm"
                          )}>{company.description}</p>
                          <p className="text-xs text-gray-600 font-inter">{company.products} produtos disponíveis</p>
                        </CardContent>
                        <CardFooter className={cn(
                          isMobile ? "p-4 pt-0" : ""
                        )}>
                          <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white font-inter" size={isMobile ? "sm" : "default"}>
                            Visitar Loja
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Categories Section - fundo cinza claro */}
            <section className="py-8 md:py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <AnimatedContainer animation="fade">
                  <h2 className={cn(
                    "font-bold mb-6 md:mb-8 text-gray-900 font-inter",
                    isMobile ? "text-xl" : "text-2xl"
                  )}>Categorias de Produtos</h2>
                  <CategoryList categories={categories} />
                </AnimatedContainer>
              </div>
            </section>
            
            {/* All Stores CTA - fundo branco */}
            <section className="py-8 md:py-12 bg-white">
              <div className="container mx-auto px-4 text-center">
                <AnimatedContainer animation="fade" className="max-w-3xl mx-auto">
                  <h2 className={cn(
                    "font-bold mb-4 text-gray-900 font-inter",
                    isMobile ? "text-xl" : "text-2xl"
                  )}>Conheça todas as nossas lojas parceiras</h2>
                  <p className={cn(
                    "text-gray-600 mb-6 font-inter",
                    isMobile ? "text-sm px-4" : ""
                  )}>
                    Acesse nosso diretório completo de lojas especializadas em equipamentos e peças para impressão
                  </p>
                  <Link to="/store/companies">
                    <Button size={isMobile ? "default" : "lg"} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-inter">
                      Ver Todas as Lojas <StoreIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </AnimatedContainer>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Store;
