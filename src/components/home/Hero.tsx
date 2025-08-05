import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, MapPin, ArrowRight, Star, Users, CheckCircle2, Wrench, Zap, Phone, MessageCircle, Calendar } from "lucide-react";
const Hero = () => {
  return <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24 px-4 min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Botões de ação rápida no topo - Modo Deus */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <Link to="/find-technician">
            
          </Link>
          <Link to="/services">
            
          </Link>
          <Link to="/contact">
            
          </Link>
          <Link to="/technician/landing">
            
          </Link>
        </div>

        {/* Título Principal - Instalei */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white drop-shadow-2xl">
            Encontre o <span className="text-instalei-orange-400 bg-gradient-to-r from-instalei-orange-500/30 to-instalei-orange-400/30 rounded-2xl border-2 border-instalei-orange-400/50 backdrop-blur-sm mx-px font-bold text-7xl px-[20px] py-0">técnico ideal</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-instalei-purple-100 to-white">para seu equipamento</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 text-instalei-gray-100 max-w-4xl mx-auto font-bold leading-relaxed drop-shadow-lg">
            Conectamos você com profissionais qualificados através da plataforma Instalei
          </p>
        </div>

        {/* Formulário de Busca - Modo Deus */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-3xl max-w-5xl mx-auto mb-16 border-2 border-white/30 hover:shadow-4xl transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <label className="block text-lg font-black text-gray-900 mb-3">Tipo de equipamento</label>
              <Search className="absolute left-5 top-14 transform text-gray-500 h-6 w-6 group-focus-within:text-blue-600 transition-colors" />
              <Input placeholder="Ex: Impressora, CNC, Torno..." className="pl-14 h-14 text-gray-900 border-3 border-gray-300 focus:border-blue-600 text-lg font-bold rounded-xl shadow-lg hover:border-gray-400 transition-all hover:shadow-xl" />
            </div>
            
            <div className="relative group">
              <label className="block text-lg font-black text-gray-900 mb-3">Localização</label>
              <MapPin className="absolute left-5 top-14 transform text-gray-500 h-6 w-6 group-focus-within:text-blue-600 transition-colors" />
              <Input placeholder="Cidade, estado ou CEP" className="pl-14 h-14 text-gray-900 border-3 border-gray-300 focus:border-blue-600 text-lg font-bold rounded-xl shadow-lg hover:border-gray-400 transition-all hover:shadow-xl" />
            </div>
            
            <div className="flex flex-col justify-end">
              <Link to="/find-technician">
                <Button className="w-full h-14 bg-gradient-to-r from-instalei-orange-500 to-instalei-orange-400 hover:from-instalei-orange-600 hover:to-instalei-orange-500 text-white font-black text-xl shadow-2xl transition-all duration-300 border-0 rounded-xl group hover:scale-105 hover:shadow-3xl">
                  Buscar Técnicos
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Badges de Benefícios - Modo Deus */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="bg-white/20 backdrop-blur-xl px-8 py-6 rounded-2xl border-2 border-white/30 flex items-center gap-4 hover:bg-white/30 transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-3xl">
            <CheckCircle2 className="h-7 w-7 text-green-300" />
            <span className="text-white font-black text-xl drop-shadow-lg">Técnicos Verificados</span>
          </div>
          <div className="bg-white/20 backdrop-blur-xl px-8 py-6 rounded-2xl border-2 border-white/30 flex items-center gap-4 hover:bg-white/30 transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-3xl">
            <Star className="h-7 w-7 text-yellow-300" />
            <span className="text-white font-black text-xl drop-shadow-lg">Orçamento Grátis</span>
          </div>
          <div className="bg-white/20 backdrop-blur-xl px-8 py-6 rounded-2xl border-2 border-white/30 flex items-center gap-4 hover:bg-white/30 transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-3xl">
            <Users className="h-7 w-7 text-blue-300" />
            <span className="text-white font-black text-xl drop-shadow-lg">+5.000 Profissionais</span>
          </div>
        </div>

        {/* Botões de Ação Adicional - Modo Deus */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <Link to="/services">
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl flex items-center gap-3">
              <Calendar className="h-6 w-6" />
              Agendar Visita
            </Button>
          </Link>
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl flex items-center gap-3">
              <MessageCircle className="h-6 w-6" />
              Chat Online
            </Button>
          </Link>
        </div>

        {/* Estatísticas - Modo Deus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/30 shadow-2xl hover:bg-white/25 transition-all duration-300 hover:scale-105 hover:shadow-3xl">
            <div className="text-5xl font-black text-yellow-300 mb-4 drop-shadow-lg">98%</div>
            <div className="text-gray-100 font-bold text-xl drop-shadow-lg">Taxa de Satisfação</div>
          </div>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/30 shadow-2xl hover:bg-white/25 transition-all duration-300 hover:scale-105 hover:shadow-3xl">
            <div className="text-5xl font-black text-yellow-300 mb-4 drop-shadow-lg">24h</div>
            <div className="text-gray-100 font-bold text-xl drop-shadow-lg">Tempo Médio de Resposta</div>
          </div>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/30 shadow-2xl hover:bg-white/25 transition-all duration-300 hover:scale-105 hover:shadow-3xl">
            <div className="text-5xl font-black text-yellow-300 mb-4 drop-shadow-lg">15K+</div>
            <div className="text-gray-100 font-bold text-xl drop-shadow-lg">Serviços Realizados</div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;