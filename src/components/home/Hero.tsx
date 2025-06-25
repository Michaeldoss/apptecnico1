
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, MapPin, UserPlus, Store } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-700 to-blue-800 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Título Principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Encontre o <span className="text-yellow-300">técnico ideal</span><br />
            para seu equipamento
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto font-medium">
            Conectamos você com profissionais qualificados para manutenção e reparo de equipamentos industriais
          </p>
        </div>

        {/* Formulário de Busca */}
        <div className="bg-white rounded-xl p-8 shadow-2xl max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Campo de Serviço */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input 
                placeholder="Que tipo de equipamento?" 
                className="pl-12 h-14 text-gray-800 border-2 border-gray-200 focus:border-blue-600 text-base font-medium"
              />
            </div>
            
            {/* Campo de Localização */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input 
                placeholder="Onde está localizado?" 
                className="pl-12 h-14 text-gray-800 border-2 border-gray-200 focus:border-blue-600 text-base font-medium"
              />
            </div>
            
            {/* Botão de Busca */}
            <Link to="/find-technician">
              <Button className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-lg transition-all duration-200 border-0">
                Encontrar Técnicos
              </Button>
            </Link>
          </div>
        </div>

        {/* Botões de Cadastro */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
          <Link to="/register" className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-200 border-0">
              <UserPlus className="mr-3 h-6 w-6" />
              Cadastrar como Cliente
            </Button>
          </Link>
          
          <div className="text-white font-medium text-lg">ou</div>
          
          <Link to="/store/company-register" className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-200 border-0">
              <Store className="mr-3 h-6 w-6" />
              Cadastrar como Lojista
            </Button>
          </Link>
        </div>

        {/* Badges de Benefícios */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
            <span className="text-white font-semibold text-base">✓ Técnicos Verificados</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
            <span className="text-white font-semibold text-base">✓ Orçamento Grátis</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
            <span className="text-white font-semibold text-base">✓ Garantia de Serviço</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
