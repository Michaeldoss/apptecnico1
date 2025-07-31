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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="text-primary mr-3">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
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