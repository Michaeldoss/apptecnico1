
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, MapPin, Plus, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Machines = () => {
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

  const categories = [
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
              Marketplace de Máquinas
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Compre e venda equipamentos com segurança. Conectamos vendedores e compradores de máquinas industriais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Search className="mr-2 h-5 w-5" />
                Buscar Máquinas
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Plus className="mr-2 h-5 w-5" />
                Vender Máquina
              </Button>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-gray-50">
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
        </section>

        {/* Categories */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Categorias</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} itens</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Machines */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Máquinas em Destaque</h2>
              <Button variant="outline">Ver Todas</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </section>

        {/* Seller CTA */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Quer vender suas máquinas?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Cadastre-se como vendedor e alcance milhares de compradores interessados em equipamentos de qualidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg">Cadastrar como Vendedor</Button>
              </Link>
              <Button variant="outline" size="lg">Saiba Mais</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Machines;
