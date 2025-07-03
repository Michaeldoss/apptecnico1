
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Heart, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Conectar clientes e técnicos especializados de forma eficiente e confiável"
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Transparência, qualidade e compromisso com a satisfação do cliente"
    },
    {
      icon: Award,
      title: "Visão",
      description: "Ser a principal plataforma de serviços técnicos do Brasil"
    }
  ];

  const team = [
    {
      name: "João Silva",
      role: "CEO & Fundador",
      description: "15 anos de experiência no setor de tecnologia"
    },
    {
      name: "Maria Santos",
      role: "CTO",
      description: "Especialista em desenvolvimento de plataformas digitais"
    },
    {
      name: "Pedro Costa",
      role: "Head de Operações",
      description: "Experiência em gestão de redes de prestadores de serviços"
    }
  ];

  const achievements = [
    "Mais de 10.000 técnicos cadastrados",
    "50.000+ serviços realizados",
    "Presença em 200+ cidades",
    "95% de satisfação dos clientes"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Sobre a AtendaJá
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
              Revolucionando a forma como você encontra e contrata serviços técnicos especializados
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Entre em Contato
              </Button>
            </Link>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
              <p className="text-lg text-gray-600 mb-8">
                A AtendaJá nasceu da necessidade de conectar pessoas que precisam de serviços técnicos 
                especializados com profissionais qualificados de forma rápida e segura. Fundada em 2020,
                nossa plataforma já facilitou milhares de conexões entre clientes e técnicos.
              </p>
              <p className="text-lg text-gray-600">
                Acreditamos que todo problema técnico tem uma solução, e nossa missão é garantir que 
                você encontre o profissional certo para resolver suas necessidades com eficiência e qualidade.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Os princípios que guiam nossa empresa e nosso compromisso com a excelência
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <value.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossa Equipe</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Profissionais experientes dedicados a oferecer a melhor experiência
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-gray-600" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-semibold">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Nossos Números</h2>
              <p className="text-white max-w-2xl mx-auto">
                Resultados que demonstram nosso compromisso com a excelência
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-yellow-400" />
                  </div>
                  <p className="text-lg font-semibold text-white">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Faça Parte da Nossa Comunidade</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de clientes satisfeitos e técnicos qualificados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg">
                  Cadastre-se como Cliente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/technician">
                <Button size="lg" variant="outline">
                  Seja um Técnico Parceiro
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
