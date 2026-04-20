import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Star, CreditCard, CheckCircle2, Users } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="h-12 w-12 text-white" />,
      title: "Segurança Garantida",
      description: "Todos os técnicos são verificados e avaliados pela nossa equipe",
      color: "bg-gradient-to-br from-instalei-navy-500 to-instalei-navy-600"
    },
    {
      icon: <Clock className="h-12 w-12 text-white" />,
      title: "Resposta Rápida",
      description: "Receba propostas de técnicos qualificados em até 1 hora",
      color: "bg-gradient-to-br from-instalei-orange-500 to-instalei-orange-600"
    },
    {
      icon: <Star className="h-12 w-12 text-white" />,
      title: "Melhor Qualidade",
      description: "Apenas profissionais com alta avaliação e experiência comprovada",
      color: "bg-gradient-to-br from-instalei-navy-600 to-instalei-navy-700"
    },
    {
      icon: <CreditCard className="h-12 w-12 text-white" />,
      title: "Pagamento Seguro",
      description: "Pague apenas quando o serviço for concluído satisfatoriamente",
      color: "bg-gradient-to-br from-instalei-orange-600 to-instalei-orange-700"
    },
    {
      icon: <CheckCircle2 className="h-12 w-12 text-white" />,
      title: "Suporte & Mediação",
      description: "Intermediamos qualquer problema para garantir satisfação de ambas as partes",
      color: "bg-gradient-to-br from-instalei-navy-500 via-instalei-navy-600 to-instalei-orange-500"
    },
    {
      icon: <Users className="h-12 w-12 text-white" />,
      title: "+5.000 Profissionais",
      description: "Ampla rede de técnicos especializados em todo o Brasil",
      color: "bg-gradient-to-br from-instalei-navy-600 to-instalei-navy-800"
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-mesh">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="container-instalei relative z-10">
        <div className="text-center mb-instalei-2xl">
          <span className="inline-block glass px-4 py-2 rounded-full text-sm font-semibold text-accent mb-4 font-display tracking-wide">
            VANTAGENS EXCLUSIVAS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-instalei-lg">
            Por que escolher a <span className="text-gradient">Instalei?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-medium leading-relaxed">
            Conectamos você com os melhores técnicos do mercado com total segurança e praticidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-instalei-lg">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group card-modern border border-border/50 backdrop-blur-xl">
              <CardContent className="p-instalei-lg text-center relative z-10">
                <div className={`${benefit.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-instalei-lg shadow-glow-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-instalei-md text-foreground group-hover:text-accent transition-colors">{benefit.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;