import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-mesh-dark">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      
      {/* Floating blobs */}
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-blob" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-primary-glow/30 blur-3xl animate-blob" style={{ animationDelay: '5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl animate-blob" style={{ animationDelay: '10s' }} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

      <div className="container px-4 mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-accent/30 text-sm font-medium text-white/90 animate-scale-in">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Plataforma #1 em serviços técnicos no Brasil</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-display leading-[1.05]">
            Conectamos você aos{" "}
            <span className="text-gradient inline-block">
              melhores técnicos
            </span>{" "}
            especializados
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Encontre profissionais qualificados para manutenção, instalação e reparo de equipamentos.
            Rápido, seguro e confiável.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 h-14 bg-gradient-to-r from-accent to-accent-glow hover:shadow-glow-accent transition-all duration-300 hover:scale-105 border-0"
              onClick={() => navigate("/encontrar-tecnico")}
            >
              Encontrar Técnico
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 h-14 glass-dark border-white/20 text-white hover:bg-white/10 hover:border-accent/50 transition-all duration-300"
              onClick={() => navigate("/servicos")}
            >
              Ver Serviços
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-16 max-w-4xl mx-auto">
            {[
              { icon: Zap, value: "500+", label: "Técnicos Certificados" },
              { icon: Sparkles, value: "10k+", label: "Serviços Realizados" },
              { icon: Shield, value: "4.8★", label: "Avaliação Média" },
            ].map((stat, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl glass-dark border border-white/10 hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-accent"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-primary-glow/20 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gradient font-display mb-2">{stat.value}</div>
                <div className="text-sm text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
