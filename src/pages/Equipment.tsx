import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Printer, Scissors, Settings, Plus } from "lucide-react";
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
              Encontre técnicos especializados para todos os tipos de equipamentos
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={handleCadastrarEquipamento}
            >
              <Plus className="mr-2 h-5 w-5" />
              Cadastrar Equipamento
            </Button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Categorias de Equipamentos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nossos técnicos são especializados em diversos tipos de equipamentos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Equipment;
