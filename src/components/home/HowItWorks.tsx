import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Search, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-white" />,
      title: "Descreva seu problema",
      description: "Conte-nos que tipo de equipamento precisa de manutenção e onde está localizado",
      color: "bg-gradient-to-br from-instalei-orange-500 to-instalei-orange-600"
    },
    {
      icon: <User className="h-12 w-12 text-white" />,
      title: "Receba propostas",
      description: "Técnicos qualificados da sua região enviarão orçamentos personalizados",
      color: "bg-gradient-to-br from-instalei-navy-500 to-instalei-navy-600"
    },
    {
      icon: <CheckCircle2 className="h-12 w-12 text-white" />,
      title: "Escolha o melhor",
      description: "Compare preços, avaliações e escolha o técnico ideal para você",
      color: "bg-gradient-to-br from-instalei-orange-600 to-instalei-orange-700"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-instalei">
        <div className="text-center mb-instalei-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-instalei-md">
            Como funciona a Instalei
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-semibold leading-relaxed">
            Em poucos passos você encontra o técnico ideal para seu equipamento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-instalei-xl mb-instalei-2xl">
          {steps.map((step, index) => (
            <Card key={index} className="text-center group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white">
              <CardContent className="p-instalei-lg">
                <div className={`${step.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-instalei-lg shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <div className="bg-instalei-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-instalei-md text-2xl font-bold shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-instalei-md text-primary">{step.title}</h3>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;