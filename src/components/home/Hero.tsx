
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, MapPin, ArrowRight, Star, Users, CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-4 min-h-[70vh] flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Título Principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Encontre o <span className="text-yellow-300 bg-yellow-300/10 px-2 py-1 rounded-lg">técnico ideal</span><br />
            para seu equipamento
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed">
            Conectamos você com profissionais qualificados para manutenção e reparo de equipamentos industriais
          </p>
        </div>

        {/* Formulário de Busca Melhorado */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto mb-12 border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Campo de Serviço */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de equipamento</label>
              <Search className="absolute left-4 top-11 transform text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Ex: Impressora, CNC, Torno..." 
                className="pl-12 h-12 text-gray-800 border-2 border-gray-200 focus:border-blue-600 text-base font-medium rounded-lg shadow-sm hover:border-gray-300 transition-all"
              />
            </div>
            
            {/* Campo de Localização */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Localização</label>
              <MapPin className="absolute left-4 top-11 transform text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Cidade, estado ou CEP" 
                className="pl-12 h-12 text-gray-800 border-2 border-gray-200 focus:border-blue-600 text-base font-medium rounded-lg shadow-sm hover:border-gray-300 transition-all"
              />
            </div>
            
            {/* Botão de Busca */}
            <div className="flex flex-col justify-end">
              <Link to="/find-technician">
                <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg shadow-lg transition-all duration-200 border-0 rounded-lg group">
                  Buscar Técnicos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Badges de Benefícios Melhorados */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="bg-white/15 backdrop-blur-lg px-6 py-4 rounded-full border border-white/20 flex items-center gap-3 hover:bg-white/20 transition-all duration-200">
            <CheckCircle2 className="h-5 w-5 text-green-300" />
            <span className="text-white font-semibold text-base">Técnicos Verificados</span>
          </div>
          <div className="bg-white/15 backdrop-blur-lg px-6 py-4 rounded-full border border-white/20 flex items-center gap-3 hover:bg-white/20 transition-all duration-200">
            <Star className="h-5 w-5 text-yellow-300" />
            <span className="text-white font-semibold text-base">Orçamento Grátis</span>
          </div>
          <div className="bg-white/15 backdrop-blur-lg px-6 py-4 rounded-full border border-white/20 flex items-center gap-3 hover:bg-white/20 transition-all duration-200">
            <Users className="h-5 w-5 text-blue-300" />
            <span className="text-white font-semibold text-base">+5.000 Profissionais</span>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-yellow-300 mb-2">98%</div>
            <div className="text-blue-100 font-medium">Taxa de Satisfação</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-yellow-300 mb-2">24h</div>
            <div className="text-blue-100 font-medium">Tempo Médio de Resposta</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-yellow-300 mb-2">15K+</div>
            <div className="text-blue-100 font-medium">Serviços Realizados</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
