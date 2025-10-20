
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, SearchIcon, Star, Store, ArrowRight } from 'lucide-react';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import { motion } from 'framer-motion';

// Sample companies data - in a real app, this would come from an API or database
const companies = [
  {
    id: 1,
    name: "TechPrint Solutions",
    description: "Especialista em equipamentos de impressão digital de alta performance para o mercado gráfico e industrial.",
    rating: 4.9,
    image: "/placeholder.svg",
    products: 124,
    location: "São Paulo, SP"
  },
  {
    id: 2,
    name: "Doss Group",
    description: "Peças originais e componentes para impressoras industriais. Distribuidores autorizados das principais marcas.",
    rating: 4.8,
    image: "/placeholder.svg",
    products: 87,
    location: "Rio de Janeiro, RJ"
  },
  {
    id: 3,
    name: "PrintMax",
    description: "Soluções completas para o mercado gráfico, desde equipamentos até consumíveis e peças de reposição.",
    rating: 4.7,
    image: "/placeholder.svg",
    products: 156,
    location: "Curitiba, PR"
  },
  {
    id: 4,
    name: "InkTech Brasil",
    description: "Tintas e suprimentos para impressão em grande formato. Especialistas em tintas ecosolventes e UV.",
    rating: 4.6,
    image: "/placeholder.svg",
    products: 93,
    location: "Belo Horizonte, MG"
  },
  {
    id: 5,
    name: "PlotterParts",
    description: "Peças e componentes específicos para plotters de impressão e recorte. Envio para todo Brasil.",
    rating: 4.5,
    image: "/placeholder.svg",
    products: 78,
    location: "Porto Alegre, RS"
  },
  {
    id: 6,
    name: "DigiPrint Componentes",
    description: "Componentes e peças para impressoras UV, DTF e sistemas de impressão digital industrial.",
    rating: 4.4,
    image: "/placeholder.svg",
    products: 112,
    location: "Fortaleza, CE"
  },
  {
    id: 7,
    name: "ImpreTech Solutions",
    description: "Especialistas em manutenção e fornecimento de peças para equipamentos de impressão de alta performance.",
    rating: 4.3,
    image: "/placeholder.svg",
    products: 65,
    location: "Recife, PE"
  },
  {
    id: 8,
    name: "Print Parts Express",
    description: "Distribuidora de peças originais com entrega expressa para todo o Brasil.",
    rating: 4.2,
    image: "/placeholder.svg",
    products: 96,
    location: "Brasília, DF"
  }
];

const CompanyList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade">
            {/* Header and Search */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Link to="/store" className="mr-3">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold">Empresas Parceiras</h1>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-muted-foreground">
                  Conheça as empresas que oferecem produtos e serviços especializados para equipamentos de impressão
                </p>
                
                <Link to="/store/company-register">
                  <Button className="whitespace-nowrap">
                    <Store className="mr-2 h-4 w-4" />
                    Cadastrar Minha Empresa
                  </Button>
                </Link>
              </div>

              <div className="flex gap-4 w-full max-w-md mt-6">
                <Input 
                  placeholder="Buscar empresa por nome ou localização" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
                <Button>
                  <SearchIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-md transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden mr-3">
                          <img 
                            src={company.image}
                            alt={company.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{company.name}</CardTitle>
                          <div className="flex items-center text-amber-500">
                            <Star className="h-4 w-4 fill-current mr-1" />
                            <span className="text-sm">{company.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm text-muted-foreground mb-4">{company.description}</p>
                      <div className="flex justify-between text-xs">
                        <span>{company.location}</span>
                        <span>{company.products} produtos</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="secondary" className="w-full">
                        Ver Produtos
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <p>Nenhuma empresa encontrada com os termos da pesquisa.</p>
              </div>
            )}
          </AnimatedContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyList;
