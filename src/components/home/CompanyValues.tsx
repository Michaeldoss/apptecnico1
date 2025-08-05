import React from "react";
import { CheckCircle, Heart, Shield, Users, Lightbulb, Zap } from "lucide-react";
const CompanyValues = () => {
  const values = [{
    title: "Satisfação do cliente em 1º lugar",
    description: "Nosso compromisso é garantir que cada cliente tenha a melhor experiência possível",
    icon: <CheckCircle className="h-8 w-8" />
  }, {
    title: "Se apaixonar pelo problema",
    description: "Entendemos profundamente os desafios dos nossos usuários para criar as melhores soluções",
    icon: <Heart className="h-8 w-8" />
  }, {
    title: "Segurança é inegociável",
    description: "Protegemos os dados e garantimos transações seguras em toda a plataforma",
    icon: <Shield className="h-8 w-8" />
  }, {
    title: "Gerar valor para o nosso ecossistema",
    description: "Criamos oportunidades e benefícios para todos os participantes da nossa rede",
    icon: <Users className="h-8 w-8" />
  }, {
    title: "Inovar com simplicidade",
    description: "Desenvolvemos soluções tecnológicas avançadas, mas sempre fáceis de usar",
    icon: <Lightbulb className="h-8 w-8" />
  }, {
    title: "Desafio é a nossa diversão",
    description: "Enfrentamos problemas complexos com entusiasmo e determinação",
    icon: <Zap className="h-8 w-8" />
  }];
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-instalei">
        <h2 className="text-3xl font-bold text-center mb-instalei-lg text-primary">Nossos Valores na Instalei</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-instalei-lg">
          {values.map((value, index) => (
            <div key={index} className="card-instalei hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-instalei-sm">
                <div className="icon-accent mr-3">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary">{value.title}</h3>
              </div>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CompanyValues;