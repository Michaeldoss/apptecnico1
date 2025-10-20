import React from "react";
import { Link } from "react-router-dom";
const ServiceCategories = () => {
  const categories = ["Assistência Técnica", "Impressoras UV", "Impressoras DTF", "Plotters", "Router CNC", "Laser CO²", "Sublimação", "Prensas Térmicas", "Bordado", "Off-Set"];
  const institutional = ["Quem Somos", "Trabalhe Conosco", "Blog", "Segurança", "Mapa do Site", "Ajuda"];
  return (
    <section className="section-padding bg-muted/50">
      <div className="container-instalei">
        <h2 className="text-3xl font-bold text-center mb-instalei-lg text-primary">Categorias de Serviços Instalei</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-instalei-sm mb-instalei-lg">
          {categories.map((category, index) => (
            <Link key={index} to="/services" className="card-instalei hover:bg-accent/50 transition-colors text-center">
              <span className="text-sm font-medium">{category}</span>
            </Link>
          ))}
        </div>
        <div className="border-t border-border pt-instalei-lg">
          <h3 className="text-xl font-semibold mb-instalei-md text-primary">Institucional Instalei</h3>
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