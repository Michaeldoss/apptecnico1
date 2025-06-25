
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import BlurContainer from "@/components/ui/BlurContainer";
import { Search, Wrench, ShieldCheck, Package, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] [mask-image:radial-gradient(white,transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedContainer animation="slide-right" className="text-center space-y-8 md:space-y-12 mb-16">
          {/* Título Principal */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Encontre especialistas para seus equipamentos{" "}
              <span className="text-[#1D4ED8] font-black">em minutos</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Conecte-se instantaneamente com técnicos qualificados para manutenção e reparo de equipamentos industriais
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/find-technician">
              <Button size="lg" className="w-full sm:w-auto text-base font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Search className="w-5 h-5 mr-2" />
                🔍 Encontrar Técnico
              </Button>
            </Link>
            <Link to="/technician">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base font-semibold px-8 py-4 rounded-full border-2 hover:bg-primary/5 transition-all duration-300">
                <Wrench className="w-5 h-5 mr-2" />
                🧰 Sou Técnico
              </Button>
            </Link>
          </div>
        </AnimatedContainer>

        {/* Cards de Benefícios */}
        <AnimatedContainer animation="slide-left" delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Wrench className="w-8 h-8 text-primary" />,
                title: "Instalação & Manutenção",
                description: "Serviços completos para seus equipamentos industriais"
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "Técnicos Avaliados", 
                description: "Profissionais verificados com avaliações reais"
              },
              {
                icon: <Package className="w-8 h-8 text-primary" />,
                title: "Peças com Garantia",
                description: "Componentes originais direto dos fornecedores"
              },
              {
                icon: <Clock className="w-8 h-8 text-primary" />,
                title: "Acompanhamento em Tempo Real",
                description: "Monitore cada etapa do seu serviço"
              }
            ].map((benefit, index) => (
              <BlurContainer
                key={index}
                className="p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl"
                intensity="light"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </BlurContainer>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default Hero;
