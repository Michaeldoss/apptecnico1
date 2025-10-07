import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, MapPin, ArrowRight, Star, Users, CheckCircle2, Wrench, Phone, MessageCircle, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-workana-blue-50 to-white section-padding min-h-[90vh] flex items-center">
      <div className="container-instalei w-full">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-foreground">
            Encontre o técnico ideal em <span className="text-primary">72 horas</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto font-normal">
            Conectamos você com profissionais verificados e qualificados para manutenção de equipamentos industriais
          </p>
        </div>

        {/* Formulário de Busca */}
        <div className="bg-white rounded-2xl p-8 shadow-md max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="block text-sm font-semibold text-foreground mb-2">Tipo de equipamento</label>
              <Search className="absolute left-4 top-11 text-muted-foreground h-5 w-5" />
              <Input placeholder="Ex: Impressora, CNC, Torno..." className="pl-12 h-12 text-base" />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-semibold text-foreground mb-2">Localização</label>
              <MapPin className="absolute left-4 top-11 text-muted-foreground h-5 w-5" />
              <Input placeholder="Cidade, estado ou CEP" className="pl-12 h-12 text-base" />
            </div>
            
            <div className="flex flex-col justify-end">
              <Link to="/find-technician" className="w-full">
                <Button size="lg" className="w-full h-12 text-base font-semibold">
                  Buscar Técnicos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Métricas simples */}
        <div className="flex flex-wrap justify-center gap-12 mb-12 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3 dias</div>
            <div className="text-muted-foreground font-medium">Técnico confirmado</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">Mesmo dia</div>
            <div className="text-muted-foreground font-medium">Início do serviço</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground font-medium">Garantia de qualidade</div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/find-technician">
            <Button size="lg" className="px-8 py-6 text-lg font-semibold">
              Contratar Técnico
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-semibold">
              Como Funciona
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;