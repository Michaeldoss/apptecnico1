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
    <section className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div 
                key={index} 
                className="text-center space-y-3 p-6 rounded-lg hover:bg-card transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
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
