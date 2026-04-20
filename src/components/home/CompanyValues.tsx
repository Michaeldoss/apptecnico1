import React from "react";
import { CheckCircle, Heart, Shield, Users, Lightbulb, Zap } from "lucide-react";

const CompanyValues = () => {
  const values = [
    { title: "Satisfação do cliente em 1º lugar", description: "Nosso compromisso é garantir que cada cliente tenha a melhor experiência possível", icon: <CheckCircle className="h-7 w-7" /> },
    { title: "Se apaixonar pelo problema", description: "Entendemos profundamente os desafios dos nossos usuários para criar as melhores soluções", icon: <Heart className="h-7 w-7" /> },
    { title: "Segurança é inegociável", description: "Protegemos os dados e garantimos transações seguras em toda a plataforma", icon: <Shield className="h-7 w-7" /> },
    { title: "Gerar valor para o nosso ecossistema", description: "Criamos oportunidades e benefícios para todos os participantes da nossa rede", icon: <Users className="h-7 w-7" /> },
    { title: "Inovar com simplicidade", description: "Desenvolvemos soluções tecnológicas avançadas, mas sempre fáceis de usar", icon: <Lightbulb className="h-7 w-7" /> },
    { title: "Desafio é a nossa diversão", description: "Enfrentamos problemas complexos com entusiasmo e determinação", icon: <Zap className="h-7 w-7" /> },
  ];
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="container-instalei relative z-10">
        <div className="text-center mb-instalei-2xl">
          <span className="inline-block glass px-4 py-2 rounded-full text-sm font-semibold text-accent mb-4 font-display tracking-wide">
            NOSSA ESSÊNCIA
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Nossos <span className="text-gradient">Valores</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-instalei-lg">
          {values.map((value, index) => (
            <div key={index} className="card-modern p-instalei-lg border border-border/40 group">
              <div className="flex items-center mb-instalei-sm gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center text-white shadow-glow-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-foreground group-hover:text-accent transition-colors">{value.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;
