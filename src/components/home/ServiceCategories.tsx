import React from "react";
import { Link } from "react-router-dom";

const ServiceCategories = () => {
  const categories = ["Assistência Técnica", "Impressoras UV", "Impressoras DTF", "Plotters", "Router CNC", "Laser CO²", "Sublimação", "Prensas Térmicas", "Bordado", "Off-Set"];
  const institutional = ["Quem Somos", "Trabalhe Conosco", "Blog", "Segurança", "Mapa do Site", "Ajuda"];
  return (
    <section className="section-padding relative overflow-hidden bg-mesh">
      <div className="container-instalei relative z-10">
        <div className="text-center mb-instalei-lg">
          <span className="inline-block glass px-4 py-2 rounded-full text-sm font-semibold text-accent mb-4 font-display tracking-wide">
            ESPECIALIDADES
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Categorias de <span className="text-gradient">Serviços</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-instalei-sm mb-instalei-lg">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/services"
              className="glass border border-border/40 hover:border-accent/50 hover:shadow-glow-accent rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 group"
            >
              <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{category}</span>
            </Link>
          ))}
        </div>
        <div className="border-t border-border/50 pt-instalei-lg">
          <h3 className="text-xl font-display font-bold mb-instalei-md text-foreground">Institucional Instalei</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-instalei-sm">
            {institutional.map((item, index) => (
              <Link key={index} to="/about" className="text-muted-foreground hover:text-accent transition-colors font-medium">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
