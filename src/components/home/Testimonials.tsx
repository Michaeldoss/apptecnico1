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
        className={`h-5 w-5 ${i < rating ? 'text-instalei-orange-500 fill-instalei-orange-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-instalei">
        <div className="text-center mb-instalei-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-instalei-lg">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-semibold leading-relaxed">
            Milhares de clientes e técnicos já confiam na Instalei
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-instalei-lg">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group border-2 border-instalei-purple-100 hover:border-instalei-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Quote className="h-8 w-8 text-instalei-purple-200" />
              </div>
              <CardContent className="p-instalei-lg">
                <div className="flex items-center mb-instalei-md">
                  <div className="bg-gradient-to-br from-instalei-purple-500 to-instalei-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-instalei-md">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 font-medium leading-relaxed italic">
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