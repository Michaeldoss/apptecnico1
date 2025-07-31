import React from "react";
import { Link } from "react-router-dom";
const ServiceCategories = () => {
  const categories = ["Assistência Técnica", "Consultoria", "Design e Tecnologia", "Manutenção Industrial", "Automação", "Calibração", "Soldagem", "Eletrônica", "Refrigeração", "Informática"];
  const institutional = ["Quem Somos", "Trabalhe Conosco", "Blog", "Segurança", "Mapa do Site", "Ajuda"];
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Categorias de Serviços</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {categories.map((category, index) => (
            <Link key={index} to="/services" className="p-4 bg-card rounded-lg hover:bg-accent/50 transition-colors text-center">
              <span className="text-sm font-medium">{category}</span>
            </Link>
          ))}
        </div>
        <div className="border-t pt-8">
          <h3 className="text-xl font-semibold mb-6">Institucional</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {institutional.map((item, index) => (
              <Link key={index} to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
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