
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título Principal */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Encontre o <span className="text-yellow-300">técnico ideal</span><br />
          para seu equipamento
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Conectamos você com profissionais qualificados para manutenção e reparo de equipamentos industriais
        </p>

        {/* Formulário de Busca Simples */}
        <div className="bg-white rounded-lg p-6 shadow-2xl max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Campo de Serviço */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Que tipo de equipamento?" 
                className="pl-10 h-12 text-gray-700 border-gray-200"
              />
            </div>
            
            {/* Campo de Localização */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Onde está localizado?" 
                className="pl-10 h-12 text-gray-700 border-gray-200"
              />
            </div>
            
            {/* Botão de Busca */}
            <Link to="/find-technician">
              <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg">
                Encontrar Técnicos
              </Button>
            </Link>
          </div>
        </div>

        {/* Badges de Benefícios */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm font-medium">✓ Técnicos Verificados</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm font-medium">✓ Orçamento Grátis</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-sm font-medium">✓ Garantia de Serviço</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
