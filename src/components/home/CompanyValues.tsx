import React from "react";
import { CheckCircle, Heart, Shield, Users, Lightbulb, Zap } from "lucide-react";

const CompanyValues = () => {
  const values = [
    {
      title: "Satisfação do cliente em 1º lugar",
      description: "Nosso compromisso é garantir que cada cliente tenha a melhor experiência possível",
      icon: <CheckCircle className="h-8 w-8" />
    },
    {
      title: "Se apaixonar pelo problema",
      description: "Entendemos profundamente os desafios dos nossos usuários para criar as melhores soluções",
      icon: <Heart className="h-8 w-8" />
    },
    {
      title: "Segurança é inegociável",
      description: "Protegemos os dados e garantimos transações seguras em toda a plataforma",
      icon: <Shield className="h-8 w-8" />
    },
    {
      title: "Gerar valor para o nosso ecossistema",
      description: "Criamos oportunidades e benefícios para todos os participantes da nossa rede",
      icon: <Users className="h-8 w-8" />
    },
    {
      title: "Inovar com simplicidade",
      description: "Desenvolvemos soluções tecnológicas avançadas, mas sempre fáceis de usar",
      icon: <Lightbulb className="h-8 w-8" />
    },
    {
      title: "Desafio é a nossa diversão",
      description: "Enfrentamos problemas complexos com entusiasmo e determinação",
      icon: <Zap className="h-8 w-8" />
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos Valores
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Os princípios que guiam nossa missão de conectar pessoas e resolver problemas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-primary mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CompanyValues;