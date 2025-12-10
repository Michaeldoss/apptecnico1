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
    <section className="section-padding bg-gray-50">
      <div className="container-instalei">
        <div className="text-center mb-instalei-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-instalei-lg">
            Por que escolher a Instalei?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-semibold leading-relaxed">
            Conectamos você com os melhores técnicos do mercado com total segurança e praticidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-instalei-lg">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white">
              <CardContent className="p-instalei-lg text-center">
                <div className={`${benefit.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-instalei-lg shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-instalei-md text-primary">{benefit.title}</h3>
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