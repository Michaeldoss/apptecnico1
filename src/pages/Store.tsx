
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Building2, Package, Truck } from 'lucide-react';

const Store = () => {
  // Categorias de exemplo
  const categories = [
    {
      name: "Componentes Eletrônicos",
      description: "Placas, chips, resistores e outros componentes para reparos",
      icon: <Package className="h-8 w-8 text-primary" />,
      count: 128,
    },
    {
      name: "Ferramentas",
      description: "Ferramentas especializadas para técnicos de informática",
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      count: 64,
    },
    {
      name: "Suprimentos",
      description: "Itens consumíveis para impressoras e outros equipamentos",
      icon: <Truck className="h-8 w-8 text-primary" />,
      count: 96,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatedContainer animation="fade" className="mb-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Loja de Peças e Equipamentos</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encontre componentes de qualidade, ferramentas especializadas e suprimentos para todas as suas necessidades técnicas.
            </p>
          </div>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Vantagens para Empresas</CardTitle>
                <CardDescription>Por que vender na nossa plataforma?</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>

        <h2 className="text-2xl font-bold mb-6">Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => (
            <AnimatedContainer 
              key={index} 
              animation="fade" 
              delay={index * 100}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {category.icon}
                    <span className="bg-muted text-muted-foreground text-xs rounded-full px-2 py-1">
                      {category.count} itens
                    </span>
                  </div>
                  <CardTitle className="mt-4">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">Ver Produtos</Button>
                </CardFooter>
              </Card>
            </AnimatedContainer>
          ))}
        </div>

        <div className="bg-muted py-8 px-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Em breve mais funcionalidades!</h2>
          <p className="text-muted-foreground mb-0">
            Estamos trabalhando para expandir nossa loja com mais produtos e recursos.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
