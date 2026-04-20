import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empresária",
      location: "São Paulo - SP",
      rating: 5,
      text: "Encontrei um técnico excelente para minha impressora 3D através da Instalei. Serviço rápido e profissional!",
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "Gerente Industrial",
      location: "Rio de Janeiro - RJ",
      rating: 5,
      text: "A plataforma me conectou com técnicos especializados em CNC. Problema resolvido em menos de 24h!",
      avatar: "JS"
    },
    {
      name: "Ana Costa",
      role: "Dona de Loja",
      location: "Belo Horizonte - MG",
      rating: 5,
      text: "Precisa de manutenção em equipamentos? A Instalei é a solução. Técnicos qualificados e preços justos.",
      avatar: "AC"
    },
    {
      name: "Carlos Oliveira",
      role: "Técnico Especializado",
      location: "Porto Alegre - RS",
      rating: 5,
      text: "Como técnico, a Instalei me ajudou a encontrar mais clientes. Plataforma séria e bem organizada.",
      avatar: "CO"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
        <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-accent fill-accent' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container-instalei relative z-10">
        <div className="text-center mb-instalei-2xl">
          <span className="inline-block glass px-4 py-2 rounded-full text-sm font-semibold text-accent mb-4 font-display tracking-wide">
            DEPOIMENTOS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-instalei-lg">
            O que nossos <span className="text-gradient">clientes</span> dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            Milhares de clientes e técnicos já confiam na Instalei
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-instalei-lg">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group card-glow border border-border/50 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Quote className="h-8 w-8 text-accent" />
              </div>
              <CardContent className="p-instalei-lg relative z-10">
                <div className="flex items-center mb-instalei-md">
                  <div className="bg-gradient-to-br from-primary to-accent w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow-accent">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground/70">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-instalei-md">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-foreground/80 font-medium leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;