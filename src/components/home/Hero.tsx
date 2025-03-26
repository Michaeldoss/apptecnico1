
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import BlurContainer from "@/components/ui/BlurContainer";

const Hero = () => {
  return (
    <section className="py-20 px-6 bg-accent/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimatedContainer animation="slide-right" className="space-y-6">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            Plataforma de Suporte Técnico
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Conectando <span className="text-primary">Especialistas</span> e <span className="text-primary">Clientes</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Encontre técnicos qualificados para resolver seus problemas ou ofereça seus serviços técnicos em nossa plataforma.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <Link to="/register">
              <Button size="lg" className="rounded-full w-full sm:w-auto text-base">
                Comece Agora
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto text-base">
                Explorar Serviços
              </Button>
            </Link>
          </div>
        </AnimatedContainer>

        <AnimatedContainer animation="slide-left" delay={300}>
          <BlurContainer className="p-6 lg:p-8 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  title: "Serviços de Reparo",
                  description: "Encontre especialistas para consertar seus equipamentos.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                  title: "Técnicos Verificados",
                  description: "Todos os técnicos são verificados e avaliados.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Pagamentos Seguros",
                  description: "Transações seguras e garantia de satisfação.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                  ),
                  title: "Suporte 24/7",
                  description: "Ajuda disponível a qualquer hora do dia.",
                },
              ].map((feature, index) => (
                <BlurContainer
                  key={index}
                  className="p-5 hover-scale transition-all duration-300 hover:shadow-md"
                  intensity="light"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="text-primary">{feature.icon}</div>
                    <h3 className="font-semibold text-base">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </BlurContainer>
              ))}
            </div>
          </BlurContainer>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default Hero;
