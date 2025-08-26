import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, MapPin, ArrowRight, Star, Users, CheckCircle2, Wrench, Phone, MessageCircle, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-instalei-purple-500 via-instalei-purple-600 to-instalei-purple-700 text-white section-padding min-h-[95vh] flex items-center relative overflow-hidden">
      {/* Elementos decorativos de fundo modernos */}
      <div className="absolute inset-0 bg-gradient-to-r from-instalei-purple-600/30 via-transparent to-instalei-orange-500/20"></div>
      <div className="absolute top-16 left-16 w-80 h-80 bg-white/8 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-96 h-96 bg-instalei-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container-instalei w-full relative z-10">
        {/* Título Principal - Instalei */}
        <div className="text-center mb-instalei-xl">
          <h1 className="text-6xl md:text-8xl font-black mb-12 leading-[0.9] text-white drop-shadow-2xl">
            Encontre o <span className="text-instalei-orange-400 bg-gradient-to-r from-instalei-orange-500/20 to-instalei-orange-400/10 rounded-3xl border-2 border-instalei-orange-400/40 backdrop-blur-lg px-8 py-3 inline-block font-black relative">
              <span className="relative z-10">técnico ideal</span>
              <div className="absolute inset-0 bg-gradient-to-r from-instalei-orange-500/30 to-instalei-orange-400/20 rounded-3xl blur-sm"></div>
            </span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-instalei-purple-100 to-white font-black">para seu equipamento</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-16 text-white/95 max-w-5xl mx-auto font-medium leading-relaxed drop-shadow-xl">
            Conectamos você com profissionais qualificados na plataforma <span className="text-instalei-orange-300 font-black text-3xl md:text-4xl">Instalei</span>
          </p>
        </div>

        {/* Formulário de Busca Moderno */}
        <div className="bg-white/98 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl max-w-6xl mx-auto mb-20 border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <label className="block text-xl font-bold text-instalei-gray-800 mb-4 font-inter">Tipo de equipamento</label>
              <Search className="absolute left-6 top-16 transform text-instalei-gray-500 h-6 w-6 group-focus-within:text-instalei-orange-500 transition-all duration-300" />
              <Input placeholder="Ex: Impressora, CNC, Torno..." className="pl-16 h-16 text-instalei-gray-800 border-2 border-instalei-gray-200 focus:border-instalei-orange-500 text-lg font-medium rounded-2xl shadow-lg hover:border-instalei-orange-400 transition-all duration-300 hover:shadow-xl focus:shadow-xl bg-white/90 backdrop-blur-sm" />
            </div>
            
            <div className="relative group">
              <label className="block text-xl font-bold text-instalei-gray-800 mb-4 font-inter">Localização</label>
              <MapPin className="absolute left-6 top-16 transform text-instalei-gray-500 h-6 w-6 group-focus-within:text-instalei-orange-500 transition-all duration-300" />
              <Input placeholder="Cidade, estado ou CEP" className="pl-16 h-16 text-instalei-gray-800 border-2 border-instalei-gray-200 focus:border-instalei-orange-500 text-lg font-medium rounded-2xl shadow-lg hover:border-instalei-orange-400 transition-all duration-300 hover:shadow-xl focus:shadow-xl bg-white/90 backdrop-blur-sm" />
            </div>
            
            <div className="flex flex-col justify-end">
              <Link to="/find-technician">
                <Button variant="secondary" size="lg" className="w-full h-16 text-xl font-bold group">
                  Buscar Técnicos
                  <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Badges de Benefícios Modernos */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          <div className="bg-white/15 backdrop-blur-2xl px-8 py-6 rounded-2xl border border-white/20 flex items-center gap-5 hover:bg-white/25 transition-all duration-500 shadow-2xl hover:scale-110 hover:shadow-3xl hover:-translate-y-2 group">
            <CheckCircle2 className="h-8 w-8 text-green-300 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-white font-bold text-xl drop-shadow-lg font-inter">Técnicos Verificados</span>
          </div>
          <div className="bg-white/15 backdrop-blur-2xl px-8 py-6 rounded-2xl border border-white/20 flex items-center gap-5 hover:bg-white/25 transition-all duration-500 shadow-2xl hover:scale-110 hover:shadow-3xl hover:-translate-y-2 group">
            <Star className="h-8 w-8 text-instalei-orange-300 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-white font-bold text-xl drop-shadow-lg font-inter">Orçamento Grátis</span>
          </div>
          <div className="bg-white/15 backdrop-blur-2xl px-8 py-6 rounded-2xl border border-white/20 flex items-center gap-5 hover:bg-white/25 transition-all duration-500 shadow-2xl hover:scale-110 hover:shadow-3xl hover:-translate-y-2 group">
            <Users className="h-8 w-8 text-blue-300 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-white font-bold text-xl drop-shadow-lg font-inter">+5.000 Profissionais</span>
          </div>
        </div>

        {/* Botões de Ação Principais Modernos */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          <Link to="/services">
            <Button variant="outline" size="lg" className="text-white border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-2xl px-10 py-4 text-xl font-bold rounded-2xl shadow-2xl flex items-center gap-4">
              <Calendar className="h-7 w-7" />
              Agendar Visita
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="px-10 py-4 text-xl font-bold rounded-2xl shadow-2xl flex items-center gap-4">
              <MessageCircle className="h-7 w-7" />
              Chat Online
            </Button>
          </Link>
        </div>

        {/* Estatísticas Modernas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl hover:bg-white/25 transition-all duration-500 hover:scale-110 hover:shadow-3xl hover:-translate-y-4 group">
            <div className="text-5xl md:text-6xl font-black text-instalei-orange-300 mb-4 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">98%</div>
            <div className="text-white/95 font-bold text-xl md:text-2xl drop-shadow-lg font-inter">Taxa de Satisfação</div>
          </div>
          <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl hover:bg-white/25 transition-all duration-500 hover:scale-110 hover:shadow-3xl hover:-translate-y-4 group">
            <div className="text-5xl md:text-6xl font-black text-instalei-orange-300 mb-4 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">24h</div>
            <div className="text-white/95 font-bold text-xl md:text-2xl drop-shadow-lg font-inter">Tempo Médio de Resposta</div>
          </div>
          <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl hover:bg-white/25 transition-all duration-500 hover:scale-110 hover:shadow-3xl hover:-translate-y-4 group">
            <div className="text-5xl md:text-6xl font-black text-instalei-orange-300 mb-4 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">15K+</div>
            <div className="text-white/95 font-bold text-xl md:text-2xl drop-shadow-lg font-inter">Serviços Realizados</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;