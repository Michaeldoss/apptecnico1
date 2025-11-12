
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Clock, Shield, Star, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      title: "Manutenção Preventiva",
      description: "Manutenção regular para evitar problemas futuros",
      price: "A partir de R$ 80",
      duration: "1-2 horas",
      features: ["Limpeza completa", "Verificação de componentes", "Relatório detalhado"]
    },
    {
      title: "Reparo de Equipamentos",
      description: "Conserto de equipamentos com defeito",
      price: "A partir de R$ 120",
      duration: "2-4 horas",
      features: ["Diagnóstico gratuito", "Peças originais", "Garantia de 90 dias"]
    },
    {
      title: "Instalação e Configuração",
      description: "Instalação e configuração de novos equipamentos",
      price: "A partir de R$ 100",
      duration: "1-3 horas",
      features: ["Instalação completa", "Configuração otimizada", "Treinamento básico"]
    },
    {
      title: "Acesso Remoto",
      description: "Suporte técnico à distância para resolver problemas rapidamente",
      price: "A partir de R$ 50",
      duration: "30min-1 hora",
      features: ["Diagnóstico remoto", "Configuração à distância", "Suporte imediato"]
    },
    {
      title: "Suporte Virtual com IA",
      description: "Assistente virtual inteligente 24/7 para dúvidas e orientações",
      price: "Gratuito",
      duration: "Disponível 24/7",
      features: ["Respostas instantâneas", "Guias passo a passo", "Disponível sempre"]
    },
    {
      title: "Suporte Técnico",
      description: "Suporte técnico especializado",
      price: "A partir de R$ 60",
      duration: "30min-1 hora",
      features: ["Suporte remoto", "Orientação técnica", "Solução de problemas"]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Técnicos Verificados",
      description: "Todos os técnicos passam por verificação rigorosa"
    },
    {
      icon: Clock,
      title: "Atendimento Rápido",
      description: "Agendamento flexível e atendimento no prazo"
    },
    {
      icon: Star,
      title: "Qualidade Garantida",
      description: "Avaliações reais e garantia em todos os serviços"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Nossos Serviços
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
              Serviços técnicos especializados para todos os tipos de equipamentos
            </p>
            <Link to="/find-technician">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Solicitar Serviço
              </Button>
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Tipos de Serviços</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Oferecemos diversos tipos de serviços técnicos especializados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <Badge variant="secondary">{service.price}</Badge>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.duration}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/find-technician">
                      <Button className="w-full">
                        Solicitar Serviço
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Por que escolher nossos serviços?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para solicitar um serviço?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Encontre técnicos especializados na sua região
            </p>
            <Link to="/find-technician">
              <Button size="lg">
                <Wrench className="mr-2 h-5 w-5" />
                Encontrar Técnicos
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
