
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Printer, Scissors, Settings, Plus, Search, Filter, Star, MapPin, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Equipment = () => {
  const navigate = useNavigate();

  const handleCadastrarEquipamento = () => {
    navigate('/sell-equipment/create');
  };

  const equipmentCategories = [
    {
      id: "printers",
      title: "Impressoras",
      description: "Impressoras inkjet, laser, multifuncionais e plotters",
      icon: Printer,
      count: "150+ modelos"
    },
    {
      id: "finishing",
      title: "Acabamento",
      description: "Guilhotinas, plastificadoras, encadernadoras",
      icon: Scissors,
      count: "80+ modelos"
    },
    {
      id: "cnc",
      title: "CNC e Corte",
      description: "Máquinas CNC, cortadoras a laser, router",
      icon: Wrench,
      count: "60+ modelos"
    },
    {
      id: "industrial",
      title: "Industrial",
      description: "Equipamentos industriais e de produção",
      icon: Settings,
      count: "40+ modelos"
    }
  ];

  const featuredMachines = [
    {
      id: 1,
      name: "Impressora Epson EcoTank L3250",
      price: "R$ 899,00",
      originalPrice: "R$ 1.200,00",
      seller: "Tech Solutions SP",
      location: "São Paulo, SP",
      rating: 4.8,
      reviews: 156,
      image: "/placeholder.svg",
      condition: "Nova",
      shipping: "Frete Grátis"
    },
    {
      id: 2,
      name: "Guilhotina Semi-Industrial 43cm",
      price: "R$ 2.850,00",
      originalPrice: "R$ 3.200,00",
      seller: "Gráfica Central",
      location: "Rio de Janeiro, RJ",
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg",
      condition: "Seminova",
      shipping: "Frete Calculado"
    },
    {
      id: 3,
      name: "Plotter de Corte Silhouette",
      price: "R$ 1.450,00",
      originalPrice: "R$ 1.800,00",
      seller: "Creative Machines",
      location: "Belo Horizonte, MG",
      rating: 4.7,
      reviews: 203,
      image: "/placeholder.svg",
      condition: "Nova",
      shipping: "Frete Grátis"
    }
  ];

  const marketplaceCategories = [
    { name: "Impressoras", count: 150 },
    { name: "Guilhotinas", count: 45 },
    { name: "Plotters", count: 67 },
    { name: "CNC", count: 32 },
    { name: "Laminadoras", count: 28 },
    { name: "Encadernadoras", count: 41 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Equipamentos
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Encontre técnicos especializados e compre/venda equipamentos com segurança
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={handleCadastrarEquipamento}
              >
                <Plus className="mr-2 h-5 w-5" />
                Vender Equipamento
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Search className="mr-2 h-5 w-5" />
                Buscar Equipamentos
              </Button>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="technicians" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="technicians">Buscar Técnicos</TabsTrigger>
                <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              </TabsList>

              {/* Buscar Técnicos Tab */}
              <TabsContent value="technicians">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Categorias de Equipamentos</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Nossos técnicos são especializados em diversos tipos de equipamentos
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {equipmentCategories.map((category) => (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <category.icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm text-gray-500 mb-4">{category.count}</p>
                        <Link to="/find-technician">
                          <Button variant="outline" className="w-full">
                            Ver Técnicos
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA Section for Technicians */}
                <div className="bg-gray-50 py-16 rounded-lg">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Não encontrou seu equipamento?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                      Cadastre seu equipamento e encontre técnicos especializados
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" onClick={handleCadastrarEquipamento}>
                        Cadastrar Equipamento
                      </Button>
                      <Link to="/find-technician">
                        <Button variant="outline" size="lg">Buscar Técnicos</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Marketplace Tab */}
              <TabsContent value="marketplace">
                {/* Search and Filters */}
                <div className="py-8 bg-gray-50 rounded-lg mb-8">
                  <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input 
                            placeholder="Buscar máquinas, equipamentos..." 
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filtros
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="py-8">
                  <h2 className="text-2xl font-bold mb-6">Categorias</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                    {marketplaceCategories.map((category, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.count} itens</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Featured Machines */}
                <div className="py-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Máquinas em Destaque</h2>
                    <Link to="/sell-equipment">
                      <Button variant="outline">Ver Todas</Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {featuredMachines.map((machine) => (
                      <Card key={machine.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{machine.name}</CardTitle>
                            <Badge variant={machine.condition === 'Nova' ? 'default' : 'secondary'}>
                              {machine.condition}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-600">{machine.price}</span>
                            <span className="text-sm text-gray-500 line-through">{machine.originalPrice}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {machine.location}
                            </div>
                            <div className="flex items-center text-sm">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="font-medium">{machine.rating}</span>
                              <span className="text-gray-500 ml-1">({machine.reviews})</span>
                            </div>
                            <div className="flex items-center text-sm text-blue-600">
                              <Truck className="h-4 w-4 mr-1" />
                              {machine.shipping}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Vendido por: {machine.seller}</p>
                          <Button className="w-full">Ver Detalhes</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Seller CTA */}
                <div className="bg-blue-50 py-16 rounded-lg">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Quer vender suas máquinas?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                      Cadastre-se como vendedor e alcance milhares de compradores interessados em equipamentos de qualidade.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" onClick={handleCadastrarEquipamento}>
                        Vender Equipamento
                      </Button>
                      <Link to="/sell-equipment">
                        <Button variant="outline" size="lg">Saiba Mais</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Equipment;
