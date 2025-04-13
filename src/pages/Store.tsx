
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUniqueCategories, getProductCountByCategory, products } from '@/data/products';
import { Printer, ArrowRight, Store as StoreIcon, Search, Package, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/format';
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
    title: "Cadastre sua Empresa",
    description: "Quer vender peças e equipamentos na nossa plataforma? Cadastre sua empresa agora!",
    image: "/placeholder.svg",
    link: "/store/company-register"
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
  
  // Get featured products (most expensive ones for this demo)
  const featuredProducts = [...products]
    .sort((a, b) => b.preco - a.preco)
    .slice(0, 8);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section with search */}
        <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Marketplace de Peças e Equipamentos</h1>
              <p className="text-muted-foreground mb-6">
                Encontre peças, componentes e equipamentos especializados para impressoras industriais.
              </p>
              
              <div className="flex w-full max-w-md mx-auto">
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-r-none"
                />
                <Button className="rounded-l-none">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Promotions Carousel */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Ofertas e Promoções</h2>
              <Link to="/store/promotions">
                <Button variant="ghost" className="text-primary">
                  Ver todas <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <Carousel className="w-full">
              <CarouselContent>
                {promotions.map((promo) => (
                  <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/3">
                    <Link to={promo.link}>
                      <Card className="h-full bg-gradient-to-br from-primary/5 to-accent/10 hover:shadow-lg transition-all">
                        <CardHeader className="pb-2">
                          <Badge variant="secondary" className="w-fit mb-2">Promoção</Badge>
                          <CardTitle>{promo.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <img 
                            src={promo.image} 
                            alt={promo.title}
                            className="w-full h-40 object-cover rounded-md mb-4"
                          />
                          <p className="text-sm text-muted-foreground">{promo.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full">
                            Ver Detalhes <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:flex">
                <CarouselPrevious className="relative left-0 translate-x-0" />
                <CarouselNext className="relative right-0 translate-x-0" />
              </div>
            </Carousel>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
              <Link to="/store/products">
                <Button variant="ghost" className="text-primary">
                  Ver todos <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.codigo}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium truncate" title={product.nome}>
                        {product.nome}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">Código: {product.codigo}</p>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <img 
                        src="/placeholder.svg" 
                        alt={product.nome}
                        className="w-full h-32 object-contain mb-4 bg-background p-2 rounded-md"
                      />
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{product.categoria}</Badge>
                        <p className="font-semibold text-right text-primary">
                          {formatCurrency(product.preco)}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="secondary" className="w-full">Ver Detalhes</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Companies */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Empresas em Destaque</h2>
              <Link to="/store/companies">
                <Button variant="ghost" className="text-primary">
                  Ver todas <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCompanies.map((company) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-md transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          <img 
                            src={company.image}
                            alt={company.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{company.name}</CardTitle>
                          <div className="flex items-center text-sm text-amber-500">
                            <Star className="h-3 w-3 fill-current mr-1" />
                            {company.rating}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{company.description}</p>
                      <p className="text-xs">{company.products} produtos disponíveis</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Visitar Loja</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedContainer animation="fade">
              <h2 className="text-2xl font-bold mb-8">Categorias de Produtos</h2>
              <CategoryList categories={categories} />
            </AnimatedContainer>
          </div>
        </section>
        
        {/* All Stores CTA */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 text-center">
            <AnimatedContainer animation="fade" className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Conheça todas as nossas lojas parceiras</h2>
              <p className="text-muted-foreground mb-6">
                Acesse nosso diretório completo de lojas especializadas em equipamentos e peças para impressão
              </p>
              <Link to="/store/companies">
                <Button size="lg" className="gap-2">
                  Ver Todas as Lojas <StoreIcon className="h-4 w-4" />
                </Button>
              </Link>
            </AnimatedContainer>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
