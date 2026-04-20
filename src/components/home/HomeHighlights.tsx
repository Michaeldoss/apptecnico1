import { CheckCircle, Clock, Shield, Star } from "lucide-react";

const highlights = [
  {
    icon: CheckCircle,
    title: "Técnicos Verificados",
    description: "Todos os profissionais são certificados e verificados",
  },
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Resposta em até 2 horas em casos de emergência",
  },
  {
    icon: Shield,
    title: "Garantia de Serviço",
    description: "Proteção e garantia em todos os serviços realizados",
  },
  {
    icon: Star,
    title: "Avaliações Reais",
    description: "Sistema de avaliações verificadas de clientes reais",
  },
];

const HomeHighlights = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div 
                key={index} 
                className="text-center space-y-3 p-6 rounded-2xl glass border border-border/40 hover:border-accent/50 hover:shadow-glow-accent transition-all duration-500 group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-glow text-white mb-2 shadow-glow-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-display font-bold text-foreground group-hover:text-accent transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;
