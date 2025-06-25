
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            Encontre o <span className="text-yellow-200 bg-yellow-200/20 px-3 py-2 rounded-lg border border-yellow-200/30">técnico ideal</span><br />
            para seu equipamento
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-50 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Conectamos você com profissionais qualificados para manutenção e reparo de equipamentos industriais
          </p>
        </div>

        {/* Formulário de Busca Melhorado */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto mb-12 border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Campo de Serviço */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Tipo de equipamento</label>
              <Search className="absolute left-4 top-11 transform text-gray-500 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Ex: Impressora, CNC, Torno..." 
                className="pl-12 h-12 text-gray-900 border-2 border-gray-300 focus:border-blue-600 text-base font-medium rounded-lg shadow-sm hover:border-gray-400 transition-all"
              />
            </div>
            
            {/* Campo de Localização */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Localização</label>
              <MapPin className="absolute left-4 top-11 transform text-gray-500 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Cidade, estado ou CEP" 
                className="pl-12 h-12 text-gray-900 border-2 border-gray-300 focus:border-blue-600 text-base font-medium rounded-lg shadow-sm hover:border-gray-400 transition-all"
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
          <div className="bg-white/20 backdrop-blur-lg px-6 py-4 rounded-full border border-white/30 flex items-center gap-3 hover:bg-white/25 transition-all duration-200 shadow-lg">
            <CheckCircle2 className="h-5 w-5 text-green-200" />
            <span className="text-white font-semibold text-base drop-shadow-sm">Técnicos Verificados</span>
          </div>
          <div className="bg-white/20 backdrop-blur-lg px-6 py-4 rounded-full border border-white/30 flex items-center gap-3 hover:bg-white/25 transition-all duration-200 shadow-lg">
            <Star className="h-5 w-5 text-yellow-200" />
            <span className="text-white font-semibold text-base drop-shadow-sm">Orçamento Grátis</span>
          </div>
          <div className="bg-white/20 backdrop-blur-lg px-6 py-4 rounded-full border border-white/30 flex items-center gap-3 hover:bg-white/25 transition-all duration-200 shadow-lg">
            <Users className="h-5 w-5 text-blue-200" />
            <span className="text-white font-semibold text-base drop-shadow-sm">+5.000 Profissionais</span>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/25 shadow-lg">
            <div className="text-3xl font-bold text-yellow-200 mb-2 drop-shadow-sm">98%</div>
            <div className="text-gray-100 font-medium drop-shadow-sm">Taxa de Satisfação</div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/25 shadow-lg">
            <div className="text-3xl font-bold text-yellow-200 mb-2 drop-shadow-sm">24h</div>
            <div className="text-gray-100 font-medium drop-shadow-sm">Tempo Médio de Resposta</div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/25 shadow-lg">
            <div className="text-3xl font-bold text-yellow-200 mb-2 drop-shadow-sm">15K+</div>
            <div className="text-gray-100 font-medium drop-shadow-sm">Serviços Realizados</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
